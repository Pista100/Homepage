/**
 * 個人資料與手帳資料庫 (Data Store)
 * 草莓大魔王 × 薰衣草夢幻主題
 */

export const siteProfile = {
  name: "Leighdom",
  englishName: "Leigh",
  title: "Frontend Magician & Creative Explorer",
  tagline: "在閱讀、創作、編織的浩海中遨遊。",
  bio: "哈囉！我是森麟 🍓，熱愛探索前端魔法、手繪插畫與治癒系網頁互動。平時喜歡喝熱奶茶、收集可愛貼紙與文具，並用程式碼寫出一則則夢幻故事。歡迎來到我的手帳小書桌！",
  avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=StrawberryAlpaca&backgroundColor=ffd1dc",
  location: "草莓星雲 404 號森林 🌸",
  status: "✨ 正在享受草莓大福與寫代碼中...",
  stats: [
    { label: "是文字啊 →", value: "#作家", url: "./writings.html" },
    { label: "編織日記 →", value: "#織蛛", url: "./crochet.html" },
    { label: "讀樹果實 YouTube →", value: "#說書人", url: "https://www.youtube.com/@ReadTree_Du" },
    { label: "插畫與攝影 →", value: "#圖像創作", url: "./gallery.html" }
  ],
  socials: [
    { name: "GitHub", url: "https://github.com", icon: "github", label: "看我的開源魔法" },
    { name: "Twitter / X", url: "https://twitter.com", icon: "twitter", label: "日常隨筆碎片" },
    { name: "Instagram", url: "https://instagram.com", icon: "instagram", label: "插畫與手帳生活" },
    { name: "Email", url: "mailto:strawberry@demonking.dev", icon: "mail", label: "寄一封草莓信" }
  ]
};

export const skillsData = [
  {
    category: "✨ 前端魔法陣",
    skills: [
      { name: "React & Vue", level: "90%", color: "#FF8FA3", icon: "⚛️" },
      { name: "TypeScript", level: "85%", color: "#B794F4", icon: "📘" },
      { name: "Tailwind CSS", level: "95%", color: "#A7F3D0", icon: "🎨" },
      { name: "Framer Motion", level: "88%", color: "#FEF08A", icon: "🪄" },
      { name: "Next.js / Vite", level: "85%", color: "#FFB3C1", icon: "⚡" }
    ]
  },
  {
    category: "🌸 創意與設計",
    skills: [
      { name: "UI/UX 設計 (Figma)", level: "92%", color: "#B794F4", icon: "🖌️" },
      { name: "日系手繪插畫", level: "85%", color: "#FF8FA3", icon: "🎀" },
      { name: "互動微動效", level: "90%", color: "#FEF08A", icon: "✨" },
      { name: "手帳排版美學", level: "98%", color: "#A7F3D0", icon: "📖" }
    ]
  },
  {
    category: "🍓 特殊技能與愛好",
    skills: [
      { name: "草莓甜點品鑑", level: "100%", color: "#FF8FA3", icon: "🍰" },
      { name: "草泥馬心靈溝通", level: "99%", color: "#B794F4", icon: "🦙" },
      { name: "文具紙膠帶收藏", level: "95%", color: "#FEF08A", icon: "🏷️" },
      { name: "睡午覺魔法", level: "100%", color: "#A7F3D0", icon: "☁️" }
    ]
  }
];

export const projectsData = [
  {
    id: "proj-1",
    title: "🦙 草泥馬的草莓莊園 (Alpaca Berry)",
    category: "Web Application",
    coverTag: "✨ 熱門精選",
    tapeColor: "pink",
    summary: "一個結合番茄鐘與虛擬草泥馬養成的小清新專注工具。每專注 25 分鐘，就能收穫一顆大草莓投餵小羊駝！",
    details: "使用 React + Canvas 動畫打造，內建 8 種環境白噪音（雨聲、壁爐、森林晨鳥）與手繪換裝系統。獲得超過 5,000 位使用者的喜愛。",
    imageBg: "linear-gradient(135deg, #FFE4E1 0%, #F3E8FF 100%)",
    tags: ["React", "Web Audio", "Canvas", "Tailwind"],
    demoUrl: "#",
    githubUrl: "#",
    date: "2026.04",
    likes: 128
  },
  {
    id: "proj-2",
    title: "🎀 夢幻手帳筆記 (Dreamy Journal)",
    category: "Creative Tool",
    coverTag: "🌸 治癒推薦",
    tapeColor: "lavender",
    summary: "可以在網頁上隨意拖曳貼紙、蓋郵章與手繪塗鴉的數位電子手帳。支援一鍵匯出拍立得卡片！",
    details: "採用 HTML5 Drag & Drop API 與向量 SVG 濾鏡技術，模擬真實紙張質感與色鉛筆筆觸，讓數位記錄充滿溫度。",
    imageBg: "linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)",
    tags: ["Vue 3", "SVG Animation", "LocalStorage"],
    demoUrl: "#",
    githubUrl: "#",
    date: "2026.02",
    likes: 95
  },
  {
    id: "proj-3",
    title: "✨ 星空占卜八音盒 (Starlight Music)",
    category: "Interactive Audio",
    coverTag: "🎵 音樂互動",
    tapeColor: "yellow",
    summary: "點擊夜空中的閃爍星芒，便會隨機編織出一首獨一無二的溫柔八音盒搖籃曲，伴隨流星雨許願。",
    details: "利用 Web Audio API 即時程序化合成五聲音階（Pentatonic Scale），不依賴任何外部音檔，輕巧純淨且每次聆聽皆不重複。",
    imageBg: "linear-gradient(135deg, #FEF08A 0%, #FED7AA 100%)",
    tags: ["Web Audio API", "Three.js", "Generative Art"],
    demoUrl: "#",
    githubUrl: "#",
    date: "2025.12",
    likes: 210
  },
  {
    id: "proj-4",
    title: "🍰 草莓大魔王の祕密烘焙坊",
    category: "Interactive 3D",
    coverTag: "🍓 甜度滿分",
    tapeColor: "pink",
    summary: "3D 黏土質感的草莓蛋糕客製化體驗，從海綿蛋糕體、鮮奶油擠花到裝飾糖珠皆可自選搭配。",
    details: "使用 Three.js 與柔和卡通著色法（Toon Shading），打造令人食指大動的軟萌 3D 甜點世界。",
    imageBg: "linear-gradient(135deg, #FFE4E1 0%, #FFB3C1 100%)",
    tags: ["Three.js", "Blender", "GSAP"],
    demoUrl: "#",
    githubUrl: "#",
    date: "2025.09",
    likes: 184
  }
];

