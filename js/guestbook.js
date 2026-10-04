/**
 * 互動手帳留言板系統 (Scrapbook Guestbook)
 * 訪客可挑選便條紙顏色與可愛貼紙，即時張貼留言至軟木塞板
 */

import { soundFx } from './audio.js';
import { initialGuestbookNotes } from './data.js';

export function initGuestbook() {
  const container = document.getElementById('guestbook-notes-container');
  const form = document.getElementById('guestbook-form');
  if (!container || !form) return;

  // 從 LocalStorage 載入或使用預設資料
  let notes = [];
  try {
    const saved = localStorage.getItem('demon_king_guestbook_notes');
    notes = saved ? JSON.parse(saved) : initialGuestbookNotes;
  } catch (e) {
    notes = initialGuestbookNotes;
  }

  function renderNotes() {
    container.innerHTML = notes.map((note) => `
      <div class="sticky-note draggable-note p-4 w-60 min-h-[140px] flex flex-col justify-between cursor-grab active:cursor-grabbing border border-black/5" 
           style="background-color: ${note.color}; transform: rotate(${note.rotation});">
        
        <!-- 頂部小紙膠帶 -->
        <div class="washi-tape-${note.tape || 'pink'} -top-2.5 left-1/2 -translate-x-1/2 w-20"></div>

        <!-- 留言文字 -->
        <p class="text-xs text-[#4A3E3D] font-medium leading-relaxed mt-2 select-none">${note.content}</p>

        <!-- 簽名與日期 -->
        <div class="flex items-center justify-between border-t border-black/10 pt-2 mt-2 text-[11px] text-[#8C7A78]">
          <span class="font-bold text-purple-800">${note.author}</span>
          <span>${note.date}</span>
        </div>
      </div>
    `).join('');

    // 重新綁定拖曳功能
    import('./drag.js').then(module => module.initDraggableNotes());
  }

  renderNotes();

  // 處理表單送出
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('gb-name');
    const msgInput = document.getElementById('gb-message');
    const colorSelect = document.querySelector('input[name="gb-color"]:checked');
    const tapeSelect = document.querySelector('input[name="gb-tape"]:checked');

    if (!nameInput.value.trim() || !msgInput.value.trim()) return;

    soundFx.playCelebration();

    const newNote = {
      id: 'note-' + Date.now(),
      author: nameInput.value.trim(),
      content: msgInput.value.trim(),
      date: new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      color: colorSelect ? colorSelect.value : '#FFF0F3',
      tape: tapeSelect ? tapeSelect.value : 'pink',
      rotation: `${(Math.random() * 6 - 3).toFixed(1)}deg`
    };

    notes.unshift(newNote);
    try {
      localStorage.setItem('demon_king_guestbook_notes', JSON.stringify(notes));
    } catch (err) {}

    renderNotes();
    form.reset();

    // 留言發射草莓金星彩帶
    if (window.confetti) {
      window.confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#FF8FA3', '#B794F4', '#FEF08A', '#A7F3D0']
      });
    }
  });
}
