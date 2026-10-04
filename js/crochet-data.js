/**
 * 編織日記資料庫 (Crochet & Knitting Diary Data)
 * 記錄森麟（#織蛛）的毛線手作日記、縮時影片與成品寫真。
 * 
 * 欄位說明：
 *  - id            唯一編號
 *  - title         作品名稱
 *  - category      分類（編織日記 / 手作影片 / 成品寫真）
 *  - date          完成或記錄日期
 *  - yarn          毛線線材規格
 *  - hook          針號（鉤針 / 輪針 / 棒針）
 *  - timeSpent     製作耗時
 *  - status        當前狀態（成品完成 / 製作中 / 縮時紀錄）
 *  - image         封面或寫真照片網址
 *  - imageBg       備用漸層底色
 *  - videoUrl      手作影片網址（若為影片項目，可支援 YouTube 或內嵌播放）
 *  - videoDuration 影片長度
 *  - emoji         代表手繪表情
 *  - summary       一句話心情摘要
 *  - diary         編織手帳全文日記
 *  - patternNotes  針法筆記 / 織圖心得
 *  - tags          標籤陣列
 *  - tape          紙膠帶樣式 (pink / lavender / yellow)
 */

export const crochetCategories = [
  { id: "all", name: "全部作品", icon: "🧶" },
  { id: "diary", name: "編織日記", icon: "📖" },
  { id: "video", name: "手作影片", icon: "🎬" },
  { id: "photo", name: "成品寫真", icon: "📸" }
];

