const STAGES = [
    { title: "Metoro Video", videoUrl: "metoro.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Toudai Video", videoUrl: "toudai.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Robotto", videoUrl: "robtto.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Dog", videoUrl: "dog.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Meri-", videoUrl: "meri-.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Hanabi", videoUrl: "hanabi.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Fuusya", videoUrl: "fuusya.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Funsui", videoUrl: "funsui.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Hiyoko", videoUrl: "hiyoko.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Kamo", videoUrl: "kamo.mp4", rows: 3, cols: 3, aspectRatio: 16/9 }
];

class KinekoGame {
    constructor(diffSize, isHellMode = false, isJigsawMode = false) {
        this.globalGridSize = diffSize;
        this.isHellMode = isHellMode; // ヘルモード判定フラグ
        this.isJigsawMode = isJigsawMode; // ジグソーモード判定フラグ
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

        // 制限時間（ミリ秒）: 5分 = 300,000ms
        this.defaultRemainingTime = 300000;
        this.currentRemainingTime = 300000;

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
            previewVideo.muted = false; // 完成図は音声あり
            previewVideo.play().catch(() => {
                // 自動再生がブロックされた場合はミュートで再試行
                previewVideo.muted = true;
                previewVideo.play();
            });
            previewModal.style.display = 'flex';
        });

        const closePreview = () => {
            previewModal.style.display = 'none';
            previewVideo.pause();
            previewVideo.muted = true; // 閉じたらミュートに戻す
            previewVideo.src = '';
        };

        previewClose.addEventListener('click', closePreview);

        // 画面タップ（どこをクリックしても）で閉じる
        previewModal.addEventListener('click', closePreview);

        // タイムアップモーダルのボタンイベント
        document.getElementById('ad-btn').addEventListener('click', () => this.watchAd());
        document.getElementById('retry-stage-btn').addEventListener('click', () => {
            document.getElementById('timeup-modal').style.display = 'none';
            this.isTransitioning = false;
            this.loadStage(this.currentStageIndex);
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
            this.completedVideo.muted = true; // 音声をリセット
            this.completedVideo.src = '';

            // 完成図モーダルが開いていた場合も閉じる
            const previewModal = document.getElementById('preview-modal');
            const previewVideo = document.getElementById('preview-video');
            previewModal.style.display = 'none';
            previewVideo.pause();
            previewVideo.muted = true;
            previewVideo.src = '';

            // モーダルを非表示
            document.getElementById('timeup-modal').style.display = 'none';
            document.getElementById('ad-modal').style.display = 'none';
            this.isTransitioning = false;

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
        if (this.isJigsawMode) {
            stage.rows = 9;
            stage.cols = 16;
        } else {
            stage.rows = this.globalGridSize;
            stage.cols = this.globalGridSize;
        }
        // 16:9 比率を全ステージに強制適用（ステージ固有値がある場合はそちら優先）
        if (!stage.aspectRatio) stage.aspectRatio = 16 / 9;

        // 完成用動画を非表示・初期化し、パズルボードを再表示
        this.completedVideo.pause();
        this.completedVideo.src = '';
        this.completedVideo.style.display = 'none';
        this.board.style.display = 'block';

        // モーダルを隠す
        document.getElementById('timeup-modal').style.display = 'none';
        document.getElementById('ad-modal').style.display = 'none';

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
        
        // 制限時間をデフォルト（5分）にリセットしてカウントダウン開始
        this.currentRemainingTime = this.defaultRemainingTime;
        this.startTimer(this.currentRemainingTime);
    }

    createBoard(stage) {
        this.board.innerHTML = '';
        this.pieces = [];
        this.selectedPiece = null;

        const { rows, cols } = stage;
        const pieceCount = rows * cols;
        const tabs = []; // 各ピースの凹凸 [top, right, bottom, left] を保持する配列

        // 凹凸の初期化
        for (let i = 0; i < pieceCount; i++) {
            tabs.push([0, 0, 0, 0]);
        }

        // ジグソーモードの場合は隣り合うピース同士で噛み合う凹凸を決定する
        if (this.isJigsawMode) {
            for (let i = 0; i < pieceCount; i++) {
                const r = Math.floor(i / cols);
                const c = i % cols;

                // 上辺の凹凸を決定（上隣の下辺の逆）
                if (r > 0) {
                    const topIdx = (r - 1) * cols + c;
                    tabs[i][0] = -tabs[topIdx][2];
                } else {
                    tabs[i][0] = 0; // 外周の上端はフラット
                }

                // 左辺の凹凸を決定（左隣の右辺の逆）
                if (c > 0) {
                    const leftIdx = r * cols + (c - 1);
                    tabs[i][3] = -tabs[leftIdx][1];
                } else {
                    tabs[i][3] = 0; // 外周の左端はフラット
                }

                // 右辺の凹凸をランダムに決定 (1: 凸, -1: 凹)
                if (c < cols - 1) {
                    tabs[i][1] = Math.random() < 0.5 ? 1 : -1;
                } else {
                    tabs[i][1] = 0; // 外周の右端はフラット
                }

                // 下辺の凹凸をランダムに決定
                if (r < rows - 1) {
                    tabs[i][2] = Math.random() < 0.5 ? 1 : -1;
                } else {
                    tabs[i][2] = 0; // 外周の下端はフラット
                }
            }
        }

        // 凹凸情報をピースに適用して作成
        for (let i = 0; i < pieceCount; i++) {
            const piece = this.createPiece(i, rows, cols, tabs[i]);
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

    createPiece(correctIndex, rows, cols, edgeTabs = [0, 0, 0, 0]) {
        const canvas = document.createElement('canvas');
        canvas.className = 'piece';
        canvas.dataset.correctIndex = correctIndex;
        canvas.dataset.currentIndex = correctIndex;
        canvas.dataset.flipH = "false"; // 左右反転フラグ
        canvas.dataset.flipV = "false"; // 上下反転フラグ
        canvas.style.backgroundColor = this.isJigsawMode ? 'transparent' : '#222'; // 描画前バックアップ色

        // ジグソー凹凸情報をデータ属性として保存 [top, right, bottom, left] (1=凸, -1=凹, 0=平)
        canvas.dataset.tabTop    = edgeTabs[0];
        canvas.dataset.tabRight  = edgeTabs[1];
        canvas.dataset.tabBottom = edgeTabs[2];
        canvas.dataset.tabLeft   = edgeTabs[3];

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
            const padding = this.isJigsawMode ? Math.min(this.pieceWidth, this.pieceHeight) * 0.18 : 0;
            piece.style.width = `${this.pieceWidth + 2 * padding}px`;
            piece.style.height = `${this.pieceHeight + 2 * padding}px`;
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
        const padding = this.isJigsawMode ? Math.min(this.pieceWidth, this.pieceHeight) * 0.18 : 0;

        // translate3dとscaleを組み合わせて描画。ジグソー時はパディング分だけ左上にシフトして配置
        piece.style.transform = `translate3d(${c * this.pieceWidth - padding}px, ${r * this.pieceHeight - padding}px, 0) scale(${scaleX}, ${scaleY})`;
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

        // 1枚の完成版動画に切り替えて音声付きで再生する
        const stage = STAGES[this.currentStageIndex];
        this.completedVideo.src = stage.videoUrl;
        this.completedVideo.style.width = this.board.style.width;
        this.completedVideo.style.height = this.board.style.height;
        this.completedVideo.style.display = 'block';
        this.completedVideo.muted = false; // クリア演出は音声あり
        this.completedVideo.play().catch(() => {
            // 自動再生がブロックされた場合はミュートで再試行
            this.completedVideo.muted = true;
            this.completedVideo.play();
        });

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
                this.completedVideo.muted = true; // 次ステージ前にミュートに戻す
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

    /**
     * ジグソーピースのシルエットを描く Path2D を生成する。
     * タブは楕円の膨らみ（bezierCurveTo）で表現。
     * @param {number} pw - ピースの描画幅 (px)
     * @param {number} ph - ピースの描画高さ (px)
     * @param {number} pad - キャンバスのパディング量 (px)
     * @param {number} tabTop    - 上辺の凹凸 (1=凸/-1=凹/0=平)
     * @param {number} tabRight  - 右辺の凹凸
     * @param {number} tabBottom - 下辺の凹凸
     * @param {number} tabLeft   - 左辺の凹凸
     */
    buildJigsawPath(pw, ph, pad, tabTop, tabRight, tabBottom, tabLeft) {
        const path = new Path2D();
        // タブの膨らみ比率
        const tabSize = Math.min(pw, ph) * 0.28;
        const tabNeck  = 0.28; // ネックの幅（比率）
        const tabHead  = 0.5;  // 頭部の高さ（比率）

        // 描画開始座標（パディングを原点として、ピース実領域の角）
        const x0 = pad, y0 = pad;
        const x1 = pad + pw, y1 = pad + ph;

        // ─── 上辺（左から右） ───
        path.moveTo(x0, y0);
        if (tabTop !== 0) {
            const mx = x0 + pw * 0.5;
            const dir = tabTop; // 1=上へ凸, -1=下へ凹
            path.lineTo(mx - pw * tabNeck, y0);
            path.bezierCurveTo(
                mx - pw * tabNeck, y0 - dir * tabSize * tabHead,
                mx + pw * tabNeck, y0 - dir * tabSize * tabHead,
                mx + pw * tabNeck, y0
            );
        }
        path.lineTo(x1, y0);

        // ─── 右辺（上から下） ───
        if (tabRight !== 0) {
            const my = y0 + ph * 0.5;
            const dir = tabRight;
            path.lineTo(x1, my - ph * tabNeck);
            path.bezierCurveTo(
                x1 + dir * tabSize * tabHead, my - ph * tabNeck,
                x1 + dir * tabSize * tabHead, my + ph * tabNeck,
                x1, my + ph * tabNeck
            );
        }
        path.lineTo(x1, y1);

        // ─── 下辺（右から左） ───
        if (tabBottom !== 0) {
            const mx = x0 + pw * 0.5;
            const dir = -tabBottom; // 下辺は右→左なので方向反転
            path.lineTo(mx + pw * tabNeck, y1);
            path.bezierCurveTo(
                mx + pw * tabNeck, y1 + dir * tabSize * tabHead,
                mx - pw * tabNeck, y1 + dir * tabSize * tabHead,
                mx - pw * tabNeck, y1
            );
        }
        path.lineTo(x0, y1);

        // ─── 左辺（下から上） ───
        if (tabLeft !== 0) {
            const my = y0 + ph * 0.5;
            const dir = -tabLeft; // 左辺は下→上なので方向反転
            path.lineTo(x0, my + ph * tabNeck);
            path.bezierCurveTo(
                x0 + dir * tabSize * tabHead, my + ph * tabNeck,
                x0 + dir * tabSize * tabHead, my - ph * tabNeck,
                x0, my - ph * tabNeck
            );
        }
        path.closePath();
        return path;
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

                    const padding = this.isJigsawMode
                        ? Math.min(this.pieceWidth, this.pieceHeight) * 0.18
                        : 0;
                    const canvasW = this.pieceWidth  + 2 * padding;
                    const canvasH = this.pieceHeight + 2 * padding;

                    // canvas内部の描画バッファ解像度を設定（パディング込み）
                    if (piece.width !== canvasW || piece.height !== canvasH) {
                        piece.width  = canvasW;
                        piece.height = canvasH;
                    }

                    // ビデオの元サイズから1ピース分の大きさを割り出す
                    const vW = this.sharedVideo.videoWidth;
                    const vH = this.sharedVideo.videoHeight;
                    const sourcePieceW = vW / cols;
                    const sourcePieceH = vH / rows;

                    ctx.clearRect(0, 0, canvasW, canvasH);

                    if (this.isJigsawMode) {
                        // ジグソーモード：凹凸パスでクリップしてから動画を描画
                        const tabTop    = parseFloat(piece.dataset.tabTop)    || 0;
                        const tabRight  = parseFloat(piece.dataset.tabRight)  || 0;
                        const tabBottom = parseFloat(piece.dataset.tabBottom) || 0;
                        const tabLeft   = parseFloat(piece.dataset.tabLeft)   || 0;

                        const jigsawPath = this.buildJigsawPath(
                            this.pieceWidth, this.pieceHeight,
                            padding,
                            tabTop, tabRight, tabBottom, tabLeft
                        );

                        ctx.save();
                        // 凹凸パスでクリッピング
                        ctx.clip(jigsawPath);

                        // パディング率: canvasのpaddingがpieceWidthの何倍か
                        const padRatioW = padding / this.pieceWidth;
                        const padRatioH = padding / this.pieceHeight;

                        // ソース動画上での「パディング分の幅」
                        const srcPadW = padRatioW * sourcePieceW;
                        const srcPadH = padRatioH * sourcePieceH;

                        // 理想的なソース開始点（マイナスになり得る = 動画の外）
                        const idealSrcX = c * sourcePieceW - srcPadW;
                        const idealSrcY = r * sourcePieceH - srcPadH;

                        // 動画境界でクランプ
                        const clampedSrcX = Math.max(0, Math.min(idealSrcX, vW));
                        const clampedSrcY = Math.max(0, Math.min(idealSrcY, vH));

                        // クランプによる切り捨て分をキャンバス側オフセットに換算
                        const dstOffX = (clampedSrcX - idealSrcX) / sourcePieceW * this.pieceWidth;
                        const dstOffY = (clampedSrcY - idealSrcY) / sourcePieceH * this.pieceHeight;

                        // ソース幅/高さも境界でクランプ
                        const idealSrcW = sourcePieceW * (1 + 2 * padRatioW);
                        const idealSrcH = sourcePieceH * (1 + 2 * padRatioH);
                        const clampedSrcW = Math.min(idealSrcW, vW - clampedSrcX);
                        const clampedSrcH = Math.min(idealSrcH, vH - clampedSrcY);

                        // キャンバス全体に描画（clip済みなのでジグソー形状の外は出ない）
                        ctx.drawImage(
                            this.sharedVideo,
                            clampedSrcX, clampedSrcY, clampedSrcW, clampedSrcH,
                            dstOffX, dstOffY, canvasW - dstOffX, canvasH - dstOffY
                        );

                        // ジグソー輪郭の白い縁取り
                        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
                        ctx.lineWidth = 1.5;
                        ctx.stroke(jigsawPath);

                        ctx.restore();
                    } else {
                        // 通常モード：四角形のまま描画
                        ctx.drawImage(
                            this.sharedVideo,
                            c * sourcePieceW, r * sourcePieceH, sourcePieceW, sourcePieceH,
                            0, 0, this.pieceWidth, this.pieceHeight
                        );
                    }
                });
            }
            this.drawLoopId = requestAnimationFrame(draw);
        };
        this.drawLoopId = requestAnimationFrame(draw);
    }

    startTimer(duration) {
        this.stopTimer(); // 既存のタイマーを破棄
        this.startTime = Date.now();
        this.initialDuration = duration; // カウントダウン開始時の残り時間

        const timerEl = document.getElementById('game-timer');

        this.timerInterval = setInterval(() => {
            const timeDiff = Date.now() - this.startTime;
            this.currentRemainingTime = Math.max(0, this.initialDuration - timeDiff);

            const minutes = Math.floor(this.currentRemainingTime / 60000);
            const seconds = Math.floor((this.currentRemainingTime % 60000) / 1000);
            const displayMin = String(minutes).padStart(2, '0');
            const displaySec = String(seconds).padStart(2, '0');

            if (timerEl) {
                timerEl.innerText = `${displayMin}:${displaySec}`;
            }

            // 残り時間がゼロになった場合
            if (this.currentRemainingTime <= 0) {
                this.stopTimer();
                this.onTimeUp();
            }
        }, 250); // 0.25秒ごとに画面表示を更新
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    onTimeUp() {
        // 盤面を一時停止状態にする
        this.isTransitioning = true;
        
        // タイムアップモーダルを表示
        document.getElementById('timeup-modal').style.display = 'flex';
    }

    watchAd() {
        // タイムアップモーダルを隠す
        document.getElementById('timeup-modal').style.display = 'none';

        // 広告モーダルを表示
        const adModal = document.getElementById('ad-modal');
        const progressBar = document.getElementById('ad-progress-bar');
        const countdownEl = document.getElementById('ad-countdown');
        
        adModal.style.display = 'flex';
        progressBar.style.width = '0%';
        
        let timeLeft = 3;
        countdownEl.innerText = timeLeft;

        // 1秒ごとにカウントダウンするタイマー
        const adInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft >= 0) {
                countdownEl.innerText = timeLeft;
            }
        }, 1000);

        // プログレスバーのアニメーション (3秒間)
        const startTime = Date.now();
        const duration = 3000; // 3秒

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(100, (elapsed / duration) * 100);
            progressBar.style.width = `${progress}%`;

            if (elapsed < duration) {
                requestAnimationFrame(updateProgress);
            } else {
                // 広告終了処理
                clearInterval(adInterval);
                adModal.style.display = 'none';
                this.isTransitioning = false; // 操作を再開可能にする
                
                // +1分（60000ミリ秒）延長してタイマー再開
                this.currentRemainingTime = 60000;
                this.startTimer(this.currentRemainingTime);
            }
        };

        requestAnimationFrame(updateProgress);
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

    // ジグソーモードの選択状態を管理
    let isJigsawSelected = false;

    const btnShapeSquare = document.getElementById('btn-shape-square');
    const btnShapeJigsaw = document.getElementById('btn-shape-jigsaw');

    btnShapeSquare.addEventListener('click', () => {
        isJigsawSelected = false;
        btnShapeSquare.classList.add('active');
        btnShapeJigsaw.classList.remove('active');
        document.getElementById('normal-modes').style.display = 'flex';
        document.getElementById('jigsaw-modes').style.display = 'none';
    });

    btnShapeJigsaw.addEventListener('click', () => {
        isJigsawSelected = true;
        btnShapeJigsaw.classList.add('active');
        btnShapeSquare.classList.remove('active');
        document.getElementById('normal-modes').style.display = 'none';
        document.getElementById('jigsaw-modes').style.display = 'flex';
    });

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
            window.gameInstance = new KinekoGame(size, isHell, isJigsawSelected);
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

    // 鬼畜モードの難易度選択
    document.getElementById('btn-jigsaw-normal').addEventListener('click', () => startGame(16, false));
    document.getElementById('btn-jigsaw-hell').addEventListener('click', () => startGame(16, true));
});
