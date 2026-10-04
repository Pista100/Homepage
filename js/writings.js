/**
 * 文章作品頁 (Writings Page)
 * 渲染作品卡片、類型篩選與閱讀彈窗
 */

import { writingsData } from './writings-data.js';
import { soundFx } from './audio.js';
import { initCursorParticles } from './cursor.js';

const escapeHtml = (str = '') =>
  str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

document.addEventListener('DOMContentLoaded', () => {
  initCursorParticles();

  const listEl = document.getElementById('writings-list');
  const filterEl = document.getElementById('writings-filter');
  const modalEl = document.getElementById('reader-modal');
  let currentType = '全部';

  // 類型篩選按鈕
  const types = ['全部', ...new Set(writingsData.map(w => w.type))];
  filterEl.innerHTML = types.map(t => `
    <button data-type="${escapeHtml(t)}" class="filter-btn btn-bouncy px-4 py-1.5 rounded-full text-sm font-bold border-2 border-purple-200 bg-white text-purple-600">
      ${escapeHtml(t)}
    </button>`).join('');

  filterEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    soundFx.playPop();
    currentType = btn.dataset.type;
    render();
  });

  function render() {
    filterEl.querySelectorAll('.filter-btn').forEach(b => {
      const active = b.dataset.type === currentType;
      b.classList.toggle('bg-purple-400', active);
      b.classList.toggle('text-white', active);
      b.classList.toggle('bg-white', !active);
      b.classList.toggle('text-purple-600', !active);
    });

    const items = currentType === '全部' ? writingsData : writingsData.filter(w => w.type === currentType);

    if (items.length === 0) {
      listEl.innerHTML = `<p class="col-span-full text-center text-[#8C7A78] py-10">這裡還沒有作品，敬請期待 🌸</p>`;
      return;
    }

    listEl.innerHTML = items.map((w, i) => `
      <article data-id="${escapeHtml(w.id)}" class="writing-card sticky-note clickable p-6 pt-8 border border-black/5 flex flex-col gap-3"
               style="background-color: ${w.color || '#FFF9ED'}; transform: rotate(${i % 2 ? 1 : -1}deg);">
        <div class="washi-tape-${['pink', 'lavender', 'yellow'][i % 3]} -top-3 left-1/2 -translate-x-1/2 w-24"></div>
        <div class="flex items-center gap-2 text-xs font-bold">
          <span class="bg-white/80 text-purple-600 px-2.5 py-0.5 rounded-full">${escapeHtml(w.type)}</span>
          <span class="text-[#8C7A78]">${escapeHtml(w.date)}</span>
        </div>
        <h3 class="text-xl font-bold text-[#4A3E3D]">${escapeHtml(w.title)}</h3>
        <p class="text-sm text-[#6B5B59] leading-relaxed line-clamp-3">${escapeHtml(w.excerpt)}</p>
        <div class="flex flex-wrap gap-1.5 mt-auto pt-2">
          ${(w.tags || []).map(t => `<span class="text-[11px] bg-white/70 text-[#7B4B28] px-2 py-0.5 rounded-md font-bold">#${escapeHtml(t)}</span>`).join('')}
        </div>
        <span class="text-sm text-pink-500 font-bold self-end">翻開閱讀 →</span>
      </article>`).join('');
  }

  // 開啟閱讀彈窗
  listEl.addEventListener('click', (e) => {
    const card = e.target.closest('.writing-card');
    if (!card) return;
    const w = writingsData.find(x => x.id === card.dataset.id);
    if (!w) return;
    soundFx.playChime();

    const paragraphs = w.content.split(/\n\s*\n/).map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br/>')}</p>`).join('');
    const linkBtn = w.link
      ? `<a href="${escapeHtml(w.link)}" target="_blank" rel="noopener noreferrer" class="btn-bouncy px-5 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-sm font-bold rounded-full shadow-md">前往原文 ↗</a>`
      : '';

    modalEl.innerHTML = `
      <div class="modal-backdrop fixed inset-0 bg-purple-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl border-4 border-[#F3E8FF] shadow-2xl p-6 md:p-10">
          <div class="washi-tape-lavender -top-3 left-1/2 -translate-x-1/2 w-40"></div>
          <button class="close-reader btn-bouncy absolute -top-3 -right-3 w-10 h-10 bg-purple-400 text-white font-bold rounded-full border-2 border-white shadow-lg flex items-center justify-center text-lg">✕</button>
          <div class="max-h-[78vh] overflow-y-auto pr-2 space-y-5">
            <div class="border-b-2 border-dashed border-purple-100 pb-4">
              <div class="flex items-center gap-2 text-xs font-bold text-purple-600 mb-2">
                <span class="bg-pink-100 px-2.5 py-0.5 rounded-full">${escapeHtml(w.type)}</span>
                <span class="text-[#8C7A78]">${escapeHtml(w.date)}</span>
              </div>
              <h2 class="text-2xl md:text-3xl font-bold text-[#4A3E3D]">${escapeHtml(w.title)}</h2>
            </div>
            <div class="reader-body text-base text-[#4A3E3D] leading-loose space-y-4">${paragraphs}</div>
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-purple-100">
              ${linkBtn}
              <button class="close-reader btn-bouncy px-5 py-2 border-2 border-purple-200 text-purple-600 text-sm font-bold rounded-full">闔上書本</button>
            </div>
          </div>
        </div>
      </div>`;
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  const closeReader = () => {
    soundFx.playPop();
    modalEl.classList.add('hidden');
    modalEl.innerHTML = '';
    document.body.style.overflow = '';
  };

  modalEl.addEventListener('click', (e) => {
    if (e.target.closest('.close-reader') || e.target.classList.contains('modal-backdrop')) closeReader();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) closeReader();
  });

  render();
});
