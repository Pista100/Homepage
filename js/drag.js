/**
 * 手帳桌面自由拖曳物理系統 (Draggable Scrapbook Notes)
 * 支援桌機滑鼠與手機觸控，模擬真實便條紙與貼紙的拖放體驗
 */

import { soundFx } from './audio.js';

let highestZIndex = 30;

export function initDraggableNotes() {
  const notes = document.querySelectorAll('.draggable-note');

  notes.forEach((note) => {
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;
    let hasMoved = false;

    // 滑鼠按下
    const onStart = (e) => {
      // 若點擊的是按鈕或連結，不觸發拖曳
      if (e.target.closest('button, a, input, textarea')) return;

      isDragging = true;
      hasMoved = false;
      highestZIndex++;
      note.style.zIndex = highestZIndex;
      note.classList.add('is-dragging');

      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;

      // 取得目前的 translate 或 offset
      const transform = window.getComputedStyle(note).transform;
      let currentX = 0, currentY = 0;
      if (transform && transform !== 'none') {
        const matrix = new DOMMatrixReadOnly(transform);
        currentX = matrix.m41;
        currentY = matrix.m42;
      }

      initialLeft = currentX;
      initialTop = currentY;

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onEnd);
    };

    // 移動中
    const onMove = (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();

      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      if (Math.hypot(deltaX, deltaY) > 5) {
        hasMoved = true;
      }

      note.style.transform = `translate(${initialLeft + deltaX}px, ${initialTop + deltaY}px) rotate(2deg)`;
    };

    // 放開
    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      note.classList.remove('is-dragging');

      if (hasMoved) {
        soundFx.playPaper();
      }

      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    note.addEventListener('mousedown', onStart);
    note.addEventListener('touchstart', onStart, { passive: true });
  });

  // 提供一鍵重置桌面便條紙位置功能
  const resetBtn = document.getElementById('btn-reset-desk');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      soundFx.playPop();
      notes.forEach((note) => {
        note.style.transform = '';
        note.style.zIndex = '';
      });
      highestZIndex = 30;
    });
  }
}