export const crochetData = [
  {
    id: "crochet-1",
    title: "手勾雲朵粉紅小羊駝玩偶",
    category: "編織日記",
    date: "2026.10",
    yarn: "5股精梳牛奶棉（櫻花粉、草莓紅、深可可）",
    hook: "3.0mm 可樂鉤針",
    timeSpent: "約 6.5 小時",
    status: "成品完成 🌸",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80",
    imageBg: "linear-gradient(135deg, #FFE4E6 0%, #F3E8FF 100%)",
    videoUrl: null,
    videoDuration: null,
    emoji: "🦙🍓",
    summary: "把筆下的吉祥物變成手中摸得到的軟綿綿玩偶！",
    diary: `
      一直很想把隨手在手帳上畫的那隻軟綿綿雲朵草泥馬實體化。
      
      特別選了手感像綿花糖一樣的 5 股牛奶棉，從頭部的圓形起針開始，一針一針鉤出蓬鬆的波浪形雲朵弧度。最花心思的是兩頰那兩道深紅色的手繪鋸齒腮紅——用刺繡針以回針繡細心繡出波浪感，最後在頭頂縫上一顆立體的小草莓。
      
      抱在手掌心裡的重量剛剛好，圓滾滾的模樣讓人看了心情瞬間被治癒 ✨
    `,
    patternNotes: "環形起針 6X，第 2~6 圈規律加針至 36X；側邊耳朵以中長針棗形針做出澎度；腮紅採雙股繡線手縫。",
    tags: ["手作玩偶", "草泥馬", "牛奶棉", "原創設計"],
    tape: "pink"
  },
  {
    id: "crochet-2",
    title: "【縮時過程】雲朵小羊駝頭部編織日常",
    category: "手作影片",
    date: "2026.09",
    yarn: "日本櫻花粉雪花絨線",
    hook: "3.5mm 雙頭金色鉤針",
    timeSpent: "錄製 2 小時（縮時精華）",
    status: "縮時紀錄 🎬",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&auto=format&fit=crop&q=80",
    imageBg: "linear-gradient(135deg, #FDF2F8 0%, #EDE9FE 100%)",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
    videoDuration: "02:18",
    emoji: "🎬✨",
    summary: "架起俯拍相機，記錄下午窗邊光影下手指與毛線的雙人舞。",
    diary: `
      週末午後泡了一杯熱奶茶，點上草莓香氛蠟燭，把手機架在俯拍支架上。
      
      影片記錄了從小圓心慢慢放大成雲朵立體球形的完整過程。縮時攝影最迷人的地方，就是看著一團鬆散的線團，在指尖快速穿梭翻飛下，漸漸長出可愛的耳朵與飽滿的輪廓。
      
      背景音樂搭配著八音盒的輕快旋律，看著特別解壓～
    `,
    patternNotes: "影片包含：隱形加針手法示範、雲朵波浪邊鉤織教學、安全眼睛固定技巧。",
    tags: ["編織縮時", "手作過程", "沉浸式手作", "治癒系影片"],
    tape: "lavender"
  },
  {
    id: "crochet-3",
    title: "薰衣草暖心雙層麻花圍巾",
    category: "成品寫真",
    date: "2026.08",
    yarn: "100% 澳洲美麗諾羊毛（薰衣草粉紫、奶油白）",
    hook: "6.0mm 輪針 (80cm)",
    timeSpent: "約 18 小時",
    status: "成品完成 🌸",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    imageBg: "linear-gradient(135deg, #E9D5FF 0%, #C4B5FD 100%)",
    videoUrl: null,
    videoDuration: null,
    emoji: "🧣💜",
    summary: "為即將到來的涼秋準備的溫暖懷抱，經典雙麻花與起伏針。",
    diary: `
      這條圍巾用了足足四團美麗諾羊毛，線材非常親膚柔軟，貼在脖子上完全不會刺癢。
      
      織圖選擇了經典的 8 針立體麻花，中間穿插著像麥穗一般的單桂花針。每織完一排麻花扭針，看著紋理在毛線織片上層層疊疊綻放，就有一種踏實的成就感。
      
      下水定型後圍巾變得更加蓬鬆垂順，迫不及待想要戴著它去秋天的銀杏大道散步了 🍂
    `,
    patternNotes: "起針 48 針，雙羅紋彈性起針；每 10 排進行一次 4×4 右上交叉麻花；邊緣採滑針收邊保持平整。",
    tags: ["棒針編織", "麻花圍巾", "美麗諾羊毛", "秋日手作"],
    tape: "yellow"
  },
  {
    id: "crochet-4",
    title: "【技巧示範】立體草莓小果實鉤法教學",
    category: "手作影片",
    date: "2026.07",
    yarn: "蕾絲線 4 號（鮮紅、嫩綠、米黃）",
    hook: "2.0mm 極細蕾絲鉤針",
    timeSpent: "錄製 45 分鐘",
    status: "手作示範 🎬",
    image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&auto=format&fit=crop&q=80",
    imageBg: "linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%)",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
    videoDuration: "05:12",
    emoji: "🍓📹",
    summary: "手把手慢速特寫！如何鉤出一顆飽滿不扁塌的小草莓吊飾。",
    diary: `
      好多朋友敲碗詢問吉祥物頭頂的那顆小草莓是怎麼鉤的，於是特地錄製了這支微距特寫影片！
      
      從草莓尖端的圓形收針、塞入天然木棉的鬆緊度拿捏，到綠色五瓣草莓萼片的換線與連接，每一個細節都有清晰的慢動作示範。還分享了用米黃色細線繡上草莓小籽的立體結粒繡技巧喔！
    `,
    patternNotes: "草莓本體共 8 圈，每圈以短針立體加減針塑形；葉片以鎖針起針鉤出 5 個小尖葉。",
    tags: ["新手教學", "立體草莓", "微距錄影", "蕾絲鉤針"],
    tape: "pink"
  },
  {
    id: "crochet-5",
    title: "草莓奶油雪糕手作杯墊組",
    category: "成品寫真",
    date: "2026.06",
    yarn: "8股粗牛奶棉 + 麻線拼接",
    hook: "4.5mm 暖木柄鉤針",
    timeSpent: "約 3 小時（一套四枚）",
    status: "成品完成 🌸",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&auto=format&fit=crop&q=80",
    imageBg: "linear-gradient(135deg, #FEF9C3 0%, #FFEDD5 100%)",
    videoUrl: null,
    videoDuration: null,
    emoji: "☕🍰",
    summary: "書桌下午茶必備的小可愛，隔熱又吸水的奶油草莓杯墊。",
    diary: `
      寫代碼或讀書時，書桌上總少不了一杯熱咖啡或冰水果茶。
      
      為了保護心愛的木質書桌，動手鉤了這套甜點感十足的杯墊。雙層加厚的鎖針底板，隔熱效果極佳；邊緣一圈滾上奶油花邊，放上透明玻璃杯時，光線折射在毛線紋理上，連喝水都變得好有儀式感。
    `,
    patternNotes: "主體採圓形起針與長針織法，第 5 圈換白線鉤出貝殼花邊（1 短針 + 空 1 針 + 5 長針）。",
    tags: ["居家手作", "隔熱杯墊", "下午茶儀式感", "鉤針雜貨"],
    tape: "yellow"
  },
  {
    id: "crochet-6",
    title: "祖母格復古拼接手提包 (Granny Square)",
    category: "編織日記",
    date: "2026.05",
    yarn: "多色再生棉線（焦糖、奶茶、薰衣草紫、苔蘚綠）",
    hook: "4.0mm 鉤針",
    timeSpent: "約 14 小時",
    status: "成品完成 🌸",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&auto=format&fit=crop&q=80",
    imageBg: "linear-gradient(135deg, #E0E7FF 0%, #F3E8FF 100%)",
    videoUrl: null,
    videoDuration: null,
    emoji: "👜🌿",
    summary: "十三片經典祖母格的拼圖遊戲，裝得下日記本與隨身靈感。",
    diary: `
      祖母格（Granny Square）大概是編織界最讓人著迷的魔法了。
      
      每一片小方塊的配色都不一樣，可以把平時剩下的零星線頭都巧妙用上。一片片鉤好後攤在軟木塞板上熨燙定型，再像拼積木一樣用隱形縫合針將它們拼接成立體托特包形狀。
      
      容量剛好可以放進一本 A5 手帳、鉛筆盒與手機，出門去咖啡廳散步背它最合適不過了！
    `,
    patternNotes: "共製作 13 片三層祖母格花片；背帶採三股短針加固編織，防止承重變形拉長。",
    tags: ["祖母格", "復古手提包", "零線消耗", "手作包包"],
    tape: "lavender"
  }
];
