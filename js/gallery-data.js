/**
 * 圖像創作資料庫 (Gallery Data)
 * 包含插畫手繪、攝影日常等視覺作品。
 * 
 * 欄位說明：
 *  - id          唯一編號
 *  - title       作品名稱
 *  - category    分類（插畫手繪 / 攝影日常 / 手作生活）
 *  - date        創作或拍攝日期
 *  - tool        使用工具（如 Procreate、底片相機、水彩）
 *  - image       圖片網址（可放本機圖片路徑如 ./assets/my-photo.jpg 或外部網址）
 *  - imageBg     無圖片時的漸層背景色
 *  - emoji       手繪代表符號
 *  - story       手帳創作故事 / 拍攝心得
 *  - tags        標籤陣列
 *  - tape        紙膠帶顏色 (pink / lavender / yellow)
 */

export const galleryData = [
  {
    id: "art-1",
    title: "草莓森林裡的粉紅草泥馬",
    category: "插畫手繪",
    date: "2026.09",
    tool: "Procreate / iPad Air",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    imageBg: "linear-gradient(135deg, #FFE4E1 0%, #F3E8FF 100%)",
    emoji: "🦙🍓",
    story: "漫步在瀰漫著草莓香氣的童話森林裡，偶遇了一隻圍著紫色蝴蝶結的粉紅草泥馬。想把那份溫柔的微風留下來。",
    tags: ["治癒插畫", "手繪", "角色設計"],
    tape: "pink"
  },
  {
    id: "art-2",
    title: "午後三點的窗邊光影",
    category: "攝影日常",
    date: "2026.08",
    tool: "Fujifilm X100V / Classic Chrome",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80",
    imageBg: "linear-gradient(135deg, #FEF9C3 0%, #FED7AA 100%)",
    emoji: "📷✨",
    story: "陽光穿過百葉窗，在地板與毛線球上印出如琴鍵般的影子。按下一瞬間的快門，凝固了夏末安靜的溫度。",
    tags: ["膠片日常", "光影捕捉", "午後生活"],
    tape: "yellow"
  },
  {
    id: "art-3",
    title: "薰衣草星空下的夢想手帳",
    category: "插畫手繪",
    date: "2026.07",
    tool: "手繪水彩 + 數位修飾",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    imageBg: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
    emoji: "🌸📖",
    story: "夜晚仰望滿天星空時，畫下了這本漂浮在薰衣草紫夜空中的發光筆記本，記錄下每個未完待續的靈感。",
    tags: ["星空水彩", "手帳美學", "奇幻夢境"],
    tape: "lavender"
  },
  {
    id: "art-4",
    title: "花市裡的初綻洋桔梗與薰衣草",
    category: "攝影日常",
    date: "2026.06",
    tool: "Ricoh GR III / 28mm Macro",
    image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&auto=format&fit=crop&q=80",
    imageBg: "linear-gradient(135deg, #FCE7F3 0%, #E0E7FF 100%)",
    emoji: "💐🌿",
    story: "週末清晨在花市帶回的一束粉紫花束，帶著微涼晨露的清新花瓣，讓人整天心情都很晴朗。",
    tags: ["靜物寫真", "花卉生活", "微距攝影"],
    tape: "pink"
  },
  {
    id: "art-5",
    title: "微雨午後的秘密咖啡館",
    category: "插畫手繪",
    date: "2026.05",
    tool: "色鉛筆質感 / Clip Studio",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
    imageBg: "linear-gradient(135deg, #FAF5EE 0%, #E2D9D2 100%)",
    emoji: "☕🌧️",
    story: "雨天躲在街角咖啡館的角落座位，熱奶茶的蒸氣與色鉛筆的沙沙聲，是最療癒的創作午後。",
    tags: ["溫暖生活", "咖啡館手繪", "日常場景"],
    tape: "yellow"
  },
  {
    id: "art-6",
    title: "旅行途中遇見的古董街角書店",
    category: "攝影日常",
    date: "2026.04",
    tool: "35mm 菲林相機 / Kodak Gold 200",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80",
    imageBg: "linear-gradient(135deg, #FEF3C7 0%, #F3E8FF 100%)",
    emoji: "📚🎞️",
    story: "舊書特有的紙張氣味，古樸的木質書架與斑駁招牌，彷彿時間在這裡走得特別慢。",
    tags: ["街頭漫步", "底片紀實", "古董書店"],
    tape: "lavender"
  }
];
