const STAGES = [
    { title: "Metoro Video", videoUrl: "metoro.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Toudai Video", videoUrl: "toudai.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Robotto", videoUrl: "robtto.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Dog", videoUrl: "dog.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "For Bigger Escapes", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", rows: 3, cols: 4 },
    { title: "For Bigger Fun", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", rows: 4, cols: 4 },
    { title: "For Bigger Joyrides", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", rows: 4, cols: 4 },
    { title: "For Bigger Meltdowns", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", rows: 4, cols: 5 },
    { title: "Sintel Trailer", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", rows: 5, cols: 5 },
    { title: "Tears of Steel", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", rows: 5, cols: 6 }
];

class KinekoGame {
    constructor(diffSize) {
        this.globalGridSize = diffSize;
        this.currentStageIndex = 0;
        this.board = document.getElementById('puzzle-board');
        this.titleElement = document.getElementById('stage-title');
        this.overlay = document.getElementById('result-overlay');
        this.pieces = [];
        this.selectedPiece = null;
        this.isTransitioning = false;
        this.pieceWidth = 0;
        this.pieceHeight = 0;

        this.init();
    }

    init() {
        this.loadStage(this.currentStageIndex);
        window.addEventListener('resize', () => this.resizeBoard());
        document.getElementById('reload-btn').addEventListener('click', () => this.loadStage(this.currentStageIndex));
        document.getElementById('next-btn').addEventListener('click', () => this.nextStage());

        // 完成図ボタン
        const previewBtn   = document.getElementById('preview-btn');
        const previewModal = document.getElementById('preview-modal');
        const previewVideo = document.getElementById('preview-video');
        const previewClose = document.getElementById('preview-close');

        previewBtn.addEventListener('click', () => {
            const stage = STAGES[this.currentStageIndex];
            previewVideo.src = stage.videoUrl;
            previewVideo.play();
            previewModal.style.display = 'flex';
        });

        previewClose.addEventListener('click', () => {
            previewModal.style.display = 'none';
            previewVideo.pause();
            previewVideo.src = '';
        });

        // 画面タップ（どこをクリックしても）で閉じる
        previewModal.addEventListener('click', () => {
            previewModal.style.display = 'none';
            previewVideo.pause();
            previewVideo.src = '';
        });
    }

    loadStage(index) {
        if (this.isTransitioning) return;
        this.currentStageIndex = index;
        const stage = STAGES[index];
        stage.rows = this.globalGridSize;
        stage.cols = this.globalGridSize;
        // 16:9 比率を全ステージに強制適用（ステージ固有値がある場合はそちら優先）
        if (!stage.aspectRatio) stage.aspectRatio = 16 / 9;
        this.titleElement.innerHTML = `Stage ${index + 1}<br>${stage.title}`;
        this.overlay.style.display = 'none';
        this.createBoard(stage);
    }

    createBoard(stage) {
        this.board.innerHTML = '';
        this.pieces = [];
        this.selectedPiece = null;

        const { rows, cols, videoUrl } = stage;

        // 正解のインデックスリストを作成
        const pieceCount = rows * cols;
        for (let i = 0; i < pieceCount; i++) {
            const piece = this.createPiece(i, rows, cols, videoUrl);
            this.pieces.push(piece);
        }

        // DOMの描画を待ってからサイズ計算
        const tryResize = (attempts = 0) => {
            this.resizeBoard();
            if ((!this.pieceWidth || this.pieceWidth < 10) && attempts < 10) {
                setTimeout(() => tryResize(attempts + 1), 100);
            } else {
                this.shuffleBoard();
            }
        };

        setTimeout(() => tryResize(), 50);
    }

    createPiece(correctIndex, rows, cols, videoUrl) {
        const piece = document.createElement('div');
        piece.className = 'piece';
        piece.dataset.correctIndex = correctIndex;
        piece.dataset.currentIndex = correctIndex;
        piece.style.backgroundColor = '#222'; // 枠が見えるように

        const video = document.createElement('video');
        video.src = videoUrl;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        // 動画の読み込みエラー対策
        video.onerror = () => {
            console.error("Video failed to load:", videoUrl);
            piece.style.backgroundColor = '#444';
            const msg = document.createElement('span');
            msg.innerText = "Error";
            msg.style.position = "absolute";
            msg.style.top = "50%";
            msg.style.left = "50%";
            msg.style.transform = "translate(-50%, -50%)";
            msg.style.fontSize = "10px";
            piece.appendChild(msg);
        };

        piece.appendChild(video);
        piece.addEventListener('click', () => this.handlePieceClick(piece));

        this.board.appendChild(piece);
        return piece;
    }

    resizeBoard() {
        const stage = STAGES[this.currentStageIndex];
        const container = document.querySelector('.puzzle-container');
        if (!container) return;

        let containerWidth = container.clientWidth;
        let containerHeight = container.clientHeight;

        // フォールバック
        if (!containerWidth || containerWidth < 100) containerWidth = window.innerWidth * 0.9;
        if (!containerHeight || containerHeight < 100) containerHeight = window.innerHeight * 0.6;

        const targetW = containerWidth * 0.95;
        const targetH = containerHeight * 0.95;

        const gridAspect = stage.aspectRatio || (stage.cols / stage.rows);
        let boardWidth, boardHeight;

        if (targetW / targetH > gridAspect) {
            boardHeight = targetH;
            boardWidth = boardHeight * gridAspect;
        } else {
            boardWidth = targetW;
            boardHeight = boardWidth / gridAspect;
        }

        this.board.style.width = `${boardWidth}px`;
        this.board.style.height = `${boardHeight}px`;

        this.pieceWidth = boardWidth / stage.cols;
        this.pieceHeight = boardHeight / stage.rows;

        this.pieces.forEach(piece => {
            const video = piece.querySelector('video');
            const correctIdx = parseInt(piece.dataset.correctIndex);
            const r = Math.floor(correctIdx / stage.cols);
            const c = correctIdx % stage.cols;

            piece.style.width = `${this.pieceWidth}px`;
            piece.style.height = `${this.pieceHeight}px`;
            piece.style.position = 'absolute';

            if (video) {
                video.style.width = `${boardWidth}px`;
                video.style.height = `${boardHeight}px`;
                video.style.top = `-${r * this.pieceHeight}px`;
                video.style.left = `-${c * this.pieceWidth}px`;
            }

            this.updatePiecePosition(piece);
        });
    }

    updatePiecePosition(piece) {
        const currentIdx = parseInt(piece.dataset.currentIndex);
        const stage = STAGES[this.currentStageIndex];
        const r = Math.floor(currentIdx / stage.cols);
        const c = currentIdx % stage.cols;

        piece.style.transform = `translate(${c * this.pieceWidth}px, ${r * this.pieceHeight}px)`;
    }

    shuffleBoard() {
        if (this.isTransitioning) return;

        const indices = this.pieces.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        this.updateBoard(indices);
    }

    updateBoard(newIndices) {
        newIndices.forEach((correctIdx, currentIdx) => {
            const piece = this.pieces.find(p => parseInt(p.dataset.correctIndex) === correctIdx);
            if (piece) {
                piece.dataset.currentIndex = currentIdx;
                this.updatePiecePosition(piece);

                if (parseInt(piece.dataset.correctIndex) === currentIdx) {
                    piece.classList.add('locked');
                } else {
                    piece.classList.remove('locked');
                }
            }
        });

        this.checkWin();
    }

    handlePieceClick(piece) {
        if (piece.classList.contains('locked') || this.isTransitioning) return;

        if (!this.selectedPiece) {
            this.selectedPiece = piece;
            piece.classList.add('selected');
        } else if (this.selectedPiece === piece) {
            this.selectedPiece.classList.remove('selected');
            this.selectedPiece = null;
        } else {
            const p1 = this.selectedPiece;
            const p2 = piece;

            this.swapPieces(p1, p2);
            p1.classList.remove('selected');
            this.selectedPiece = null;
        }
    }

    swapPieces(p1, p2) {
        const idx1 = p1.dataset.currentIndex;
        const idx2 = p2.dataset.currentIndex;

        p1.dataset.currentIndex = idx2;
        p2.dataset.currentIndex = idx1;

        this.updatePiecePosition(p1);
        this.updatePiecePosition(p2);

        setTimeout(() => {
            this.checkLock(p1);
            this.checkLock(p2);
            this.checkWin();
        }, 300);
    }

    checkLock(piece) {
        if (parseInt(piece.dataset.currentIndex) === parseInt(piece.dataset.correctIndex)) {
            piece.classList.add('locked');
        }
    }

    checkWin() {
        const allCorrect = this.pieces.every(p =>
            parseInt(p.dataset.currentIndex) === parseInt(p.dataset.correctIndex)
        );

        if (allCorrect && this.pieces.length > 0) {
            this.onStageClear();
        }
    }

    onStageClear() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        // ボードに完成スタイルを適用（境界線やロックの半透明青表示などを消す）
        this.board.classList.add('completed');

        // 3秒間完成したループ動画をそのまま見せる
        setTimeout(() => {
            // 文字のみを中央に表示
            this.overlay.style.display = 'flex';

            // タップで次のステージへ移行するイベントを登録
            const proceed = () => {
                this.overlay.removeEventListener('click', proceed);
                this.overlay.style.display = 'none';
                this.board.classList.remove('completed');
                this.nextStage();
            };
            this.overlay.addEventListener('click', proceed);
        }, 3000);
    }

    nextStage() {
        this.isTransitioning = false;
        const nextIdx = (this.currentStageIndex + 1) % STAGES.length;
        this.loadStage(nextIdx);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const startGame = (size) => {
        document.getElementById('title-screen').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
        // iOS等での動画の自動再生制約を解除するために再描画などを促す
        setTimeout(() => {
            window.gameInstance = new KinekoGame(size);
        }, 100);
    };

    document.getElementById('btn-easy').addEventListener('click', () => startGame(3));
    document.getElementById('btn-normal').addEventListener('click', () => startGame(4));
    document.getElementById('btn-hard').addEventListener('click', () => startGame(5));
});
