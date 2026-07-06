const STAGES = [
    { title: "Metoro Video", videoUrl: "IMG/1metoro.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Toudai Video", videoUrl: "IMG/2toudai.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Fuusya", videoUrl: "IMG/3fuusya.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Funsui", videoUrl: "IMG/4funsui.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Kousaten", videoUrl: "IMG/5kousaten.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Meri-", videoUrl: "IMG/6meri-.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Robotto", videoUrl: "IMG/7robtto.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Robo", videoUrl: "IMG/8robo.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Dog", videoUrl: "IMG/9dog.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Digital Battle", videoUrl: "IMG/10digital battle.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Hanabi", videoUrl: "IMG/11hanabi.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Kamo", videoUrl: "IMG/12kamo.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Kingyo", videoUrl: "IMG/13kinngyo.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Koi", videoUrl: "IMG/14koi.mp4", rows: 3, cols: 3, aspectRatio: 16/9 },
    { title: "Hiyoko", videoUrl: "IMG/15hiyoko.mp4", rows: 3, cols: 3, aspectRatio: 16/9 }
];

const I18N = {
    ja: {
        game_title: "うごくジグソー",
        btn_start: "スタート",
        btn_settings: "BGM設定・ゲーム説明",
        btn_language: "言語",
        shape_select: "ピースの形状:",
        shape_square: "通常 ⬛",
        shape_jigsaw: "ジグソー 🧩",
        btn_records: "タイムレコード 🏆",
        normal_mode: "通常モード",
        hell_mode: "ヘルモード 💀",
        easy: "イージー (3x3)",
        normal: "ノーマル (4x4)",
        hard: "ハード (5x5)",
        jigsaw_title: "鬼畜モード 👹",
        jigsaw_normal: "通常モード (16x9)",
        jigsaw_hell: "ヘルモード (16x9) 💀",
        stage_clear: "Stage Clear",
        elapsed_time: "経過時間: {val}",
        flip_h: "⇔ 左右",
        flip_v: "⇕ 上下",
        skip: "スキップ",
        reload: "リロード",
        preview: "完成図",
        back_to_title: "タイトルへ",
        timeup_text: "制限時間内にクリアできませんでした。",
        ad_extend: "広告を見て +1分延長 📺",
        retry: "再挑戦",
        ad_playing: "広告を再生中...",
        ad_countdown: "あと {val} 秒で終了します",
        settings_title: "BGM設定・ゲーム説明",
        bgm_volume: "BGM 音量",
        video_volume: "ゲーム/動画 音量",
        language_title: "LANGUAGE",
        rec_title: "タイムレコード 🏆",
        rec_square_tab: "通常 ⬛",
        rec_jigsaw_tab: "ジグソー 🧩",
        rec_square_title: "通常ピース의 記録",
        rec_jigsaw_title: "鬼畜(ジグソー)の記録",
        rec_reset: "全レコード削除",
        confirm_reset: "本当に全てのタイムレコードを消去しますか？",
        ad_remaining: "あと {val} 秒で終了します",
        stage_label: "ステージ",
        game_guide: "【遊び方】\n動画のピースをドラッグ＆ドロップして正しい位置にはめ込み、動くパズルを完成させましょう。\n\n・通常モード: 制限時間内にクリアを目指します。ヘルモードではピースが上下または左右に反転しています。\n・鬼畜モード: 144ピースの超難関ジグソーです。タイム制限はありませんが、クリアタイムが記録されます。",
        btn_guide: "ゲーム説明 📖",
        guide_title: "ゲーム説明",
        stage_bgm_label: "ステージBGM 🎵"
    },
    en: {
        game_title: "Moving Jigsaw",
        btn_start: "START",
        btn_settings: "BGM SETTINGS & GUIDE",
        btn_language: "LANGUAGE",
        shape_select: "Piece Shape:",
        shape_square: "Square ⬛",
        shape_jigsaw: "Jigsaw 🧩",
        btn_records: "Time Records 🏆",
        normal_mode: "Normal Mode",
        hell_mode: "Hell Mode 💀",
        easy: "Easy (3x3)",
        normal: "Normal (4x4)",
        hard: "Hard (5x5)",
        jigsaw_title: "Brutal Mode 👹",
        jigsaw_normal: "Normal Mode (16x9)",
        jigsaw_hell: "Hell Mode (16x9) 💀",
        stage_clear: "Stage Clear",
        elapsed_time: "Elapsed Time: {val}",
        flip_h: "⇔ Flip H",
        flip_v: "⇕ Flip V",
        skip: "Skip",
        reload: "Reload",
        preview: "Preview",
        back_to_title: "Back to Title",
        timeup_text: "Failed to clear within the time limit.",
        ad_extend: "Watch Ad for +1 Min 📺",
        retry: "Retry",
        ad_playing: "Playing Ad...",
        ad_countdown: "Finishing in {val}s",
        settings_title: "BGM SETTINGS & GUIDE",
        bgm_volume: "BGM Volume",
        video_volume: "Game/Video Volume",
        language_title: "LANGUAGE",
        rec_title: "Time Records 🏆",
        rec_square_tab: "Square ⬛",
        rec_jigsaw_tab: "Jigsaw 🧩",
        rec_square_title: "Square Piece Records",
        rec_jigsaw_title: "Brutal (Jigsaw) Records",
        rec_reset: "Reset All",
        confirm_reset: "Are you sure you want to clear all records?",
        ad_remaining: "Ends in {val} seconds",
        stage_label: "Stage",
        game_guide: "[How to Play]\nDrag and drop the animated video pieces into their correct positions to complete the moving puzzle!\n\n- Normal Mode: Clear the stage within the time limit. In Hell Mode, pieces may be flipped horizontally or vertically.\n- Brutal Mode: A challenging 144-piece jigsaw. There is no time limit, but your completion time will be recorded.",
        btn_guide: "How to Play 📖",
        guide_title: "HOW TO PLAY",
        stage_bgm_label: "Stage BGM 🎵"
    },
    zh: {
        game_title: "会动的拼图",
        btn_start: "开始",
        btn_settings: "BGM设置与游戏说明",
        btn_language: "语言",
        shape_select: "拼图形状:",
        shape_square: "普通 ⬛",
        shape_jigsaw: "拼图 🧩",
        btn_records: "时间记录 🏆",
        normal_mode: "普通模式",
        hell_mode: "地狱模式 💀",
        easy: "简单 (3x3)",
        normal: "中等 (4x4)",
        hard: "困难 (5x5)",
        jigsaw_title: "鬼畜模式 👹",
        jigsaw_normal: "普通模式 (16x9)",
        jigsaw_hell: "地狱模式 (16x9) 💀",
        stage_clear: "Stage Clear",
        elapsed_time: "已用时间: {val}",
        flip_h: "⇔ 左右翻转",
        flip_v: "⇕ 上下翻转",
        skip: "跳过",
        reload: "重置",
        preview: "完成图",
        back_to_title: "返回标题",
        timeup_text: "未能在限制时间内完成。",
        ad_extend: "观看广告延长+1分钟 📺",
        retry: "重试",
        ad_playing: "广告播放中...",
        ad_countdown: "还剩 {val} 秒结束",
        settings_title: "BGM设置与游戏说明",
        bgm_volume: "背景音乐音量",
        video_volume: "游戏/视频音量",
        language_title: "语言",
        rec_title: "时间记录 🏆",
        rec_square_tab: "普通 ⬛",
        rec_jigsaw_tab: "拼图 🧩",
        rec_square_title: "普通拼图记录",
        rec_jigsaw_title: "鬼畜(拼图)记录",
        rec_reset: "删除所有记录",
        confirm_reset: "确定要清除所有记录吗？",
        ad_remaining: "将在 {val} 秒后结束",
        stage_label: "关卡",
        game_guide: "[游戏说明]\n拖放动态视频碎片到正确的位置，完成会动的拼图！\n\n- 普通模式: 在限制时间内完成关卡。在地狱模式下，拼图碎片可能会水平或垂直翻转。\n- 鬼畜模式: 144块碎片的高难度拼图。没有时间限制，但会记录您的通关时间。",
        btn_guide: "游戏说明 📖",
        guide_title: "游戏说明",
        stage_bgm_label: "关卡BGM 🎵"
    },
    ko: {
        game_title: "움직이는 퍼즐",
        btn_start: "시작",
        btn_settings: "BGM설정·게임 설명",
        btn_language: "언어",
        shape_select: "퍼즐 모양:",
        shape_square: "일반 ⬛",
        shape_jigsaw: "직소 🧩",
        btn_records: "타임 레코드 🏆",
        normal_mode: "일반 모드",
        hell_mode: "헬 모드 💀",
        easy: "이지 (3x3)",
        normal: "노멀 (4x4)",
        hard: "하드 (5x5)",
        jigsaw_title: "鬼畜(기축) 모드 👹",
        jigsaw_normal: "일반 모드 (16x9)",
        jigsaw_hell: "헬 모드 (16x9) 💀",
        stage_clear: "Stage Clear",
        elapsed_time: "경과 시간: {val}",
        flip_h: "⇔ 좌우 반전",
        flip_v: "⇕ 상하 반전",
        skip: "스킵",
        reload: "재시도",
        preview: "완성도",
        back_to_title: "타이틀로",
        timeup_text: "제한 시간 내에 클리어하지 못했습니다.",
        ad_extend: "광고 보고 +1분 연장 📺",
        retry: "재도전",
        ad_playing: "광고 재생 중...",
        ad_countdown: "{val}초 남음",
        settings_title: "BGM설정·게임 설명",
        bgm_volume: "BGM 볼륨",
        video_volume: "게임/비디오 볼륨",
        language_title: "언어",
        rec_title: "타임 레코드 🏆",
        rec_square_tab: "일반 ⬛",
        rec_jigsaw_tab: "직소 🧩",
        rec_square_title: "일반 퍼즐 기록",
        rec_jigsaw_title: "기축(직소) 기록",
        rec_reset: "모든 기록 삭제",
        confirm_reset: "정말로 모든 기록을 삭제하시겠습니까?",
        ad_remaining: "{val}초 후에 종료됩니다",
        stage_label: "스테이지",
        game_guide: "[게임 설명]\n움직이는 비디오 조각을 드래그 앤 드롭하여 올바른 위치에 맞추고 움직이는 퍼즐을 완성하세요!\n\n- 일반 모드: 제한 시간 내에 클리어를 목표로 합니다. 헬 모드에서는 조각이 상하 또는 좌우로 반전되어 있습니다.\n- 기축 모드: 144조각의 초고난도 직소 퍼즐입니다. 시간 제한은 없으나 클리어 타임이 기록됩니다.",
        btn_guide: "게임 설명 📖",
        guide_title: "게임 설명",
        stage_bgm_label: "스테이지 BGM 🎵"
    },
    fr: {
        game_title: "Jigsaw Animé",
        btn_start: "COMMENCER",
        btn_settings: "BGM OPTIONS & GUIDE",
        btn_language: "LANGUE",
        shape_select: "Forme des pièces:",
        shape_square: "Carré ⬛",
        shape_jigsaw: "Jigsaw 🧩",
        btn_records: "Records de Temps 🏆",
        normal_mode: "Mode Normal",
        hell_mode: "Mode Enfer 💀",
        easy: "Facile (3x3)",
        normal: "Moyen (4x4)",
        hard: "Difficile (5x5)",
        jigsaw_title: "Mode Brutal 👹",
        jigsaw_normal: "Mode Normal (16x9)",
        jigsaw_hell: "Mode Enfer (16x9) 💀",
        stage_clear: "Stage Clear",
        elapsed_time: "Temps écoulé: {val}",
        flip_h: "⇔ Pivoter H",
        flip_v: "⇕ Pivoter V",
        skip: "Passer",
        reload: "Recharger",
        preview: "Aperçu",
        back_to_title: "Menu principal",
        timeup_text: "Échec du nettoyage dans le temps imparti.",
        ad_extend: "Voir la pub pour +1 Min 📺",
        retry: "Réessayer",
        ad_playing: "Lecture de la pub...",
        ad_countdown: "Finit dans {val}s",
        settings_title: "BGM OPTIONS & GUIDE",
        bgm_volume: "Volume BGM",
        video_volume: "Volume Jeu/Vidéo",
        language_title: "LANGUE",
        rec_title: "Records de Temps 🏆",
        rec_square_tab: "Carré ⬛",
        rec_jigsaw_tab: "Jigsaw 🧩",
        rec_square_title: "Records de pièces carrées",
        rec_jigsaw_title: "Records Brutal (Jigsaw)",
        rec_reset: "Réinitialiser tout",
        confirm_reset: "Êtes-vous sûr de vouloir effacer tous les records ?",
        ad_remaining: "Finit dans {val} secondes",
        stage_label: "Étape",
        game_guide: "[Guide de Jeu]\nGlissez et déposez les pièces vidéo animées aux positions correctes pour compléter le puzzle en mouvement !\n\n- Mode Normal : Terminez le niveau dans le temps imparti. En Mode Enfer, les pièces peuvent être inversées horizontalement ou verticalement.\n- Mode Brutal : Un puzzle difficile de 144 pièces. Pas de limite de temps, mais votre temps sera enregistré.",
        btn_guide: "Comment jouer 📖",
        guide_title: "GUIDE DE JEU",
        stage_bgm_label: "BGM de Niveau 🎵"
    }
};

