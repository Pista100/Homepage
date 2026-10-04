/**
 * 粉紅草泥馬互動吉祥物組件 (Pink Alpaca Mascot)
 * 100% 忠實還原森麟的手繪原稿質感，支援目光跟隨、多表情切換、投餵草莓與戳戳氣泡互動
 */

import { soundFx } from './audio.js';
import { alpacaQuotes } from './data.js';

export class AlpacaMascot {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentMood = 'happy';
    this.quoteIndex = 0;
    this.isEating = false;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.bindEvents();
  }

  /**
   * 渲染吉祥物視覺本體與眼睛圖層
   */
  getMascotVisual(mood = 'happy') {
    return `
      <div class="relative w-full h-full select-none" style="aspect-ratio: 760 / 630;">
        <!-- 柔和陰影 -->
        <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-5 bg-purple-300/25 rounded-full blur-md pointer-events-none"></div>

        <!-- 忠於手繪原稿的粉紅雲朵吉祥物主體 (身體、五官嘴巴、手繪鋸齒腮紅) -->
        <img 
          src="./assets/alpaca-mascot-body.png" 
          alt="森麟的手繪粉紅羊駝吉祥物" 
          class="w-full h-full object-contain filter drop-shadow-md pointer-events-none transition-transform duration-300 group-hover:scale-105"
          draggable="false"
        />

        <!-- 戴在頭上的草莓皇冠裝飾 -->
        <div class="absolute -top-3 left-[48%] -translate-x-1/2 animate-bounce pointer-events-none select-none" style="animation-duration: 2.8s;">
          <span class="text-2xl sm:text-3xl filter drop-shadow">🍓</span>
        </div>

        <!-- 互動眼睛圖層容器 -->
        <div id="alpaca-eyes-layer" class="absolute inset-0 pointer-events-none">
          ${this.renderEyes(mood)}
        </div>
      </div>
    `;
  }

  /**
   * 根據心情渲染不同眼睛效果
   */
  renderEyes(mood) {
    if (mood === 'winking') {
      return `
        <!-- 左眼：手繪眨眼弧線 + 星星 -->
        <div class="absolute" style="left: 27.83%; top: 29.60%; transform: translate(-50%, -50%);">
          <svg width="46" height="34" viewBox="0 0 46 34" fill="none">
            <path d="M 6 22 Q 23 8 40 22" stroke="#4A3E44" stroke-width="5" stroke-linecap="round" fill="none" />
            <text x="28" y="10" font-size="14">✨</text>
          </svg>
        </div>
        <!-- 右眼：手繪大黑眼珠跟隨滑鼠 -->
        <div class="eye-track-wrapper absolute" style="left: 71.12%; top: 26.51%; width: 12.5%; aspect-ratio: 1/1; transform: translate(-50%, -50%);">
          <img 
            id="right-pupil" 
            class="eye-pupil w-full h-full object-contain filter drop-shadow-sm transition-transform duration-75" 
            src="./assets/alpaca-eye-right.png" 
            alt="手繪眼睛" 
            draggable="false"
          />
        </div>
      `;
    } else if (mood === 'heart') {
      return `
        <!-- 愛心眼 (向左上微調，保持鼻子在兩眼中心對齊) -->
        <div class="absolute" style="left: 27.5%; top: 25.8%; transform: translate(-50%, -50%);">
          <div class="animate-bounce flex items-center justify-center" style="animation-duration: 0.8s;">
            <span class="text-3xl sm:text-4xl filter drop-shadow-sm select-none">💖</span>
          </div>
        </div>
        <div class="absolute" style="left: 72.5%; top: 25.2%; transform: translate(-50%, -50%);">
          <div class="animate-bounce flex items-center justify-center" style="animation-duration: 0.8s;">
            <span class="text-3xl sm:text-4xl filter drop-shadow-sm select-none">💖</span>
          </div>
        </div>
      `;
    } else if (mood === 'surprised') {
      return `
        <!-- 驚訝大眼睛 (放大並輕微抖動) -->
        <div class="eye-track-wrapper absolute animate-pulse" style="left: 27.83%; top: 29.60%; width: 14%; aspect-ratio: 1/1; transform: translate(-50%, -50%) scale(1.15);">
          <img 
            id="left-pupil" 
            class="eye-pupil w-full h-full object-contain filter drop-shadow-sm transition-transform duration-75" 
            src="./assets/alpaca-eye-left.png" 
            alt="手繪左眼" 
            draggable="false"
          />
        </div>
        <div class="eye-track-wrapper absolute animate-pulse" style="left: 71.12%; top: 26.51%; width: 14%; aspect-ratio: 1/1; transform: translate(-50%, -50%) scale(1.15);">
          <img 
            id="right-pupil" 
            class="eye-pupil w-full h-full object-contain filter drop-shadow-sm transition-transform duration-75" 
            src="./assets/alpaca-eye-right.png" 
            alt="手繪右眼" 
            draggable="false"
          />
        </div>
      `;
    } else {
      // 預設 happy：手繪雙眼，自帶十字閃爍高光，眼珠靈活跟隨滑鼠移動
      return `
        <!-- 左眼 (手繪高光黑眼珠，目光跟隨滑鼠) -->
        <div class="eye-track-wrapper absolute" style="left: 27.83%; top: 29.60%; width: 12.5%; aspect-ratio: 1/1; transform: translate(-50%, -50%);">
          <img 
            id="left-pupil" 
            class="eye-pupil w-full h-full object-contain filter drop-shadow-sm transition-transform duration-75" 
            src="./assets/alpaca-eye-left.png" 
            alt="手繪左眼" 
            draggable="false"
          />
        </div>

        <!-- 右眼 (手繪高光黑眼珠，目光跟隨滑鼠) -->
        <div class="eye-track-wrapper absolute" style="left: 71.12%; top: 26.51%; width: 12.5%; aspect-ratio: 1/1; transform: translate(-50%, -50%);">
          <img 
            id="right-pupil" 
            class="eye-pupil w-full h-full object-contain filter drop-shadow-sm transition-transform duration-75" 
            src="./assets/alpaca-eye-right.png" 
            alt="手繪右眼" 
            draggable="false"
          />
        </div>
      `;
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="relative flex flex-col items-center group">
        <!-- 說話氣泡 (Speech Bubble) -->
        <div id="alpaca-speech" class="absolute -top-14 bg-white/95 backdrop-blur-sm border-2 border-purple-200 px-4 py-2 rounded-2xl shadow-lg transition-all duration-300 transform scale-100 z-30 flex items-center gap-2 cursor-pointer hover:scale-105">
          <span class="text-sm md:text-base font-bold text-[#4A3E3D]" id="alpaca-quote-text">${alpacaQuotes[0]}</span>
          <span class="text-xs bg-pink-100 text-pink-500 font-bold px-2 py-0.5 rounded-full animate-pulse">戳戳我!</span>
          <!-- 氣泡箭頭 -->
          <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-purple-200 rotate-45"></div>
        </div>

        <!-- 草泥馬視覺主體 (點擊互動，縮小至 80%) -->
        <div id="alpaca-svg-wrapper" class="w-[205px] sm:w-[230px] md:w-[256px] cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95">
          ${this.getMascotVisual(this.currentMood)}
        </div>

        <!-- 互動控制按鈕組 -->
        <div class="flex items-center gap-3 mt-4 z-20">
          <button id="btn-feed-alpaca" class="btn-bouncy flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full text-sm font-bold shadow-md shadow-pink-200 hover:shadow-lg transition-all">
            <span>🍓</span> 投餵草莓
          </button>
          <button id="btn-change-mood" class="btn-bouncy flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-full text-sm font-bold shadow-md shadow-purple-200 hover:shadow-lg transition-all">
            <span>✨</span> 換表情
          </button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const mascotWrapper = document.getElementById('alpaca-svg-wrapper');
    const speechBubble = document.getElementById('alpaca-speech');
    const feedBtn = document.getElementById('btn-feed-alpaca');
    const moodBtn = document.getElementById('btn-change-mood');

    // 點擊草泥馬換台詞與表情
    const triggerPoke = (e) => {
      soundFx.playBoing();
      this.cycleQuote();
      this.triggerHeartExplosion(e);
      if (mascotWrapper) {
        mascotWrapper.classList.add('animate-pulse-gentle');
        setTimeout(() => mascotWrapper.classList.remove('animate-pulse-gentle'), 600);
      }
    };

    if (mascotWrapper) mascotWrapper.addEventListener('click', triggerPoke);
    if (speechBubble) speechBubble.addEventListener('click', triggerPoke);

    // 投餵草莓
    if (feedBtn) {
      feedBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.feedStrawberry();
      });
    }

    // 換表情
    if (moodBtn) {
      moodBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.cycleMood();
      });
    }

    // 滑鼠眼珠跟隨微動效 (保留手繪大眼睛自然靈活的目光跟隨)
    window.addEventListener('mousemove', (e) => {
      if (this.currentMood !== 'happy' && this.currentMood !== 'winking') return;
      const pupils = document.querySelectorAll('.eye-pupil');
      pupils.forEach(pupil => {
        const rect = pupil.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.hypot(dx, dy);
        
        // 最大偏移量依 80% 縮放比例限制在 5.2px 內，既有跟隨感又不會跑出眼眶
        const maxOffset = 5.2;
        const move = Math.min(maxOffset, dist / 30);
        const angle = Math.atan2(dy, dx);
        const offsetX = Math.cos(angle) * move;
        const offsetY = Math.sin(angle) * move;
        pupil.style.transform = `translate(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px)`;
      });
    });
  }

  cycleQuote() {
    this.quoteIndex = (this.quoteIndex + 1) % alpacaQuotes.length;
    const textEl = document.getElementById('alpaca-quote-text');
    if (textEl) {
      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.innerText = alpacaQuotes[this.quoteIndex];
        textEl.style.opacity = '1';
      }, 150);
    }
  }

  cycleMood() {
    soundFx.playPop();
    const moods = ['happy', 'winking', 'heart', 'surprised'];
    const nextIdx = (moods.indexOf(this.currentMood) + 1) % moods.length;
    this.currentMood = moods[nextIdx];
    this.updateMoodVisual();
  }

  updateMoodVisual() {
    const eyesLayer = document.getElementById('alpaca-eyes-layer');
    if (eyesLayer) {
      eyesLayer.innerHTML = this.renderEyes(this.currentMood);
    }
  }

  feedStrawberry() {
    if (this.isEating) return;
    this.isEating = true;
    soundFx.playCelebration();

    // 產生掉入嘴巴的草莓動畫
    const strawberry = document.createElement('div');
    strawberry.innerText = '🍓';
    strawberry.className = 'fixed text-3xl pointer-events-none z-50 transition-all duration-700 ease-in';
    const feedBtn = document.getElementById('btn-feed-alpaca');
    const mascotWrapper = document.getElementById('alpaca-svg-wrapper');
    if (!feedBtn || !mascotWrapper) return;

    const btnRect = feedBtn.getBoundingClientRect();
    const targetRect = mascotWrapper.getBoundingClientRect();

    strawberry.style.left = `${btnRect.left + 20}px`;
    strawberry.style.top = `${btnRect.top}px`;
    document.body.appendChild(strawberry);

    setTimeout(() => {
      // 嘴巴中心大約在吉祥物中間偏上 (x: 48%, y: 26%)
      strawberry.style.left = `${targetRect.left + targetRect.width * 0.48 - 14}px`;
      strawberry.style.top = `${targetRect.top + targetRect.height * 0.26 - 14}px`;
      strawberry.style.transform = 'scale(0.2) rotate(180deg)';
      strawberry.style.opacity = '0';
    }, 50);

    setTimeout(() => {
      strawberry.remove();
      this.currentMood = 'heart';
      this.updateMoodVisual();
      
      const quoteEl = document.getElementById('alpaca-quote-text');
      if (quoteEl) quoteEl.innerText = '好吃好吃！草莓最棒惹～ 🍓✨';

      // 投餵煙火
      if (window.confetti) {
        window.confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      }

      setTimeout(() => {
        this.currentMood = 'happy';
        this.updateMoodVisual();
        this.isEating = false;
      }, 2000);
    }, 750);
  }

  triggerHeartExplosion(e) {
    if (window.confetti) {
      window.confetti({
        particleCount: 25,
        spread: 50,
        origin: {
          x: e ? e.clientX / window.innerWidth : 0.5,
          y: e ? e.clientY / window.innerHeight : 0.5
        },
        colors: ['#FF8FA3', '#FFB3C1', '#B794F4', '#FEF08A']
      });
    }
  }
}
