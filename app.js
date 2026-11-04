// app.js - LOGIC VẬN HÀNH GAME SHOW ĐẠI CHIẾN VẬN MỆNH HN12A10 (FANTASY RPG EDITION)

// ================= HỆ THỐNG HIỆU ỨNG THẦN THOẠI (CANVAS FX & SHAKE) =================
const FX = {
  ambientCanvas: null,
  ambientCtx: null,
  particles: [],
  confettiCanvas: null,
  confettiCtx: null,
  confettiPieces: [],
  confettiAnimId: null,

  initAmbient() {
    this.ambientCanvas = document.getElementById('ambient-magic-canvas');
    if (!this.ambientCanvas) return;
    this.ambientCtx = this.ambientCanvas.getContext('2d');

    const resize = () => {
      this.ambientCanvas.width = window.innerWidth;
      this.ambientCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Khởi tạo ~48 đom đóm rừng rậm ma thuật (Enchanted Forest Fireflies)
    this.particles = [];
    const colors = ['#76ff03', '#00e676', '#ffd700', '#00e5ff', '#e040fb', '#fff59d'];
    for (let i = 0; i < 48; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.5 - 0.15,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: Math.random() * 0.03 + 0.01,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.012,
        pulseDir: 1
      });
    }

    const loop = () => {
      if (!this.ambientCtx) return;
      this.ambientCtx.clearRect(0, 0, this.ambientCanvas.width, this.ambientCanvas.height);
      for (const p of this.particles) {
        p.angle += p.angleSpeed;
        p.x += p.vx + Math.sin(p.angle) * 0.45;
        p.y += p.vy;
        p.alpha += p.pulseSpeed * p.pulseDir;
        if (p.alpha >= 0.85) { p.alpha = 0.85; p.pulseDir = -1; }
        else if (p.alpha <= 0.15) { p.alpha = 0.15; p.pulseDir = 1; }

        if (p.y < -15) { p.y = this.ambientCanvas.height + 15; p.x = Math.random() * this.ambientCanvas.width; }
        if (p.x < -15) p.x = this.ambientCanvas.width + 15;
        else if (p.x > this.ambientCanvas.width + 15) p.x = -15;

        this.ambientCtx.save();
        this.ambientCtx.globalAlpha = p.alpha;
        this.ambientCtx.fillStyle = p.color;
        this.ambientCtx.shadowBlur = 12;
        this.ambientCtx.shadowColor = p.color;
        this.ambientCtx.beginPath();
        this.ambientCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ambientCtx.fill();
        this.ambientCtx.restore();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  },

  screenShake(duration = 450) {
    document.body.classList.remove('shake-impact');
    void document.body.offsetWidth; // Force reflow
    document.body.classList.add('shake-impact');
    setTimeout(() => {
      document.body.classList.remove('shake-impact');
    }, duration);
  },

  confetti(count = 95) {
    this.confettiCanvas = document.getElementById('confetti-canvas');
    if (!this.confettiCanvas) return;
    this.confettiCtx = this.confettiCanvas.getContext('2d');
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;

    const colors = ['#f5b505', '#ffd700', '#ff4757', '#2ed573', '#1e90ff', '#e056fd', '#ffffff'];
    for (let i = 0; i < count; i++) {
      this.confettiPieces.push({
        x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 260,
        y: window.innerHeight * 0.35 + (Math.random() - 0.5) * 120,
        w: Math.random() * 12 + 6,
        h: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 18,
        vy: -Math.random() * 15 - 5,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.36,
        drag: 0.985,
        alpha: 1,
        decay: Math.random() * 0.008 + 0.006
      });
    }

    if (!this.confettiAnimId) {
      this._confettiLoop();
    }
  },

  confettiMega() {
    this.confetti(160);
    setTimeout(() => this.confetti(120), 380);
    setTimeout(() => this.confetti(100), 750);
  },

  _confettiLoop() {
    if (!this.confettiCtx) return;
    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    for (let i = this.confettiPieces.length - 1; i >= 0; i--) {
      const p = this.confettiPieces[i];
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > this.confettiCanvas.height + 20) {
        this.confettiPieces.splice(i, 1);
        continue;
      }

      this.confettiCtx.save();
      this.confettiCtx.translate(p.x, p.y);
      this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
      this.confettiCtx.globalAlpha = p.alpha;
      this.confettiCtx.fillStyle = p.color;
      this.confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      this.confettiCtx.restore();
    }

    if (this.confettiPieces.length > 0) {
      this.confettiAnimId = requestAnimationFrame(() => this._confettiLoop());
    } else {
      this.confettiAnimId = null;
    }
  }
};

