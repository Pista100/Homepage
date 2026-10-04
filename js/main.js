/**
 * 主程式進入點 (Main Application Entry)
 * 初始化所有手帳模組、資料渲染與互動音效綁定
 */

import { siteProfile, skillsData, projectsData, blogPosts } from './data.js';
import { soundFx } from './audio.js';
import { initCursorParticles } from './cursor.js';
import { AlpacaMascot } from './alpaca.js';
import { initDraggableNotes } from './drag.js';
import { initModals } from './modal.js';
import { initGuestbook } from './guestbook.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. 初始化滑鼠粒子軌跡
  initCursorParticles();

  // 2. 初始化草泥馬吉祥物
  new AlpacaMascot('alpaca-mascot-container');

  // 3. 渲染動態資料
  renderProfile();
  renderSkills();
  renderProjects();
  renderBlog();
  renderContact();

  // 4. 初始化彈窗、留言板與拖曳物理系統
  initModals();
  initGuestbook();
  initDraggableNotes();

  // 5. 綁定全域導覽與音效控制
  bindGlobalEvents();
});

// 渲染個人基本資料與統計
function renderProfile() {
  const heroTagline = document.getElementById('hero-tagline');
  if (heroTagline) heroTagline.innerText = siteProfile.tagline;

  const aboutBio = document.getElementById('about-bio-text');
  if (aboutBio) aboutBio.innerText = siteProfile.bio;

  const profileStatus = document.getElementById('profile-status-text');
  if (profileStatus) profileStatus.innerText = siteProfile.status;

  const profileLocation = document.getElementById('profile-location');
  if (profileLocation) profileLocation.innerText = siteProfile.location;

  // 統計卡片
  const statsContainer = document.getElementById('profile-stats');
  if (statsContainer) {
    const cardThemes = [
      { border: 'border-[#5C3D2E]/30', bg: 'bg-[#FAF5EE]/95', titleColor: 'text-[#4A3326]', subColor: 'text-[#6B4423]' },
      { border: 'border-[#8C5835]/30', bg: 'bg-[#FAF3EC]/95', titleColor: 'text-[#7B4B28]', subColor: 'text-[#965D35]' },
      { border: 'border-[#B88562]/30', bg: 'bg-[#FCF7F2]/95', titleColor: 'text-[#A36F4C]', subColor: 'text-[#B88562]' },
      { border: 'border-[#8B4D5A]/30', bg: 'bg-[#FDF4F5]/95', titleColor: 'text-[#7D3D4B]', subColor: 'text-[#9A5060]' }
    ];

    statsContainer.innerHTML = siteProfile.stats.map((s, idx) => {
      const tag = s.url ? 'a' : 'div';
      const isExternal = s.url && /^https?:\/\//.test(s.url);
      const href = s.url ? ` href="${s.url}"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''}` : '';
      const theme = cardThemes[idx % cardThemes.length];
      const clickableClass = s.url ? ' hover:shadow-md hover:border-purple-300 hover:bg-white cursor-pointer group' : '';

      return `
      <${tag}${href} class="${theme.bg} ${theme.border} backdrop-blur-sm p-4 rounded-2xl border-2 border-dashed text-center shadow-sm hover:scale-105 transition-all duration-200 block${clickableClass}">
        <div class="text-xl md:text-2xl font-black tracking-wide ${theme.titleColor}">${s.value}</div>
        ${s.label ? `<div class="text-xs font-bold mt-1.5 ${theme.subColor} transition-colors">${s.label}</div>` : ''}
      </${tag}>`;
    }).join('');
  }
}