export const blogPosts = [
  {
    id: "post-1",
    title: "🍓 如何用 CSS 與 SVG 畫出一隻軟綿綿的粉紅草泥馬？",
    date: "2026.08.15",
    category: "前端手繪",
    readTime: "5 分鐘",
    tapeColor: "pink",
    excerpt: "分享如何使用純 SVG Path 貝茲曲線與 CSS 彈簧動畫，製作出會呼吸、會眨眼的可愛吉祥物...",
    content: `## 軟綿綿的秘密：圓角與柔和色彩

在設計可愛插畫風格時，**圓潤的幾何曲線**是靈魂所在！

1. **色彩搭配**：避免刺眼的高飽和度紅，選擇帶有一點牛奶感的櫻花粉（\`#FFB3C1\`）與薰衣草淡紫（\`#E9D5FF\`）。
2. **微動態物理感**：加入 0.5s 的彈簧曲線（\`cubic-bezier(0.34, 1.56, 0.64, 1)\`），讓點擊反饋像軟糖一樣 Q 彈！
3. **眼神跟隨**：透過簡單的 \`mousemove\` 座標計算，讓草泥馬的黑眼珠隨訪客滑鼠微幅偏移，瞬間賦予靈動的生命力。`
  },
  {
    id: "post-2",
    title: "🌸 治癒系 Web 音效：用 Web Audio API 打造啵啵泡泡聲",
    date: "2026.07.28",
    category: "音效魔法",
    readTime: "4 分鐘",
    tapeColor: "lavender",
    excerpt: "不用下載幾百 KB 的 mp3 檔案，只需 10 行代碼就能即時合成清脆可愛的泡泡點擊反饋！",
    content: `## 為什麼選擇程式化音效？

傳統 mp3 檔案有載入延遲與體積問題，而瀏覽器內建的 **Web Audio API** 可以：

- **零延遲**：每次點擊即刻震盪發聲。
- **音高隨機微調**：每次點擊讓音頻隨機浮動 5%，聽起來更加活潑自然，就像真的在戳泡泡！
- **超輕量**：整段代碼不到 1KB，完全不佔用伺服器流量。`
  },
  {
    id: "post-3",
    title: "🎀 寫給工程師的手帳風網頁排版指南：破除死板格線",
    date: "2026.06.10",
    category: "設計筆記",
    readTime: "6 分鐘",
    tapeColor: "yellow",
    excerpt: "拋開整整齊齊的標準卡片，試試輕微的角度旋轉（rotate）、紙膠帶質感與拍立得留白美學...",
    content: `## 手帳美學的三個關鍵法則

1. **不完美的自然感**：在 CSS 中加入 \`transform: rotate(-1.5deg)\`，打破垂直水平的死板感。
2. **材質的重疊層次**：善用 \`box-shadow\` 與半透明紙膠帶（Washi Tape）跨越不同邊界。
3. **親切的手寫文字與大色塊**：標題使用圓體或手繪字型，內文搭配溫暖可可棕色，營造像在翻閱實體筆記本的溫馨感。`
  }
];

export const initialGuestbookNotes = [
  {
    id: "note-1",
    author: "小兔棉花糖 🐰",
    content: "大魔王的網站真的太可愛了！好喜歡那隻粉紅草泥馬，已戳了 100 下～",
    date: "2026.08.20",
    color: "#FFF0F3",
    tape: "pink",
    rotation: "-2deg"
  },
  {
    id: "note-2",
    author: "星空旅人 ✨",
    content: "泡泡音效聽起來好療癒，這個手帳桌面太有創意了，加油！",
    date: "2026.08.18",
    color: "#F3E8FF",
    tape: "lavender",
    rotation: "1.5deg"
  },
  {
    id: "note-3",
    author: "抹茶拿鐵 🍵",
    content: "路過簽到！期待大魔王分享更多可愛的前端魔法文章 🍓",
    date: "2026.08.12",
    color: "#FEF9C3",
    tape: "yellow",
    rotation: "-1deg"
  }
];

export const alpacaQuotes = [
  "草莓好甜好香呀～ 🍓",
  "要一起去薰衣草花田玩嗎？ 🌸",
  "今天也是元氣滿滿的一天！ ✨",
  "別忘了喝杯暖呼呼的奶茶喔 🧋",
  "嗷～點擊我會冒出粉紅小愛心呢！ 💕",
  "草莓大魔王萬歲！ 👑"
];
