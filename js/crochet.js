/**
 * 編織日記頁面交互邏輯 (Crochet & Knitting Diary JS)
 * 提供分類切換、拍立得手帳卡片展示、影片播放與日記詳情彈窗
 */

import { soundFx } from './audio.js';
import { crochetCategories, crochetData } from './crochet-data.js';

class CrochetApp {
  constructor() {
    this.currentCategory = 'all';
    this.init();
  }

  init() {
    this.renderFilters();
    this.renderCards();
    this.bindModalEvents();
  }

  renderFilters() {
    const filterContainer = document.getElementById('crochet-filter');
    if (!filterContainer) return;

    filterContainer.innerHTML = crochetCategories.map(cat => {
      const isActive = this.currentCategory === cat.id;
      const activeClass = isActive 
        ? 'bg-gradient-to-r from-pink-400 via-rose-400 to-purple-500 text-white shadow-md shadow-pink-200 border-transparent' 
        : 'bg-white/90 text-[#4A3E3D] hover:bg-purple-50 border-purple-200';

      return `
        <button 
          data-category="${cat.id}"
          class="btn-bouncy px-4 py-2 rounded-full border text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${activeClass}">
          <span>${cat.icon}</span>
          <span>${cat.name}</span>
        </button>
      `;
    }).join('');

    filterContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        soundFx.playPop();
        this.currentCategory = btn.dataset.category;
        this.renderFilters();
        this.renderCards();
      });
    });
  }

  renderCards() {
    const listContainer = document.getElementById('crochet-list');
    if (!listContainer) return;

    const filtered = this.currentCategory === 'all'
      ? crochetData
      : crochetData.filter(item => {
          if (this.currentCategory === 'diary') return item.category === '編織日記';
          if (this.currentCategory === 'video') return item.category === '手作影片';
          if (this.currentCategory === 'photo') return item.category === '成品寫真';
          return true;
        });

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="col-span-full text-center py-16 text-[#8C7A78]">
          <div class="text-4xl mb-2">🧶</div>
          <p class="font-bold">這個分類還沒有手作記錄喔～</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filtered.map(item => {
      const tapeClass = item.tape === 'pink' ? 'washi-tape-pink' : (item.tape === 'lavender' ? 'washi-tape-lavender' : 'washi-tape-yellow');
      const isVideo = item.category === '手作影片';

      return `
        <article class="polaroid-card group cursor-pointer relative bg-white p-4 sm:p-5 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100 flex flex-col justify-between" data-id="${item.id}">
          <!-- 紙膠帶裝飾 -->
          <div class="${tapeClass} -top-3 left-1/2 -translate-x-1/2 w-28 z-10"></div>

          <div>
            <!-- 照片或影片封面容器 -->
            <div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-100 shadow-inner group">
              <img 
                src="${item.image}" 
                alt="${item.title}" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
              />
              <div class="w-full h-full hidden items-center justify-center text-4xl" style="background: ${item.imageBg}">
                ${item.emoji}
              </div>

              <!-- 影片播放標誌遮罩 -->
              ${isVideo ? `
                <div class="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300 group-hover:bg-black/20">
                  <div class="w-14 h-14 rounded-full bg-white/90 text-pink-500 flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 transition-transform">
                    ▶
                  </div>
                  ${item.videoDuration ? `
                    <div class="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold rounded-full flex items-center gap-1">
                      <span>⏱</span> ${item.videoDuration}
                    </div>
                  ` : ''}
                </div>
              ` : ''}

              <!-- 分類徽章 -->
              <div class="absolute top-2.5 left-2.5 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-purple-700 shadow-sm flex items-center gap-1">
                <span>${item.emoji}</span> ${item.category}
              </div>

              <!-- 狀態標籤 -->
              <div class="absolute top-2.5 right-2.5 px-2.5 py-1 bg-pink-100/90 backdrop-blur-sm text-pink-600 rounded-full text-[11px] font-bold shadow-sm">
                ${item.status}
              </div>
            </div>

            <!-- 作品資訊 -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs text-[#8C7A78]">
                <span>📅 ${item.date}</span>
                <span>⏳ ${item.timeSpent}</span>
              </div>

              <h3 class="text-lg sm:text-xl font-black text-[#4A3E3D] group-hover:text-pink-600 transition-colors line-clamp-1">
                ${item.title}
              </h3>

              <p class="text-xs sm:text-sm text-[#8C7A78] leading-relaxed line-clamp-2">
                ${item.summary}
              </p>

              <!-- 線材與針號標籤 -->
              <div class="flex flex-wrap gap-1.5 pt-2">
                <span class="text-[11px] bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full font-bold border border-purple-100">
                  🧶 ${item.yarn.split('（')[0]}
                </span>
                <span class="text-[11px] bg-pink-50 text-pink-600 px-2.5 py-0.5 rounded-full font-bold border border-pink-100">
                  🪡 ${item.hook}
                </span>
              </div>
            </div>
          </div>

          <!-- 底部互動提示 -->
          <div class="pt-4 border-t border-dashed border-purple-100 mt-4 flex items-center justify-between text-xs font-bold text-pink-500">
            <span>${isVideo ? '🎬 點擊觀看縮時與日記' : '📖 翻開手帳看針法與心得'}</span>
            <span class="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </article>
      `;
    }).join('');

    // 綁定卡片點擊事件
    listContainer.querySelectorAll('.polaroid-card').forEach(card => {
      card.addEventListener('click', () => {
        soundFx.playPop();
        const id = card.dataset.id;
        this.openModal(id);
      });
    });
  }

  openModal(id) {
    const item = crochetData.find(d => d.id === id);
    if (!item) return;

    const modalContainer = document.getElementById('crochet-modal');
    if (!modalContainer) return;

    const isVideo = item.category === '手作影片' && item.videoUrl;

    modalContainer.innerHTML = `
      <div id="crochet-modal-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
        <div class="relative bg-[#FAF5EE] w-full max-w-3xl rounded-3xl shadow-2xl border-4 border-white overflow-hidden my-8 max-h-[90vh] flex flex-col">
          
          <!-- 頂部紙膠帶 -->
          <div class="washi-tape-lavender -top-3 left-1/2 -translate-x-1/2 w-40 z-20"></div>

          <!-- 關閉按鈕 -->
          <button id="btn-close-modal" class="absolute top-4 right-4 z-30 w-9 h-9 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center text-lg font-black shadow-md transition-transform hover:scale-110">
            ✕
          </button>

          <!-- 滾動內容區域 -->
          <div class="overflow-y-auto p-6 sm:p-8 space-y-6">
            
            <!-- 影音或主圖展示區 -->
            <div class="rounded-2xl overflow-hidden shadow-md bg-black/5 aspect-video flex items-center justify-center relative">
              ${isVideo ? `
                <iframe 
                  class="w-full h-full"
                  src="${item.videoUrl}" 
                  title="${item.title}" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
                </iframe>
              ` : `
                <img 
                  src="${item.image}" 
                  alt="${item.title}" 
                  class="w-full h-full object-cover"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                />
                <div class="w-full h-full hidden items-center justify-center text-6xl" style="background: ${item.imageBg}">
                  ${item.emoji}
                </div>
              `}
            </div>

            <!-- 標題與基本規格卡 -->
            <div class="space-y-3">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                  ${item.category}
                </span>
                <span class="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-bold">
                  ${item.status}
                </span>
                <span class="text-xs text-[#8C7A78] font-bold ml-auto">
                  📅 ${item.date} • 耗時 ${item.timeSpent}
                </span>
              </div>

              <h2 class="text-2xl sm:text-3xl font-black text-[#4A3E3D]">
                ${item.title}
              </h2>
            </div>

            <!-- 編織工具與材料清單 (手帳標籤便條風格) -->
            <div class="bg-white/80 border-2 border-dashed border-purple-200 p-4 rounded-2xl space-y-2">
              <h4 class="text-xs font-black text-purple-800 tracking-wider uppercase flex items-center gap-1.5">
                <span>🧶</span> 線材與規格說明
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#4A3E3D]">
                <div><span class="font-bold text-[#8C7A78]">選用線材：</span>${item.yarn}</div>
                <div><span class="font-bold text-[#8C7A78]">使用工具：</span>${item.hook}</div>
              </div>
            </div>

            <!-- 手帳日記正文 -->
            <div class="space-y-3">
              <h4 class="text-xs font-black text-pink-600 tracking-wider uppercase flex items-center gap-1.5">
                <span>📖</span> 編織手帳隨筆
              </h4>
              <div class="text-sm sm:text-base text-[#4A3E3D] leading-relaxed whitespace-pre-line bg-white/50 p-5 rounded-2xl border border-amber-100">
                ${item.diary.trim()}
              </div>
            </div>

            <!-- 針法筆記 -->
            ${item.patternNotes ? `
              <div class="bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl space-y-1">
                <h4 class="text-xs font-bold text-amber-900 flex items-center gap-1">
                  <span>💡</span> 針法筆記與技巧小撇步
                </h4>
                <p class="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  ${item.patternNotes}
                </p>
              </div>
            ` : ''}

            <!-- 標籤 -->
            <div class="flex flex-wrap gap-2 pt-2">
              ${item.tags.map(t => `
                <span class="px-3 py-1 bg-white border border-purple-200 text-purple-700 text-xs font-bold rounded-full shadow-sm">
                  #${t}
                </span>
              `).join('')}
            </div>

          </div>
        </div>
      </div>
    `;

    modalContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // 關閉邏輯
    const closeBtn = document.getElementById('btn-close-modal');
    const backdrop = document.getElementById('crochet-modal-backdrop');

    const closeModal = () => {
      soundFx.playPop();
      modalContainer.classList.add('hidden');
      modalContainer.innerHTML = '';
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
      });
    }
  }

  bindModalEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modalContainer = document.getElementById('crochet-modal');
        if (modalContainer && !modalContainer.classList.contains('hidden')) {
          modalContainer.classList.add('hidden');
          modalContainer.innerHTML = '';
          document.body.style.overflow = '';
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CrochetApp();
});
