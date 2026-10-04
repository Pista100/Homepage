# 🍓 草莓大魔王 × 薰衣草夢幻手帳風格個人空間 (Strawberry Archfiend Scrapbook)

專為 **草莓大魔王** 量身打造的日系手帳拼貼風格（Scrapbook & Bento Desk）個人品牌、作品集與手記網站！

---

## ✨ 網站亮點特色

- 🦙 **互動粉紅草泥馬吉祥物**：自訂手繪 SVG，支援滑鼠眼神跟隨、多種表情切換、戳戳說話與投餵草莓噴發煙火。
- 🍓 **草莓大魔王專屬視覺**：薰衣草淡紫、草莓粉、暖焦糖棕文字，搭配紙膠帶、蝴蝶結與閃爍星芒。
- 📌 **軟木塞桌面自由拖曳便條紙**：桌面上的便條紙支援自由拖動擺放與紙張音效。
- 🖼️ **拍立得作品集展示**：拍立得照片卡懸浮微晃動效，點擊跳出手帳詳情彈窗。
- 📝 **手帳文章手記 (Blog)**：筆記本風格閱讀器。
- 💬 **即時手帳留言板**：訪客可挑選便條紙顏色與紙膠帶，在軟木塞板上張貼留言。
- 🫧 **程序化可愛音效與八音盒**：採用原生 Web Audio API，點擊有清脆啵啵聲，並可開關治癒八音盒背景音樂。
- ✨ **夢幻滑鼠軌跡**：隨滑鼠飄落粉紫星芒與小草莓。

---

## 🚀 本機快速預覽 (Local Preview)

### 方法一：直接點開
直接在檔案總管中雙擊 `index.html`，使用任一現代瀏覽器（Chrome, Edge, Safari, Firefox）即可開啟！

### 方法二：使用 Python 或 Node 本機伺服器（推薦，支援 ES 模組）
若瀏覽器安全性原則限制本地模組載入，可在專案資料夾執行：
```bash
# Python 3
python -m http.server 3000

# 或 Node.js
npx serve .
```
接著在瀏覽器打開 `http://localhost:3000`。

---

## 🌐 一鍵發布至 GitHub Pages (Deploy to GitHub Pages)

本專案採用**零編譯（Zero-Build）純靜態架構**，完美支援 GitHub Pages，只需 3 步：

1. **建立 GitHub 倉庫**：在 GitHub 上新增一個名為 `website_v2`（或任意名稱）的公開倉庫。
2. **推送代碼**：
   ```bash
   git init
   git add .
   git commit -m "feat: 草莓大魔王夢幻手帳網站上線 🍓"
   git branch -M main
   git remote add origin https://github.com/<你的帳號>/<你的倉庫名稱>.git
   git push -u origin main
   ```
3. **開啟 GitHub Pages**：
   - 進入 GitHub 倉庫頁面 -> 點擊 **Settings**。
   - 在左側選單點擊 **Pages**。
   - 在 **Build and deployment** 下方的 **Branch** 選擇 `main` 分支與 `/ (root)` 資料夾，點擊 **Save**。
   - 等待約 1 分鐘，你的網站就會在 `https://<你的帳號>.github.io/<你的倉庫名稱>/` 正式上線！

---

## 📁 檔案結構說明

```
d:/website_v2/
├── index.html         // 網站主要結構與手帳畫布
├── README.md          // 本專案說明文件
├── css/
│   └── style.css      // 紙質紋理、紙膠帶、拍立得陰影與自訂游標樣式
└── js/
    ├── main.js        // 程式進入點與事件綁定
    ├── data.js        // 個人基本資料、作品集、文章手記資料庫（可在此修改內容）
    ├── audio.js       // Web Audio API 啵啵音效與八音盒合成器
    ├── cursor.js      // 滑鼠粉紫星芒與草莓軌跡粒子
    ├── alpaca.js      // 粉紅草泥馬互動組件
    ├── drag.js        // 便條紙自由拖曳物理系統
    ├── modal.js       // 專案與文章展開彈窗
    └── guestbook.js   // 互動留言板系統
```

---

## 🎨 如何自訂你的內容？

只需打開 `js/data.js` 檔案，你就可以自由修改：
- `siteProfile`：個人稱號、自我介紹、社交連結與統計數據。
- `skillsData`：各類技能標籤與百分比進度。
- `projectsData`：新增或修改作品集名稱、簡介、技術標籤與連結。
- `blogPosts`：新增或修改手記文章內容。
- `alpacaQuotes`：草泥馬說話的可愛台詞。
