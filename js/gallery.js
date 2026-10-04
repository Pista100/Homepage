/**
 * 圖像創作藝廊頁面腳本 (Gallery Page Logic)
 * 處理作品分類篩選、拍立得卡片渲染與大圖作品手帳彈窗
 */

import { galleryData } from './gallery-data.js';
import { soundFx } from './audio.js';
import { initCursorParticles } from './cursor.js';

const escapeHtml = (str = '') =>
  str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

document.addEventListener('DOMContentLoaded', () => {
  initCursorParticles();

  const listEl = document.getElementById('gallery-list');
  const filterEl = document.getElementById('gallery-filter');
  const modalEl = document.getElementById('image-modal');
  let currentCategory = '全部';

  // 取得所有作品分類標籤
  const categories = ['全部', ...new Set(galleryData.map(item => item.category))];

  // 渲染分類篩選按鈕
  filterEl.innerHTML = categories.map(cat => `
    <button data-cat="${escapeHtml(cat)}" class="filter-btn btn-bouncy px-5 py-2 rounded-full text-xs md:text-sm font-bold border-2 border-purple-200 bg-white text-purple-700 shadow-sm transition-all">
      ${cat === '全部' ? '✨ ' : cat === '插畫手繪' ? '🎨 ' : '📷 '}${escapeHtml(cat)}
    </button>
  `).join('');

  // 點擊分類按鈕
  filterEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    soundFx.playPop();
    currentCategory = btn.dataset.cat;
    renderGallery();
  });

  // 渲染藝廊卡片
  function renderGallery() {
    // 切換按鈕 active 樣式
    filterEl.querySelectorAll('.filter-btn').forEach(btn => {
      const isActive = btn.dataset.cat === currentCategory;
      btn.classList.toggle('bg-purple-500', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('border-purple-500', isActive);
      btn.classList.toggle('shadow-md', isActive);
      btn.classList.toggle('bg-white', !isActive);
      btn.classList.toggle('text-purple-700', !isActive);
    });

    const items = currentCategory === '全部'
      ? galleryData
      : galleryData.filter(item => item.category === currentCategory);

    if (items.length === 0) {
      listEl.innerHTML = `
        <div class="col-span-full text-center py-16 space-y-2">
          <span class="text-4xl inline-block animate-bounce">🎨</span>
          <p class="text-sm font-bold text-[#8C7A78]">這個分類目前還沒有作品，稍後會陸續上架喔！</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = items.map((art, idx) => `
      <article data-id="${escapeHtml(art.id)}" 
               class="gallery-card polaroid-card group cursor-pointer relative"
               style="transform: rotate(${(idx % 2 === 0 ? -1 : 1.2)}deg);">
        
        <!-- 手帳紙膠帶 -->
        <div class="washi-tape-${art.tape || 'pink'} -top-3 left-1/2 -translate-x-1/2 w-28"></div>

        <!-- 圖片展示框 -->
        <div class="w-full h-56 md:h-64 rounded-lg overflow-hidden relative shadow-inner bg-purple-50/50 flex items-center justify-center">
          <img src="${escapeHtml(art.image)}" 
               alt="${escapeHtml(art.title)}"
               loading="lazy"
               class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          
          <!-- 若圖片載入失敗時的備用手繪風插畫卡 -->
          <div class="w-full h-full hidden items-center justify-center p-4 text-center" style="background: ${art.imageBg};">
            <div>
              <span class="text-4xl">${art.emoji || '🎨'}</span>
              <p class="text-xs font-bold text-purple-900/80 mt-1">${escapeHtml(art.title)}</p>
            </div>
          </div>

          <!-- 分類標籤 -->
          <span class="absolute top-2.5 right-2.5 text-[11px] font-bold px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-700 rounded-full shadow-sm">
            ${escapeHtml(art.category)}
          </span>
        </div>

        <!-- 拍立得下方標題與細節 -->
        <div class="mt-4 space-y-1.5 text-left">
          <div class="flex items-center justify-between text-xs text-[#8C7A78] font-bold">
            <span>📅 ${escapeHtml(art.date)}</span>
            <span class="text-purple-600 truncate max-w-[130px]">🛠️ ${escapeHtml(art.tool)}</span>
          </div>

          <h3 class="text-base font-black text-[#4A3E3D] group-hover:text-purple-600 transition-colors">
            ${escapeHtml(art.title)}
          </h3>

          <p class="text-xs text-[#6B5B59] line-clamp-2 leading-relaxed">
            ${escapeHtml(art.story)}
          </p>

          <div class="flex items-center justify-between pt-2">
            <div class="flex flex-wrap gap-1">
              ${(art.tags || []).slice(0, 2).map(tag => `
                <span class="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-md font-bold">#${escapeHtml(tag)}</span>
              `).join('')}
            </div>
            <span class="text-xs font-bold text-pink-500 group-hover:translate-x-1 transition-transform inline-flex items-center">
              放大欣賞 ↗
            </span>
          </div>
        </div>

      </article>
    `).join('');
  }

  // 點擊卡片開啟作品大圖詳情彈窗
  listEl.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-card');
    if (!card) return;
    const art = galleryData.find(item => item.id === card.dataset.id);
    if (!art) return;

    soundFx.playChime();

    modalEl.innerHTML = `
      <div class="modal-backdrop fixed inset-0 bg-purple-950/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl border-4 border-[#F3E8FF] shadow-2xl p-6 md:p-8 transform transition-all animate-float">
          
          <!-- 頂部紙膠帶 -->
          <div class="washi-tape-${art.tape || 'pink'} -top-3 left-1/2 -translate-x-1/2 w-40"></div>

          <!-- 關閉按鈕 -->
          <button class="close-modal btn-bouncy absolute -top-3 -right-3 w-10 h-10 bg-pink-400 text-white font-bold rounded-full border-2 border-white shadow-lg flex items-center justify-center text-lg z-20">
            ✕
          </button>

          <!-- 彈窗內容滾動區 -->
          <div class="max-h-[82vh] overflow-y-auto pr-2 space-y-4">
            
            <!-- 大圖預覽 -->
            <div class="w-full max-h-[55vh] rounded-2xl overflow-hidden bg-purple-50/50 shadow-inner flex items-center justify-center border border-purple-100">
              <img src="${escapeHtml(art.image)}" 
                   alt="${escapeHtml(art.title)}"
                   class="w-full h-full object-contain max-h-[55vh]"
                   onerror="this.parentElement.innerHTML='<div class=\\'p-12 text-center\\'><span class=\\'text-5xl\\'>${art.emoji || '🎨'}</span><p class=\\'mt-2 font-bold text-gray-500\\'>${escapeHtml(art.title)}</p></div>'" />
            </div>

            <!-- 標題與基本資料 -->
            <div class="flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-purple-100 pb-3">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-purple-600 mb-1">
                  <span class="bg-pink-100 text-pink-600 px-3 py-0.5 rounded-full">${escapeHtml(art.category)}</span>
                  <span>📅 ${escapeHtml(art.date)}</span>
                  <span>🛠️ ${escapeHtml(art.tool)}</span>
                </div>
                <h2 class="text-2xl md:text-3xl font-black text-[#4A3E3D]">${escapeHtml(art.title)}</h2>
              </div>
            </div>

            <!-- 創作手記 / 心得 -->
            <div class="bg-purple-50/50 p-4 md:p-5 rounded-2xl border border-purple-100 space-y-2">
              <h4 class="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1">
                <span>📝</span> 創作心境手記
              </h4>
              <p class="text-sm text-[#4A3E3D] leading-relaxed">
                ${escapeHtml(art.story)}
              </p>
            </div>

            <!-- 標籤 -->
            <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div class="flex flex-wrap gap-1.5">
                ${(art.tags || []).map(tag => `
                  <span class="text-xs font-bold px-3 py-1 bg-white border border-purple-200 rounded-lg text-purple-700 shadow-sm">#${escapeHtml(tag)}</span>
                `).join('')}
              </div>

              <button class="close-modal btn-bouncy px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs font-bold rounded-full shadow-md">
                關閉作品 🌸
              </button>
            </div>

          </div>
        </div>
      </div>
    `;

    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  // 關閉彈窗
  const closeModal = () => {
    soundFx.playPop();
    modalEl.classList.add('hidden');
    modalEl.innerHTML = '';
    document.body.style.overflow = '';
  };

  modalEl.addEventListener('click', (e) => {
    if (e.target.closest('.close-modal') || e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
      closeModal();
    }
  });

  // 初始化第一次渲染
  renderGallery();
});
