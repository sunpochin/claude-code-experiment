# 時尚服飾館 - 電商網站前台

這是一個使用 Vue 3 和 Nuxt 3 建立的服裝電商網站前台專案，專注於 SEO 優化和使用者體驗。

## 🚀 功能特色

- ✅ **響應式設計** - 支援桌面和行動裝置
- ✅ **SEO 優化** - 使用 Nuxt 3 的 SSR 和 meta 標籤優化
- ✅ **購物車系統** - 完整的購物車功能，支援 LocalStorage 持久化
- ✅ **商品管理** - 商品列表、篩選、分類、詳情頁面
- ✅ **結帳流程** - 完整的結帳表單和訂單確認
- ✅ **狀態管理** - 使用 Pinia 進行全域狀態管理

## 📁 專案結構

```
.
├── assets/              # 靜態資源（CSS、圖片等）
│   └── css/
│       └── main.css    # 全域樣式
├── components/          # Vue 組件
│   ├── AppHeader.vue   # 網站導航列
│   ├── AppFooter.vue   # 網站頁尾
│   └── ProductCard.vue # 商品卡片組件
├── composables/         # 可重用的邏輯
│   └── useProducts.ts  # 商品資料處理
├── layouts/             # 佈局組件
│   └── default.vue     # 預設佈局
├── pages/               # 頁面路由
│   ├── index.vue       # 首頁
│   ├── cart.vue        # 購物車
│   ├── checkout.vue    # 結帳頁面
│   └── products/
│       ├── index.vue   # 商品列表
│       └── [id].vue    # 商品詳情
├── plugins/             # Nuxt 插件
│   └── persistedState.client.ts  # 購物車持久化
├── public/              # 公開靜態檔案
│   ├── favicon.ico
│   └── robots.txt
├── stores/              # Pinia 狀態管理
│   └── cart.ts         # 購物車 store
├── app.vue              # 應用程式根組件
├── nuxt.config.ts       # Nuxt 配置
└── package.json         # 專案依賴
```

## 🛠️ 技術棧

- **框架**: Nuxt 3
- **UI 框架**: Vue 3 (Composition API)
- **狀態管理**: Pinia
- **樣式**: CSS (使用 CSS Variables)
- **路由**: Nuxt Auto Routes
- **SEO**: Nuxt SEO Meta, SSR
- **套件管理**: Bun ⚡ (超快速！)

## 📦 安裝與執行

> 💡 本專案使用 **Bun** 作為套件管理器，比 npm/yarn 快很多！

### 安裝依賴

```bash
bun install
```

### 開發模式

```bash
bun run dev
```

開啟瀏覽器訪問 `http://localhost:3000`

### 建置專案

```bash
bun run build
```

### 預覽建置結果

```bash
bun run preview
```

### 生成靜態網站

```bash
bun run generate
```

### 如果還沒安裝 Bun

```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"

# 或使用 npm 全域安裝
npm install -g bun
```

## 🎨 主要頁面

### 1. 首頁 (`/`)
- 輪播橫幅展示
- 新品上市區塊
- 熱門商品推薦
- 限時優惠專區
- 分類快速導航

### 2. 商品列表 (`/products`)
- 商品篩選（分類、價格、新品、特價）
- 商品排序
- 響應式網格佈局
- 快速加入購物車

### 3. 商品詳情 (`/products/[id]`)
- 商品圖片展示
- 詳細描述
- 尺寸/顏色選擇
- 數量調整
- 加入購物車/立即購買
- 相關商品推薦

### 4. 購物車 (`/cart`)
- 購物車商品列表
- 數量調整
- 即時計算總價
- 運費計算（滿 $1000 免運）
- 清空購物車

### 5. 結帳 (`/checkout`)
- 收件人資訊表單
- 配送地址
- 付款方式選擇
- 訂單摘要
- 訂單確認

## 🎯 SEO 優化

- ✅ 使用 Nuxt 3 的 SSR 模式
- ✅ 每個頁面都有獨特的 title 和 meta description
- ✅ Open Graph 標籤支援
- ✅ 結構化資料（商品頁面）
- ✅ 語意化 HTML
- ✅ robots.txt 設定
- ✅ 響應式設計（Mobile-friendly）
- ✅ 快速載入時間

## 📱 響應式設計

專案完全支援響應式設計，在不同裝置上都能提供良好的使用體驗：

- **桌面** (>968px): 完整功能和佈局
- **平板** (768px - 968px): 優化的網格佈局
- **手機** (<768px): 行動裝置優化的介面

## 🔧 自訂設定

### 修改主題顏色

在 `assets/css/main.css` 中修改 CSS 變數：

```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
  /* ... 其他顏色 */
}
```

### 新增商品資料

在 `composables/useProducts.ts` 中修改 `mockProducts` 陣列。

實際應用中，這部分應該連接到後端 API。

## 🚀 部署

### Vercel 部署

```bash
bun run build
```

將專案推送到 GitHub，然後在 Vercel 上導入專案。

> 💡 在 Vercel 設定中，將 Install Command 改為 `bun install`，Build Command 改為 `bun run build`

### Netlify 部署

```bash
bun run generate
```

將 `.output/public` 目錄部署到 Netlify。

> 💡 在 Netlify 設定中，將 Build command 改為 `bun install && bun run generate`

## 📝 待辦事項

- [ ] 串接真實後端 API
- [ ] 加入使用者登入/註冊功能
- [ ] 訂單歷史記錄
- [ ] 商品評論系統
- [ ] 商品搜尋功能
- [ ] 願望清單功能
- [ ] 多語系支援
- [ ] 深色模式
- [ ] 單元測試
- [ ] E2E 測試

## 📄 授權

MIT License

## 👨‍💻 作者

時尚服飾館開發團隊

---

如有任何問題或建議，歡迎提出 Issue 或 Pull Request！
