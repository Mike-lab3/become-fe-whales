# 📋 SPECS: Whales Market — React App (Become FE)

> **Dành cho AI tool (Antigravity / Cursor / Claude Code)**
> Đây là tài liệu specs để AI build app React từ Figma design của Whales Market.
> Không cần backend. Toàn bộ data dùng mock (JSON/hardcode).

---

## 1. TECH STACK & SETUP

### Stack bắt buộc
| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v6 |
| State | useState / useContext (không cần Redux) |
| Mock Data | JSON files trong `src/mock-data/` |
| Build tool | Vite |

### Cấu trúc project
```
become-fe-whales/
├── src/
│   ├── pages/          # Mỗi page là 1 file .tsx
│   ├── components/     # Shared components (Navbar, Button, Modal...)
│   ├── mock-data/      # JSON files cho mỗi entity
│   ├── hooks/          # Custom hooks nếu cần
│   └── App.tsx         # Routing config
├── public/
├── ai-showcase/        # Screenshots của prompt hay
├── README.md
└── package.json
```

### Setup commands
```bash
npm create vite@latest become-fe-whales -- --template react-ts
cd become-fe-whales
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom
npm run dev
```

### Tailwind config (`tailwind.config.js`)
```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

---

## 2. PAGES & COMPONENTS

### 2.1 Danh sách Pages

| Route | Page | Mô tả |
|---|---|---|
| `/` | Landing / Home | Trang giới thiệu Whales Market |
| `/marketplace` | Marketplace | Danh sách listings để mua/bán |
| `/listing/:id` | Listing Detail | Chi tiết 1 listing |
| `/portfolio` | Portfolio / Dashboard | Trang tổng quan tài sản user |
| `/profile` | Profile | Thông tin user |
| `/create` | Create Listing | Form tạo listing mới |

> ⚠️ Điều chỉnh route nếu Figma design có page khác — hỏi AI đọc Figma MCP để xác nhận.

---

### 2.2 Shared Components

#### `<Navbar />`
- Logo Whales Market (trái)
- Navigation links: Home / Marketplace / Portfolio
- Wallet connect button (phải) — mock, không cần wallet thật
- Mobile: hamburger menu

#### `<Button />`
```tsx
// Props: variant ("primary" | "secondary" | "ghost"), size ("sm" | "md" | "lg"), onClick, disabled, children
```

#### `<Card />`
- Container có border-radius, shadow, padding
- Dùng cho listing cards, portfolio items

#### `<Badge />`
- Status badge: Active / Pending / Completed / Cancelled
- Color tương ứng với từng status

#### `<Modal />`
- Overlay + centered container
- Props: isOpen, onClose, title, children
- Đóng khi click overlay hoặc bấm X

#### `<Table />`
- Sortable table cho danh sách dữ liệu
- Props: columns, data

#### `<EmptyState />`
- Hiển thị khi không có data
- Icon + message + optional CTA button

---

### 2.3 Chi tiết từng Page

#### `/` — Landing / Home
**Mục đích:** Giới thiệu platform, CTA vào marketplace.

**Sections:**
- Hero: headline + subtext + nút "Go to Marketplace"
- Stats bar: Total Volume / Active Listings / Traders (hardcode số)
- Featured Listings: Grid 3 cards, lấy từ mock data
- How it works: 3 bước dạng icon + text

**Interactions:**
- Bấm "Go to Marketplace" → navigate `/marketplace`
- Bấm card listing → navigate `/listing/:id`

---

#### `/marketplace` — Marketplace
**Mục đích:** Xem và lọc tất cả listings.

**Layout:** Sidebar filter (trái) + Grid listings (phải)

**Filter sidebar:**
- Filter by Type: All / Buy / Sell (radio/tab)
- Filter by Token: dropdown chọn token (mock: ETH, BTC, SOL, BNB...)
- Filter by Price Range: 2 input số (min/max)
- Filter by Status: Active / Completed / Pending (checkbox)
- Nút "Reset Filters"

**Listing Grid:**
- Grid 3 cột (desktop), 1 cột (mobile)
- Mỗi card: token icon + name, price, amount, type (Buy/Sell badge), status, nút "View Detail"
- Sort bar: Sort by Price / Volume / Date (dropdown)
- Hiển thị số lượng kết quả: "Showing 12 of 48 listings"
- Pagination hoặc Load more button

**Interactions:**
- Thay đổi filter → cập nhật danh sách ngay (filter trên mock data)
- Sort → re-sort danh sách
- Bấm card / "View Detail" → navigate `/listing/:id`

---

#### `/listing/:id` — Listing Detail
**Mục đích:** Xem chi tiết 1 listing, thực hiện giao dịch (mock).

**Layout:** 2 cột — thông tin listing (trái) + action panel (phải)

**Thông tin listing (trái):**
- Token name + icon + network badge
- Price, Amount, Total Value
- Type: Buy hoặc Sell (badge màu)
- Status: Active / Completed...
- Seller info: avatar placeholder + địa chỉ ví (rút gọn: 0x1234...abcd)
- Created at, Expires at
- Description / notes

**Action panel (phải):**
- Nếu type = "Sell": nút "Buy Now" → mở Modal xác nhận
- Nếu type = "Buy": nút "Sell to This Order" → mở Modal xác nhận
- Input số lượng muốn giao dịch (nếu partial fill)
- Summary: bạn trả / nhận bao nhiêu

**Confirm Modal:**
- Tiêu đề "Confirm Transaction"
- Summary giao dịch
- 2 nút: "Cancel" + "Confirm" (mock — hiện toast "Transaction submitted!")

**Interactions:**
- Bấm Buy/Sell → mở Modal
- Modal Confirm → toast success + đóng modal
- Breadcrumb: Marketplace → Listing Detail

---

#### `/portfolio` — Portfolio / Dashboard
**Mục đích:** Xem tổng quan tài sản và lịch sử giao dịch của user.

**Sections:**

*Stats cards (trên cùng):*
- Total Value (USD)
- Active Listings
- Completed Trades
- P&L (mock số)

*My Listings tab:*
- Table: Token | Type | Price | Amount | Status | Action
- Action: "Cancel" (với listing Active) → confirm modal → update status
- Filter tab: All / Active / Completed / Cancelled

*Transaction History tab:*
- Table: Date | Token | Type | Amount | Price | Total | Status
- Sort by Date (mặc định mới nhất trước)

**Interactions:**
- Switch tab → hiện data tương ứng
- Cancel listing → confirm modal → status chuyển "Cancelled"
- Bấm listing row → navigate `/listing/:id`

---

#### `/profile` — Profile
**Mục đích:** Thông tin user.

**Nội dung:**
- Avatar (placeholder)
- Wallet address (mock: 0xAbCd...1234)
- Username (editable)
- Join date
- Stats: Total trades, Volume, Rating
- Edit Profile button → form inline hoặc modal (username có thể edit)

**Interactions:**
- Edit → hiện form input → Save → cập nhật hiển thị (local state)

---

#### `/create` — Create Listing
**Mục đích:** Tạo listing mới.

**Form fields:**
- Token: dropdown chọn (ETH, BTC, SOL, BNB, USDT...)
- Type: Buy / Sell (toggle/radio)
- Price per unit: number input (USD)
- Amount: number input
- Total Value: tự tính = Price × Amount (readonly)
- Min fill amount: number input (optional)
- Expiry date: date picker
- Notes: textarea (optional)

**Validation:**
- Price, Amount bắt buộc, phải > 0
- Expiry date không được ở quá khứ
- Show error message inline dưới field

**Submit:**
- Nút "Create Listing" → validate → nếu OK hiện Modal preview
- Modal preview: tóm tắt listing → "Confirm & Submit"
- Submit → toast "Listing created!" → navigate `/marketplace`

---

## 3. MOCK DATA

### `src/mock-data/listings.json`
```json
[
  {
    "id": "1",
    "token": "ETH",
    "tokenIcon": "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    "network": "Ethereum",
    "type": "sell",
    "price": 2450.00,
    "amount": 5.5,
    "totalValue": 13475.00,
    "status": "active",
    "seller": "0xAbCd...1234",
    "createdAt": "2024-01-15T10:00:00Z",
    "expiresAt": "2024-02-15T10:00:00Z",
    "description": "Selling ETH at market price"
  }
]
```
> Tạo ít nhất 20 listings với đa dạng token, type, status.

### `src/mock-data/transactions.json`
```json
[
  {
    "id": "tx1",
    "listingId": "1",
    "token": "ETH",
    "type": "buy",
    "amount": 1.0,
    "price": 2450.00,
    "total": 2450.00,
    "status": "completed",
    "date": "2024-01-16T14:30:00Z"
  }
]
```

### `src/mock-data/portfolio.json`
```json
{
  "totalValue": 45230.50,
  "activeListings": 3,
  "completedTrades": 12,
  "pnl": 1230.00,
  "assets": [
    { "token": "ETH", "amount": 2.5, "valueUSD": 6125.00 },
    { "token": "BTC", "amount": 0.1, "valueUSD": 4350.00 }
  ]
}
```

---

## 4. USER FLOWS & INTERACTIONS

### Flow 1: Mua listing
```
Marketplace → [bấm card] → Listing Detail
→ [bấm "Buy Now"] → Confirm Modal hiện
→ [nhập amount] → [bấm Confirm]
→ Toast "Transaction submitted!" → Modal đóng
→ Status listing chuyển "Pending" (local state)
```

### Flow 2: Tạo listing mới
```
Navbar → [bấm "+ Create"] → /create
→ [điền form] → [validate]
→ [bấm "Create Listing"] → Preview Modal
→ [bấm "Confirm & Submit"]
→ Toast "Listing created!" → redirect /marketplace
→ Listing mới xuất hiện đầu danh sách
```

### Flow 3: Quản lý listing (Portfolio)
```
/portfolio → tab "My Listings"
→ [bấm "Cancel"] trên listing Active
→ Confirm modal "Cancel this listing?"
→ [bấm "Yes, Cancel"]
→ Status chuyển "Cancelled" → row update ngay
```

### Flow 4: Filter marketplace
```
/marketplace → sidebar filter
→ Chọn Token = "ETH" → grid tự lọc
→ Chọn Type = "Sell" → grid lọc thêm
→ Drag price range → lọc theo giá
→ [bấm Reset] → trở về full list
```

---

## 5. UI / UX GUIDELINES

### Colors (theo Figma Whales Market)
- Dùng màu từ Figma design. Nếu không có Figma MCP, tạm dùng:
  - Primary: `#0066FF`
  - Background: `#0A0B0D` (dark theme)
  - Card bg: `#13151A`
  - Text primary: `#FFFFFF`
  - Text secondary: `#8A919E`
  - Success/Buy: `#22C55E`
  - Danger/Sell: `#EF4444`
  - Border: `#1F2329`