// 渲染技能分類
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = skillsData.map(group => `
    <div class="bg-white/90 p-5 rounded-3xl border-2 border-purple-100 shadow-md space-y-3 relative overflow-hidden">
      <div class="washi-tape-lavender -top-2 right-6 w-24"></div>
      <h4 class="text-base font-bold text-[#4A3E3D] flex items-center gap-1.5 border-b border-purple-100 pb-2">
        ${group.category}
      </h4>
      <div class="space-y-2.5">
        ${group.skills.map(skill => `
          <div>
            <div class="flex justify-between text-xs font-bold text-[#4A3E3D] mb-1">
              <span class="flex items-center gap-1">${skill.icon} ${skill.name}</span>
              <span class="text-purple-600">${skill.level}</span>
            </div>
            <div class="w-full bg-purple-50 h-2.5 rounded-full overflow-hidden p-0.5 border border-purple-100">
              <div class="h-full rounded-full transition-all duration-1000 ease-out" 
                   style="width: ${skill.level}; background-color: ${skill.color};"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// 渲染專案卡片
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = projectsData.map((project, idx) => `
    <div class="polaroid-card group cursor-pointer" onclick="openProjectModal('${project.id}')">
      <!-- 隨機紙膠帶 -->
      <div class="washi-tape-${project.tapeColor} -top-3 left-1/2 -translate-x-1/2 w-28"></div>

      <!-- 圖片手繪展示框 -->
      <div class="w-full h-44 rounded-lg flex items-center justify-center p-4 relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]" 
           style="background: ${project.imageBg};">
        <span class="absolute top-2 right-2 text-xs font-bold bg-white/90 text-purple-600 px-2.5 py-1 rounded-full shadow-sm">
          ${project.coverTag}
        </span>
        <div class="text-center">
          <div class="text-4xl mb-1 group-hover:scale-125 transition-transform duration-300">🎀</div>
          <span class="text-xs font-bold text-purple-900/70">${project.category}</span>
        </div>
      </div>

      <!-- 標題與簡介 (拍立得下方留白區) -->
      <div class="mt-4 space-y-1.5 text-left">
        <h4 class="text-base font-bold text-[#4A3E3D] group-hover:text-purple-600 transition-colors">
          ${project.title}
        </h4>
        <p class="text-xs text-[#8C7A78] line-clamp-2 leading-relaxed">
          ${project.summary}
        </p>
        <div class="flex items-center justify-between pt-2">
          <div class="flex flex-wrap gap-1">
            ${project.tags.slice(0, 2).map(t => `<span class="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-md font-bold">${t}</span>`).join('')}
          </div>
          <span class="text-xs text-pink-500 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">
            查看手記 →
          </span>
        </div>
      </div>
    </div>
  `).join('');
}

// 渲染部落格手記清單
function renderBlog() {
  const container = document.getElementById('blog-posts-container');
  if (!container) return;

  container.innerHTML = blogPosts.map((post) => `
    <div class="bg-white/95 p-5 rounded-2xl border-2 border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4" 
         onclick="openBlogModal('${post.id}')">
      <div class="space-y-1.5 flex-1">
        <div class="flex items-center gap-2 text-xs text-purple-600 font-bold">
          <span class="bg-pink-100 text-pink-600 px-2.5 py-0.5 rounded-full">${post.category}</span>
          <span class="text-gray-400">|</span>
          <span>📅 ${post.date}</span>
          <span class="text-gray-400">|</span>
          <span>⏱️ ${post.readTime}</span>
        </div>
        <h4 class="text-lg font-bold text-[#4A3E3D] group-hover:text-purple-600 transition-colors">
          ${post.title}
        </h4>
        <p class="text-xs text-[#8C7A78] line-clamp-2 leading-relaxed">
          ${post.excerpt}
        </p>
      </div>

      <button class="btn-bouncy self-start md:self-center px-4 py-1.5 bg-purple-50 text-purple-600 group-hover:bg-purple-500 group-hover:text-white rounded-full text-xs font-bold border border-purple-200 transition-colors">
        閱讀筆記 📖
      </button>
    </div>
  `).join('');
}

// 渲染聯絡社群連結
function renderContact() {
  const container = document.getElementById('social-links-container');
  if (!container) return;

  const iconMap = {
    github: '🐙',
    twitter: '🐦',
    instagram: '📷',
    mail: '💌'
  };

  container.innerHTML = siteProfile.socials.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" 
       class="btn-bouncy flex items-center gap-2 px-4 py-2.5 bg-white/90 border-2 border-purple-100 rounded-2xl shadow-sm text-xs font-bold text-[#4A3E3D] hover:text-purple-600 hover:border-purple-300">
      <span class="text-base">${iconMap[s.icon] || '✨'}</span>
      <span>${s.name}</span>
    </a>
  `).join('');
}

// 綁定全域事件
function bindGlobalEvents() {
  // 按鈕點擊音效
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, .clickable, a');
    if (btn && !btn.id.includes('alpaca') && !btn.id.includes('bgm') && !btn.id.includes('mute')) {
      soundFx.playPop();
    }
  });

  // 音效切換 (Mute / Unmute)
  const muteBtn = document.getElementById('btn-toggle-sound');
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      const isMuted = soundFx.toggleMute();
      muteBtn.innerHTML = isMuted ? '<span>🔇</span> 靜音中' : '<span>🔊</span> 音效開';
      muteBtn.classList.toggle('bg-red-100', isMuted);
    });
  }

  // 背景音樂切換 (BGM)
  const bgmBtn = document.getElementById('btn-toggle-bgm');
  if (bgmBtn) {
    bgmBtn.addEventListener('click', () => {
      const isPlaying = soundFx.toggleBgm();
      bgmBtn.innerHTML = isPlaying ? '<span>🎵</span> 搖籃曲播放中' : '<span>🎶</span> 播放八音盒';
      bgmBtn.classList.toggle('bg-purple-200', isPlaying);
      if (isPlaying) {
        soundFx.playChime();
      }
    });
  }

  // 聯絡表單發送
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      soundFx.playCelebration();
      alert('💌 草莓信件已寄出！草莓大魔王會儘快回覆你喔～ ✨');
      contactForm.reset();
    });
  }
}
