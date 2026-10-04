/**
 * 手帳彈窗系統 (Modals)
 * 用於展示專案詳細手帳與文章完整閱讀
 */

import { soundFx } from './audio.js';
import { projectsData, blogPosts } from './data.js';

export function initModals() {
  const modalContainer = document.getElementById('global-modal-container');
  if (!modalContainer) return;

  // 關閉彈窗
  window.closeModal = () => {
    soundFx.playPop();
    modalContainer.classList.add('hidden');
    modalContainer.innerHTML = '';
    document.body.style.overflow = 'auto';
  };

  // 點擊背景關閉
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer || e.target.classList.contains('modal-backdrop')) {
      window.closeModal();
    }
  });

  // ESC 鍵關閉
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalContainer.classList.contains('hidden')) {
      window.closeModal();
    }
  });

  // 開啟專案詳情彈窗
  window.openProjectModal = (projectId) => {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    soundFx.playChime();
    document.body.style.overflow = 'hidden';

    modalContainer.innerHTML = `
      <div class="modal-backdrop fixed inset-0 bg-purple-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl border-4 border-[#F3E8FF] shadow-2xl p-6 md:p-8 transform transition-all animate-float">
          
          <!-- 頂部粉紅紙膠帶 -->
          <div class="washi-tape-pink -top-3 left-1/2 -translate-x-1/2 w-36"></div>

          <!-- 關閉按鈕 -->
          <button onclick="closeModal()" class="btn-bouncy absolute -top-3 -right-3 w-10 h-10 bg-pink-400 text-white font-bold rounded-full border-2 border-white shadow-lg flex items-center justify-center text-lg z-20">
            ✕
          </button>

          <!-- 彈窗內容 -->
          <div class="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            <!-- 標題與標籤 -->
            <div class="flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-purple-100 pb-3">
              <div>
                <span class="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">${project.category}</span>
                <span class="text-xs text-gray-500 ml-2">📅 ${project.date}</span>
                <h3 class="text-2xl font-bold text-[#4A3E3D] mt-1">${project.title}</h3>
              </div>
              <span class="text-sm font-bold text-pink-500 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full flex items-center gap-1">
                ❤️ ${project.likes} 人喜愛
              </span>
            </div>

            <!-- 手繪示意插畫圖 -->
            <div class="w-full h-48 rounded-2xl flex items-center justify-center p-6 text-center relative overflow-hidden shadow-inner border border-purple-100" style="background: ${project.imageBg}">
              <div class="space-y-2">
                <span class="text-5xl animate-bounce inline-block">✨🦙🍓</span>
                <p class="text-sm font-bold text-purple-900/80">${project.summary}</p>
              </div>
            </div>

            <!-- 詳細介紹 -->
            <div class="bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
              <h4 class="text-sm font-bold text-purple-700 flex items-center gap-1 mb-2">
                <span>📖</span> 專案詳細手記
              </h4>
              <p class="text-sm text-[#4A3E3D] leading-relaxed">${project.details}</p>
            </div>

            <!-- 技術標籤 -->
            <div>
              <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">使用魔法 (Tech Stack)</h4>
              <div class="flex flex-wrap gap-2">
                ${project.tags.map(t => `<span class="text-xs font-bold px-3 py-1 bg-white border border-purple-200 rounded-lg text-purple-600 shadow-sm">🪄 ${t}</span>`).join('')}
              </div>
            </div>

            <!-- 動作按鈕 -->
            <div class="flex items-center justify-end gap-3 pt-3">
              <button onclick="closeModal()" class="px-5 py-2 rounded-full border border-purple-200 text-purple-600 text-sm font-bold hover:bg-purple-50">
                返回手帳
              </button>
              <a href="${project.demoUrl}" ${/^https?:\/\//.test(project.demoUrl) ? 'target="_blank" rel="noopener noreferrer"' : ''} class="btn-bouncy px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-sm font-bold rounded-full shadow-md flex items-center gap-1.5">
                <span>${project.icon || '🚀'}</span> ${project.btnText || '前往體驗'}
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    modalContainer.classList.remove('hidden');
  };

  // 開啟部落格文章詳情
  window.openBlogModal = (postId) => {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;

    soundFx.playChime();
    document.body.style.overflow = 'hidden';

    modalContainer.innerHTML = `
      <div class="modal-backdrop fixed inset-0 bg-purple-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl border-4 border-[#F3E8FF] shadow-2xl p-6 md:p-8 transform transition-all">
          
          <!-- 頂部手帳紙膠帶 -->
          <div class="washi-tape-lavender -top-3 left-1/2 -translate-x-1/2 w-40"></div>

          <!-- 關閉按鈕 -->
          <button onclick="closeModal()" class="btn-bouncy absolute -top-3 -right-3 w-10 h-10 bg-purple-400 text-white font-bold rounded-full border-2 border-white shadow-lg flex items-center justify-center text-lg z-20">
            ✕
          </button>

          <!-- 文章內容 -->
          <div class="space-y-4 max-h-[80vh] overflow-y-auto pr-3">
            <div class="border-b-2 border-dashed border-purple-100 pb-3">
              <div class="flex items-center gap-2 text-xs text-purple-600 font-bold mb-1">
                <span class="bg-pink-100 px-2 py-0.5 rounded-full">${post.category}</span>
                <span>📅 ${post.date}</span>
                <span>⏱️ ${post.readTime}</span>
              </div>
              <h3 class="text-2xl font-bold text-[#4A3E3D]">${post.title}</h3>
            </div>

            <!-- 手帳筆記排版 -->
            <div class="bg-amber-50/40 p-5 rounded-2xl border border-amber-100/80 prose text-sm text-[#4A3E3D] leading-relaxed space-y-3">
              ${post.content.replace(/\n\n/g, '<br/><br/>').replace(/## (.*)/g, '<h4 class="text-base font-bold text-purple-700 mt-2 mb-1">$1</h4>')}
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-purple-100">
              <span class="text-xs text-gray-500">🍓 森麟的手帳隨筆</span>
              <button onclick="closeModal()" class="btn-bouncy px-5 py-2 bg-purple-400 text-white text-xs font-bold rounded-full shadow-sm">
                讀完關閉 ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modalContainer.classList.remove('hidden');
  };
}