### Typography
- Font: Inter (hoặc font từ Figma)
- Heading: bold, white
- Body: regular, `text-secondary`

### Responsive
- Desktop (≥1280px): layout đầy đủ
- Tablet (768–1279px): sidebar collapse, grid 2 cột
- Mobile (<768px): 1 cột, bottom nav thay sidebar

### States cần có
- Hover: button, card, row — phải có visual feedback
- Loading: spinner khi "xử lý" giao dịch (dùng setTimeout 1-2s mock)
- Empty: EmptyState component khi không có data
- Error: inline error message trên form

---

## 6. CHECKLIST TRƯỚC KHI DEMO

- [ ] `npm run dev` chạy không lỗi
- [ ] Tất cả routes navigate được
- [ ] Không có nút/link "chết" (bấm phải có phản hồi)
- [ ] Mock data hiển thị đúng, không placeholder rỗng
- [ ] Filter/sort trên Marketplace hoạt động
- [ ] Modal confirm hoạt động (mở, đóng, submit)
- [ ] Toast notification hiện sau action
- [ ] Form Create Listing có validation
- [ ] Portfolio tabs switch được
- [ ] Responsive mobile ổn (ít nhất không bị vỡ layout)
- [ ] Không có console error trong browser
- [ ] AI Showcase: ≥3 screenshot prompt hay

---

*Built with AI — Become FE — Whales Market*
