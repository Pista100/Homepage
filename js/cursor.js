/**
 * 夢幻滑鼠軌跡與星芒粒子系統 (Cursor & Particle Trail)
 * 在滑鼠移動與點擊時，產生粉紫星芒、草莓與花瓣微粒
 */

export function initCursorParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const emojis = ['✨', '🍓', '🌸', '⭐', '🎀'];
  const colors = ['#FF8FA3', '#B794F4', '#FEF08A', '#A7F3D0', '#FFB3C1'];

  class Particle {
    constructor(x, y, isBurst = false) {
      this.x = x;
      this.y = y;
      this.isBurst = isBurst;
      this.isEmoji = Math.random() < 0.25;
      this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.size = this.isEmoji ? (Math.random() * 8 + 10) : (Math.random() * 4 + 2);
      
      const angle = isBurst ? Math.random() * Math.PI * 2 : Math.random() * Math.PI - Math.PI / 2;
      const speed = isBurst ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.5;

      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed + (isBurst ? 0 : 0.8); // 輕微重力
      this.alpha = 1;
      this.decay = isBurst ? Math.random() * 0.02 + 0.015 : Math.random() * 0.025 + 0.02;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 4;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      this.rotation += this.rotSpeed;
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);

      if (this.isEmoji) {
        ctx.font = `${this.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, 0, 0);
      } else {
        // 繪製像素風格小星芒 (Pixel Cross Sparkle)
        ctx.fillStyle = this.color;
        const s = Math.max(2, Math.round(this.size / 2));
        ctx.fillRect(-s * 2, -s / 2, s * 4, s);
        ctx.fillRect(-s / 2, -s * 2, s, s * 4);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-s / 2, -s / 2, s, s);
      }

      ctx.restore();
    }
  }

  let lastX = 0, lastY = 0;
  window.addEventListener('mousemove', (e) => {
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (dist > 8) { // 限制產生頻率
      particles.push(new Particle(e.clientX + (Math.random() * 10 - 5), e.clientY + (Math.random() * 10 - 5)));
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });

  window.addEventListener('click', (e) => {
    // 點擊時噴發星芒爆米花
    for (let i = 0; i < 8; i++) {
      particles.push(new Particle(e.clientX, e.clientY, true));
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.alpha <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}
