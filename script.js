const STAGES = [
    { title: "Metoro Video", videoUrl: "metoro.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Toudai Video", videoUrl: "toudai.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Robotto", videoUrl: "robtto.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Dog", videoUrl: "dog.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Meri-", videoUrl: "meri-.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Hanabi", videoUrl: "hanabi.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "For Bigger Joyrides", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", rows: 4, cols: 4 },
    { title: "For Bigger Meltdowns", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", rows: 4, cols: 5 },
    { title: "Sintel Trailer", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", rows: 5, cols: 5 },
    { title: "Tears of Steel", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", rows: 5, cols: 6 }
];

class KinekoGame {
    constructor(diffSize, isHellMode = false) {
        this.globalGridSize = diffSize;
        this.isHellMode = isHellMode; // ヘルモード判定フラグ
        this.currentStageIndex = 0;
        this.board = document.getElementById('puzzle-board');
        this.completedVideo = document.getElementById('completed-video');
        this.sharedVideo = document.getElementById('shared-video'); // 共有ビデオ
        this.titleElement = document.getElementById('stage-title');
        this.overlay = document.getElementById('result-overlay');
        
        // 反転トグル管理用フラグ
        this.flipHActive = false;
        this.flipVActive = false;

        this.pieces = [];
        this.selectedPiece = null;
        this.isTransitioning = false;
        this.pieceWidth = 0;
        this.pieceHeight = 0;
        this.drawLoopId = null; // 描画ループ管理用
        this.startTime = null; // タイマー開始時刻
        this.timerInterval = null; // タイマー監視インターバル

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

        // 左右・上下反転トグルイベントのバインド（片方を押すともう片方は自動解除される排他仕様）
        const btnFlipH = document.getElementById('btn-flip-h');
        const btnFlipV = document.getElementById('btn-flip-v');

        btnFlipH.addEventListener('click', () => {
            this.flipHActive = !this.flipHActive;
            btnFlipH.classList.toggle('active', this.flipHActive);
            
            if (this.flipHActive) {
                this.flipVActive = false;
                btnFlipV.classList.remove('active');
            }
        });

        btnFlipV.addEventListener('click', () => {
            this.flipVActive = !this.flipVActive;
            btnFlipV.classList.toggle('active', this.flipVActive);
            
            if (this.flipVActive) {
                this.flipHActive = false;
                btnFlipH.classList.remove('active');
            }
        });

        // タイトルへ戻るボタンのイベント登録
        document.getElementById('back-to-title-btn').addEventListener('click', () => {
            this.stopTimer();
            if (this.drawLoopId) {
                cancelAnimationFrame(this.drawLoopId);
                this.drawLoopId = null;
            }
            this.sharedVideo.pause();
            this.sharedVideo.src = '';
            this.completedVideo.pause();
            this.completedVideo.src = '';

            // 画面の表示切り替え
            document.getElementById('app').style.display = 'none';
            document.getElementById('title-screen').style.display = 'flex';
        });

        // 描画ループを開始
        this.startDrawingLoop();
    }

    loadStage(index) {
        if (this.isTransitioning) return;
        this.currentStageIndex = index;
        const stage = STAGES[index];
        stage.rows = this.globalGridSize;
        stage.cols = this.globalGridSize;
        // 16:9 比率を全ステージに強制適用（ステージ固有値がある場合はそちら優先）
        if (!stage.aspectRatio) stage.aspectRatio = 16 / 9;

        // 完成用動画を非表示・初期化し、パズルボードを再表示
        this.completedVideo.pause();
        this.completedVideo.src = '';
        this.completedVideo.style.display = 'none';
        this.board.style.display = 'block';

        // 共有ビデオの再生を開始
        this.sharedVideo.src = stage.videoUrl;
        this.sharedVideo.play().catch(err => console.log("Auto-play blocked or failed:", err));

        // 反転トグル状態の初期化
        this.flipHActive = false;
        this.flipVActive = false;
        document.getElementById('btn-flip-h').classList.remove('active');
        document.getElementById('btn-flip-v').classList.remove('active');

        // ヘルモード用のUI表示制御
        const flipControls = document.getElementById('flip-controls');
        if (this.isHellMode) {
            flipControls.style.display = 'flex';
        } else {
            flipControls.style.display = 'none';
        }

        // ヘルモード表記の有無
        const modeLabel = this.isHellMode ? " [HELL]" : "";
        this.titleElement.innerHTML = `Stage ${index + 1}${modeLabel}<br>${stage.title}`;
        this.overlay.style.display = 'none';
        this.createBoard(stage);
        this.startTimer();
    }

    createBoard(stage) {
        this.board.innerHTML = '';
        this.pieces = [];
        this.selectedPiece = null;

        const { rows, cols } = stage;

        // 正解のインデックスリストを作成
        const pieceCount = rows * cols;
        for (let i = 0; i < pieceCount; i++) {
            const piece = this.createPiece(i, rows, cols);
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

    createPiece(correctIndex, rows, cols) {
        const canvas = document.createElement('canvas');
        canvas.className = 'piece';
        canvas.dataset.correctIndex = correctIndex;
        canvas.dataset.currentIndex = correctIndex;
        canvas.dataset.flipH = "false"; // 左右反転フラグ
        canvas.dataset.flipV = "false"; // 上下反転フラグ
        canvas.style.backgroundColor = '#222'; // 描画前バックアップ色

        canvas.addEventListener('click', () => this.handlePieceClick(canvas));

        this.board.appendChild(canvas);
        return canvas;
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

        // グリッド数で割り切れるようにサイズを整数値に丸め、小数点による画像ズレ（隙間）を防止
        boardWidth = Math.floor(boardWidth / stage.cols) * stage.cols;
        boardHeight = Math.floor(boardHeight / stage.rows) * stage.rows;

        this.board.style.width = `${boardWidth}px`;
        this.board.style.height = `${boardHeight}px`;

        this.pieceWidth = boardWidth / stage.cols;
        this.pieceHeight = boardHeight / stage.rows;

        this.pieces.forEach(piece => {
            piece.style.width = `${this.pieceWidth}px`;
            piece.style.height = `${this.pieceHeight}px`;
            piece.style.position = 'absolute';

            this.updatePiecePosition(piece);
        });
    }

    updatePiecePosition(piece) {
        const currentIdx = parseInt(piece.dataset.currentIndex);
        const stage = STAGES[this.currentStageIndex];
        const r = Math.floor(currentIdx / stage.cols);
        const c = currentIdx % stage.cols;
        
        const scaleX = piece.dataset.flipH === "true" ? -1 : 1;
        const scaleY = piece.dataset.flipV === "true" ? -1 : 1;

        // translate3dとscaleを組み合わせて描画。ピース自体は回転させず、画像（中身の反転）だけを表現
        piece.style.transform = `translate3d(${c * this.pieceWidth}px, ${r * this.pieceHeight}px, 0) scale(${scaleX}, ${scaleY})`;
    }

    shuffleBoard() {
        if (this.isTransitioning) return;

        const indices = this.pieces.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        // ヘルモードの場合は向き（反転）もランダムに設定
        this.pieces.forEach(piece => {
            if (this.isHellMode) {
                piece.dataset.flipH = Math.random() < 0.5 ? "true" : "false";
                piece.dataset.flipV = Math.random() < 0.5 ? "true" : "false";
            } else {
                piece.dataset.flipH = "false";
                piece.dataset.flipV = "false";
            }
        });

        this.updateBoard(indices);
    }

    updateBoard(newIndices) {
        newIndices.forEach((correctIdx, currentIdx) => {
            const piece = this.pieces.find(p => parseInt(p.dataset.correctIndex) === correctIdx);
            if (piece) {
                piece.dataset.currentIndex = currentIdx;
                this.updatePiecePosition(piece);
                this.checkLock(piece);
            }
        });

        this.checkWin();
    }

    handlePieceClick(piece) {
        if (this.isTransitioning) return;

        // 反転トグルのいずれかがロック（アクティブ）されている場合、反転処理を実行
        if (this.isHellMode && (this.flipHActive || this.flipVActive)) {
            if (this.flipHActive) {
                const currentFlipH = piece.dataset.flipH === "true";
                piece.dataset.flipH = (!currentFlipH).toString();
            }
            if (this.flipVActive) {
                const currentFlipV = piece.dataset.flipV === "true";
                piece.dataset.flipV = (!currentFlipV).toString();
            }

            // 選択状態があれば解除
            if (this.selectedPiece) {
                this.selectedPiece.classList.remove('selected');
                this.selectedPiece = null;
            }

            this.updatePiecePosition(piece);

            // アニメーション完了を待ってから判定
            setTimeout(() => {
                this.checkLock(piece);
                this.checkWin();
            }, 300);
            return;
        }

        // 通常の選択・入れ替え処理
        if (!this.selectedPiece) {
            this.selectedPiece = piece;
            piece.classList.add('selected');
        } else if (this.selectedPiece === piece) {
            // 通常モードなら選択解除
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
        const posCorrect = parseInt(piece.dataset.currentIndex) === parseInt(piece.dataset.correctIndex);
        const rotCorrect = !this.isHellMode || (piece.dataset.flipH === "false" && piece.dataset.flipV === "false");

        if (posCorrect && rotCorrect) {
            piece.classList.add('locked');
        } else {
            piece.classList.remove('locked');
        }
    }

    checkWin() {
        const allCorrect = this.pieces.every(p => {
            const posCorrect = parseInt(p.dataset.currentIndex) === parseInt(p.dataset.correctIndex);
            const rotCorrect = !this.isHellMode || (p.dataset.flipH === "false" && p.dataset.flipV === "false");
            return posCorrect && rotCorrect;
        });

        if (allCorrect && this.pieces.length > 0) {
            this.onStageClear();
        }
    }

    onStageClear() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.stopTimer(); // タイマーをストップ

        // 1枚の完成版動画に切り替えて再生する
        const stage = STAGES[this.currentStageIndex];
        this.completedVideo.src = stage.videoUrl;
        this.completedVideo.style.width = this.board.style.width;
        this.completedVideo.style.height = this.board.style.height;
        this.completedVideo.style.display = 'block';
        this.completedVideo.play();

        // 複数動画タイルは非表示にする
        this.board.style.display = 'none';

        // 3秒間完成したループ動画をそのまま見せる
        setTimeout(() => {
            // 文字のみを中央に表示
            this.overlay.style.display = 'flex';

            // タップで次のステージへ移行するイベントを登録
            const proceed = () => {
                this.overlay.removeEventListener('click', proceed);
                this.overlay.style.display = 'none';
                
                // 次のステージへ行く前に動画要素をクリーンアップ
                this.completedVideo.pause();
                this.completedVideo.src = '';
                this.completedVideo.style.display = 'none';
                this.board.style.display = 'block';

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

    startDrawingLoop() {
        const draw = () => {
            const stage = STAGES[this.currentStageIndex];
            const cols = stage.cols;
            const rows = stage.rows;

            // 共有ビデオが読み込まれており、クリアトランジション中でない場合のみ描画
            if (this.sharedVideo.readyState >= 2 && !this.isTransitioning) {
                this.pieces.forEach(piece => {
                    const ctx = piece.getContext('2d');
                    const correctIdx = parseInt(piece.dataset.correctIndex);
                    const r = Math.floor(correctIdx / cols);
                    const c = correctIdx % cols;

                    // canvas内部の描画バッファ解像度をアライン
                    if (piece.width !== this.pieceWidth || piece.height !== this.pieceHeight) {
                        piece.width = this.pieceWidth;
                        piece.height = this.pieceHeight;
                    }

                    // ビデオの元サイズから1ピース分の大きさを割り出す
                    const vW = this.sharedVideo.videoWidth;
                    const vH = this.sharedVideo.videoHeight;
                    const sourcePieceW = vW / cols;
                    const sourcePieceH = vH / rows;

                    // Canvasに動画の該当領域を切り出して描画
                    ctx.drawImage(
                        this.sharedVideo,
                        c * sourcePieceW, r * sourcePieceH, sourcePieceW, sourcePieceH, // ソース切り出し範囲
                        0, 0, this.pieceWidth, this.pieceHeight // Canvas描画範囲
                    );
                });
            }
            this.drawLoopId = requestAnimationFrame(draw);
        };
        this.drawLoopId = requestAnimationFrame(draw);
    }

    startTimer() {
        this.stopTimer(); // 既存のタイマーを破棄
        this.startTime = Date.now();

        // 00:00で初期化表示
        const timerEl = document.getElementById('game-timer');
        if (timerEl) {
            timerEl.innerText = '00:00';
        }

        this.timerInterval = setInterval(() => {
            const timeDiff = Date.now() - this.startTime;
            const minutes = Math.floor(timeDiff / 60000);
            const seconds = Math.floor((timeDiff % 60000) / 1000);
            const displayMin = String(minutes).padStart(2, '0');
            const displaySec = String(seconds).padStart(2, '0');

            if (timerEl) {
                timerEl.innerText = `${displayMin}:${displaySec}`;
            }
        }, 250); // 0.25秒ごとに画面表示を更新
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 画面のどこかを初めて触った（タップした）瞬間に自動的にフルスクリーン＆横画面にする
    const triggerFullscreen = () => {
        const docEl = document.documentElement;
        const lockLandscape = () => {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch(() => {});
            }
        };

        try {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                if (docEl.requestFullscreen) {
                    docEl.requestFullscreen().then(lockLandscape).catch(() => {});
                } else if (docEl.webkitRequestFullscreen) {
                    docEl.webkitRequestFullscreen();
                    setTimeout(lockLandscape, 200);
                }
            } else {
                lockLandscape(); // すでにフルスクリーンの場合は横画面ロックのみ実行
            }
        } catch (e) {
            console.log("Auto fullscreen request failed:", e);
        }
    };

    // タイトル画面タップでのフルスクリーン化イベントを登録（初回のみ）
    document.addEventListener('click', triggerFullscreen, { once: true });
    document.addEventListener('touchstart', triggerFullscreen, { once: true });

    const startGame = (size, isHell = false) => {
        // ボタンクリック時にも念のためフルスクリーン化を実行（タップされなかった場合の保険）
        triggerFullscreen();

        document.getElementById('title-screen').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
        // iOS等での動画の自動再生制約を解除するために再描画などを促す
        setTimeout(() => {
            // 既存のインスタンスが残っている場合はクリーンアップ（タイマー等を確実に停止）
            if (window.gameInstance) {
                window.gameInstance.stopTimer();
                if (window.gameInstance.drawLoopId) {
                    cancelAnimationFrame(window.gameInstance.drawLoopId);
                }
            }
            window.gameInstance = new KinekoGame(size, isHell);
        }, 100);
    };

    // 通常モードの難易度選択
    document.getElementById('btn-easy').addEventListener('click', () => startGame(3, false));
    document.getElementById('btn-normal').addEventListener('click', () => startGame(4, false));
    document.getElementById('btn-hard').addEventListener('click', () => startGame(5, false));

    // ヘルモードの難易度選択
    document.getElementById('btn-easy-hell').addEventListener('click', () => startGame(3, true));
    document.getElementById('btn-normal-hell').addEventListener('click', () => startGame(4, true));
    document.getElementById('btn-hard-hell').addEventListener('click', () => startGame(5, true));
});
