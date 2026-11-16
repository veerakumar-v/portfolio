/**
 * ===================================================================
 * 🎮 VEERAKUMAR V - 8-BIT RETRO PORTFOLIO ENGINE (APP.JS)
 * ===================================================================
 */

(function () {
  'use strict';

  // -----------------------------------------------------------------
  // 1. STATE & AUDIO SYNTHESIZER (WEB AUDIO API)
  // -----------------------------------------------------------------
  const STATE = {
    theme: localStorage.getItem('retro_theme') || (PORTFOLIO_DATA?.settings?.defaultTheme || 'dark'),
    soundEnabled: localStorage.getItem('retro_sound') === 'true' || (PORTFOLIO_DATA?.settings?.soundEnabledDefault || false),
    crtEnabled: localStorage.getItem('retro_crt') !== 'false',
    score: 15400,
    coins: 5,
    currentLevelIndex: 0,
    audioCtx: null
  };

  /**
   * Procedural 8-bit Web Audio Synthesizer
   * Zero external MP3 files needed!
   */
  const RetroAudio = {
    init() {
      if (!STATE.audioCtx && typeof window.AudioContext !== 'undefined') {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        STATE.audioCtx = new AudioContext();
      }
      if (STATE.audioCtx && STATE.audioCtx.state === 'suspended') {
        STATE.audioCtx.resume();
      }
    },

    playTone(freq, type, duration, delay = 0, vol = 0.1) {
      if (!STATE.soundEnabled) return;
      try {
        this.init();
        if (!STATE.audioCtx) return;

        const now = STATE.audioCtx.currentTime + delay;
        const osc = STATE.audioCtx.createOscillator();
        const gain = STATE.audioCtx.createGain();

        osc.type = type; // 'square', 'triangle', 'sawtooth'
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(STATE.audioCtx.destination);

        osc.start(now);
        osc.stop(now + duration);
      } catch (e) {
        console.warn('Audio play error:', e);
      }
    },

    // 8-bit Coin Chime (Classic double tone: B5 -> E6)
    coin() {
      this.playTone(987.77, 'square', 0.08, 0, 0.12);
      this.playTone(1318.51, 'square', 0.28, 0.08, 0.12);
    },

    // 8-bit Power-Up Fanfare (Rising arpeggio)
    powerUp() {
      const notes = [330, 392, 659, 523, 587, 784];
      notes.forEach((freq, idx) => {
        this.playTone(freq, 'square', 0.12, idx * 0.07, 0.1);
      });
    },

    // 8-bit Jump Sound (Frequency ramp)
    jump() {
      if (!STATE.soundEnabled) return;
      try {
        this.init();
        if (!STATE.audioCtx) return;
        const now = STATE.audioCtx.currentTime;
        const osc = STATE.audioCtx.createOscillator();
        const gain = STATE.audioCtx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(STATE.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
      } catch (e) {}
    },

    // Retro Blip / Navigation Click
    blip() {
      this.playTone(440, 'square', 0.05, 0, 0.08);
    },

    // Victory Easter Egg Fanfare
    victory() {
      const notes = [261, 329, 392, 523, 659, 784, 1046];
      notes.forEach((freq, idx) => {
        this.playTone(freq, 'triangle', 0.2, idx * 0.09, 0.15);
      });
    }
  };

  // -----------------------------------------------------------------
  // 2. DOM INITIALIZATION & DATA RENDERING
  // -----------------------------------------------------------------
  function initPortfolio() {
    applyTheme(STATE.theme);
    applyCrt(STATE.crtEnabled);
    updateSoundUI();
    renderHeaderHUD();
    renderHeroSection();
    renderAboutSection();
    renderPowerUps();
    renderProjectsAsLevels();
    renderQuests();
    renderContactSection();
    renderFooter();
    setupEventListeners();
    setupScrollAnimations();
    setupVirtualController();
    setupKonamiCode();
  }

  // -----------------------------------------------------------------
  // 3. RENDER COMPONENTS FROM DATA.JS
  // -----------------------------------------------------------------
  function renderHeaderHUD() {
    const data = PORTFOLIO_DATA.player;
    const hudName = document.getElementById('hud-player-name');
    if (hudName) hudName.textContent = data.name.toUpperCase();

    updateScoreDisplay();
  }

  function renderHeroSection() {
    const p = PORTFOLIO_DATA.player;
    const heroName = document.getElementById('hero-name');
    const heroRole = document.getElementById('hero-role');
    const heroLevel = document.getElementById('hero-level-badge');
    const heroDialogue = document.getElementById('hero-dialogue-text');
    const heroAvail = document.getElementById('hero-availability');

    if (heroName) heroName.textContent = p.name;
    if (heroRole) heroRole.textContent = p.role.toUpperCase();
    if (heroLevel) heroLevel.textContent = `LVL ${p.level} DEVELOPER`;
    if (heroDialogue) heroDialogue.textContent = `"${p.tagline.toUpperCase()}"`;
    if (heroAvail) heroAvail.textContent = p.availability.toUpperCase();
  }

  function renderAboutSection() {
    const p = PORTFOLIO_DATA.player;

    // Photo & Fallback
    const photoImg = document.getElementById('player-photo');
    if (photoImg) {
      photoImg.src = p.photoUrl || p.avatarFallback || 'assets/avatar.svg';
      photoImg.onerror = function () {
        this.onerror = null;
        this.src = p.avatarFallback || 'assets/avatar.svg';
      };
    }

    // RPG Character Sheet
    const sheetName = document.getElementById('sheet-name');
    const sheetClass = document.getElementById('sheet-class');
    const sheetLevel = document.getElementById('sheet-level');
    const sheetHpMp = document.getElementById('sheet-hp-mp');
    const sheetAlignment = document.getElementById('sheet-alignment');
    const sheetLocation = document.getElementById('sheet-location');

    if (sheetName) sheetName.textContent = p.name;
    if (sheetClass) sheetClass.textContent = p.classTitle;
    if (sheetLevel) sheetLevel.textContent = `${p.level} (MAX)`;
    if (sheetHpMp) sheetHpMp.textContent = `${p.attributes.hp} | ${p.attributes.mp}`;
    if (sheetAlignment) sheetAlignment.textContent = p.attributes.alignment;
    if (sheetLocation) sheetLocation.textContent = p.location;

    // Bio Paragraphs
    const bioContainer = document.getElementById('about-bio-container');
    if (bioContainer && Array.isArray(p.bio)) {
      bioContainer.innerHTML = p.bio
        .map(paragraph => `<p>&gt; ${escapeHtml(paragraph)}</p>`)
        .join('');
    }

    // Character RPG Stat Bars
    const statsContainer = document.getElementById('about-stats-container');
    if (statsContainer && Array.isArray(p.stats)) {
      statsContainer.innerHTML = p.stats
        .map(stat => `
          <div class="stat-item">
            <div class="stat-header">
              <span>${stat.icon || '⚡'} ${escapeHtml(stat.name)}</span>
              <span>${stat.level}/100</span>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" data-level="${stat.level}"></div>
            </div>
          </div>
        `).join('');
    }
  }

  function renderPowerUps() {
    const container = document.getElementById('powerups-container');
    if (!container || !Array.isArray(PORTFOLIO_DATA.powerUps)) return;

    container.innerHTML = PORTFOLIO_DATA.powerUps.map(cat => `
      <div class="powerup-category-card pixel-box scroll-reveal" id="${cat.id}">
        <div class="powerup-card-header">
          <span class="powerup-cat-icon">${cat.categoryIcon}</span>
          <span class="pixel-badge">${escapeHtml(cat.badge)}</span>
        </div>
        <h3 class="powerup-cat-title">${escapeHtml(cat.categoryName)}</h3>
        <p class="powerup-cat-desc">${escapeHtml(cat.description)}</p>
        
        <ul class="powerup-items-list">
          ${cat.skills.map(skill => `
            <li>
              <button class="powerup-item-btn" data-skill="${escapeHtml(skill.name)}">
                <span class="item-left">
                  <span>${skill.icon}</span>
                  <span>${escapeHtml(skill.name)}</span>
                </span>
                <span class="item-level-tag">${escapeHtml(skill.level)}</span>
              </button>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  function renderProjectsAsLevels() {
    const tabsContainer = document.getElementById('level-tabs-container');
    const levelsContainer = document.getElementById('levels-container');
    if (!levelsContainer || !Array.isArray(PORTFOLIO_DATA.projects)) return;

    // Render Fast Stage Tabs
    if (tabsContainer) {
      tabsContainer.innerHTML = PORTFOLIO_DATA.projects.map((proj, idx) => `
        <button class="level-tab-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" data-target="level-stage-${idx}">
          ${proj.world}
        </button>
      `).join('');
    }

    // Render Project Level Cards
    levelsContainer.innerHTML = PORTFOLIO_DATA.projects.map((proj, idx) => `
      <article class="level-card pixel-box scroll-reveal ${proj.featured ? 'featured-boss' : ''}" id="level-stage-${idx}" data-world="${proj.world}">
        
        <div class="level-card-top">
          <div class="level-world-badge">${proj.world}</div>
          <span class="pixel-badge">${escapeHtml(proj.badge)}</span>
          <span class="level-score-badge">BONUS: ${escapeHtml(proj.score)}</span>
        </div>

        <div class="level-title-group">
          <h3 class="level-title">${escapeHtml(proj.title)}</h3>
          <p class="level-genre">&gt;&gt; GENRE: ${escapeHtml(proj.genre)}</p>
        </div>

        <p class="level-summary">${escapeHtml(proj.summary)}</p>

        <!-- Highlights / Achievements -->
        <div class="level-highlights-box">
          <h4 class="highlights-title">MISSION OBJECTIVES COMPLETED:</h4>
          <ul class="highlights-list">
            ${proj.highlights.map(hl => `
              <li class="highlight-item">
                <span class="highlight-bullet">▶</span>
                <span>${escapeHtml(hl)}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Tech Stack Power-Ups -->
        <div class="level-tech-stack">
          ${proj.techStack.map(tech => `
            <span class="tech-chip">${escapeHtml(tech)}</span>
          `).join('')}
        </div>

        <!-- Action Links -->
        <div class="level-actions">
          ${proj.demoUrl ? `
            <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="pixel-btn primary-btn btn-click-fx">
              <span>▶</span> PLAY DEMO (LIVE)
            </a>
          ` : ''}
          ${proj.githubUrl ? `
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="pixel-btn btn-click-fx">
              <span>⌨</span> SOURCE CART (CODE)
            </a>
          ` : ''}
        </div>

      </article>
    `).join('');
  }

  function renderQuests() {
    const container = document.getElementById('quests-container');
    if (!container || !Array.isArray(PORTFOLIO_DATA.quests)) return;

    container.innerHTML = PORTFOLIO_DATA.quests.map(quest => `
      <div class="quest-item pixel-box scroll-reveal">
        <div class="quest-header">
          <span class="quest-period">${escapeHtml(quest.period)}</span>
          <span class="pixel-badge">${escapeHtml(quest.badge)}</span>
        </div>
        <h3 class="quest-title">${escapeHtml(quest.title)}</h3>
        <p class="quest-guild">${escapeHtml(quest.guild)} // ${escapeHtml(quest.location)}</p>
        <p class="quest-desc">&gt; ${escapeHtml(quest.description)}</p>
      </div>
    `).join('');
  }

  function renderContactSection() {
    const c = PORTFOLIO_DATA.contact;
    const emailLink = document.getElementById('contact-email-link');
    const latencyVal = document.getElementById('contact-latency');
    const locVal = document.getElementById('contact-location');
    const socialsContainer = document.getElementById('contact-socials-container');

    if (emailLink) {
      emailLink.textContent = c.email;
      emailLink.href = `mailto:${c.email}`;
    }
    if (latencyVal) latencyVal.textContent = c.responseLatency;
    if (locVal) locVal.textContent = c.location;

    if (socialsContainer && Array.isArray(c.socials)) {
      socialsContainer.innerHTML = c.socials.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-link-btn btn-click-fx">
          <span>${s.icon} ${escapeHtml(s.name)}</span>
          <span>${escapeHtml(s.handle)}</span>
        </a>
      `).join('');
    }
  }

  function renderFooter() {
    const footerYear = document.getElementById('footer-year');
    const footerName = document.getElementById('footer-name');
    if (footerYear) footerYear.textContent = new Date().getFullYear();
    if (footerName) footerName.textContent = PORTFOLIO_DATA.player.name.toUpperCase();
  }

  // -----------------------------------------------------------------
  // 4. THEME & DISPLAY SWITCHERS
  // -----------------------------------------------------------------
  function applyTheme(theme) {
    STATE.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('retro_theme', theme);

    const themeStateText = document.getElementById('theme-state-text');
    const themeIcon = document.getElementById('theme-icon');

    if (theme === 'light') {
      if (themeStateText) themeStateText.textContent = 'LIGHT';
      if (themeIcon) themeIcon.textContent = '🌙';
    } else {
      if (themeStateText) themeStateText.textContent = 'DARK';
      if (themeIcon) themeIcon.textContent = '☀️';
    }
  }

  function toggleTheme() {
    const newTheme = STATE.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    RetroAudio.blip();
  }

  function applyCrt(enabled) {
    STATE.crtEnabled = enabled;
    if (enabled) {
      document.body.classList.add('crt-enabled');
    } else {
      document.body.classList.remove('crt-enabled');
    }
    localStorage.setItem('retro_crt', enabled);

    const crtStateText = document.getElementById('crt-state-text');
    if (crtStateText) crtStateText.textContent = enabled ? 'ON' : 'OFF';
  }

  function toggleCrt() {
    applyCrt(!STATE.crtEnabled);
    RetroAudio.blip();
  }

  function toggleSound() {
    STATE.soundEnabled = !STATE.soundEnabled;
    localStorage.setItem('retro_sound', STATE.soundEnabled);
    updateSoundUI();
    if (STATE.soundEnabled) {
      RetroAudio.coin();
    }
  }

  function updateSoundUI() {
    const soundStateText = document.getElementById('sound-state-text');
    const soundBtn = document.getElementById('toggle-sound');
    if (soundStateText) {
      soundStateText.textContent = STATE.soundEnabled ? 'ON' : 'OFF';
    }
    if (soundBtn) {
      const iconSpan = soundBtn.querySelector('.btn-icon');
      if (iconSpan) iconSpan.textContent = STATE.soundEnabled ? '🔊' : '🔇';
    }
  }

  function updateScoreDisplay() {
    const scoreEl = document.getElementById('hud-score');
    const coinsEl = document.getElementById('hud-coins');
    if (scoreEl) scoreEl.textContent = String(STATE.score).padStart(6, '0');
    if (coinsEl) coinsEl.textContent = String(STATE.coins).padStart(2, '0');
  }

  function addScore(amount, spawnX, spawnY, text = null) {
    STATE.score += amount;
    updateScoreDisplay();

    if (spawnX && spawnY) {
      spawnFloatingParticle(`+${amount} PTS`, spawnX, spawnY);
    }
  }

  function spawnFloatingParticle(text, x, y) {
    const container = document.getElementById('pixel-particles-overlay');
    if (!container) return;

    const particle = document.createElement('div');
    particle.className = 'pixel-particle';
    particle.textContent = text;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    container.appendChild(particle);
    setTimeout(() => {
      particle.remove();
    }, 1200);
  }

  // -----------------------------------------------------------------
  // 5. EVENT LISTENERS & INTERACTION
  // -----------------------------------------------------------------
  function setupEventListeners() {
    // HUD Toggle buttons
    document.getElementById('toggle-theme')?.addEventListener('click', toggleTheme);
    document.getElementById('toggle-crt')?.addEventListener('click', toggleCrt);
    document.getElementById('toggle-sound')?.addEventListener('click', toggleSound);

    // Interactive Coin in HUD
    document.getElementById('hud-coin-btn')?.addEventListener('click', (e) => {
      STATE.coins += 1;
      RetroAudio.coin();
      const rect = e.currentTarget.getBoundingClientRect();
      addScore(200, rect.left, rect.bottom + 10);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const mobileCloseBtn = document.getElementById('mobile-menu-close');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');

    mobileMenuBtn?.addEventListener('click', () => {
      mobileDrawer?.classList.add('active');
      mobileDrawer?.setAttribute('aria-hidden', 'false');
      RetroAudio.blip();
    });

    mobileCloseBtn?.addEventListener('click', () => {
      mobileDrawer?.classList.remove('active');
      mobileDrawer?.setAttribute('aria-hidden', 'true');
      RetroAudio.blip();
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer?.classList.remove('active');
        mobileDrawer?.setAttribute('aria-hidden', 'true');
        RetroAudio.blip();
      });
    });

    // Level Fast Select Tabs
    document.querySelectorAll('.level-tab-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.level-tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const targetId = this.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          RetroAudio.blip();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });

    // Interactive Power-Up Click Handler
    document.getElementById('powerups-container')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.powerup-item-btn');
      if (!btn) return;

      const skillName = btn.getAttribute('data-skill');
      RetroAudio.powerUp();

      const rect = btn.getBoundingClientRect();
      addScore(500, rect.right - 80, rect.top - 10);

      // Toast notification
      const toast = document.getElementById('powerup-toast');
      if (toast) {
        toast.innerHTML = `<span class="toast-icon">⚡</span> <span>EQUIPPED: ${escapeHtml(skillName)} (+500 EXP)!</span>`;
        toast.classList.add('blink');
        setTimeout(() => toast.classList.remove('blink'), 1500);
      }
    });

    // General Button Audio Click Effect
    document.addEventListener('click', (e) => {
      if (e.target.closest('.btn-click-fx')) {
        RetroAudio.blip();
      }
    });

    // Terminal Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', handleContactSubmit);
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = document.getElementById('contact-submit-btn');
    const statusDiv = document.getElementById('form-status');

    if (!form.checkValidity()) return;

    RetroAudio.powerUp();
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳</span> TRANSMITTING DATA...`;
    }

    setTimeout(() => {
      if (statusDiv) {
        statusDiv.style.display = 'block';
        statusDiv.style.backgroundColor = 'var(--bg-card)';
        statusDiv.style.border = '2px solid var(--border-color)';
        statusDiv.innerHTML = `
          <p style="color: var(--accent-solid); margin-bottom: 0.5rem;">[TRANSMISSION CONFIRMED! ★★★★★]</p>
          <p>THANKS FOR REACHING OUT! VEERAKUMAR V WILL RESPOND SOON.</p>
        `;
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>✔</span> TRANSMISSION SENT`;
      }
      form.reset();
      addScore(1000, window.innerWidth / 2 - 50, window.innerHeight / 2);
    }, 1200);
  }

  // -----------------------------------------------------------------
  // 6. SCROLL PROGRESS & LEVEL REVEAL ANIMATIONS
  // -----------------------------------------------------------------
  function setupScrollAnimations() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const hudWorld = document.getElementById('hud-world');
    const levelCards = document.querySelectorAll('.level-card');
    const statBars = document.querySelectorAll('.stat-bar-fill');

    // Scroll Progress Bar & HUD World updater
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      // Check current level in viewport
      let activeWorld = '1-1';
      levelCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) {
          activeWorld = card.getAttribute('data-world') || '1-1';
        }
      });
      if (hudWorld) hudWorld.textContent = activeWorld.replace('WORLD ', '');
    }, { passive: true });

    // Intersection Observer for Smooth Scroll Reveal
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          // If entry is stats container, animate stat bars
          if (entry.target.classList.contains('about-card-right')) {
            statBars.forEach(bar => {
              const lvl = bar.getAttribute('data-level') || '85';
              bar.style.width = `${lvl}%`;
            });
          }
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
  }

  // -----------------------------------------------------------------
  // 7. VIRTUAL CONTROLLER FOR MOBILE
  // -----------------------------------------------------------------
  function setupVirtualController() {
    const controller = document.getElementById('virtual-controller');
    const toggleBtn = document.getElementById('controller-toggle-btn');
    const toggleText = document.getElementById('controller-toggle-text');

    toggleBtn?.addEventListener('click', () => {
      controller.classList.toggle('collapsed');
      const isCollapsed = controller.classList.contains('collapsed');
      if (toggleText) {
        toggleText.textContent = isCollapsed ? '🎮 CONTROLLER: SHOW' : '🎮 CONTROLLER: HIDE';
      }
      RetroAudio.blip();
    });

    // D-Pad Scroll Up/Down
    document.getElementById('btn-dpad-up')?.addEventListener('click', () => {
      window.scrollBy({ top: -350, behavior: 'smooth' });
      RetroAudio.blip();
    });

    document.getElementById('btn-dpad-down')?.addEventListener('click', () => {
      window.scrollBy({ top: 350, behavior: 'smooth' });
      RetroAudio.blip();
    });

    // D-Pad Level Previous / Next
    const levels = document.querySelectorAll('.level-card');
    document.getElementById('btn-dpad-left')?.addEventListener('click', () => {
      if (STATE.currentLevelIndex > 0) {
        STATE.currentLevelIndex--;
        levels[STATE.currentLevelIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        RetroAudio.blip();
      }
    });

    document.getElementById('btn-dpad-right')?.addEventListener('click', () => {
      if (STATE.currentLevelIndex < levels.length - 1) {
        STATE.currentLevelIndex++;
        levels[STATE.currentLevelIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        RetroAudio.blip();
      }
    });

    // Arcade A Button (Jump / Collect Coin)
    document.getElementById('btn-arcade-a')?.addEventListener('click', () => {
      RetroAudio.jump();
      STATE.coins += 1;
      addScore(100, window.innerWidth - 80, window.innerHeight - 150);
    });

    // Arcade B Button (Theme Switch)
    document.getElementById('btn-arcade-b')?.addEventListener('click', () => {
      toggleTheme();
    });
  }

  // -----------------------------------------------------------------
  // 8. KONAMI CODE EASTER EGG (↑ ↑ ↓ ↓ ← → ← → B A)
  // -----------------------------------------------------------------
  function setupKonamiCode() {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let currentIndex = 0;

    window.addEventListener('keydown', (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = konamiSequence[currentIndex].length === 1
        ? konamiSequence[currentIndex].toLowerCase()
        : konamiSequence[currentIndex];

      if (key === expected) {
        currentIndex++;
        if (currentIndex === konamiSequence.length) {
          triggerKonamiVictory();
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    });
  }

  function triggerKonamiVictory() {
    RetroAudio.victory();
    addScore(999999, window.innerWidth / 2, window.innerHeight / 2);

    alert("★ 30 LIVES UNLOCKED! ★\n\nSECRET RETRO CHEAT CODE ACTIVATED!\nVeerakumar V's portfolio is operating at 999,999 MAXIMUM POWER!");
  }

  // -----------------------------------------------------------------
  // 9. HELPER UTILITIES
  // -----------------------------------------------------------------
  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // -----------------------------------------------------------------
  // 10. RUN ON DOM LOADED
  // -----------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
  } else {
    initPortfolio();
  }

})();