const Game = {
  currentScreen: 1,
  data: null,
  teams: [],
  
  // Timer State
  timerInterval: null,
  timerSeconds: 0,
  timerIsRunning: false,
  isMinuteFormat: false,

  // Vòng 1 State
  currentMatch: '1vs2', // '1vs2' hoặc '3vs4'
  r1QuestionIndex: 0,
  r1CurrentTeamA: null,
  r1CurrentTeamB: null,
  r1ActiveHeroA: null,
  r1ActiveHeroB: null,
  winnerMatchA: null, // Tổ thắng nhánh 1
  winnerMatchB: null, // Tổ thắng nhánh 2
  targetPunishTeam: null, // Đội đang bị trừng phạt

  // Vòng 2 State
  r2QuestionIndex: 0,
  r2ScoreA: 0,
  r2ScoreB: 0,
  r2TeamA: null,
  r2TeamB: null,
  r2ActiveHeroA: null,
  r2ActiveHeroB: null,
  championTeam: null, // Tổ vô địch toàn năng

  // Vòng Anh Hùng State
  r3QuestionIndex: 0,
  heroRoster: [], // [{ name, score, teamId }]
  currentSpeakerHero: null,
  grandChampionHero: null,

  // Modal Picker State
  pickerCurrentSide: 'A',
  pickerCurrentRound: 1,

  // Video Clips System (Intro, Pre-Boss, Win Ending, Lose Ending)
  videoUrls: {
    INTRO: null,
    PRE_BOSS: null,
    WIN: null,
    LOSE: null
  },

  // Faction Metadata (Game Icons thay cho Emoji)
  factionMeta: {
    1: { theme: 'theme-fire', crest: 'assets/icons/crest-dragon.svg', crestClass: 'crest-fire', element: 'Rồng Lửa', title: 'Vương Quốc Rồng Lửa' },
    2: { theme: 'theme-ice', crest: 'assets/icons/crest-ice.svg', crestClass: 'crest-ice', element: 'Băng Phong', title: 'Vương Quốc Băng Phong' },
    3: { theme: 'theme-thunder', crest: 'assets/icons/crest-thunder.svg', crestClass: 'crest-thunder', element: 'Lôi Thần', title: 'Vương Quốc Lôi Thần' },
    4: { theme: 'theme-earth', crest: 'assets/icons/crest-nature.svg', crestClass: 'crest-nature', element: 'Đất Mẹ', title: 'Vương Quốc Đất Mẹ' }
  },

  // Khởi tạo
  init() {
    this.loadData();
    this.renderKingdomsSetup();
    this.renderKingdomsSidebar();
    this.bindKeyboardShortcuts();
    this.initScale();
    FX.initAmbient();

    // Hiệu ứng âm thanh click RPG tự động cho mọi nút
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('button, .btn-ctrl, .nav-btn, .big-action-btn, .step-item');
      if (btn) {
        Sound.playRpgClick();
      }
    });
  },

  // ================= BỘ ĐIỀU KHIỂN THU PHÓNG GIAO DIỆN CHUYÊN NGHIỆP (UI SCALE ENGINE) =================
  uiScaleMode: 'auto',
  uiScaleFactor: 1.0,

  initScale() {
    const saved = localStorage.getItem('HN12A10_UI_SCALE') || 'auto';
    this.setScale(saved, false);

    window.addEventListener('resize', () => {
      if (this.uiScaleMode === 'auto') {
        this.applyAutoFit();
      }
    });

    // Bắt phím tắt thu phóng: Ctrl + (phóng to), Ctrl - (thu nhỏ), Ctrl 0 (reset Auto)
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.ctrlKey && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        this.changeScale(0.05);
      } else if (e.ctrlKey && (e.key === '-' || e.key === '_')) {
        e.preventDefault();
        this.changeScale(-0.05);
      } else if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        this.resetScale();
      }
    });
  },

  setScale(val, save = true) {
    this.uiScaleMode = val;
    if (save) localStorage.setItem('HN12A10_UI_SCALE', val);

    if (val === 'auto') {
      this.applyAutoFit();
    } else {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        this.applyScaleFactor(num);
      }
    }
    this.updateScaleUI();
  },

  changeScale(delta) {
    let current = this.uiScaleFactor;
    let next = Math.round((current + delta) * 20) / 20; // bước nhảy 0.05
    next = Math.min(1.3, Math.max(0.65, next));
    this.setScale(next.toString());
  },

  resetScale() {
    this.setScale('auto');
  },

  applyAutoFit() {
    const topNav = document.querySelector('.top-nav');
    const navHeight = topNav ? topNav.offsetHeight : 44;
    const availH = window.innerHeight - navHeight - 16;
    const availW = window.innerWidth - 24;

    // Reset zoom tạm thời về 1.0 để đo scrollHeight thật của active screen
    const container = document.querySelector('.app-container');
    if (container) container.style.zoom = 1.0;

    const activeScreen = document.querySelector('.screen.active');
    const screenH = activeScreen ? activeScreen.offsetHeight : 540;
    const screenW = activeScreen ? activeScreen.offsetWidth : 1560;

    let factor = 1.0;
    if (screenH > availH || screenW > availW) {
      const scaleH = availH / Math.max(screenH, 480);
      const scaleW = availW / Math.max(screenW, 1100);
      factor = Math.min(scaleH, scaleW);
    } else {
      const scaleH = availH / Math.max(screenH, 480);
      factor = Math.min(1.12, Math.max(1.0, scaleH * 0.95));
    }

    factor = Math.min(1.25, Math.max(0.72, factor));
    factor = Math.round(factor * 100) / 100;

    this.applyScaleFactor(factor);
    this.updateScaleUI('Auto (' + Math.round(factor * 100) + '%)');
  },

  applyScaleFactor(factor) {
    this.uiScaleFactor = factor;
    const container = document.querySelector('.app-container');
    if (container) {
      container.style.zoom = factor;
    }
    document.documentElement.style.setProperty('--ui-scale', factor);
  },

  updateScaleUI(customLabel) {
    const badge = document.getElementById('ui-scale-badge');
    const select = document.getElementById('scale-preset-select');
    const label = customLabel || (this.uiScaleMode === 'auto' ? 'Auto' : Math.round(this.uiScaleFactor * 100) + '%');
    if (badge) badge.textContent = label;
    if (select) {
      if (this.uiScaleMode === 'auto') {
        select.value = 'auto';
      } else {
        const strVal = (Math.round(this.uiScaleFactor * 20) / 20).toFixed(2);
        select.value = strVal;
        if (!select.value) {
          select.value = '1.00';
        }
      }
    }
  },

  // Tải dữ liệu từ LocalStorage hoặc file questions.js
  loadData() {
    const saved = localStorage.getItem('HN12A10_QUIZ_DATA');
    if (saved) {
      try {
        this.data = JSON.parse(saved);
      } catch (e) {
        this.data = JSON.parse(JSON.stringify(DEFAULT_GAME_DATA));
      }
    } else {
      this.data = JSON.parse(JSON.stringify(DEFAULT_GAME_DATA));
    }

    const canonicalNames = [
      "Tổ 1 - Vương Quốc Rồng Lửa",
      "Tổ 2 - Vương Quốc Băng Phong",
      "Tổ 3 - Vương Quốc Lôi Thần",
      "Tổ 4 - Vương Quốc Đất Mẹ"
    ];

    this.teams = this.data.teams.map((t, idx) => ({
      id: t.id,
      name: canonicalNames[idx] || t.name,
      members: [...t.members],
      king: t.king || null,
      score: t.score || 0,
      isEliminated: t.isEliminated || false,
      heroesUsed: t.heroesUsed || [],
      casualties: t.casualties || [],
      pillars: t.pillars || {
        territory: true,
        wealth: true,
        food: true,
        health: true,
        weapon: true
      }
    }));
  },

  saveData() {
    localStorage.setItem('HN12A10_QUIZ_DATA', JSON.stringify(this.data));
  },

  // Chuyển đổi màn hình
  switchScreen(screenIndex) {
    this.currentScreen = screenIndex;
    this.pauseTimer();

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen-${screenIndex}`);
    if (target) target.classList.add('active');

    // Cập nhật thanh stepper
    document.querySelectorAll('.step-item').forEach((step, idx) => {
      step.classList.toggle('active', idx === screenIndex);
    });

    // Auto setup khi vào màn hình cụ thể
    if (screenIndex === 1) {
      this.renderKingdomsSetup();
    } else if (screenIndex === 2) {
      this.setupRound1Arena();
    } else if (screenIndex === 3) {
      this.setupRound2Arena();
    } else if (screenIndex === 4) {
      this.setupHeroRoundArena();
    } else if (screenIndex === 5) {
      this.setupBossArena();
    }

    if (this.uiScaleMode === 'auto') {
      setTimeout(() => this.applyAutoFit(), 30);
    }
  },

  // ================= BƯỚC 1: PHONG VUA & 4 VƯƠNG QUỐC =================
  renderKingdomsSetup() {
    const container = document.getElementById('kingdoms-setup-grid');
    if (!container) return;
    container.innerHTML = '';

    this.teams.forEach(team => {
      const meta = this.factionMeta[team.id] || { theme: 'theme-fire', crest: 'assets/icons/crest-dragon.svg', crestClass: 'crest-fire', element: 'Vương Quốc' };
      const card = document.createElement('div');
      card.className = `kingdom-card ${meta.theme}`;
      card.innerHTML = `
        <div class="card-top">
          <span class="kingdom-pill-badge">VƯƠNG QUỐC ${team.id}</span>
          <button class="btn-crown-king" onclick="Game.crownKing(${team.id})">
            <img src="assets/icons/crown.svg" class="mini-crown-icon" alt=""> Chọn Vua
          </button>
        </div>

        <div class="kingdom-name">${team.name}</div>
        
        <div class="kingdom-crest-hero">
          <img src="${meta.crest}" class="kingdom-crest-3d ${meta.crestClass}" alt="${meta.element}">
        </div>

        <div class="king-display-box ${team.king ? 'is-crowned' : ''}">
          <div class="king-name-title ${team.king ? '' : 'unselected'}" id="king-display-${team.id}">
            ${team.king ? team.king : 'Chưa có Vua'}
          </div>
          <div class="king-subtitle">Miễn đấu • Cộng điểm sẵn</div>
        </div>

        <div class="pillars-sub-header">
          « 5 TRỤ CỘT SINH TỒN THẤT = THUA NGAY! »
        </div>
        <div class="pillars-container" id="setup-pillars-${team.id}">
          ${this.renderPillarsHTML(team)}
        </div>

        <div class="roster-sub-header">
          DÂN CƯ (${team.members.length} người):
        </div>
        <div class="roster-chips-grid">
          ${team.members.map(m => `
            <div class="member-chip ${m === team.king ? 'is-king' : ''}">
              <span class="chip-name">${m}</span>
              ${m === team.king ? '<span class="chip-king-badge"><img src="assets/icons/crown.svg" class="mini-crown-icon"> Vua</span>' : ''}
            </div>
          `).join('')}
        </div>
      `;
      container.appendChild(card);
    });
  },

  // Phong Vua ngẫu nhiên
  crownKing(teamId) {
    Sound.init();
    const team = this.teams.find(t => t.id === teamId);
    if (!team || team.members.length === 0) return;

    let ticks = 0;
    const interval = setInterval(() => {
      const randomName = team.members[Math.floor(Math.random() * team.members.length)];
      const display = document.getElementById(`king-display-${team.id}`);
      if (display) display.textContent = randomName;
      Sound.playSpinTick();
      ticks++;

      if (ticks > 15) {
        clearInterval(interval);
        const finalKing = team.members[Math.floor(Math.random() * team.members.length)];
        team.king = finalKing;
        Sound.playFanfare();
        Sound.playVictoryChime();
        FX.confetti(80);
        this.renderKingdomsSetup();
        this.renderKingdomsSidebar();
      }
    }, 75);
  },

  renderPillarsHTML(team) {
    const p = team.pillars;
    return `
      <div class="pillar-item ${!p.territory ? 'lost' : ''} fatal" title="Lãnh thổ: Mất là thua ngay lập tức!">
        <span class="p-icon"><img src="assets/icons/castle.svg" class="pillar-game-svg" alt="Lãnh Thổ"></span>
        <span class="pillar-label">Lãnh Thổ</span>
      </div>
      <div class="pillar-item ${!p.wealth ? 'lost' : ''} fatal" title="Của cải: Mất là bạo loạn đầu hàng (Thua ngay)!">
        <span class="p-icon"><img src="assets/icons/gold-chest.svg" class="pillar-game-svg" alt="Của Cải"></span>
        <span class="pillar-label">Của Cải</span>
      </div>
      <div class="pillar-item ${!p.weapon ? 'lost' : ''} fatal" title="Vũ khí: Mất khí giới là THUA NGAY LẬP TỨC!">
        <span class="p-icon"><img src="assets/icons/swords.svg" class="pillar-game-svg" alt="Vũ Khí"></span>
        <span class="pillar-label">Vũ Khí</span>
      </div>
      <div class="pillar-item ${!p.food ? 'lost' : ''}" title="Lương thực: Đói giảm 30% quân">
        <span class="p-icon"><img src="assets/icons/wheat.svg" class="pillar-game-svg" alt="Lương Thực"></span>
        <span class="pillar-label">Lương Thực</span>
      </div>
      <div class="pillar-item ${!p.health ? 'lost' : ''}" title="Sức khỏe: Dịch giảm 50% tỉ lệ ra trận">
        <span class="p-icon"><img src="assets/icons/potion-red.png" class="pillar-pixel-img" alt="Sức Khỏe"></span>
        <span class="pillar-label">Sức Khỏe</span>
      </div>
    `;
  },

  startRound1WithMatchup() {
    // Tự động phong vua cho các tổ chưa có
    this.teams.forEach(t => {
      if (!t.king && t.members.length > 0) {
        t.king = t.members[Math.floor(Math.random() * t.members.length)];
      }
    });

    this.switchScreen(2);
    // Kích hoạt hiệu ứng ghép trận (VS)
    this.triggerMatchupAnimation('1vs2');
  },

  // ================= BẢNG TỔNG SẮP 4 VƯƠNG QUỐC (ẢNH 3: THEO DÕI AI BỊ COOK) =================
  renderKingdomsSidebar() {
    const list = document.getElementById('all-kingdoms-sidebar-list');
    if (!list) return;

    list.innerHTML = this.teams.map(team => {
      const meta = this.factionMeta[team.id] || { crest: 'assets/icons/swords.svg', element: 'Vương Quốc' };
      const isActive = (this.currentMatch === '1vs2' && (team.id === 1 || team.id === 2)) ||
                       (this.currentMatch === '3vs4' && (team.id === 3 || team.id === 4));
      
      let statusTag = '';
      if (team.isEliminated) {
        statusTag = '<span class="status-tag status-tag-cooked"><img src="assets/icons/skull.svg" class="mini-status-icon"> COOKED</span>';
      } else if (isActive) {
        statusTag = '<span class="status-tag status-tag-fighting"><img src="assets/icons/swords.svg" class="mini-status-icon"> ĐẤU</span>';
      } else {
        statusTag = '<span class="status-tag status-tag-waiting">CHỜ</span>';
      }

      const p = team.pillars;
      return `
        <div class="kingdom-mini-card ${isActive ? 'is-active-match' : ''} ${team.isEliminated ? 'is-cooked' : ''}">
          <div class="mini-card-header">
            <span class="mini-card-name">
              <img src="${meta.crest}" class="mini-crest-svg" alt="">
              ${team.name.split('-')[0].trim()}
            </span>
            ${statusTag}
          </div>
          <div style="font-size: 0.72rem; color: var(--gold-bright); font-weight: 700; display: flex; align-items: center; gap: 4px;">
            <img src="assets/icons/crown.svg" style="width: 12px; height: 12px;"> Vua: ${team.king || 'Chưa chọn'}
          </div>
          <div class="mini-pillars-row">
            <span class="mini-p-dot ${!p.territory ? 'lost' : ''}" title="Lãnh thổ (Fatal)"><img src="assets/icons/castle.svg" class="mini-dot-svg"></span>
            <span class="mini-p-dot ${!p.wealth ? 'lost' : ''}" title="Của cải (Fatal)"><img src="assets/icons/gold-chest.svg" class="mini-dot-svg"></span>
            <span class="mini-p-dot ${!p.weapon ? 'lost' : ''}" title="Vũ khí (Fatal)"><img src="assets/icons/swords.svg" class="mini-dot-svg"></span>
            <span class="mini-p-dot ${!p.food ? 'lost' : ''}" title="Lương thực"><img src="assets/icons/wheat.svg" class="mini-dot-svg"></span>
            <span class="mini-p-dot ${!p.health ? 'lost' : ''}" title="Sức khỏe"><img src="assets/icons/potion-red.png" class="mini-dot-img"></span>
          </div>
        </div>
      `;
    }).join('');
  },

  // ================= HIỆU ỨNG GHÉP TRẬN (VS) FANTASY (KẾT HỢP CUỘN DỌC SONG ĐẤU) =================
  triggerMatchupAnimation(matchKey, autoRoll = true) {
    Sound.init();
    const key = matchKey || (this.currentScreen === 3 ? 'FINAL' : this.currentMatch);
    this.activeMatchupKey = key;
    let tA, tB;
    if (key === '1vs2') {
      tA = this.teams.find(t => t.id === 1);
      tB = this.teams.find(t => t.id === 2);
    } else if (key === '3vs4') {
      tA = this.teams.find(t => t.id === 3);
      tB = this.teams.find(t => t.id === 4);
    } else if (key === 'FINAL') {
      tA = this.r2TeamA || this.teams[0];
      tB = this.r2TeamB || this.teams[2];
    }

    if (!tA || !tB) return;

    this.matchupTeamA = tA;
    this.matchupTeamB = tB;

    const metaA = this.factionMeta[tA.id] || { theme: 'theme-fire', crest: 'assets/icons/crest-dragon.svg', crestClass: 'crest-fire', element: 'Rồng Lửa' };
    const metaB = this.factionMeta[tB.id] || { theme: 'theme-ice', crest: 'assets/icons/crest-ice.svg', crestClass: 'crest-ice', element: 'Băng Phong' };

    const sideA = document.getElementById('matchup-side-A');
    const sideB = document.getElementById('matchup-side-B');
    if (sideA) {
      sideA.className = `matchup-side left ${metaA.theme}`;
    }
    if (sideB) {
      sideB.className = `matchup-side right ${metaB.theme}`;
    }

    document.getElementById('matchup-crest-A').innerHTML = `<img src="${metaA.crest}" class="matchup-crest-asset ${metaA.crestClass}" alt="${metaA.element}">`;
    document.getElementById('matchup-name-A').textContent = tA.name;
    document.getElementById('matchup-king-A').innerHTML = `<span class="king-crest-pip">⊚</span> Vua: ${tA.king || 'Chưa chọn'}`;

    document.getElementById('matchup-crest-B').innerHTML = `<img src="${metaB.crest}" class="matchup-crest-asset ${metaB.crestClass}" alt="${metaB.element}">`;
    document.getElementById('matchup-name-B').textContent = tB.name;
    document.getElementById('matchup-king-B').innerHTML = `<span class="king-crest-pip">⊚</span> Vua: ${tB.king || 'Chưa chọn'}`;

    const curHeroA = this.currentScreen === 3 ? this.r2ActiveHeroA : this.r1ActiveHeroA;
    const curHeroB = this.currentScreen === 3 ? this.r2ActiveHeroB : this.r1ActiveHeroB;

    const trackA = document.getElementById('matchup-reel-track-A');
    const trackB = document.getElementById('matchup-reel-track-B');
    if (trackA) {
      trackA.style.transition = 'none';
      trackA.style.transform = 'translateY(0)';
      trackA.innerHTML = `<div class="matchup-reel-item selected">${curHeroA || 'Chưa chọn'}</div>`;
    }
    if (trackB) {
      trackB.style.transition = 'none';
      trackB.style.transform = 'translateY(0)';
      trackB.innerHTML = `<div class="matchup-reel-item selected">${curHeroB || 'Chưa chọn'}</div>`;
    }

    const modal = document.getElementById('matchup-modal');
    modal.classList.add('active');
    FX.screenShake(350);
    Sound.playSlam();

    clearTimeout(this.matchupTimeout);

    if (autoRoll) {
      this.rollMatchupReels();
    } else {
      Sound.playFanfare();
    }
  },

  rollMatchupReels() {
    Sound.init();
    const tA = this.matchupTeamA;
    const tB = this.matchupTeamB;
    if (!tA || !tB) return;

    if (!tA.casualties) tA.casualties = [];
    if (!tB.casualties) tB.casualties = [];

    let cA = tA.members.filter(m => m !== tA.king && !tA.casualties.some(c => c.name === m));
    if (cA.length === 0) cA = tA.members;

    let cB = tB.members.filter(m => m !== tB.king && !tB.casualties.some(c => c.name === m));
    if (cB.length === 0) cB = tB.members;

    const finalA = cA[Math.floor(Math.random() * cA.length)];
    const finalB = cB[Math.floor(Math.random() * cB.length)];

    const total = 24;
    const seqA = [];
    const seqB = [];
    for (let i = 0; i < total - 1; i++) {
      seqA.push(cA[Math.floor(Math.random() * cA.length)]);
      seqB.push(cB[Math.floor(Math.random() * cB.length)]);
    }
    seqA.push(finalA);
    seqB.push(finalB);

    const trackA = document.getElementById('matchup-reel-track-A');
    const trackB = document.getElementById('matchup-reel-track-B');
    const boxA = document.getElementById('matchup-box-A');
    const boxB = document.getElementById('matchup-box-B');

    if (!trackA || !trackB) return;

    trackA.style.transition = 'none';
    trackA.style.transform = 'translateY(0)';
    trackA.innerHTML = seqA.map((name, i) => `<div class="matchup-reel-item ${i === total - 1 ? 'selected' : ''}">${name}</div>`).join('');

    trackB.style.transition = 'none';
    trackB.style.transform = 'translateY(0)';
    trackB.innerHTML = seqB.map((name, i) => `<div class="matchup-reel-item ${i === total - 1 ? 'selected' : ''}">${name}</div>`).join('');

    void trackA.offsetHeight;
    void trackB.offsetHeight;

    // Đo chiều cao thực tế của item để cuộn chính xác 100% đến item cuối cùng
    const itemHeight = (trackA.firstElementChild && trackA.firstElementChild.offsetHeight) ? trackA.firstElementChild.offsetHeight : 46;

    if (boxA) boxA.classList.add('spinning');
    if (boxB) boxB.classList.add('spinning');

    trackA.style.transition = 'transform 2.3s cubic-bezier(0.12, 0.88, 0.24, 1)';
    trackA.style.transform = `translateY(-${(total - 1) * itemHeight}px)`;

    trackB.style.transition = 'transform 2.3s cubic-bezier(0.12, 0.88, 0.24, 1)';
    trackB.style.transform = `translateY(-${(total - 1) * itemHeight}px)`;

    let tickCount = 0;
    const tickInterval = setInterval(() => {
      Sound.playSpinTick();
      tickCount++;
      if (tickCount > 18) clearInterval(tickInterval);
    }, 110);

    setTimeout(() => {
      clearInterval(tickInterval);
      if (boxA) {
        boxA.classList.remove('spinning');
        boxA.classList.add('flash-locked');
        setTimeout(() => boxA.classList.remove('flash-locked'), 800);
      }
      if (boxB) {
        boxB.classList.remove('spinning');
        boxB.classList.add('flash-locked');
        setTimeout(() => boxB.classList.remove('flash-locked'), 800);
      }

      Sound.playFanfare();

      // Khóa cố định tên anh hùng vào khung hiển thị (chống trôi lệch)
      trackA.style.transition = 'none';
      trackA.style.transform = 'translateY(0)';
      trackA.innerHTML = `<div class="matchup-reel-item selected" id="matchup-hero-A">${finalA}</div>`;

      trackB.style.transition = 'none';
      trackB.style.transform = 'translateY(0)';
      trackB.innerHTML = `<div class="matchup-reel-item selected" id="matchup-hero-B">${finalB}</div>`;

      // Cập nhật hero vào game state
      if (this.currentScreen === 3) {
        this.r2ActiveHeroA = finalA;
        this.r2ActiveHeroB = finalB;
        if (!tA.heroesUsed.includes(finalA)) tA.heroesUsed.push(finalA);
        if (!tB.heroesUsed.includes(finalB)) tB.heroesUsed.push(finalB);
        this.setupRound2Arena();
      } else {
        this.r1ActiveHeroA = finalA;
        this.r1ActiveHeroB = finalB;
        if (!tA.heroesUsed.includes(finalA)) tA.heroesUsed.push(finalA);
        if (!tB.heroesUsed.includes(finalB)) tB.heroesUsed.push(finalB);
        this.updateRound1TeamDisplays();
      }
    }, 2350);
  },

  closeMatchupAnimation() {
    clearTimeout(this.matchupTimeout);
    const modal = document.getElementById('matchup-modal');
    modal.classList.remove('active');
  },

  // Khi click nút "⚡ Roll Song Đấu (2 Bên)" trên thanh điều khiển
  summonBothHeroes() {
    this.triggerMatchupAnimation(this.currentMatch, true);
  },

  // ================= BƯỚC 2: VÒNG 1 (TỨ KẾT ĐẤU LOẠI) =================
  setMatch(matchKey) {
    this.currentMatch = matchKey;
    this.r1QuestionIndex = 0;
    this.r1ActiveHeroA = null;
    this.r1ActiveHeroB = null;

    document.getElementById('tab-match-a').classList.toggle('btn-ctrl-primary', matchKey === '1vs2');
    document.getElementById('tab-match-b').classList.toggle('btn-ctrl-primary', matchKey === '3vs4');

    this.setupRound1Arena();
    this.triggerMatchupAnimation(matchKey);
  },

  setupRound1Arena() {
    if (this.currentMatch === '1vs2') {
      this.r1CurrentTeamA = this.teams.find(t => t.id === 1);
      this.r1CurrentTeamB = this.teams.find(t => t.id === 2);
    } else {
      this.r1CurrentTeamA = this.teams.find(t => t.id === 3);
      this.r1CurrentTeamB = this.teams.find(t => t.id === 4);
    }

    this.updateRound1TeamDisplays();
    this.renderKingdomsSidebar();
    this.loadQuestionR1();
  },

  // Hiển thị danh sách quân số của đội (Biết ai bị loại khi -50% hoặc -30%)
  renderTeamRoster(team, currentHero, listElId, countElId) {
    const listEl = document.getElementById(listElId);
    const countEl = document.getElementById(countElId);
    if (!listEl) return;

    if (!team.casualties) team.casualties = [];

    const nonKingMembers = team.members.filter(m => m !== team.king);
    const livingCount = nonKingMembers.filter(m => !team.casualties.some(c => c.name === m)).length;
    if (countEl) {
      countEl.textContent = `${livingCount}/${nonKingMembers.length}`;
    }

    listEl.innerHTML = team.members.map(m => {
      const isKing = m === team.king;
      const casualty = team.casualties.find(c => c.name === m);
      const isFighter = m === currentHero;

      if (isKing) {
        return `
          <div class="roster-member-row is-king">
            <span class="roster-m-name"><img src="assets/icons/crown.svg" class="mini-crown-icon" alt=""> ${m}</span>
            <span class="roster-tag tag-king">Vua (Miễn đấu)</span>
          </div>
        `;
      } else if (casualty) {
        return `
          <div class="roster-member-row is-casualty" title="Bị loại khỏi trận chiến: ${casualty.reason}">
            <span class="roster-m-name"><img src="assets/icons/skull.svg" class="mini-status-icon" alt=""> ${m}</span>
            <span class="roster-tag tag-casualty">${casualty.reason}</span>
          </div>
        `;
      } else if (isFighter) {
        return `
          <div class="roster-member-row is-active-fighter">
            <span class="roster-m-name"><img src="assets/icons/swords.svg" class="mini-status-icon" alt=""> ${m}</span>
            <span class="roster-tag tag-fighter">Đang ra trận</span>
          </div>
        `;
      } else {
        return `
          <div class="roster-member-row">
            <span class="roster-m-name"><img src="assets/icons/swords.svg" class="mini-status-icon" alt=""> ${m}</span>
            <span class="roster-tag tag-ready">Sẵn sàng</span>
          </div>
        `;
      }
    }).join('');
  },

  updateRound1TeamDisplays() {
    const tA = this.r1CurrentTeamA;
    const tB = this.r1CurrentTeamB;

    // Team A
    document.getElementById('r1-teamA-badge').textContent = `TỔ ${tA.id}`;
    document.getElementById('r1-teamA-name').textContent = tA.name;
    document.getElementById('r1-teamA-king').innerHTML = `<img src="assets/icons/crown.svg" class="mini-crown-icon" alt=""> Vua: ${tA.king || 'Chưa chọn'}`;
    const heroElA = document.getElementById('r1-teamA-hero');
    if (heroElA) heroElA.textContent = this.r1ActiveHeroA || 'Chưa triệu hồi';
    document.getElementById('r1-teamA-pillars').innerHTML = this.renderPillarsHTML(tA);
    document.getElementById('r1-panel-teamA').classList.toggle('is-defeated', tA.isEliminated);
    this.renderTeamRoster(tA, this.r1ActiveHeroA, 'r1-teamA-roster-list', 'r1-teamA-roster-count');

    // Team B
    document.getElementById('r1-teamB-badge').textContent = `TỔ ${tB.id}`;
    document.getElementById('r1-teamB-name').textContent = tB.name;
    document.getElementById('r1-teamB-king').innerHTML = `<img src="assets/icons/crown.svg" class="mini-crown-icon" alt=""> Vua: ${tB.king || 'Chưa chọn'}`;
    const heroElB = document.getElementById('r1-teamB-hero');
    if (heroElB) heroElB.textContent = this.r1ActiveHeroB || 'Chưa triệu hồi';
    document.getElementById('r1-teamB-pillars').innerHTML = this.renderPillarsHTML(tB);
    document.getElementById('r1-panel-teamB').classList.toggle('is-defeated', tB.isEliminated);
    this.renderTeamRoster(tB, this.r1ActiveHeroB, 'r1-teamB-roster-list', 'r1-teamB-roster-count');
  },

  // Hiệu ứng cuộn dọc từ trên xuống và dừng lại ở dũng sĩ (Vertical Slot Reel)
  spinReel(side, round = 1, onComplete = null) {
    Sound.init();
    let team;
    if (round === 1) {
      team = side === 'A' ? this.r1CurrentTeamA : this.r1CurrentTeamB;
    } else {
      team = side === 'A' ? this.r2TeamA : this.r2TeamB;
    }
    if (!team) return;

    if (!team.casualties) team.casualties = [];
    let candidates = team.members.filter(m => m !== team.king && !team.casualties.some(c => c.name === m));
    if (candidates.length === 0) {
      candidates = team.members.filter(m => !team.casualties.some(c => c.name === m));
      if (candidates.length === 0) candidates = team.members;
    }

    const finalHero = candidates[Math.floor(Math.random() * candidates.length)];

    const prefix = round === 1 ? 'r1' : 'r2';
    const track = document.getElementById(`${prefix}-reel-track-${side}`);
    const box = document.getElementById(`${prefix}-team${side}-box`);
    if (!track) return;

    // Sinh dãy 24 tên chạy từ trên xuống, item thứ 24 chính là finalHero
    const totalItems = 24;
    const namesSeq = [];
    for (let i = 0; i < totalItems - 1; i++) {
      namesSeq.push(candidates[Math.floor(Math.random() * candidates.length)]);
    }
    namesSeq.push(finalHero);

    // Reset track về vị trí ban đầu
    track.style.transition = 'none';
    track.style.transform = 'translateY(0)';
    track.innerHTML = namesSeq.map((name, idx) => `
      <div class="hero-reel-item ${idx === totalItems - 1 ? 'selected' : ''}" id="${idx === totalItems - 1 ? `${prefix}-team${side}-hero` : ''}">${name}</div>
    `).join('');

    // Force reflow
    void track.offsetHeight;

    // Đo chiều cao thực tế của item dũng sĩ (fallback 42px)
    const itemHeight = (track.firstElementChild && track.firstElementChild.offsetHeight) ? track.firstElementChild.offsetHeight : 42;

    if (box) box.classList.add('spinning');

    // Chạy transition cuộn xuống với bezier giảm tốc dần
    track.style.transition = 'transform 2.2s cubic-bezier(0.12, 0.88, 0.24, 1)';
    track.style.transform = `translateY(-${(totalItems - 1) * itemHeight}px)`;

    // Âm thanh quay tíc tắc nhịp nhàng
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      Sound.playSpinTick();
      tickCount++;
      if (tickCount > 16) clearInterval(tickInterval);
    }, 110);

    // Khi dừng lại ở dũng sĩ
    setTimeout(() => {
      clearInterval(tickInterval);
      if (box) {
        box.classList.remove('spinning');
        box.classList.add('flash-selected');
        setTimeout(() => box.classList.remove('flash-selected'), 800);
      }

      // Khóa cố định dũng sĩ vào khung hiển thị (chống trôi lệch hoặc rỗng box)
      track.style.transition = 'none';
      track.style.transform = 'translateY(0)';
      track.innerHTML = `<div class="hero-reel-item selected" id="${prefix}-team${side}-hero">${finalHero}</div>`;

      if (round === 1) {
        if (side === 'A') this.r1ActiveHeroA = finalHero;
        else this.r1ActiveHeroB = finalHero;
      } else {
        if (side === 'A') this.r2ActiveHeroA = finalHero;
        else this.r2ActiveHeroB = finalHero;
      }

      if (!team.heroesUsed.includes(finalHero)) team.heroesUsed.push(finalHero);
      Sound.playFanfare();

      if (round === 1) this.updateRound1TeamDisplays();
      else this.setupRound2Arena();

      if (onComplete) onComplete(finalHero);
    }, 2250);
  },

  // Triệu hồi cả 2 bên cùng lúc ngay trên sàn đấu (không mở modal)
  summonBothHeroesArena(round = 1) {
    Sound.init();
    this.spinReel('A', round);
    this.spinReel('B', round);
  },

  summonHero(side) {
    this.spinReel(side, 1);
  },

  summonHeroR2(side) {
    this.spinReel(side, 2);
  },

  // ================= CHỌN ANH HÙNG THỦ CÔNG (ẢNH 4) =================
  openManualHeroPicker(side) {
    this.pickerCurrentSide = side;
    this.pickerCurrentRound = 1;
    const team = side === 'A' ? this.r1CurrentTeamA : this.r1CurrentTeamB;
    if (!team) return;

    document.getElementById('picker-team-name').textContent = team.name;
    const list = document.getElementById('picker-members-list');
    list.innerHTML = '';

    if (!team.casualties) team.casualties = [];

    team.members.forEach(m => {
      const isKing = m === team.king;
      const casualty = team.casualties.find(c => c.name === m);

      const btn = document.createElement('button');
      btn.className = 'picker-member-btn';
      if (isKing) {
        btn.innerHTML = `<span style="color: var(--gold); display: flex; align-items: center; gap: 4px;"><img src="assets/icons/crown.svg" class="mini-crown-icon"> ${m}</span><span style="font-size: 0.75rem; color: var(--gold);">Vua (Miễn đấu)</span>`;
        btn.style.opacity = '0.5';
        btn.disabled = true;
      } else if (casualty) {
        btn.innerHTML = `<span style="color: var(--crimson); text-decoration: line-through; display: flex; align-items: center; gap: 4px;"><img src="assets/icons/skull.svg" class="mini-status-icon"> ${m}</span><span style="font-size: 0.72rem; color: var(--crimson);">${casualty.reason}</span>`;
        btn.style.opacity = '0.45';
        btn.disabled = true;
      } else {
        btn.innerHTML = `<span style="display: flex; align-items: center; gap: 4px;"><img src="assets/icons/swords.svg" class="mini-status-icon"> ${m}</span><span style="font-size: 0.8rem; color: var(--gold);">Chọn ➔</span>`;
        btn.onclick = () => this.selectManualHero(m);
      }
      list.appendChild(btn);
    });

    document.getElementById('modal-hero-picker').classList.add('active');
  },

  openManualHeroPickerR2(side) {
    this.pickerCurrentSide = side;
    this.pickerCurrentRound = 2;
    const team = side === 'A' ? this.r2TeamA : this.r2TeamB;
    if (!team) return;

    document.getElementById('picker-team-name').textContent = team.name;
    const list = document.getElementById('picker-members-list');
    list.innerHTML = '';

    if (!team.casualties) team.casualties = [];

    team.members.forEach(m => {
      const isKing = m === team.king;
      const casualty = team.casualties.find(c => c.name === m);

      const btn = document.createElement('button');
      btn.className = 'picker-member-btn';
      if (isKing) {
        btn.innerHTML = `<span style="color: var(--gold); display: flex; align-items: center; gap: 4px;"><img src="assets/icons/crown.svg" class="mini-crown-icon"> ${m}</span><span style="font-size: 0.75rem; color: var(--gold);">Vua (Miễn đấu)</span>`;
        btn.style.opacity = '0.5';
        btn.disabled = true;
      } else if (casualty) {
        btn.innerHTML = `<span style="color: var(--crimson); text-decoration: line-through; display: flex; align-items: center; gap: 4px;"><img src="assets/icons/skull.svg" class="mini-status-icon"> ${m}</span><span style="font-size: 0.72rem; color: var(--crimson);">${casualty.reason}</span>`;
        btn.style.opacity = '0.45';
        btn.disabled = true;
      } else {
        btn.innerHTML = `<span style="display: flex; align-items: center; gap: 4px;"><img src="assets/icons/shield.png" class="mini-status-icon"> ${m}</span><span style="font-size: 0.8rem; color: var(--gold);">Chọn ➔</span>`;
        btn.onclick = () => this.selectManualHero(m);
      }
      list.appendChild(btn);
    });

    document.getElementById('modal-hero-picker').classList.add('active');
  },

  selectManualHero(heroName) {
    Sound.init();
    const prefix = this.pickerCurrentRound === 1 ? 'r1' : 'r2';
    const side = this.pickerCurrentSide;
    const track = document.getElementById(`${prefix}-reel-track-${side}`);
    if (track) {
      track.style.transition = 'none';
      track.style.transform = 'translateY(0)';
      track.innerHTML = `<div class="hero-reel-item selected" id="${prefix}-team${side}-hero">${heroName}</div>`;
    }

    if (this.pickerCurrentRound === 1) {
      if (side === 'A') {
        this.r1ActiveHeroA = heroName;
        if (!this.r1CurrentTeamA.heroesUsed.includes(heroName)) this.r1CurrentTeamA.heroesUsed.push(heroName);
      } else {
        this.r1ActiveHeroB = heroName;
        if (!this.r1CurrentTeamB.heroesUsed.includes(heroName)) this.r1CurrentTeamB.heroesUsed.push(heroName);
      }
      this.updateRound1TeamDisplays();
    } else if (this.pickerCurrentRound === 2) {
      if (side === 'A') {
        this.r2ActiveHeroA = heroName;
        if (!this.r2TeamA.heroesUsed.includes(heroName)) this.r2TeamA.heroesUsed.push(heroName);
      } else {
        this.r2ActiveHeroB = heroName;
        if (!this.r2TeamB.heroesUsed.includes(heroName)) this.r2TeamB.heroesUsed.push(heroName);
      }
      this.setupRound2Arena();
    }

    Sound.playFanfare();
    this.closeManualHeroPicker();
  },

  closeManualHeroPicker() {
    document.getElementById('modal-hero-picker').classList.remove('active');
  },

  loadQuestionR1() {
    const list = this.data.round1.filter(q => q.match === this.currentMatch);
    const q = list[this.r1QuestionIndex] || list[0];
    if (!q) return;

    document.getElementById('r1-progress').textContent = `Câu ${this.r1QuestionIndex + 1} / ${list.length}`;
    document.getElementById('r1-question-text').textContent = q.question;

    const optGrid = document.getElementById('r1-options-grid');
    optGrid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.id = `r1-opt-${idx}`;
      btn.innerHTML = `
        <span class="opt-badge">${letters[idx] || (idx + 1)}</span>
        <span class="opt-text">${opt}</span>
      `;
      btn.onclick = () => {
        Sound.playRpgClick();
        document.querySelectorAll('#r1-options-grid .option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      };
      optGrid.appendChild(btn);
    });

    this.resetTimer(60);
  },

  revealAnswerR1() {
    Sound.init();
    const list = this.data.round1.filter(q => q.match === this.currentMatch);
    const q = list[this.r1QuestionIndex];
    if (!q) return;

    const correctBtn = document.getElementById(`r1-opt-${q.correctAnswer}`);
    if (correctBtn) {
      correctBtn.classList.add('correct');
      Sound.playCorrect();
      FX.confetti(45);
    }
  },

  judgeR1(result) {
    Sound.init();
    if (result === 'A_WIN') {
      this.openPunishmentModal(this.r1CurrentTeamB);
    } else if (result === 'B_WIN') {
      this.openPunishmentModal(this.r1CurrentTeamA);
    }
  },

  nextQuestionR1() {
    const list = this.data.round1.filter(q => q.match === this.currentMatch);
    if (this.r1QuestionIndex < list.length - 1) {
      this.r1QuestionIndex++;
      this.loadQuestionR1();
    } else {
      alert(`Đã hoàn thành các câu hỏi của ${this.currentMatch === '1vs2' ? 'Nhánh 1' : 'Nhánh 2'}! Kiểm tra đội chiến thắng và tiến vào Vòng 2.`);
    }
  },

  // ================= VÒNG QUAY TRỪNG PHẠT 5 YẾU TỐ (MẤT VŨ KHÍ = THUA LUÔN) =================
  openPunishmentModal(team) {
    this.targetPunishTeam = team;
    document.getElementById('punish-team-target').textContent = team.name;
    document.getElementById('roulette-icon').innerHTML = '<img src="assets/icons/dice.svg" class="roulette-game-svg" alt="Roulette">';
    document.getElementById('roulette-name').textContent = 'Bấm nút để quay số mệnh...';
    document.getElementById('roulette-effect').textContent = '1 trong 5 Trụ Cột Sinh Tồn sẽ bị tước đoạt (Lãnh thổ, Của cải, Vũ khí mất là COOK)!';
    document.getElementById('btn-spin-punish').style.display = 'inline-flex';
    document.getElementById('btn-close-punish').style.display = 'none';

    document.getElementById('modal-punishment').classList.add('active');
  },

  executeSpinPunishment() {
    Sound.init();
    const team = this.targetPunishTeam;
    if (!team) return;

    document.getElementById('btn-spin-punish').style.display = 'none';

    // 5 Yếu tố - Game Asset Icons thay thế Emoji
    const pool = [
      { key: 'territory', icon: 'assets/icons/castle.svg', name: 'LÃNH THỔ', effect: 'MẤT LÃNH THỔ = TỔ BỊ XÓA SỔ (COOK NGAY LẬP TỨC)!', fatal: true },
      { key: 'wealth', icon: 'assets/icons/gold-chest.svg', name: 'CỦA CẢI', effect: 'MẤT CỦA CẢI = DÂN BẠO LOẠN, ĐẦU HÀNG (COOK NGAY)!', fatal: true },
      { key: 'weapon', icon: 'assets/icons/swords.svg', name: 'VŨ KHÍ', effect: 'MẤT VŨ KHÍ = BỊ TƯỚC KHÍ GIỚI, TỔ BỊ LOẠI NGAY LẬP TỨC (COOK)!', fatal: true },
      { key: 'weapon', icon: 'assets/icons/swords.svg', name: 'VŨ KHÍ', effect: 'MẤT VŨ KHÍ = BỊ TƯỚC KHÍ GIỚI, TỔ BỊ LOẠI NGAY LẬP TỨC (COOK)!', fatal: true },
      { key: 'food', icon: 'assets/icons/wheat.svg', name: 'LƯƠNG THỰC', effect: 'ĐÓI KHÁT: GIẢM 30% SỐ LƯỢNG ANH HÙNG!', fatal: false },
      { key: 'health', icon: 'assets/icons/potion-red.png', isPixelImg: true, name: 'SỨC KHỎE', effect: 'DỊCH BỆNH: GIẢM 50% TỈ LỆ RA TRẬN!', fatal: false }
    ];

    let ticks = 0;
    const interval = setInterval(() => {
      const item = pool[Math.floor(Math.random() * pool.length)];
      document.getElementById('roulette-icon').innerHTML = `<img src="${item.icon}" class="${item.isPixelImg ? 'roulette-pixel-img' : 'roulette-game-svg'}" alt="">`;
      document.getElementById('roulette-name').textContent = item.name;
      document.getElementById('roulette-effect').textContent = item.effect;
      Sound.playSpinTick();
      ticks++;

      if (ticks > 18) {
        clearInterval(interval);
        const finalItem = pool[Math.floor(Math.random() * pool.length)];
        document.getElementById('roulette-icon').innerHTML = `<img src="${finalItem.icon}" class="${finalItem.isPixelImg ? 'roulette-pixel-img' : 'roulette-game-svg'}" alt="">`;
        document.getElementById('roulette-name').textContent = finalItem.name;
        document.getElementById('roulette-effect').textContent = finalItem.effect;

        // Trừ trụ cột của đội
        team.pillars[finalItem.key] = false;
        Sound.playDestruction();
        FX.screenShake(finalItem.fatal ? 600 : 450);

        if (finalItem.fatal) {
          team.isEliminated = true;
          document.getElementById('roulette-effect').innerHTML = `
            <span style="color: var(--crimson); font-weight: 900; font-size: 1.25rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <img src="assets/icons/skull.svg" style="width: 24px; height: 24px;"> NƯỚC BỊ LOẠI: ${team.name} ĐÃ BỊ COOK!
            </span>
          `;
        } else if (finalItem.key === 'health') {
          // -50% QUÂN SỐ
          if (!team.casualties) team.casualties = [];
          const eligible = team.members.filter(m => m !== team.king && !team.casualties.some(c => c.name === m));
          const count = Math.max(1, Math.round(eligible.length * 0.5));
          const shuffled = [...eligible].sort(() => 0.5 - Math.random());
          const victims = shuffled.slice(0, count);
          victims.forEach(v => {
            team.casualties.push({ name: v, reason: 'Dịch bệnh (-50%)' });
          });
          document.getElementById('roulette-effect').innerHTML = `
            <div style="color: var(--crimson); font-weight: 800; font-size: 1.15rem; margin-bottom: 6px;">DỊCH BỆNH BÙNG PHÁT: -50% QUÂN SỐ!</div>
            <div style="color: var(--text-muted); font-size: 0.95rem;">Đã loại <strong>${victims.length}</strong> thành viên khỏi danh sách ra trận:<br>
            <span style="color: var(--crimson); font-weight: 800; font-size: 1.05rem;">${victims.join(', ')}</span></div>
          `;
        } else if (finalItem.key === 'food') {
          // -30% QUÂN SỐ
          if (!team.casualties) team.casualties = [];
          const eligible = team.members.filter(m => m !== team.king && !team.casualties.some(c => c.name === m));
          const count = Math.max(1, Math.round(eligible.length * 0.3));
          const shuffled = [...eligible].sort(() => 0.5 - Math.random());
          const victims = shuffled.slice(0, count);
          victims.forEach(v => {
            team.casualties.push({ name: v, reason: 'Đói khát (-30%)' });
          });
          document.getElementById('roulette-effect').innerHTML = `
            <div style="color: var(--crimson); font-weight: 800; font-size: 1.15rem; margin-bottom: 6px; display: flex; align-items: center; justify-content: center; gap: 6px;"><img src="assets/icons/wheat.svg" class="mini-game-icon"> ĐÓI KHÁT: -30% QUÂN SỐ!</div>
            <div style="color: var(--text-muted); font-size: 0.95rem;">Đã loại <strong>${victims.length}</strong> thành viên khỏi danh sách ra trận:<br>
            <span style="color: var(--crimson); font-weight: 800; font-size: 1.05rem;">${victims.join(', ')}</span></div>
          `;
        }

        this.updateRound1TeamDisplays();
        this.renderKingdomsSidebar();
        document.getElementById('btn-close-punish').style.display = 'inline-flex';
      }
    }, 75);
  },

  closePunishmentModal() {
    document.getElementById('modal-punishment').classList.remove('active');
  },

  // Tiến vào Vòng 2
  proceedToRound2() {
    this.winnerMatchA = this.teams[0].isEliminated ? this.teams[1] : this.teams[0];
    this.winnerMatchB = this.teams[2].isEliminated ? this.teams[3] : this.teams[2];

    this.r2TeamA = this.winnerMatchA;
    this.r2TeamB = this.winnerMatchB;
    this.switchScreen(3);
    this.triggerMatchupAnimation('FINAL');
  },

  // ================= BƯỚC 3: VÒNG 2 (CHUNG KẾT ĐÚNG / SAI) =================
  setupRound2Arena() {
    if (!this.r2TeamA) this.r2TeamA = this.teams[0];
    if (!this.r2TeamB) this.r2TeamB = this.teams[2];

    document.getElementById('r2-teamA-name').textContent = this.r2TeamA.name;
    document.getElementById('r2-teamA-king').innerHTML = `<img src="assets/icons/crown.svg" class="mini-crown-icon" alt=""> Vua: ${this.r2TeamA.king || '...'}`;
    const heroElA = document.getElementById('r2-teamA-hero');
    if (heroElA) heroElA.textContent = this.r2ActiveHeroA || 'Chưa chọn';

    document.getElementById('r2-teamB-name').textContent = this.r2TeamB.name;
    document.getElementById('r2-teamB-king').innerHTML = `<img src="assets/icons/crown.svg" class="mini-crown-icon" alt=""> Vua: ${this.r2TeamB.king || '...'}`;
    const heroElB = document.getElementById('r2-teamB-hero');
    if (heroElB) heroElB.textContent = this.r2ActiveHeroB || 'Chưa chọn';

    this.renderTeamRoster(this.r2TeamA, this.r2ActiveHeroA, 'r2-teamA-roster-list', 'r2-teamA-roster-count');
    this.renderTeamRoster(this.r2TeamB, this.r2ActiveHeroB, 'r2-teamB-roster-list', 'r2-teamB-roster-count');

    this.loadQuestionR2();
  },

  loadQuestionR2() {
    const q = this.data.round2[this.r2QuestionIndex];
    if (!q) return;

    document.getElementById('r2-progress').textContent = `CÂU HỎI ${this.r2QuestionIndex + 1} / ${this.data.round2.length} (ĐÚNG HOẶC SAI)`;
    document.getElementById('r2-question-text').textContent = q.question;
    document.getElementById('r2-explain-box').style.display = 'none';

    document.getElementById('r2-btn-true').style.opacity = '1';
    document.getElementById('r2-btn-false').style.opacity = '1';

    this.resetTimer(120);
  },

  selectTF(val) {
    // Chọn đáp án
  },

  revealAnswerR2() {
    Sound.init();
    const q = this.data.round2[this.r2QuestionIndex];
    if (!q) return;

    const expBox = document.getElementById('r2-explain-box');
    expBox.innerHTML = `<strong>KẾT QUẢ:</strong> ${q.isTrue ? '<span style="color: var(--green);">ĐÚNG</span>' : '<span style="color: var(--crimson);">SAI</span>'}<br>${q.explain}`;
    expBox.style.display = 'block';

    if (q.isTrue) {
      document.getElementById('r2-btn-true').style.boxShadow = '0 0 0 3px var(--green)';
      Sound.playCorrect();
    } else {
      document.getElementById('r2-btn-false').style.boxShadow = '0 0 0 3px var(--crimson)';
      Sound.playWrong();
    }
  },

  addScoreR2(side) {
    Sound.init();
    if (side === 'A') {
      this.r2ScoreA++;
      document.getElementById('r2-score-teamA').textContent = `${this.r2ScoreA} Điểm`;
    } else {
      this.r2ScoreB++;
      document.getElementById('r2-score-teamB').textContent = `${this.r2ScoreB} Điểm`;
    }
    Sound.playCorrect();
    FX.confetti(35);
  },

  nextQuestionR2() {
    if (this.r2QuestionIndex < this.data.round2.length - 1) {
      this.r2QuestionIndex++;
      this.loadQuestionR2();
    } else {
      alert("Đã kết thúc 4 câu vòng 2! Đội có điểm cao hơn là Tổ Vô Địch Toàn Năng!");
    }
  },

  proceedToHeroRound() {
    if (this.r2ScoreA >= this.r2ScoreB) {
      this.championTeam = this.r2TeamA;
    } else {
      this.championTeam = this.r2TeamB;
    }
    Sound.playFanfare();
    Sound.playVictoryChime();
    FX.confetti(110);
    this.switchScreen(4);
  },

  // ================= BƯỚC 4: VÒNG ANH HÙNG (REDESIGN BỐ CỤC ẢNH 5) =================
  setupHeroRoundArena() {
    if (!this.championTeam) this.championTeam = this.teams[0];

    document.getElementById('hero-team-label').textContent = this.championTeam.name;

    let participants = [...this.championTeam.heroesUsed];
    if (participants.length < 4) {
      const remaining = this.championTeam.members.filter(m => m !== this.championTeam.king && !participants.includes(m));
      participants = [...participants, ...remaining];
    }

    this.heroRoster = participants.map(name => ({
      name,
      score: 0
    }));

    this.renderHeroHorizontalLeaderboard();
    this.loadQuestionR3();
  },

  renderHeroHorizontalLeaderboard() {
    const grid = document.getElementById('hero-roster-cards');
    if (!grid) return;

    // Sắp xếp theo điểm giảm dần
    const sorted = [...this.heroRoster].sort((a, b) => b.score - a.score);

    grid.innerHTML = sorted.map((h, idx) => {
      const isSpeaker = h.name === this.currentSpeakerHero;
      const rankBadge = idx === 0 ? '<img src="assets/icons/trophy.svg" class="mini-status-icon"> #1' : idx === 1 ? '<img src="assets/icons/medal.svg" class="mini-status-icon"> #2' : idx === 2 ? '<img src="assets/icons/medal.svg" class="mini-status-icon"> #3' : (`#${idx + 1}`);
      return `
        <div class="hero-chip-card ${idx === 0 ? 'rank-1' : ''} ${isSpeaker ? 'active-speaker' : ''}" 
             onclick="Game.selectSpeakerHero('${h.name}')" 
             title="Click để chọn anh hùng này trả lời câu hiện tại!">
          <div class="hero-chip-rank">${rankBadge}</div>
          <div class="hero-chip-name">${h.name}</div>
          <div class="hero-chip-score">${h.score}đ</div>
          ${isSpeaker ? '<div style="font-size: 0.65rem; color: var(--ice-primary); font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 4px;"><img src="assets/icons/torch.svg" style="width: 12px; height: 12px;"> ĐANG TRẢ LỜI</div>' : ''}
        </div>
      `;
    }).join('');
  },

  selectSpeakerHero(heroName) {
    Sound.init();
    this.currentSpeakerHero = heroName;
    document.getElementById('r3-current-speaker').textContent = heroName;
    this.renderHeroHorizontalLeaderboard();
    Sound.playSpinTick();
  },

  randomTurnHero() {
    Sound.init();
    if (this.heroRoster.length === 0) return;

    let count = 0;
    const interval = setInterval(() => {
      const r = this.heroRoster[Math.floor(Math.random() * this.heroRoster.length)];
      document.getElementById('r3-current-speaker').textContent = r.name;
      Sound.playSpinTick();
      count++;

      if (count > 10) {
        clearInterval(interval);
        const chosen = this.heroRoster[Math.floor(Math.random() * this.heroRoster.length)];
        this.selectSpeakerHero(chosen.name);
        Sound.playFanfare();
      }
    }, 70);
  },

  loadQuestionR3() {
    const q = this.data.heroRound[this.r3QuestionIndex];
    if (!q) return;

    document.getElementById('r3-progress').textContent = `CÂU HỎI ${this.r3QuestionIndex + 1} / ${this.data.heroRound.length} (CHỚP NHOÁNG)`;
    document.getElementById('r3-question-text').textContent = q.question;
    document.getElementById('r3-answer-hint').textContent = q.answer;
    document.getElementById('r3-answer-hint').style.display = 'none';

    this.resetTimer(30);
  },

  revealAnswerR3() {
    document.getElementById('r3-answer-hint').style.display = 'block';
  },

  awardHeroPoint(pts) {
    Sound.init();
    if (!this.currentSpeakerHero) {
      alert("Vui lòng chọn hoặc click vào tên anh hùng đang trả lời!");
      return;
    }

    const hero = this.heroRoster.find(h => h.name === this.currentSpeakerHero);
    if (hero) {
      hero.score += pts;
      if (pts > 0) {
        Sound.playCorrect();
        FX.confetti(40);
      } else {
        Sound.playWrong();
      }
    }
    this.renderHeroHorizontalLeaderboard();
  },

  nextQuestionR3() {
    if (this.r3QuestionIndex < this.data.heroRound.length - 1) {
      this.r3QuestionIndex++;
      this.loadQuestionR3();
    } else {
      alert("Đã hoàn thành 10 câu chớp nhoáng! Hãy xướng tên Đại Anh Hùng để diện kiến Nữ Thần!");
    }
  },

  // Vào Vòng Boss có chiếu video dẫn chuyện Pre-Boss
  proceedToBossWithCutscene() {
    const sorted = [...this.heroRoster].sort((a, b) => b.score - a.score);
    this.grandChampionHero = sorted[0] ? sorted[0].name : "Đại Anh Hùng HN12A10";

    // Chiếu clip cốt truyện trước khi đấm nhau với Nữ Thần
    this.playCinematic('PRE_BOSS', () => {
      this.switchScreen(5);
    });
  },

  // ================= BƯỚC 5: ĐẤU BOSS NỮ THẦN =================
  setupBossArena() {
    document.getElementById('boss-champion-name').textContent = this.grandChampionHero || 'Đại Anh Hùng';
    document.getElementById('boss-question-text').textContent = this.data.bossRound.question;
    document.getElementById('boss-instructions').textContent = this.data.bossRound.instructions;

    this.resetTimer(300, true);
  },

  // ================= HỆ THỐNG CINEMATIC VIDEO & CUTSCENES (4 CLIPS) =================
  handleVideoUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;

    this.videoUrls[type] = URL.createObjectURL(file);
    const statusMap = {
      INTRO: 'status-video-intro',
      PRE_BOSS: 'status-video-preboss',
      WIN: 'status-video-win',
      LOSE: 'status-video-lose'
    };

    const el = document.getElementById(statusMap[type]);
    if (el) el.innerHTML = `<span style="color: var(--green); font-weight: bold; display: flex; align-items: center; gap: 4px;"><img src="assets/icons/check.svg" class="mini-game-icon"> Đã nạp video: ${file.name}</span>`;
    alert(`Đã nạp file video cho phân đoạn [${type}] thành công!`);
  },

  playCinematic(type, onCompleteCallback = null) {
    Sound.init();
    this.cinematicCallback = onCompleteCallback;
    const modal = document.getElementById('modal-cinematic');
    const title = document.getElementById('cinematic-modal-title');
    const container = document.getElementById('cinematic-container');

    const customUrl = this.videoUrls[type];

    if (customUrl) {
      // Phát file video MP4 của người dùng
      title.innerHTML = `<img src="assets/icons/scroll.svg" class="mini-game-icon"> ĐANG CHIẾU CLIP: ${type}`;
      container.innerHTML = `
        <video controls autoplay style="width: 100%; height: 100%; object-fit: contain;">
          <source src="${customUrl}">
          Trình duyệt không hỗ trợ video này.
        </video>
      `;
    } else {
      // Hoạt cảnh Cinematic đồ họa huyền ảo mặc định
      if (type === 'INTRO') {
        title.innerHTML = '<img src="assets/icons/scroll.svg" class="mini-game-icon"> CỐT TRUYỆN MỞ ĐẦU: ĐẠI CHIẾN VẬN MỆNH';
        Sound.playFanfare();
        container.innerHTML = `
          <div class="cinematic-animated-stage">
            <div class="cinematic-hero-icon"><img src="assets/icons/temple.svg" class="cinematic-asset-icon"></div>
            <h2 class="cinematic-title" style="color: var(--gold);">HÀNH TRÌNH TÁI SINH HN12A10</h2>
            <p class="cinematic-desc">
              Một thiên anh hùng ca mở ra giữa 4 Vương Quốc vĩ đại. Trí tuệ và lòng dũng cảm của các anh hùng 
              sẽ quyết định sự tồn vong hay diệt vong của toàn cõi nhân loại!
            </p>
          </div>
        `;
      } else if (type === 'PRE_BOSS') {
        title.innerHTML = '<img src="assets/icons/lightning.svg" class="mini-game-icon"> DIỆN KIẾN NỮ THẦN: BƯỚC VÀO ĐỀN THỜ CỔ';
        Sound.playDestruction();
        container.innerHTML = `
          <div class="cinematic-animated-stage">
            <div class="cinematic-hero-icon"><img src="assets/icons/temple.svg" class="cinematic-asset-icon"></div>
            <h2 class="cinematic-title" style="color: var(--thunder-accent);">CƠN THỊNH NỘ CỦA NỮ THẦN</h2>
            <p class="cinematic-desc">
              Đại Anh Hùng <strong>${this.grandChampionHero || 'Đại Anh Hùng'}</strong> chính thức bước lên bậc thang vàng đền thờ cổ! 
              Nữ thần giáng thế với uy quyền vũ trụ để thử thách lời giải cứu nhân loại cuối cùng!
            </p>
          </div>
        `;
      } else if (type === 'WIN') {
        title.innerHTML = '<img src="assets/icons/trophy.svg" class="mini-game-icon"> KẾT CỤC HOÀN MỸ: THẾ GIỚI ĐƯỢC CỨU!';
        title.style.color = "var(--green)";
        Sound.playFanfare();
        Sound.playVictoryChime();
        FX.confettiMega();
        container.innerHTML = `
          <div class="cinematic-animated-stage">
            <div class="cinematic-hero-icon"><img src="assets/icons/trophy.svg" class="cinematic-asset-icon"></div>
            <h2 class="cinematic-title" style="color: var(--green);">NỮ THẦN BAN PHƯỚC LÀNH BẤT TỬ!</h2>
            <p class="cinematic-desc">
              Đại Anh Hùng <strong>${this.grandChampionHero}</strong> và Vương Quốc đã hoàn toàn thuyết phục Nữ Thần bằng trí tuệ và lòng dũng cảm. 
              Nguồn năng lượng thần thánh được phục hồi, hòa bình vĩnh cửu bao trùm hành tinh HN12A10!
            </p>
          </div>
        `;
      } else if (type === 'LOSE') {
        title.innerHTML = '<img src="assets/icons/skull.svg" class="mini-game-icon"> KẾT CỤC TẬN THẾ: HÀNH TINH BỊ HUỶ DIỆT!';
        title.style.color = "var(--crimson)";
        Sound.playDestruction();
        FX.screenShake(650);
        container.innerHTML = `
          <div class="cinematic-animated-stage">
            <div class="cinematic-hero-icon"><img src="assets/icons/skull.svg" class="cinematic-asset-icon"></div>
            <h2 class="cinematic-title" style="color: var(--crimson);">CƠN THỊNH NỘ NUỐT CHỬNG THẾ GIỚI!</h2>
            <p class="cinematic-desc">
              Lời thuyết trình không đủ sức xoay chuyển định mệnh. Cơn bão sấm chớp vũ trụ nuốt chửng toàn bộ 4 vương quốc. 
              Hành tinh HN12A10 chìm vào hư vô và bóng tối vĩnh hằng...
            </p>
          </div>
        `;
      }
    }

    modal.classList.add('active');
  },

  closeCinematicModal() {
    const modal = document.getElementById('modal-cinematic');
    const container = document.getElementById('cinematic-container');
    container.innerHTML = '';
    modal.classList.remove('active');

    if (this.cinematicCallback) {
      const cb = this.cinematicCallback;
      this.cinematicCallback = null;
      cb();
    }
  },

  openMediaModal() {
    document.getElementById('modal-media-manager').classList.add('active');
  },

  closeMediaModal() {
    document.getElementById('modal-media-manager').classList.remove('active');
  },

  // ================= HỆ THỐNG ĐỒNG HỒ ĐẾM NGƯỢC (TIMER) =================
  startTimer(sec, minuteFormat = false) {
    Sound.init();
    if (this.timerIsRunning) return;

    this.timerIsRunning = true;
    this.isMinuteFormat = minuteFormat;
    if (this.timerSeconds <= 0) this.timerSeconds = sec;

    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      this.updateTimerDisplay();

      if (this.timerSeconds <= 5 && this.timerSeconds > 0) {
        Sound.playWarningTick();
      } else {
        Sound.playTick();
      }

      if (this.timerSeconds <= 0) {
        this.pauseTimer();
        Sound.playTimeOut();
      }
    }, 1000);
  },

  pauseTimer() {
    this.timerIsRunning = false;
    clearInterval(this.timerInterval);
  },

  resetTimer(sec, minuteFormat = false) {
    this.pauseTimer();
    this.timerSeconds = sec;
    this.isMinuteFormat = minuteFormat;
    this.updateTimerDisplay();
  },

  updateTimerDisplay() {
    let text = `${this.timerSeconds}`;
    if (this.isMinuteFormat) {
      const m = Math.floor(this.timerSeconds / 60);
      const s = this.timerSeconds % 60;
      text = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }

    const r1 = document.getElementById('r1-timer');
    const r2 = document.getElementById('r2-timer');
    const r3 = document.getElementById('r3-timer');
    const boss = document.getElementById('boss-timer');

    const updateManaBar = (barId, totalSec) => {
      const bar = document.getElementById(barId);
      if (!bar) return;
      const pct = Math.max(0, Math.min(100, (this.timerSeconds / totalSec) * 100));
      bar.style.width = `${pct}%`;
      bar.className = 'rpg-mana-fill';
      if (pct > 40) {
        bar.classList.add('mana-high');
      } else if (pct > 15) {
        bar.classList.add('mana-med');
      } else {
        bar.classList.add('mana-low');
      }
    };

    if (this.currentScreen === 2 && r1) {
      r1.textContent = text;
      r1.classList.toggle('urgent', this.timerSeconds <= 10);
      updateManaBar('r1-mana-bar', 60);
    } else if (this.currentScreen === 3 && r2) {
      r2.textContent = text;
      r2.classList.toggle('urgent', this.timerSeconds <= 15);
      updateManaBar('r2-mana-bar', 120);
    } else if (this.currentScreen === 4 && r3) {
      r3.textContent = text;
      r3.classList.toggle('urgent', this.timerSeconds <= 5);
      updateManaBar('r3-mana-bar', 30);
    } else if (this.currentScreen === 5 && boss) {
      boss.textContent = text;
      boss.classList.toggle('urgent', this.timerSeconds <= 30);
      updateManaBar('boss-mana-bar', 300);
    }
  },

  // ================= TIỆN ÍCH & EDITOR =================
  toggleAudio() {
    Sound.init();
    const isMuted = Sound.toggleMute();
    const icon = document.getElementById('audio-icon');
    const text = document.getElementById('audio-text');
    if (icon && text) {
      icon.src = isMuted ? 'assets/icons/speaker-off.svg' : 'assets/icons/speaker.svg';
      text.textContent = isMuted ? 'Âm thanh: TẮT' : 'Âm thanh: BẬT';
    } else {
      const btn = document.getElementById('btn-audio');
      if (btn) {
        btn.innerHTML = `<img src="${isMuted ? 'assets/icons/speaker-off.svg' : 'assets/icons/speaker.svg'}" class="mini-game-icon" id="audio-icon" alt=""> <span id="audio-text">${isMuted ? 'Âm thanh: TẮT' : 'Âm thanh: BẬT'}</span>`;
      }
    }
  },

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  },

  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (this.timerIsRunning) this.pauseTimer();
        else {
          let s = 60;
          if (this.currentScreen === 3) s = 120;
          if (this.currentScreen === 4) s = 30;
          if (this.currentScreen === 5) s = 300;
          this.startTimer(s, this.currentScreen === 5);
        }
      }
    });
  },

  openEditor() {
    document.getElementById('edit-t1-name').value = this.teams[0].name;
    document.getElementById('edit-t1-members').value = this.teams[0].members.join(', ');

    document.getElementById('edit-t2-name').value = this.teams[1].name;
    document.getElementById('edit-t2-members').value = this.teams[1].members.join(', ');

    document.getElementById('edit-t3-name').value = this.teams[2].name;
    document.getElementById('edit-t3-members').value = this.teams[2].members.join(', ');

    document.getElementById('edit-t4-name').value = this.teams[3].name;
    document.getElementById('edit-t4-members').value = this.teams[3].members.join(', ');

    document.getElementById('edit-boss-q').value = this.data.bossRound.question;

    document.getElementById('modal-editor').classList.add('active');
  },

  closeEditor() {
    document.getElementById('modal-editor').classList.remove('active');
  },

  saveEditorData() {
    const parseMembers = (str) => str.split(',').map(s => s.trim()).filter(s => s.length > 0);

    this.teams[0].name = document.getElementById('edit-t1-name').value.trim() || this.teams[0].name;
    this.teams[0].members = parseMembers(document.getElementById('edit-t1-members').value);

    this.teams[1].name = document.getElementById('edit-t2-name').value.trim() || this.teams[1].name;
    this.teams[1].members = parseMembers(document.getElementById('edit-t2-members').value);

    this.teams[2].name = document.getElementById('edit-t3-name').value.trim() || this.teams[2].name;
    this.teams[2].members = parseMembers(document.getElementById('edit-t3-members').value);

    this.teams[3].name = document.getElementById('edit-t4-name').value.trim() || this.teams[3].name;
    this.teams[3].members = parseMembers(document.getElementById('edit-t4-members').value);

    this.data.bossRound.question = document.getElementById('edit-boss-q').value.trim() || this.data.bossRound.question;

    this.data.teams = this.teams.map(t => ({
      id: t.id,
      name: t.name,
      members: t.members
    }));

    this.saveData();
    this.closeEditor();
    this.renderKingdomsSetup();
    this.renderKingdomsSidebar();
    alert("Đã lưu dữ liệu thành công!");
  },

  resetAllData() {
    if (confirm("Bạn có chắc chắn muốn cài lại trò chơi về trạng thái ban đầu?")) {
      localStorage.removeItem('HN12A10_QUIZ_DATA');
      window.location.reload();
    }
  }
};

// Khởi chạy ứng dụng
window.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