let currentLanguage = localStorage.getItem('kineko_lang') || 'en';
window.bgmVolume = parseFloat(localStorage.getItem('kineko_bgm_vol') ?? '0.7');
window.gameVolume = parseFloat(localStorage.getItem('kineko_game_vol') ?? '1.0');
window.stageBgmTrack = localStorage.getItem('kineko_stage_bgm') || 'stageD';

function updateLanguage() {
    const langData = I18N[currentLanguage] || I18N.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        let translation = langData[key];
        if (translation) {
            const val = el.getAttribute('data-i18n-val');
            if (val) {
                translation = translation.replace('{val}', val);
            }
            if (el.tagName === 'INPUT' && el.type === 'button') {
                el.value = translation;
            } else if (el.id === 'game-guide-text') {
                el.innerHTML = translation.replace(/\n/g, '<br>');
            } else {
                el.innerText = translation;
            }
        }
    });
}

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

            // ステージBGMを一時停止し、再生中だったかを記録
            const stageBgmEl = document.getElementById('stage-bgm');
            if (stageBgmEl && !stageBgmEl.paused) {
                stageBgmEl.pause();
                this.stageBgmWasPlaying = true;
            } else {
                this.stageBgmWasPlaying = false;
            }
        });

        const closePreview = () => {
            previewModal.style.display = 'none';
            previewVideo.pause();
            previewVideo.muted = true; // 閉じたらミュートに戻す
            previewVideo.src = '';

            // プレビュー表示前にステージBGMが動いていたなら再開
            const stageBgmEl = document.getElementById('stage-bgm');
            if (stageBgmEl && this.stageBgmWasPlaying) {
                stageBgmEl.play().catch(err => console.log('Stage BGM resume failed:', err));
            }
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
            // ====== インタースティシャル広告表示後にタイトルへ遷移 ======
            showInterstitialAd(() => {
                this.stopTimer();
                if (this.drawLoopId) {
                    cancelAnimationFrame(this.drawLoopId);
                    this.drawLoopId = null;
                }
                this.sharedVideo.pause();
                this.sharedVideo.src = '';
                this.completedVideo.pause();
                this.completedVideo.muted = true;
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

                // タイトル背景動画を表示して再生
                const titleBgVideo = document.getElementById('title-bg-video');
                if (titleBgVideo) {
                    titleBgVideo.style.display = 'block';
                    titleBgVideo.play().catch(err => console.log('Title video play failed:', err));
                }

                // ステージBGMを停止
                const stageBgmBack = document.getElementById('stage-bgm');
                if (stageBgmBack && !stageBgmBack.paused) {
                    stageBgmBack.pause();
                    stageBgmBack.currentTime = 0;
                }

                // タイトルBGMを再開
                const titleBgm = document.getElementById('title-bgm');
                if (titleBgm) {
                    titleBgm.currentTime = 0;
                    titleBgm.play().catch(err => console.log('BGM play failed:', err));
                }
            }); // showInterstitialAd コールバック終了
        }); // back-to-title-btn クリックハンドラ終了



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

        // 音量設定の反映
        this.completedVideo.volume = window.gameVolume;
        this.sharedVideo.volume = window.gameVolume;

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

        // ヘルモード表記の有無と多言語対応
        const langData = I18N[currentLanguage] || I18N.en;
        const stageWord = langData.stage_label || "Stage";
        const modeLabel = this.isHellMode ? " [HELL]" : "";
        this.titleElement.innerHTML = `${stageWord} ${index + 1}${modeLabel}<br>${stage.title}`;
        this.overlay.style.display = 'none';
        this.createBoard(stage);
        
        // 経過時間変数のリセットと初期表示
        this.accumulatedElapsedTime = 0;
        this.currentTurnStartTime = null;
        const elapsedTimerEl = document.getElementById('elapsed-timer');
        if (elapsedTimerEl) elapsedTimerEl.innerText = "経過時間: 00:00";
        
        // 制限時間をデフォルト（5分）にリセットしてカウントダウン開始
        this.currentRemainingTime = this.defaultRemainingTime;
        this.startTimer(this.currentRemainingTime);

        // スキップボタン（next-btn）の有効・無効化制御
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            const isCleared = this.isStageClearedAnywhere(index);
            if (isCleared) {
                nextBtn.disabled = false;
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
                nextBtn.style.cursor = 'pointer';
            } else {
                nextBtn.disabled = true;
                nextBtn.style.opacity = '0.3';
                nextBtn.style.pointerEvents = 'none';
                nextBtn.style.cursor = 'default';
            }
        }
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
        if (this.isJigsawMode) {
            canvas.classList.add('jigsaw-piece');
        }
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
            const padding = this.isJigsawMode ? Math.min(this.pieceWidth, this.pieceHeight) * 0.28 : 0;
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
        const padding = this.isJigsawMode ? Math.min(this.pieceWidth, this.pieceHeight) * 0.28 : 0;

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

        // レコードの自動保存
        this.saveClearRecord(this.accumulatedElapsedTime);

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

    isStageClearedAnywhere(stageIndex) {
        const recordsStr = localStorage.getItem('kineko_records');
        if (!recordsStr) return false;
        try {
            const records = JSON.parse(recordsStr);
            const prefix = `stage_${stageIndex}_`;
            for (let key in records) {
                if (key.startsWith(prefix) && records[key] !== undefined) {
                    return true;
                }
            }
        } catch (e) {
            console.error("Failed to parse records", e);
        }
        return false;
    }

    saveClearRecord(elapsedTimeMs) {
        let modeKey = "";
        if (this.isJigsawMode) {
            modeKey = this.isHellMode ? "jigsaw_hell" : "jigsaw_normal";
        } else {
            const diffName = this.globalGridSize === 3 ? "easy" : this.globalGridSize === 4 ? "normal" : "hard";
            modeKey = this.isHellMode ? `square_${diffName}_hell` : `square_${diffName}`;
        }
        
        const recordsStr = localStorage.getItem('kineko_records');
        let records = {};
        if (recordsStr) {
            try {
                records = JSON.parse(recordsStr);
            } catch (e) {
                console.error("Failed to parse records", e);
            }
        }
        
        const recordKey = `stage_${this.currentStageIndex}_${modeKey}`;
        const previousRecord = records[recordKey];
        
        // 初回記録、または今回のタイムがこれまでのベストレコードより短い場合に更新
        if (previousRecord === undefined || elapsedTimeMs < previousRecord) {
            records[recordKey] = elapsedTimeMs;
            localStorage.setItem('kineko_records', JSON.stringify(records));
            console.log(`New record saved for ${recordKey}: ${elapsedTimeMs}ms`);
        }
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
        const s = Math.min(pw, ph) * 0.22; // タブの基準サイズ

        // 描画開始座標（パディングを原点として、ピース実領域の角）
        const x0 = pad, y0 = pad;
        const x1 = pad + pw, y1 = pad + ph;

        // ─── 上辺（左から右） ───
        path.moveTo(x0, y0);
        if (tabTop !== 0) {
            const mx = x0 + pw * 0.5;
            const dir = tabTop; // 1=上へ凸, -1=下へ凹
            path.lineTo(mx - s * 0.75, y0);
            path.bezierCurveTo(
                mx - s * 0.75, y0 - dir * s * 0.2,
                mx - s * 1.3,  y0 - dir * s * 0.5,
                mx - s * 0.6,  y0 - dir * s * 0.9
            );
            path.bezierCurveTo(
                mx - s * 0.1,  y0 - dir * s * 1.2,
                mx + s * 0.1,  y0 - dir * s * 1.2,
                mx + s * 0.6,  y0 - dir * s * 0.9
            );
            path.bezierCurveTo(
                mx + s * 1.3,  y0 - dir * s * 0.5,
                mx + s * 0.75, y0 - dir * s * 0.2,
                mx + s * 0.75, y0
            );
        }
        path.lineTo(x1, y0);

        // ─── 右辺（上から下） ───
        if (tabRight !== 0) {
            const my = y0 + ph * 0.5;
            const dir = tabRight; // 1=右へ凸, -1=左へ凹
            path.lineTo(x1, my - s * 0.75);
            path.bezierCurveTo(
                x1 + dir * s * 0.2, my - s * 0.75,
                x1 + dir * s * 0.5, my - s * 1.3,
                x1 + dir * s * 0.9, my - s * 0.6
            );
            path.bezierCurveTo(
                x1 + dir * s * 1.2, my - s * 0.1,
                x1 + dir * s * 1.2, my + s * 0.1,
                x1 + dir * s * 0.9, my + s * 0.6
            );
            path.bezierCurveTo(
                x1 + dir * s * 0.5, my + s * 1.3,
                x1 + dir * s * 0.2, my + s * 0.75,
                x1,                 my + s * 0.75
            );
        }
        path.lineTo(x1, y1);

        // ─── 下辺（右から左） ───
        if (tabBottom !== 0) {
            const mx = x0 + pw * 0.5;
            const dir = -tabBottom; // 下辺は進行方向が逆のため符号反転
            path.lineTo(mx + s * 0.75, y1);
            path.bezierCurveTo(
                mx + s * 0.75, y1 + dir * s * 0.2,
                mx + s * 1.3,  y1 + dir * s * 0.5,
                mx + s * 0.6,  y1 + dir * s * 0.9
            );
            path.bezierCurveTo(
                mx + s * 0.1,  y1 + dir * s * 1.2,
                mx - s * 0.1,  y1 + dir * s * 1.2,
                mx - s * 0.6,  y1 + dir * s * 0.9
            );
            path.bezierCurveTo(
                mx - s * 1.3,  y1 + dir * s * 0.5,
                mx - s * 0.75, y1 + dir * s * 0.2,
                mx - s * 0.75, y1
            );
        }
        path.lineTo(x0, y1);

        // ─── 左辺（下から上） ───
        if (tabLeft !== 0) {
            const my = y0 + ph * 0.5;
            const dir = -tabLeft; // 左辺は進行方向が逆のため符号反転
            path.lineTo(x0, my + s * 0.75);
            path.bezierCurveTo(
                x0 - dir * s * 0.2, my + s * 0.75,
                x0 - dir * s * 0.5, my + s * 1.3,
                x0 - dir * s * 0.9, my + s * 0.6
            );
            path.bezierCurveTo(
                x0 - dir * s * 1.2, my + s * 0.1,
                x0 - dir * s * 1.2, my - s * 0.1,
                x0 - dir * s * 0.9, my - s * 0.6
            );
            path.bezierCurveTo(
                x0 - dir * s * 0.5, my - s * 1.3,
                x0 - dir * s * 0.2, my - s * 0.75,
                x0,                 my - s * 0.75
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
                        ? Math.min(this.pieceWidth, this.pieceHeight) * 0.28
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
        this.currentTurnStartTime = Date.now();
        this.initialDuration = duration; // カウントダウン開始時の残り時間

        const timerEl = document.getElementById('game-timer');
        const elapsedTimerEl = document.getElementById('elapsed-timer');

        // ジグソーモードの場合は制限時間タイマーを非表示にする
        if (this.isJigsawMode) {
            if (timerEl) timerEl.style.display = 'none';
        } else {
            if (timerEl) timerEl.style.display = 'block';
        }

        this.timerInterval = setInterval(() => {
            if (!this.currentTurnStartTime) return;
            const timeDiff = Date.now() - this.currentTurnStartTime;
            
            if (!this.isJigsawMode) {
                // 制限時間（カウントダウン）: 通常ピースモードのみ実行
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
            }

            // 経過時間（トータルプレイ時間）
            const totalElapsed = this.accumulatedElapsedTime + timeDiff;
            const elapsedMin = String(Math.floor(totalElapsed / 60000)).padStart(2, '0');
            const elapsedSec = String(Math.floor((totalElapsed % 60000) / 1000)).padStart(2, '0');
            if (elapsedTimerEl) {
                elapsedTimerEl.setAttribute('data-i18n-val', `${elapsedMin}:${elapsedSec}`);
                updateLanguage();
            }
        }, 250); // 0.25秒ごとに画面表示を更新
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        if (this.currentTurnStartTime) {
            this.accumulatedElapsedTime += Date.now() - this.currentTurnStartTime;
            this.currentTurnStartTime = null;
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

        // スマホ（モバイル端末）判定
        const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
        if (!isMobile) {
            // ウェブ版は広告を表示せず即座に1分延長して再開
            this.isTransitioning = false;
            this.currentRemainingTime = 60000;
            this.startTimer(this.currentRemainingTime);
            return;
        }

        // ====== リワード広告（ca-app-pub-3940256099942544/5224354917）======
        const adModal = document.getElementById('ad-modal');
        const progressBar = document.getElementById('ad-progress-bar');
        const countdownEl = document.getElementById('ad-countdown');

        adModal.style.display = 'flex';
        progressBar.style.width = '0%';

        const AD_DURATION = 30; // リワード広告は30秒
        let timeLeft = AD_DURATION;
        countdownEl.innerText = timeLeft;

        // AdMob リワード広告ロード試行（WebView環境・将来のネイティブ対応用）
        if (window.admob && window.admob.rewardVideo) {
            window.admob.rewardVideo.load({ id: 'ca-app-pub-3940256099942544/5224354917' });
            window.admob.rewardVideo.show().catch(() => {});
        }

        const adInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft >= 0) countdownEl.innerText = timeLeft;
        }, 1000);

        const startTime = Date.now();
        const duration = AD_DURATION * 1000;

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(100, (elapsed / duration) * 100);
            progressBar.style.width = `${progress}%`;

            if (elapsed < duration) {
                requestAnimationFrame(updateProgress);
            } else {
                clearInterval(adInterval);
                adModal.style.display = 'none';
                this.isTransitioning = false;
                // +1分（60000ミリ秒）延長してタイマー再開
                this.currentRemainingTime = 60000;
                this.startTimer(this.currentRemainingTime);
            }
        };

        requestAnimationFrame(updateProgress);
    }
}

// ====== インタースティシャル広告表示関数（ca-app-pub-3940256099942544/1033173712）======
function showInterstitialAd(callback) {
    // スマホ（モバイル端末）判定
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (!isMobile) {
        // ウェブ版は広告を表示せず即座にタイトルへ戻る
        callback();
        return;
    }

    const modal = document.getElementById('interstitial-modal');
    const countdownEl = document.getElementById('interstitial-countdown');
    const skipBtn = document.getElementById('interstitial-skip-btn');
    const statusEl = document.getElementById('interstitial-status');

    if (!modal) { callback(); return; }

    // AdMob インタースティシャルロード試行（WebView環境・将来のネイティブ対応用）
    if (window.admob && window.admob.interstitial) {
        window.admob.interstitial.load({ id: 'ca-app-pub-3940256099942544/1033173712' });
        window.admob.interstitial.show()
            .then(() => callback())
            .catch(() => runFallback());
        return;
    }

    // フォールバック：カウントダウン付き広告オーバーレイ表示
    runFallback();

    function runFallback() {
        window._interstitialCallback = callback;
        modal.style.display = 'flex';
        skipBtn.style.display = 'none';
        statusEl.textContent = '広告をご覧ください...';

        let sec = 5;
        countdownEl.textContent = sec;

        const timer = setInterval(() => {
            sec--;
            countdownEl.textContent = sec;
            if (sec <= 0) {
                clearInterval(timer);
                skipBtn.style.display = 'inline-block';
                countdownEl.textContent = '';
                statusEl.textContent = 'スキップできます';
            }
        }, 1000);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // タイトルBGMの参照
    const titleBgm = document.getElementById('title-bgm');
    if (titleBgm) {
        titleBgm.volume = 0.7;
    }

    // 起動時に可能な場合は自動で横画面ロックを試みる
    if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
        window.screen.orientation.lock('landscape').catch(() => {});
    }

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
                    // iOS Safari 向け（効かない場合もあるが試みる）
                    docEl.webkitRequestFullscreen();
                    setTimeout(lockLandscape, 200);
                } else if (docEl.mozRequestFullScreen) {
                    docEl.mozRequestFullScreen();
                    setTimeout(lockLandscape, 200);
                } else if (docEl.msRequestFullscreen) {
                    docEl.msRequestFullscreen();
                    setTimeout(lockLandscape, 200);
                }
            } else {
                lockLandscape(); // すでにフルスクリーンの場合は横画面ロックのみ実行
            }
        } catch (e) {
            console.log("Auto fullscreen request failed:", e);
        }

        // 初回タップ時にBGMを再生（ブラウザの自動再生制限対策）
        if (titleBgm && titleBgm.paused) {
            titleBgm.play().catch(err => console.log('BGM autoplay blocked:', err));
        }
    };

    // あらゆるユーザーインタラクションでフルスクリーンを発動（確実に動作させるため複数登録）
    ['click', 'touchstart', 'touchend', 'pointerdown'].forEach(evtType => {
        document.addEventListener(evtType, triggerFullscreen, { once: true, passive: true });
    });

    // フルスクリーンが外れた場合（ESCキー等）に自動で再フルスクリーンへ誘導
    const onFullscreenChange = () => {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            // フルスクリーン復帰ボタンを追加（次の操作時に再フルスクリーン化）
            ['click', 'touchstart'].forEach(evtType => {
                document.addEventListener(evtType, triggerFullscreen, { once: true, passive: true });
            });
        }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);

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

    // 初期言語の適用
    updateLanguage();

    // 音量スライダーの初期値設定
    const bgmSlider = document.getElementById('bgm-volume-slider');
    const videoSlider = document.getElementById('video-volume-slider');
    if (bgmSlider) bgmSlider.value = window.bgmVolume;
    if (videoSlider) videoSlider.value = window.gameVolume;

    if (titleBgm) {
        titleBgm.volume = window.bgmVolume;
    }

    // 音量調整イベント
    if (bgmSlider) {
        bgmSlider.addEventListener('input', (e) => {
            window.bgmVolume = parseFloat(e.target.value);
            localStorage.setItem('kineko_bgm_vol', window.bgmVolume);
            if (titleBgm) {
                titleBgm.volume = window.bgmVolume;
            }
            // ステージBGMの音量も同期
            const stageBgmSync = document.getElementById('stage-bgm');
            if (stageBgmSync) {
                stageBgmSync.volume = window.bgmVolume;
            }
        });
    }
    if (videoSlider) {
        videoSlider.addEventListener('input', (e) => {
            window.gameVolume = parseFloat(e.target.value);
            localStorage.setItem('kineko_game_vol', window.gameVolume);
        });
    }

    // ステージBGMセレクトボックスの初期化
    const stageBgmEl = document.getElementById('stage-bgm');
    const stageBgmSelect = document.getElementById('stage-bgm-select');
    if (stageBgmSelect) {
        // 保存されているトラックを復元して選択肢に反映
        stageBgmSelect.value = window.stageBgmTrack;
        if (stageBgmEl) {
            stageBgmEl.src = 'BGM/' + window.stageBgmTrack + '.mp3';
            stageBgmEl.volume = window.bgmVolume;
        }
        stageBgmSelect.addEventListener('change', (e) => {
            window.stageBgmTrack = e.target.value;
            localStorage.setItem('kineko_stage_bgm', window.stageBgmTrack);
            if (stageBgmEl) {
                const isGameActive = document.getElementById('app').style.display === 'flex';
                stageBgmEl.src = 'BGM/' + window.stageBgmTrack + '.mp3';
                stageBgmEl.volume = window.bgmVolume;

                if (isGameActive) {
                    // ゲーム中なら、直前に再生されていた場合のみ再始動
                    const wasPlaying = !stageBgmEl.paused;
                    if (wasPlaying) {
                        stageBgmEl.play().catch(err => console.log('Stage BGM play failed:', err));
                    }
                } else {
                    // タイトルの設定モーダルでの変更時は試聴を流す
                    // タイトルBGMを一時停止
                    if (titleBgm && !titleBgm.paused) {
                        titleBgm.pause();
                    }
                    // 選択したステージBGMを試聴再生
                    stageBgmEl.currentTime = 0;
                    stageBgmEl.play().catch(err => console.log('Preview Stage BGM play failed:', err));
                }
            }
        });
    }

    // メインメニューの遷移制御
    const mainMenuScreen = document.getElementById('main-menu-screen');
    const modeSelectScreen = document.getElementById('title-screen');
    const btnStart = document.getElementById('btn-start');
    const btnSettings = document.getElementById('btn-settings');
    const btnLang = document.getElementById('btn-lang');

    const settingsModal = document.getElementById('settings-modal');
    const settingsClose = document.getElementById('settings-close');
    const languageModal = document.getElementById('language-modal');
    const languageClose = document.getElementById('language-close');

    if (btnStart) {
        btnStart.addEventListener('click', () => {
            triggerFullscreen();
            if (mainMenuScreen) mainMenuScreen.style.display = 'none';
            if (modeSelectScreen) modeSelectScreen.style.display = 'flex';
        });
    }

    const btnBackToMain = document.getElementById('btn-back-to-main');
    if (btnBackToMain) {
        btnBackToMain.addEventListener('click', () => {
            if (modeSelectScreen) modeSelectScreen.style.display = 'none';
            if (mainMenuScreen) mainMenuScreen.style.display = 'flex';
        });
    }

    // 設定（BGM設定・ゲーム説明）画面を閉じる時の共通処理
    const closeSettings = () => {
        if (settingsModal) settingsModal.style.display = 'none';

        // 試聴中のステージBGMを停止
        if (stageBgmEl && !stageBgmEl.paused) {
            stageBgmEl.pause();
            stageBgmEl.currentTime = 0;
        }
        // タイトルBGM（OP）を再開
        if (titleBgm && titleBgm.paused) {
            titleBgm.play().catch(err => console.log('Title BGM play failed:', err));
        }
    };

    if (btnSettings) {
        btnSettings.addEventListener('click', () => {
            triggerFullscreen();
            if (settingsModal) settingsModal.style.display = 'flex';
        });
    }
    if (settingsClose) {
        settingsClose.addEventListener('click', closeSettings);
    }
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                closeSettings();
            }
        });
    }

    // ゲーム説明モーダルの表示制御
    const btnShowGuide = document.getElementById('btn-show-guide');
    const guideModal = document.getElementById('guide-modal');
    const guideClose = document.getElementById('guide-close');

    if (btnShowGuide) {
        btnShowGuide.addEventListener('click', () => {
            if (guideModal) guideModal.style.display = 'flex';
        });
    }
    if (guideClose) {
        guideClose.addEventListener('click', () => {
            if (guideModal) guideModal.style.display = 'none';
        });
    }
    if (guideModal) {
        guideModal.addEventListener('click', (e) => {
            if (e.target === guideModal) {
                guideModal.style.display = 'none';
            }
        });
    }

    if (btnLang) {
        btnLang.addEventListener('click', () => {
            triggerFullscreen();
            if (languageModal) languageModal.style.display = 'flex';
        });
    }
    if (languageClose) {
        languageClose.addEventListener('click', () => {
            if (languageModal) languageModal.style.display = 'none';
        });
    }
    if (languageModal) {
        languageModal.addEventListener('click', (e) => {
            if (e.target === languageModal) {
                languageModal.style.display = 'none';
            }
        });
    }

    // 言語切り替えボタン
    document.querySelectorAll('.lang-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLanguage = btn.getAttribute('data-lang');
            localStorage.setItem('kineko_lang', currentLanguage);
            updateLanguage();
            if (languageModal) languageModal.style.display = 'none';
        });
    });

    const startGame = (size, isHell = false) => {
        // ボタンクリック時にも念のためフルスクリーン化を実行（タップされなかった場合の保険）
        triggerFullscreen();

        // タイトルBGMを停止
        if (titleBgm && !titleBgm.paused) {
            titleBgm.pause();
            titleBgm.currentTime = 0;
        }

        // タイトル背景動画を一時停止して非表示
        const titleBgVideo = document.getElementById('title-bg-video');
        if (titleBgVideo) {
            titleBgVideo.pause();
            titleBgVideo.style.display = 'none';
        }

        // ステージBGMを再生
        const stageBgmEl = document.getElementById('stage-bgm');
        if (stageBgmEl) {
            stageBgmEl.src = 'BGM/' + (window.stageBgmTrack || 'stageD') + '.mp3';
            stageBgmEl.volume = window.bgmVolume;
            stageBgmEl.currentTime = 0;
            stageBgmEl.play().catch(err => console.log('Stage BGM play failed:', err));
        }

        if (modeSelectScreen) modeSelectScreen.style.display = 'none';
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

    // タイムレコードモーダル開閉イベント
    const recordsBtn = document.getElementById('btn-records');
    const recordsModal = document.getElementById('records-modal');
    const recordsClose = document.getElementById('records-close');

    const showRecordsModal = () => {
        const content = document.getElementById('records-content');
        if (!content) return;

        const langData = I18N[currentLanguage] || I18N.en;
        const recordsStr = localStorage.getItem('kineko_records');
        let records = {};
        if (recordsStr) {
            try {
                records = JSON.parse(recordsStr);
            } catch (e) {}
        }

        const formatTime = (ms) => {
            if (ms === undefined || ms === null) return "--:--";
            const minutes = Math.floor(ms / 60000);
            const seconds = Math.floor((ms % 60000) / 1000);
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };

        let html = `
            <div class="records-tabs" style="display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 1px solid #ffd700; padding-bottom: 10px;">
                <button id="tab-rec-square" class="btn" style="flex: 1; border-radius: 6px; background: rgba(255, 215, 0, 0.2); font-size: 0.9rem; padding: 8px;">${langData.rec_square_tab}</button>
                <button id="tab-rec-jigsaw" class="btn" style="flex: 1; border-radius: 6px; background: transparent; font-size: 0.9rem; padding: 8px;">${langData.rec_jigsaw_tab}</button>
            </div>
            
            <div id="rec-square-section">
                <h3 style="color: #ffd700; margin-bottom: 15px; text-align: center; font-size: 1.1rem;">${langData.rec_square_title}</h3>
                <div style="overflow-x: auto;">
                    <table style="width:100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
                        <thead>
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                                <th style="padding: 8px 4px;">${langData.stage_label}</th>
                                <th style="padding: 8px 4px; color: #aaffaa;">3x3</th>
                                <th style="padding: 8px 4px; color: #ffffaa;">4x4</th>
                                <th style="padding: 8px 4px; color: #ffaaaa;">5x5</th>
                                <th style="padding: 8px 4px; color: #ff7777;">3x3H</th>
                                <th style="padding: 8px 4px; color: #ff5555;">4x4H</th>
                                <th style="padding: 8px 4px; color: #ff3333;">5x5H</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        STAGES.forEach((stage, idx) => {
            const t3 = records[`stage_${idx}_square_easy`];
            const t4 = records[`stage_${idx}_square_normal`];
            const t5 = records[`stage_${idx}_square_hard`];
            const t3h = records[`stage_${idx}_square_easy_hell`];
            const t4h = records[`stage_${idx}_square_normal_hell`];
            const t5h = records[`stage_${idx}_square_hard_hell`];

            html += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 4px; font-weight: bold;">St.${idx+1}</td>
                    <td style="padding: 8px 4px;">${formatTime(t3)}</td>
                    <td style="padding: 8px 4px;">${formatTime(t4)}</td>
                    <td style="padding: 8px 4px;">${formatTime(t5)}</td>
                    <td style="padding: 8px 4px;">${formatTime(t3h)}</td>
                    <td style="padding: 8px 4px;">${formatTime(t4h)}</td>
                    <td style="padding: 8px 4px;">${formatTime(t5h)}</td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="rec-jigsaw-section" style="display: none;">
                <h3 style="color: #ff3b30; margin-bottom: 15px; text-align: center; font-size: 1.1rem;">${langData.rec_jigsaw_title}</h3>
                <div style="overflow-x: auto;">
                    <table style="width:100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">
                        <thead>
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                                <th style="padding: 10px 6px;">${langData.stage_label}</th>
                                <th style="padding: 10px 6px; color: #ff8888;">${langData.jigsaw_normal}</th>
                                <th style="padding: 10px 6px; color: #ff3333;">${langData.jigsaw_hell}</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        STAGES.forEach((stage, idx) => {
            const tj = records[`stage_${idx}_jigsaw_normal`];
            const tjh = records[`stage_${idx}_jigsaw_hell`];

            html += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 10px 6px; font-weight: bold;">St.${idx+1}</td>
                    <td style="padding: 10px 6px;">${formatTime(tj)}</td>
                    <td style="padding: 10px 6px;">${formatTime(tjh)}</td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
                <button id="records-reset" class="btn" style="padding: 6px 15px; font-size: 0.8rem; background: rgba(255,0,0,0.15); border-color: rgba(255,0,0,0.4); color: #ff8888;">${langData.rec_reset}</button>
            </div>
        `;

        content.innerHTML = html;

        // タブ切り替え処理
        const tabSquare = document.getElementById('tab-rec-square');
        const tabJigsaw = document.getElementById('tab-rec-jigsaw');
        const secSquare = document.getElementById('rec-square-section');
        const secJigsaw = document.getElementById('rec-jigsaw-section');

        tabSquare.addEventListener('click', () => {
            secSquare.style.display = 'block';
            secJigsaw.style.display = 'none';
            tabSquare.style.background = 'rgba(255, 215, 0, 0.2)';
            tabJigsaw.style.background = 'transparent';
        });

        tabJigsaw.addEventListener('click', () => {
            secSquare.style.display = 'none';
            secJigsaw.style.display = 'block';
            tabJigsaw.style.background = 'rgba(255, 215, 0, 0.2)';
            tabSquare.style.background = 'transparent';
        });

        // レコード削除処理
        document.getElementById('records-reset').addEventListener('click', () => {
            if (confirm(langData.confirm_reset)) {
                localStorage.removeItem('kineko_records');
                showRecordsModal();
            }
        });

        recordsModal.style.display = 'flex';
    };

    if (recordsBtn && recordsModal && recordsClose) {
        recordsBtn.addEventListener('click', () => {
            try {
                showRecordsModal();
            } catch (err) {
                alert("レコードの表示中にエラーが発生しました: " + err.message);
                console.error(err);
            }
        });

        const closeRecords = () => {
            recordsModal.style.display = 'none';
        };

        recordsClose.addEventListener('click', closeRecords);
        recordsModal.addEventListener('click', (e) => {
            if (e.target === recordsModal) {
                closeRecords();
            }
        });
    } else {
        console.error("レコードモーダル表示に必要なHTML要素が見つかりません。");
    }

    // バックグラウンド・フォアグラウンド切り替え時の音声一時停止・再開制御
    let wasTitleBgmPlayingBeforeHidden = false;
    let wasStageBgmPlayingBeforeHidden = false;
    const stageBgmElement = document.getElementById('stage-bgm');

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // バックグラウンドに移行した時
            // 1. タイトルBGM
            if (titleBgm && !titleBgm.paused) {
                titleBgm.pause();
                wasTitleBgmPlayingBeforeHidden = true;
            } else {
                wasTitleBgmPlayingBeforeHidden = false;
            }

            // 2. ステージBGM
            if (stageBgmElement && !stageBgmElement.paused) {
                stageBgmElement.pause();
                wasStageBgmPlayingBeforeHidden = true;
            } else {
                wasStageBgmPlayingBeforeHidden = false;
            }

            // 3. タイトル背景動画
            const titleBgVideo = document.getElementById('title-bg-video');
            if (titleBgVideo && !titleBgVideo.paused) {
                titleBgVideo.pause();
            }

            // 4. 完成図プレビュー動画
            const previewVideo = document.getElementById('preview-video');
            if (previewVideo && !previewVideo.paused) {
                previewVideo.pause();
            }
        } else {
            // フォアグラウンドに戻ってきた時
            // 1. タイトルBGMの復元
            if (wasTitleBgmPlayingBeforeHidden && titleBgm) {
                titleBgm.play().catch(err => console.log('Title BGM resume failed:', err));
            }

            // 2. ステージBGMの復元
            if (wasStageBgmPlayingBeforeHidden && stageBgmElement) {
                stageBgmElement.play().catch(err => console.log('Stage BGM resume failed:', err));
            }

            // 3. タイトル背景動画の復元（タイトル画面が表示されている時のみ）
            const isGameActive = document.getElementById('app').style.display === 'flex';
            const titleBgVideo = document.getElementById('title-bg-video');
            if (titleBgVideo && !isGameActive) {
                titleBgVideo.play().catch(err => console.log('Title video resume failed:', err));
            }
        }
    });
});

