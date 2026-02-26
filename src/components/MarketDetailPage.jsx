import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronDownIcon, SortIcon } from "../assets/icons";
import imgFilterIcon from "../assets/chart_line_fill.png";
import imgChainSolana from "../assets/chains/solana.png";
import imgChainEthereum from "../assets/chains/ethereum.png";
import imgChainSui from "../assets/chains/sui.png";
import imgMascot from "../assets/mascot.png";

// ── Sample Data ────────────────────────────────────────────────────────────

const SAMPLE_BUY_ORDERS = [
  { price: "0.0018", amount: "38.76K",  collateral: "0.50",   token: "sol", byMe: true },
  { price: "0.0020", amount: "34.88K",  collateral: "0.50",   token: "sol" },
  { price: "0.0021", amount: "99.67K",  collateral: "1.50",   token: "sol", badge: "RS", isFull: true, originalPrice: "0.0040" },
  { price: "0.0022", amount: "6.34K",   collateral: "0.10",   token: "sol", isFull: true },
  { price: "0.0024", amount: "46.51K",  collateral: "0.80",   token: "sol" },
  { price: "0.0025", amount: "195.36K", collateral: "3.50",   token: "sol", isFull: true },
  { price: "0.0028", amount: "99.67K",  collateral: "2.00",   token: "sol" },
  { price: "0.0030", amount: "23.26K",  collateral: "0.50",   token: "sol" },
  { price: "0.0035", amount: "139.54K", collateral: "3.50",   token: "sol" },
  { price: "0.0036", amount: "111.11K", collateral: "400.00", token: "usdt" },
  { price: "0.0038", amount: "55.08K",  collateral: "1.50",   token: "sol" },
  { price: "0.0040", amount: "125.00K", collateral: "500.00", token: "usdt" },
  { price: "0.0042", amount: "476.19K", collateral: "2.00K",  token: "usdt", byMe: true },
  { price: "0.0044", amount: "190.28K", collateral: "6.00",   token: "sol", badge: "RS", isFull: true, originalPrice: "0.0060" },
  { price: "0.0045", amount: "155.04K", collateral: "5.00",   token: "sol" },
];

const SAMPLE_SELL_ORDERS = [
  { price: "0.0015", amount: "279.08K", collateral: "3.00",   token: "sol" },
  { price: "0.0015", amount: "139.54K", collateral: "1.50",   token: "sol" },
  { price: "0.0015", amount: "186.05K", collateral: "2.00",   token: "sol" },
  { price: "0.0015", amount: "93.03K",  collateral: "1.00",   token: "sol" },
  { price: "0.0015", amount: "186.05K", collateral: "2.00",   token: "sol", byMe: true },
  { price: "0.0014", amount: "199.34K", collateral: "2.00",   token: "sol" },
  { price: "0.0013", amount: "53.67K",  collateral: "0.50",   token: "sol" },
  { price: "0.0012", amount: "12.50K",  collateral: "15.00",  token: "usdt", isFull: true },
  { price: "0.0011", amount: "2.73M",   collateral: "3.00K",  token: "usdt", isFull: true },
  { price: "0.0010", amount: "100.00K", collateral: "100.00", token: "sui" },
  { price: "0.0008", amount: "174.43K", collateral: "1.00",   token: "sol" },
  { price: "0.0005", amount: "100.00K", collateral: "50.00",  token: "sui" },
  { price: "0.0003", amount: "500.00K", collateral: "150.00", token: "sui" },
  { price: "0.0002", amount: "500.00K", collateral: "100.00", token: "usdt" },
  { price: "0.0001", amount: "10.00K",  collateral: "10.00",  token: "usdt" },
];

const RECENT_TRADES = [
  { time: "1m ago",  side: "Sell",             pair: "SKATE/USDC", price: "0.0050", amount: "36.40K",   collateral: "182.00",   token: "sol",  tier: "🐟" },
  { time: "2m ago",  side: "Sell",             pair: "SKATE/USDC", price: "0.0050", amount: "181.80K",  collateral: "909.00",   token: "sol",  tier: "🐳" },
  { time: "5m ago",  side: "Buy", badge: "RS", pair: "SKATE/USDC", price: "0.0050", amount: "1.00M",    collateral: "5,000.00", token: "sol",  tier: "🐬" },
  { time: "6m ago",  side: "Buy", badge: "RS", pair: "SKATE/USDC", price: "0.0050", amount: "400.00K",  collateral: "2,000.00", token: "sol",  tier: "🦑" },
  { time: "7m ago",  side: "Buy",              pair: "SKATE/USDC", price: "0.0050", amount: "36.20K",   collateral: "181.00",   token: "sol",  tier: "🦐" },
  { time: "10m ago", side: "Buy",              pair: "SKATE/USDC", price: "0.0050", amount: "1.00M",    collateral: "5,000.00", token: "sol",  tier: "🐋" },
  { time: "12m ago", side: "Buy",              pair: "SKATE/USDC", price: "0.0050", amount: "18.2K",    collateral: "91.00",    token: "sol",  tier: "🦈" },
];

const MY_OPEN_ORDERS = [
  {
    side: "Buy", pair: "SKATE/SOL", date: "23/02/2024 15:33:15",
    priceLabel: "Price", price: "$0.0050",
    amount: "1.00K", collateral: "1.5", unit: "SOL", action: "Close",
  },
  {
    side: "Resell", pair: "SKATE/SOL", date: "23/02/2024 15:33:15",
    badge: "RS",
    priceLabel: "Price / Original Price",
    entryPrice: "$0.0060", price: "$0.0050",
    amount: "1.00K", collateral: "1.8", unit: "SOL", action: "Close",
  },
  {
    side: "Sell", pair: "SKATE/SOL", date: "23/02/2024 15:33:15",
    priceLabel: "Price", price: "$0.0050",
    amount: "1.00K", collateral: "1.5", unit: "SOL", action: "Close",
  },
  {
    side: "Sell", pair: "SKATE/SOL", date: "23/02/2024 15:33:15",
    priceLabel: "Price", price: "$0.0050",
    amount: "2.00K", collateral: "3.0", unit: "SOL", action: "Close",
  },
  {
    side: "Sell", pair: "SKATE/SOL", date: "22/02/2024 09:15:30",
    priceLabel: "Price", price: "$0.0048",
    amount: "500", collateral: "0.75", unit: "SOL", action: "Close",
  },
];

const MY_FILLED_ORDERS = [
  {
    side: "Buy", pair: "ERA/ETH", date: "23/02/2024 15:33:15",
    priceLabel: "Price", price: "$0.0050",
    amount: "1.00K", collateral: "0.1", unit: "ETH", action: "Resell",
  },
  {
    side: "Buy", pair: "ERA/ETH", date: "23/02/2024 15:33:15",
    badge: "RS",
    priceLabel: "Your Entry / Original Price",
    entryPrice: "$0.0040", price: "$0.0050",
    amount: "1.00K", collateral: "0.2", unit: "ETH", action: "Resell",
  },
  {
    side: "Buy", pair: "ERA/ETH", date: "23/02/2024 15:33:15",
    priceLabel: "Price", price: "$0.0050",
    extraPrice: "$0.0060",
    amount: "1.00K", collateral: "0.2", unit: "ETH", action: "Resell",
  },
  {
    side: "Sell", pair: "ERA/ETH", date: "23/02/2024 15:33:15",
    priceLabel: "Price", price: "$0.0050",
    amount: "1.00K", collateral: "0.3", unit: "ETH",
  },
  {
    side: "Sell", pair: "SKATE/SOL", date: "23/02/2024 15:33:15",
    priceLabel: "Price", price: "$0.0050",
    amount: "1.00K", collateral: "1.5", unit: "SOL",
  },
];

// ── Inline SVG Icons ───────────────────────────────────────────────────────

function ArrowRightUpIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UmbrellaIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12H3Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 12V19C12 20.1046 12.8954 21 14 21C15.1046 21 16 20.1046 16 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PigIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 9.5C20 9.5 21 9.5 21 10.5C21 11.5 20 11.5 20 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 10C4 7.79086 5.79086 6 8 6H14C16.2091 6 18 7.79086 18 10V13C18 15.2091 16.2091 17 14 17H10C7.79086 17 6 15.2091 6 13V10Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9.5" cy="10.5" r="1" fill="currentColor" />
      <path d="M9 6L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 17L7 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 17L15 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}


function DashboardIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Collateral token badges — size-4 (16px) round per Figma
function CollateralBadge({ token }) {
  if (token === "usdt") return (
    <span className="inline-flex items-center justify-center size-4 rounded-full bg-[#26a17b] text-white shrink-0" style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "-0.5px" }}>
      T
    </span>
  );
  if (token === "sui") return <img src={imgChainSui} alt="SUI" className="size-4 rounded-full shrink-0 object-cover" />;
  return <img src={imgChainSolana} alt="SOL" className="size-4 rounded-full shrink-0 object-cover" />;
}

// ByMe badge — 20px round with user icon inside
function ByMeIcon() {
  return (
    <div className="size-5 rounded-full bg-bg-neutral-02 flex items-center justify-center shrink-0">
      <svg className="size-3 text-text-neutral-tertiary" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6.5a2 2 0 100-4 2 2 0 000 4z" fill="currentColor" />
        <path d="M1.5 11c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Full badge
function FullBadge() {
  return (
    <span className="inline-flex items-center justify-center bg-bg-neutral-02 text-text-neutral-tertiary text-[10px] font-medium uppercase px-2 py-1 rounded-full shrink-0 whitespace-nowrap">
      Full
    </span>
  );
}

// ── Chart Crosshair Overlay ────────────────────────────────────────────────

function ChartCrosshair({ x, y, containerW, containerH, type = "price" }) {
  // Tooltip: flip to left if too close to right edge
  const tooltipW = 160;
  const tooltipH = 80;
  const offsetX = 12;
  const offsetY = -tooltipH / 2;
  const tipLeft = x + offsetX + tooltipW > containerW ? x - tooltipW - offsetX : x + offsetX;
  const tipTop  = Math.max(4, Math.min(y + offsetY, containerH - tooltipH - 4));

  // Interpolate values from cursor position
  const priceVal = (0.001 + (1 - y / containerH) * 0.004).toFixed(4);
  const volVal   = Math.round(200 - (y / containerH) * 100) + "K";
  const yAxisVal = type === "volume" ? volVal : priceVal;

  // Y-axis reference label (right edge → overlaps Y-axis column)
  const yLabelH  = 18;
  const yLabelTop = Math.max(0, Math.min(y - yLabelH / 2, containerH - yLabelH));

  return (
    <>
      {/* Vertical dashed line — tall enough (400px) to span both price + volume charts */}
      <div
        className="absolute top-0 pointer-events-none"
        style={{ left: x, width: 1, height: 400, borderLeft: "1px dashed rgba(255,255,255,0.25)" }}
      />
      {/* Horizontal dashed line — stops at chart right edge */}
      <div
        className="absolute left-0 pointer-events-none"
        style={{ top: y, height: 1, width: containerW, borderTop: "1px dashed rgba(255,255,255,0.25)" }}
      />
      {/* "+" crosshair icon */}
      <div
        className="absolute pointer-events-none text-white/60 select-none"
        style={{
          left: x,
          top: y,
          transform: "translate(-50%, -50%)",
          width: 16,
          height: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2V14M2 8H14" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {/* Green dot snapped to price line */}
      {type === "price" && (() => {
        const dotY = getPriceLineY(x / containerW, containerH);
        return (
          <div
            className="absolute pointer-events-none z-20"
            style={{
              left: x,
              top: dotY,
              transform: "translate(-50%, -50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#16c284",
              boxShadow: "0 0 0 3px rgba(22,194,132,0.25)",
            }}
          />
        );
      })()}
      {/* Tooltip — only for price chart */}
      {type === "price" && (
        <div
          className="absolute pointer-events-none z-10"
          style={{ left: tipLeft, top: tipTop }}
        >
          <div className="bg-bg-neutral-03 rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.4)] px-3 py-2 flex flex-col gap-1.5 w-40">
            <div className="border-b border-border-neutral-03 pb-2">
              <span className="text-[10px] text-text-neutral-tertiary">18/03/2025, 8:48 AM</span>
            </div>
            <div className="flex gap-1 text-[11px]">
              <span className="text-text-neutral-tertiary">Price:</span>
              <span className="text-text-neutral-primary">${priceVal}</span>
            </div>
            <div className="flex gap-1 text-[11px]">
              <span className="text-text-neutral-tertiary">Vol:</span>
              <span className="text-text-neutral-primary">$19,318,326.1</span>
            </div>
          </div>
        </div>
      )}
      {/* Y-axis reference label — extends into Y-axis column on the right */}
      <div
        className="absolute pointer-events-none z-20 flex items-center px-1.5"
        style={{
          left: containerW,
          top: yLabelTop,
          width: 68,
          height: yLabelH,
          background: "rgba(80,80,90,0.85)",
          borderRadius: 3,
        }}
      >
        <span className="text-[10px] text-white font-medium leading-none">{yAxisVal}</span>
      </div>
    </>
  );
}

// ── Static Price Chart ─────────────────────────────────────────────────────

const PRICE_SVG_W = 820;
const PRICE_SVG_H = 240;
const PRICE_PTS = [
  [0, 218], [15, 216], [30, 214], [60, 210], [90, 205],
  [120, 200], [150, 196], [180, 188], [200, 183], [220, 175],
  [240, 172], [260, 168], [280, 174], [300, 180], [320, 177],
  [340, 173], [360, 168], [380, 163], [400, 158], [420, 153],
  [440, 160], [460, 165], [480, 160], [500, 154], [520, 148],
  [540, 140], [560, 130], [580, 115], [600, 100], [620, 88],
  [640, 72], [660, 60], [680, 62], [700, 64], [720, 63],
  [740, 62], [760, 63], [780, 64], [820, 65],
];

/** Interpolate the price-line SVG Y at a given x-fraction (0–1), then scale to containerH */
function getPriceLineY(xFrac, containerH) {
  const svgX = Math.max(0, Math.min(PRICE_SVG_W, xFrac * PRICE_SVG_W));
  let i = PRICE_PTS.length - 2;
  for (let k = 0; k < PRICE_PTS.length - 1; k++) {
    if (svgX <= PRICE_PTS[k + 1][0]) { i = k; break; }
  }
  const [x0, y0] = PRICE_PTS[i];
  const [x1, y1] = PRICE_PTS[i + 1];
  const t = x1 === x0 ? 0 : (svgX - x0) / (x1 - x0);
  const svgY = y0 + t * (y1 - y0);
  return (svgY / PRICE_SVG_H) * containerH;
}

function PriceChart() {
  const W = PRICE_SVG_W;
  const H = PRICE_SVG_H;
  const pts = PRICE_PTS;
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16c284" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#16c284" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Horizontal guide lines */}
      {[48, 96, 144, 192].map((y) => (
        <line key={y} x1="0" y1={y} x2={W} y2={y} stroke="#1b1b1c" strokeWidth="1" />
      ))}
      {/* Area fill */}
      <path d={area} fill="url(#priceGradient)" />
      {/* Price line */}
      <path d={line} fill="none" stroke="#16c284" strokeWidth="1.5" />
      {/* Current price dashed line */}
      <line x1="0" y1={pts[pts.length - 1][1]} x2={W} y2={pts[pts.length - 1][1]} stroke="#16c284" strokeWidth="1" strokeDasharray="4,3" />
    </svg>
  );
}

// ── Static Volume Chart ────────────────────────────────────────────────────

const VOLUME_BARS = [
  { h: 100, up: true }, { h: 11, up: true }, { h: 32, up: true }, { h: 16, up: true },
  { h: 2,  up: true }, { h: 40, up: true }, { h: 54, up: false }, { h: 28, up: true },
  { h: 44, up: false }, { h: 11, up: true }, { h: 30, up: true }, { h: 40, up: false },
  { h: 19, up: false }, { h: 2,  up: true }, { h: 2,  up: true }, { h: 2,  up: true },
  { h: 2,  up: true }, { h: 2,  up: true }, { h: 8,  up: true }, { h: 16, up: true },
  { h: 2,  up: true }, { h: 30, up: true }, { h: 44, up: true }, { h: 32, up: true },
  { h: 19, up: true }, { h: 68, up: false }, { h: 38, up: false }, { h: 23, up: true },
  { h: 11, up: true }, { h: 2,  up: true }, { h: 2,  up: true }, { h: 2,  up: true },
  { h: 2,  up: true }, { h: 2,  up: true }, { h: 2,  up: true }, { h: 32, up: true },
  { h: 19, up: true }, { h: 23, up: true }, { h: 54, up: false }, { h: 44, up: false },
  { h: 68, up: true }, { h: 54, up: true }, { h: 74, up: false }, { h: 54, up: true },
  { h: 38, up: true }, { h: 28, up: true }, { h: 54, up: true }, { h: 74, up: false },
  { h: 100, up: false }, { h: 68, up: false }, { h: 49, up: true },
];

// ── Main Component ─────────────────────────────────────────────────────────

export default function MarketDetailPage({ market, onBack }) {
  const [activeOrderTab, setActiveOrderTab] = useState("filled");
  const [activeOrderBookTab, setActiveOrderBookTab] = useState("buy");
  const [chartPeriod, setChartPeriod] = useState("1d");
  const [chartType, setChartType] = useState("price");
  const [selectedOrder, setSelectedOrder] = useState(null); // { type, price, amount, collateral, token }
  const [selectedMyOpenOrder, setSelectedMyOpenOrder] = useState(null);
  const [showCloseOrderModal, setShowCloseOrderModal] = useState(false);
  const [closeOrderAcknowledged, setCloseOrderAcknowledged] = useState(false);
  const [sliderValue, setSliderValue] = useState(100);
  const [openDropdown, setOpenDropdown] = useState(null); // 'collateral' | 'fillType' | 'orderType'
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [toastState, setToastState] = useState(null); // null | 'pending' | 'success' | 'failed'
  const toastTimerRef = useRef(null);
  const toastDismissRef = useRef(null);
  useEffect(() => {
    if (toastState === "success" || toastState === "failed") {
      clearTimeout(toastDismissRef.current);
      toastDismissRef.current = setTimeout(() => setToastState(null), 3000);
    }
    return () => clearTimeout(toastDismissRef.current);
  }, [toastState]);
  const [showResellModal, setShowResellModal] = useState(false);
  const [resellModalOrder, setResellModalOrder] = useState(null);
  const [resellPrice, setResellPrice] = useState("");
  const [showResellConfirmModal, setShowResellConfirmModal] = useState(false);
  const [resellAcknowledged, setResellAcknowledged] = useState(false);
  const [resellPending, setResellPending] = useState(false);
  const resellTimerRef = useRef(null);
  const [showOrderInfoModal, setShowOrderInfoModal] = useState(false);
  const [selectedOrderInfo, setSelectedOrderInfo] = useState(null);
  const [collateral, setCollateral] = useState("All");
  const [fillType, setFillType] = useState("All");
  const [orderType, setOrderType] = useState("All");
  const [showChart, setShowChart] = useState(true);
  const [customTokenInput, setCustomTokenInput] = useState(""); // user-typed SKATE amount
  const [chartHover, setChartHover] = useState(null); // { x, y, w, h }
  const chartRef = useRef(null);
  // Shared X-axis fraction (0–1) tracked across both charts for the date reference label
  const [hoverXFrac, setHoverXFrac] = useState(null);

  const handleChartMouseMove = useCallback((e) => {
    const rect = chartRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    setChartHover({ x, y: e.clientY - rect.top, w: rect.width, h: rect.height });
    setHoverXFrac(x / rect.width);
  }, []);

  const handleChartMouseLeave = useCallback(() => {
    setChartHover(null);
    setHoverXFrac(null);
  }, []);

  const [volChartHover, setVolChartHover] = useState(null);
  const volChartRef = useRef(null);

  const handleVolChartMouseMove = useCallback((e) => {
    const rect = volChartRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    setVolChartHover({ x, y: e.clientY - rect.top, w: rect.width, h: rect.height });
    setHoverXFrac(x / rect.width);
  }, []);

  const handleVolChartMouseLeave = useCallback(() => {
    setVolChartHover(null);
    setHoverXFrac(null);
  }, []);

  return (
    <div className="flex flex-col">

      {/* ── Breadcrumb ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 py-3">
        <button
          onClick={onBack}
          className="text-xs text-text-neutral-secondary hover:text-text-neutral-primary transition-colors"
        >
          Whales.Market
        </button>
        <ChevronRightIcon className="size-4 text-text-neutral-tertiary" />
        <span className="text-xs text-text-neutral-secondary">Pre-market</span>
        <ChevronRightIcon className="size-4 text-text-neutral-tertiary" />
        <span className="text-xs text-text-neutral-primary">{market.name}</span>
      </div>

      {/* ── Market Header ───────────────────────────────────────────── */}
      <div className="border-b-[3px] border-border-neutral-01 py-6 flex items-center gap-4">

        {/* Token info + stats */}
        <div className="flex flex-1 items-center gap-8 min-w-0 overflow-hidden">

          {/* Token icon + name */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative size-11 flex items-center justify-center">
              <img src={market.tokenImg} alt="" className="size-9 rounded-full object-cover" />
              <img src={market.chainImg} alt="" className="absolute bottom-0 left-0 size-4 rounded-[4px] border-2 border-bg-neutral-01 object-cover" />
            </div>
            <div className="flex flex-col gap-0 items-start justify-center">
              <span className="text-[18px] font-medium leading-7 text-text-neutral-primary">{market.name}</span>
              <span className="text-xs text-text-neutral-tertiary leading-4">{market.sub}</span>
            </div>
          </div>

          {/* Current price */}
          <div className="flex flex-col items-start shrink-0">
            <span className="text-[18px] font-medium leading-7 text-text-neutral-primary">$0.0045</span>
            <span className="text-xs text-text-success leading-4">+0.13%</span>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8">

            {/* 24h Vol */}
            <div className="flex flex-col items-start">
              <div className="py-1.5">
                <span className="text-xs text-text-neutral-tertiary">24h Vol.</span>
              </div>
              <div className="flex items-center gap-1 py-0.5">
                <span className="text-xs text-text-neutral-primary">$561,365.5</span>
                <span className="text-xs text-text-success">+159.36%</span>
              </div>
            </div>

            {/* Total Vol */}
            <div className="flex flex-col items-start">
              <div className="py-1.5">
                <span className="text-xs text-text-neutral-tertiary">Total Vol.</span>
              </div>
              <div className="py-0.5">
                <span className="text-xs text-text-neutral-primary">$33.5M</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex flex-col items-start">
              <div className="py-1.5">
                <span className="text-xs text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 cursor-default">
                  Countdown
                </span>
              </div>
              <div className="py-0.5">
                <span className="text-[10px] font-medium uppercase bg-bg-neutral-02 text-text-neutral-tertiary px-2 py-1 rounded-full">
                  TBA
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">

          {/* About SKATE (split button) */}
          <div className="flex items-stretch border border-border-neutral-02 rounded-lg overflow-hidden">
            <button className="flex items-center gap-1.5 pl-4 pr-2 py-[7px] text-sm font-medium text-text-neutral-primary hover:bg-bg-neutral-02 transition-colors">
              About {market.name}
              <ArrowRightUpIcon className="size-5" />
            </button>
            <button className="flex items-center px-2 py-[7px] text-text-neutral-primary hover:bg-bg-neutral-02 transition-colors border-l border-border-neutral-02">
              <ChevronDownIcon className="size-5" />
            </button>
          </div>

          {/* Airdrop Checker */}
          <button className="flex items-center gap-1.5 pl-2 pr-4 py-[7px] border border-[#5bd197] rounded-lg text-sm font-medium text-[#5bd197] hover:bg-bg-neutral-02 transition-colors">
            <UmbrellaIcon className="size-5" />
            Airdrop Checker
          </button>

          {/* Earn 50% Fee + divider + Create Order */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 pl-2 pr-4 py-[7px] border border-[#f97316] rounded-lg text-sm font-medium text-[#f97316] hover:bg-bg-neutral-02 transition-colors">
              <PigIcon className="size-5" />
              Earn 50% Fee
            </button>
            <div className="w-px h-4 bg-border-neutral-02" />
            <button className="flex items-center gap-1.5 pl-2 pr-4 py-[7px] bg-[#f9f9fa] rounded-lg text-sm font-medium text-[#0a0a0b] hover:opacity-90 transition-opacity">
              <PlusIcon className="size-5" />
              Create Order
            </button>
          </div>

        </div>
      </div>

      {/* ── Page Body ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 pt-4">

        {/* Content grid: left | divider | right */}
        <div className="flex min-h-0">

          {/* ── Left column ─────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-4 pr-4">

            {/* Section title + filter controls */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium text-text-neutral-primary">Trading Market</span>
                <button className="w-fit inline-flex items-center gap-0.5 text-xs text-text-neutral-secondary border-b border-border-neutral-02 hover:opacity-80 transition-opacity pb-px">
                  How it works?
                  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              {/* Click outside overlay */}
              {openDropdown && (
                <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)} />
              )}

              <div className="flex items-center gap-2">

                {/* ── Collateral dropdown ── */}
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === "collateral" ? null : "collateral")}
                    className="flex items-center gap-1.5 px-3 py-2 bg-bg-neutral-02 rounded-lg text-sm text-text-neutral-primary hover:bg-bg-neutral-03 transition-colors"
                  >
                    {collateral !== "All" && (() => {
                      const icon = collateral === "SOL" ? imgChainSolana : collateral === "SUI" ? imgChainSui : imgChainEthereum;
                      return <img src={icon} className="size-4 rounded-full object-cover" alt={collateral} />;
                    })()}
                    {collateral}
                    <ChevronDownIcon className="size-4 text-text-neutral-primary" />
                  </button>
                  {openDropdown === "collateral" && (
                    <div className="absolute top-full mt-1 left-0 z-30 bg-bg-neutral-02 rounded-[10px] shadow-[0_0_32px_rgba(0,0,0,0.2)] overflow-hidden w-48">
                      <div className="flex flex-col gap-1 p-2">
                        <p className="text-xs text-text-neutral-tertiary font-medium px-2 py-1">Select Token</p>
                        {[
                          { label: "All", icon: null },
                          { label: "USDT", icon: imgChainEthereum },
                          { label: "USDC", icon: imgChainEthereum },
                          { label: "SOL", icon: imgChainSolana },
                        ].map(({ label, icon }) => (
                          <button
                            key={label}
                            onClick={() => { setCollateral(label); setOpenDropdown(null); }}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-text-neutral-primary transition-colors w-full text-left ${collateral === label ? "bg-bg-neutral-03" : "hover:bg-bg-neutral-03"}`}
                          >
                            {icon ? (
                              <img src={icon} className="size-5 rounded-sm object-cover shrink-0" alt={label} />
                            ) : (
                              <div className="size-5 rounded-full border-2 border-text-neutral-tertiary shrink-0" />
                            )}
                            <span className="flex-1 font-medium">{label}</span>
                            {collateral === label && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8l3.5 3.5L13 5" stroke="#16c284" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Fill Type dropdown ── */}
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === "fillType" ? null : "fillType")}
                    className="flex items-center gap-1.5 px-3 py-2 bg-bg-neutral-02 rounded-lg text-sm text-text-neutral-primary hover:bg-bg-neutral-03 transition-colors"
                  >
                    {fillType === "All" ? "Fill Type" : fillType}
                    <ChevronDownIcon className="size-4 text-text-neutral-primary" />
                  </button>
                  {openDropdown === "fillType" && (
                    <div className="absolute top-full mt-1 left-0 z-30 bg-bg-neutral-02 rounded-[10px] shadow-[0_0_32px_rgba(0,0,0,0.2)] overflow-hidden w-44">
                      <div className="flex flex-col gap-1 p-2">
                        {["All", "Partial Fill", "Full Fill"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => { setFillType(opt); setOpenDropdown(null); }}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-text-neutral-primary transition-colors w-full text-left ${fillType === opt ? "bg-bg-neutral-03" : "hover:bg-bg-neutral-03"}`}
                          >
                            <span className="flex-1 font-medium">{opt}</span>
                            {fillType === opt && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8l3.5 3.5L13 5" stroke="#16c284" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Order Type dropdown ── */}
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === "orderType" ? null : "orderType")}
                    className="flex items-center gap-1.5 px-3 py-2 bg-bg-neutral-02 rounded-lg text-sm text-text-neutral-primary hover:bg-bg-neutral-03 transition-colors"
                  >
                    {orderType === "All" ? "Order Type" : orderType}
                    <ChevronDownIcon className="size-4 text-text-neutral-primary" />
                  </button>
                  {openDropdown === "orderType" && (
                    <div className="absolute top-full mt-1 left-0 z-30 bg-bg-neutral-02 rounded-[10px] shadow-[0_0_32px_rgba(0,0,0,0.2)] overflow-hidden w-48">
                      <div className="flex flex-col gap-1 p-2">
                        {["All", "Normal", "Resell Position"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => { setOrderType(opt); setOpenDropdown(null); }}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-text-neutral-primary transition-colors w-full text-left ${orderType === opt ? "bg-bg-neutral-03" : "hover:bg-bg-neutral-03"}`}
                          >
                            <span className="flex-1 font-medium">{opt}</span>
                            {orderType === opt && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8l3.5 3.5L13 5" stroke="#16c284" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowChart(!showChart)}
                  className={`size-9 flex items-center justify-center rounded-lg transition-colors ${showChart ? "bg-bg-neutral-02 hover:bg-bg-neutral-03" : "bg-bg-neutral-02 hover:bg-bg-neutral-03"}`}
                >
                  <img
                    src={imgFilterIcon}
                    alt="filter"
                    className="size-4"
                    style={{ filter: showChart ? "invert(58%) sepia(68%) saturate(450%) hue-rotate(115deg) brightness(95%)" : "brightness(0) invert(1) opacity(0.35)" }}
                  />
                </button>
              </div>
            </div>

            {/* ── Chart ─────────────────────────────────────────────── */}
            {showChart && <div className="border border-border-neutral-01 rounded-lg overflow-hidden">

              {/* Chart toolbar */}
              <div className="flex items-center gap-3 pl-2 pr-4 py-2 border-b border-border-neutral-01">
                <div className="flex items-center gap-1">
                  {["1d", "7d", "30d"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setChartPeriod(p)}
                      className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                        chartPeriod === p
                          ? "bg-bg-neutral-02 text-text-neutral-primary"
                          : "text-text-neutral-tertiary hover:text-text-neutral-primary"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-text-neutral-tertiary">Time</span>
                  <span className="text-text-neutral-primary">21/03/2024 21:39:47</span>
                </div>
              </div>

              {/* Price chart area */}
              <div className="flex border-b border-border-neutral-01">
                <div className="flex items-center justify-center w-9 border-r border-border-neutral-01 shrink-0">
                  <span className="text-[10px] text-text-neutral-tertiary -rotate-90 whitespace-nowrap">Price</span>
                </div>
                <div
                  ref={chartRef}
                  className="flex-1 h-60 relative border-r border-border-neutral-01 cursor-none"
                  onMouseMove={handleChartMouseMove}
                  onMouseLeave={handleChartMouseLeave}
                >
                  <PriceChart />
                  {chartHover && (
                    <ChartCrosshair
                      x={chartHover.x}
                      y={chartHover.y}
                      containerW={chartHover.w}
                      containerH={chartHover.h}
                    />
                  )}
                  {/* Last price label */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 text-xs pointer-events-none">
                    <span className="text-text-neutral-tertiary">Last Price</span>
                    <span className="text-text-neutral-primary">$0.0045</span>
                    <span className="text-text-success">+0.13%</span>
                  </div>
                  {/* Watermark */}
                  <div className="absolute top-2 right-2 pointer-events-none flex items-center gap-[3.6px] opacity-50">
                    <img src={imgMascot} alt="" style={{ width: 14.4, height: 14.4, objectFit: "contain" }} />
                    <svg width="103.2" height="9" viewBox="0 0 172 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.42038 14.2608L0 0.2612H3.10029L5.98058 9.62045L9.02062 0.2612H12.0406L15.0404 9.62045L17.9399 0.2612H21.0201L16.5806 14.2608H13.4611L10.5014 4.72081L7.5216 14.2608H4.42129H4.42038Z" fill="white"/>
                      <path d="M22.52 14.2608V0.2612H25.5399V5.78071H31.3799V0.2612H34.3998V14.2608H31.3799V8.6208H25.5399V14.2608H22.52Z" fill="white"/>
                      <path d="M35.9 14.2608L41.8997 0.2612H45.0192L51.0189 14.2608H47.6986L46.5191 11.5412H40.3989L39.2385 14.2608H35.8991H35.9ZM41.3803 8.88099H45.5405L43.4809 4.00143H43.4407L41.3812 8.88099H41.3803Z" fill="white"/>
                      <path d="M52.5188 14.2608V0.2612H55.5388V11.481H60.579V14.2608H52.5188Z" fill="white"/>
                      <path d="M62.5583 14.2608V0.2612H70.3784V3.04104H65.5782V5.78071H70.1383V8.56055H65.5782V11.4801H70.4779V14.2599H62.5583V14.2608Z" fill="white"/>
                      <path d="M77.8582 5.6802C79.9981 6.23982 82.578 7.00028 82.578 10.1599C82.578 12.6996 80.4783 14.52 77.3981 14.52C75.1979 14.52 73.5382 13.7002 72.1779 12.14L74.2576 10.2001C75.0975 11.1404 75.9775 11.7402 77.3971 11.7402C78.8971 11.7402 79.5571 11.1002 79.5571 10.2402C79.5571 9.2205 78.1969 8.90006 76.6376 8.46004C74.5981 7.90042 72.4975 6.94002 72.4975 4.09993C72.4975 1.67978 74.4576 0 77.2776 0C79.4978 0 80.8571 0.799718 82.1571 2.09972L80.0775 3.97943C79.3974 3.27922 78.4771 2.77985 77.2575 2.77985C76.1373 2.77985 75.5174 3.26004 75.5174 4.03967C75.5174 4.9599 76.5572 5.33968 77.8573 5.67928L77.8582 5.6802Z" fill="white"/>
                      <path d="M96.6957 0.260712L99.6755 9.80073L102.635 0.260712H105.755L110.194 14.2603H107.114L104.215 4.90109L101.215 14.2603H98.1947L95.1546 4.90109L92.2744 14.2603H89.1741L93.5944 0.260712H96.6948H96.6957Z" fill="white"/>
                      <path d="M110.075 14.2593L116.075 0.259705H119.194L125.194 14.2593H121.874L120.694 11.5398H114.574L113.414 14.2593H110.074H110.075ZM115.556 8.8795H119.716L117.656 3.99995H117.616L115.556 8.8795H115.556Z" fill="white"/>
                      <path d="M134.374 14.2593L130.694 9.21911H129.194V14.2593H126.194V0.259705H131.734C133.894 0.259705 136.213 1.73955 136.213 4.73941C136.213 6.7597 135.153 8.09896 133.793 8.759L137.773 14.2584H134.373L134.374 14.2593ZM129.194 6.59994H131.253C132.513 6.59994 133.193 5.82031 133.193 4.74032C133.193 3.66034 132.513 2.88071 131.253 2.88071H129.194V6.60086V6.59994Z" fill="white"/>
                      <path d="M141.774 7.74027V14.2603H138.774V0.260712H141.774V6.26042L146.474 0.260712H150.014L144.794 7.00081L150.214 14.2603H146.694L141.774 7.74027Z" fill="white"/>
                      <path d="M151.733 14.2593V0.259705H159.553V3.03955H154.753V5.77923H159.313V8.55907H154.753V11.4786H159.653V14.2584H151.733V14.2593Z" fill="white"/>
                      <path d="M165.053 14.2593V3.03955H161.312V0.259705H171.792V3.03955H168.051V14.2593H165.052H165.053Z" fill="white"/>
                    </svg>
                  </div>
                </div>
                {/* Y-axis */}
                <div className="flex flex-col justify-between py-8 px-3 w-[72px] relative shrink-0">
                  {["0.0050", "0.0040", "0.0030", "0.0020", "0.0010"].map((v) => (
                    <span key={v} className="text-[10px] text-text-neutral-tertiary">{v}</span>
                  ))}
                  <div className="absolute left-3 top-[53px] bg-[#16c284] px-1 py-0.5 rounded">
                    <span className="text-[10px] text-white">0.0045</span>
                  </div>
                  <div className="absolute left-3 top-[183px] bg-bg-neutral-04 px-1 py-0.5 rounded">
                    <span className="text-[10px] text-text-neutral-primary">0.0012</span>
                  </div>
                </div>
              </div>

              {/* Volume chart area */}
              <div className="flex border-b border-border-neutral-01">
                <div className="flex items-center justify-center w-9 border-r border-border-neutral-01 shrink-0">
                  <span className="text-[10px] text-text-neutral-tertiary -rotate-90 whitespace-nowrap">Volume</span>
                </div>
                <div
                  ref={volChartRef}
                  className="flex-1 h-[120px] relative border-r border-border-neutral-01 cursor-none"
                  onMouseMove={handleVolChartMouseMove}
                  onMouseLeave={handleVolChartMouseLeave}
                >
                  {/* Bars */}
                  <div className="absolute inset-x-0.5 bottom-0 flex items-end gap-px h-full">
                    {VOLUME_BARS.map((bar, i) => (
                      <div
                        key={i}
                        className={`flex-1 min-w-0 ${bar.up ? "bg-[rgba(22,194,132,0.2)]" : "bg-[rgba(255,59,70,0.2)]"}`}
                        style={{ height: `${bar.h}px` }}
                      />
                    ))}
                  </div>
                  {/* Total vol label */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 text-xs pointer-events-none">
                    <span className="text-text-neutral-tertiary">Total Vol.</span>
                    <span className="text-text-neutral-primary">$561,365.5</span>
                  </div>
                  {volChartHover && (
                    <ChartCrosshair
                      x={volChartHover.x}
                      y={volChartHover.y}
                      containerW={volChartHover.w}
                      containerH={volChartHover.h}
                      type="volume"
                    />
                  )}
                </div>
                {/* Y-axis */}
                <div className="flex flex-col justify-between py-8 px-3 w-[72px] shrink-0">
                  <span className="text-[10px] text-text-neutral-tertiary">200K</span>
                  <span className="text-[10px] text-text-neutral-tertiary">100K</span>
                </div>
              </div>

              {/* X-axis dates */}
              <div className="relative flex items-center justify-between pl-9 pr-[72px] py-2">
                {["15/03", "16/03", "17/03", "18/03", "19/03", "20/03", "21/03"].map((d) => (
                  <span key={d} className="text-[10px] text-text-neutral-tertiary w-[60px] text-center">{d}</span>
                ))}
                {/* X-axis hover date reference label — centered at cursor x position */}
                {hoverXFrac !== null && (
                  <div
                    className="absolute inset-y-0 pointer-events-none z-20 flex items-center justify-center"
                    style={{
                      left: `calc(36px + ${hoverXFrac} * (100% - 108px) - 60px)`,
                      width: 120,
                      background: "rgba(80,80,90,0.85)",
                      borderRadius: 3,
                    }}
                  >
                    <span className="text-[9px] text-white/90 leading-none whitespace-nowrap">18/03/2025, 8:48 AM</span>
                  </div>
                )}
              </div>
            </div>}

            {/* ── Order Book (Market Detail) ──────────────────────────── */}
            <div>
              {/* Order book headers */}
              <div className="flex gap-4">
                {/* Buy side header */}
                <div className="flex-1 flex items-center px-2 py-2">
                  <div className="flex-1 flex items-center gap-0.5">
                    <span className="text-xs text-text-neutral-tertiary">Price ($)</span>
                    <SortIcon className="size-4" />
                  </div>
                  <div className="w-24 flex items-center justify-end gap-0.5">
                    <span className="text-xs text-text-neutral-tertiary">Amount</span>
                    <SortIcon className="size-4" />
                  </div>
                  <div className="w-[120px] flex items-center justify-end gap-0.5">
                    <span className="text-xs text-text-neutral-tertiary">Collateral</span>
                    <SortIcon className="size-4" />
                  </div>
                  <div className="w-[120px]" />
                </div>
                {/* Center divider */}
                <div className="w-px bg-border-neutral-01 self-stretch" />
                {/* Sell side header */}
                <div className="flex-1 flex items-center px-2 py-2">
                  <div className="flex-1 flex items-center gap-0.5">
                    <span className="text-xs text-text-neutral-tertiary">Price ($)</span>
                    <SortIcon className="size-4" />
                  </div>
                  <div className="w-24 flex items-center justify-end gap-0.5">
                    <span className="text-xs text-text-neutral-tertiary">Amount</span>
                    <SortIcon className="size-4" />
                  </div>
                  <div className="w-[120px] flex items-center justify-end gap-0.5">
                    <span className="text-xs text-text-neutral-tertiary">Collateral</span>
                    <SortIcon className="size-4" />
                  </div>
                  <div className="w-[120px]" />
                </div>
              </div>

              {/* Order rows */}
              <div className="flex flex-col gap-[2px]">
              {(() => {
                const filterFn = (o) => fillType === "All" ? true : fillType === "Full Fill" ? !!o.isFull : !o.isFull;
                const filteredBuy = SAMPLE_BUY_ORDERS.filter(filterFn);
                const filteredSell = SAMPLE_SELL_ORDERS.filter(filterFn);
                const rowCount = Math.max(filteredBuy.length, filteredSell.length);
                return Array.from({ length: rowCount }, (_, i) => {
                const buy = filteredBuy[i];
                const sell = filteredSell[i];
                return (
                  <div key={i} className="flex gap-4">
                    {/* ── Buy side row ── */}
                    {buy ? (
                    <div onClick={() => { setSelectedOrder({ type: "buy", ...buy }); setSliderValue(100); setSelectedMyOpenOrder(null); }} className="group relative flex-1 flex items-center h-11 px-2 bg-[rgba(255,255,255,0.03)] hover:bg-bg-neutral-02 cursor-pointer transition-colors rounded-lg overflow-hidden">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute left-0 top-0 h-full w-0 bg-[rgba(22,194,132,0.05)]" />
                      </div>
                      <div className="relative flex-1 flex items-center gap-2 min-w-0">
                        <span className={`text-sm tabular-nums ${buy.badge ? "text-[#facc15]" : "text-text-neutral-primary"}`}>{buy.price}</span>
                        {buy.badge && (
                          <span className="text-[10px] font-medium uppercase bg-[#eab308] text-[#0a0a0b] px-2 py-0.5 rounded-full shrink-0">{buy.badge}</span>
                        )}
                        {buy.byMe && <ByMeIcon />}
                      </div>
                      <div className="relative w-24 flex items-center justify-end">
                        <span className="text-sm text-text-neutral-primary tabular-nums">{buy.amount}</span>
                      </div>
                      <div className="relative w-[120px] flex items-center justify-end gap-1">
                        <span className="text-sm text-text-neutral-primary tabular-nums">{buy.collateral}</span>
                        <CollateralBadge token={buy.token} />
                      </div>
                      <div className="relative w-[120px] flex items-center justify-end gap-2">
                        {buy.isFull && <FullBadge />}
                        <div className="relative w-[66px] h-8 shrink-0">
                          <button
                            className={`absolute inset-0 flex items-center justify-center group-hover:opacity-0 group-hover:pointer-events-none transition-opacity rounded-lg text-xs font-medium ${buy.badge ? "bg-[rgba(234,179,8,0.2)] text-[#facc15]" : "bg-[rgba(22,194,132,0.2)] text-text-success"}`}>
                            Buy
                          </button>
                          <button
                            className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg ${buy.badge ? "bg-[rgba(234,179,8,0.2)] text-[#facc15] hover:bg-[rgba(234,179,8,0.3)]" : "bg-[rgba(22,194,132,0.2)] text-text-success hover:bg-[rgba(22,194,132,0.3)]"}`}>
                            <ChevronRightIcon className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    ) : <div className="flex-1" />}

                    {/* ── Center divider ── */}
                    <div className="w-px bg-border-neutral-01 self-stretch shrink-0" />

                    {/* ── Sell side row ── */}
                    {sell ? (
                      <div onClick={() => { setSelectedOrder({ type: "sell", ...sell }); setSliderValue(100); setSelectedMyOpenOrder(null); }} className="group relative flex-1 flex items-center h-11 px-2 bg-[rgba(255,255,255,0.03)] hover:bg-bg-neutral-02 cursor-pointer transition-colors rounded-lg overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <div className="absolute left-0 top-0 h-full w-0 bg-[rgba(255,59,70,0.05)]" />
                        </div>
                        <div className="relative flex-1 flex items-center gap-2 min-w-0">
                          <span className="text-sm text-text-neutral-primary tabular-nums">{sell.price}</span>
                          {sell.byMe && <ByMeIcon />}
                        </div>
                        <div className="relative w-24 flex items-center justify-end">
                          <span className="text-sm text-text-neutral-primary tabular-nums">{sell.amount}</span>
                        </div>
                        <div className="relative w-[120px] flex items-center justify-end gap-1">
                          <span className="text-sm text-text-neutral-primary tabular-nums">{sell.collateral}</span>
                          <CollateralBadge token={sell.token} />
                        </div>
                        <div className="relative w-[120px] flex items-center justify-end gap-2">
                          {sell.isFull && <FullBadge />}
                          <div className="relative w-[66px] h-8 shrink-0">
                            <button
                              className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 group-hover:pointer-events-none transition-opacity bg-[rgba(255,59,70,0.2)] text-text-danger rounded-lg text-xs font-medium">
                              Sell
                            </button>
                            <button
                              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[rgba(255,59,70,0.2)] text-text-danger rounded-lg hover:bg-[rgba(255,59,70,0.3)]">
                              <ChevronRightIcon className="size-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : <div className="flex-1" />}
                  </div>
                );
                });
              })()}
              </div>
            </div>

            {/* ── Recent Trades ──────────────────────────────────── */}
            <div className="mt-4 border-t-4 border-border-neutral-01 pt-4 flex flex-col gap-2">

              {/* Title */}
              <div className="py-1">
                <span className="text-lg font-medium text-text-neutral-primary">Recent Trades</span>
              </div>

              {/* Table */}
              <div className="flex flex-col">

                {/* Header */}
                <div className="flex items-center px-2 border-b border-border-neutral-01">
                  <div className="w-[120px] flex items-center gap-0.5 py-2">
                    <span className="text-xs text-text-neutral-tertiary">Time</span>
                    <SortIcon className="size-4" />
                  </div>
                  <div className="w-24 flex items-center py-2">
                    <span className="text-xs text-text-neutral-tertiary">Side</span>
                  </div>
                  <div className="flex-1 flex items-center py-2">
                    <span className="text-xs text-text-neutral-tertiary">Pair</span>
                  </div>
                  <div className="w-[144px] flex items-center justify-end gap-0.5 py-2">
                    <span className="text-xs text-text-neutral-tertiary">Price ($)</span>
                    <SortIcon className="size-4" />
                  </div>
                  <div className="w-[144px] flex items-center justify-end gap-0.5 py-2">
                    <span className="text-xs text-text-neutral-tertiary">Amount</span>
                    <SortIcon className="size-4" />
                  </div>
                  <div className="w-[160px] flex items-center justify-end gap-0.5 py-2">
                    <span className="text-xs text-text-neutral-tertiary">Collateral</span>
                    <SortIcon className="size-4" />
                  </div>
                  <div className="w-24 flex items-center justify-end gap-0.5 py-2">
                    <span className="text-xs text-text-neutral-tertiary">Tx.ID</span>
                    <SortIcon className="size-4" />
                  </div>
                </div>

                {/* Rows */}
                {RECENT_TRADES.map((trade, i) => (
                  <div key={i} className="flex items-center px-2 border-b border-border-neutral-01 hover:bg-bg-neutral-02 cursor-pointer transition-colors">
                    {/* Time */}
                    <div className="w-[120px] py-4">
                      <span className="text-sm text-text-neutral-tertiary">{trade.time}</span>
                    </div>
                    {/* Side */}
                    <div className="w-24 flex items-center gap-1.5 py-4">
                      <span className={`text-sm font-medium ${trade.side === "Buy" ? "text-text-success" : "text-text-danger"}`}>
                        {trade.side}
                      </span>
                      {trade.badge && (
                        <span className="text-[10px] font-medium uppercase bg-[#eab308] text-[#0a0a0b] px-2 py-0.5 rounded-full shrink-0">
                          {trade.badge}
                        </span>
                      )}
                    </div>
                    {/* Pair */}
                    <div className="flex-1 py-4">
                      <span className="text-sm text-text-neutral-primary">{trade.pair}</span>
                    </div>
                    {/* Price */}
                    <div className="w-[144px] flex items-center justify-end py-4">
                      <span className={`text-sm font-medium tabular-nums ${trade.badge ? "text-[#facc15]" : "text-text-neutral-primary"}`}>
                        {trade.price}
                      </span>
                    </div>
                    {/* Amount */}
                    <div className="w-[144px] flex items-center justify-end py-4">
                      <span className="text-sm font-medium text-text-neutral-primary tabular-nums">{trade.amount}</span>
                    </div>
                    {/* Collateral */}
                    <div className="w-[160px] flex items-center justify-end gap-1 py-4">
                      <span className="text-sm font-medium text-text-neutral-primary tabular-nums">{trade.collateral}</span>
                      <CollateralBadge token={trade.token} />
                      <span className="text-sm leading-none">{trade.tier}</span>
                    </div>
                    {/* Tx.ID */}
                    <div className="w-24 flex items-center justify-end py-4">
                      <button className="w-[52px] h-[28px] flex items-center justify-center border border-border-neutral-02 rounded-md text-text-neutral-primary hover:bg-bg-neutral-03 transition-colors">
                        <ArrowRightUpIcon className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Vertical divider ────────────────────────────────────── */}
          <div className="w-px bg-border-neutral-01 self-stretch shrink-0" />

          {/* ── Right column ────────────────────────────────────────── */}
          <div className="w-96 shrink-0 flex flex-col pl-4">

            {/* Trade panel */}
            <div className="flex flex-col gap-4 pb-6 border-b-[3px] border-border-neutral-01">

              {selectedMyOpenOrder ? (() => {
                const order = selectedMyOpenOrder;
                const isBuy = order.side === "Buy";
                const isResell = order.side === "Resell";
                const sideColor = isBuy ? "text-text-success" : isResell ? "text-[#facc15]" : "text-text-danger";
                const topLabel = isBuy ? "Buying" : "Selling";
                const bottomLabel = isBuy ? "Selling" : "Buying";
                return (
                  <>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="text-[18px] font-medium leading-7">
                          <span className="text-text-neutral-primary">My </span>
                          <span className={sideColor}>{order.side}</span>
                          <span className="text-text-neutral-primary"> Order</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-text-neutral-tertiary">
                          <span>Price</span>
                          <span className="text-text-neutral-primary">{order.price}</span>
                        </div>
                      </div>
                      <button className="p-1.5 bg-bg-neutral-02 rounded-md hover:bg-bg-neutral-03 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="7.5" stroke="#7a7a83" strokeWidth="1.5"/>
                          <path d="M10 9v5M10 7v.5" stroke="#7a7a83" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>

                    {/* Trade form (read-only) */}
                    <div className="border border-border-neutral-01 rounded-[10px] overflow-hidden relative">
                      <div className="flex flex-col gap-2 p-4">
                        <span className="text-xs font-medium text-text-neutral-tertiary">{topLabel}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-medium text-text-neutral-primary flex-1 tabular-nums">{order.amount}</span>
                          <div className="flex items-center gap-1 border border-border-neutral-02 rounded-full pl-1 pr-4 py-1 shrink-0">
                            <img src={imgMascot} className="size-5 rounded-full object-cover" alt={market.name} />
                            <span className="text-sm font-medium text-text-neutral-primary ml-1">{market.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative h-px bg-border-neutral-01">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-neutral-02 border border-border-neutral-01 rounded-full p-1.5 z-10">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 4v12M6 12l4 4 4-4" stroke="#7a7a83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-text-neutral-tertiary">{bottomLabel}</span>
                          <span className="text-xs text-text-neutral-tertiary">Balance: 18.32 SOL</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-medium text-text-neutral-primary flex-1 tabular-nums">{order.collateral}</span>
                          <div className="flex items-center gap-1 border border-border-neutral-02 rounded-full pl-1 pr-4 py-1 shrink-0">
                            <img src={imgChainSolana} className="size-5 rounded-full object-cover" alt={order.unit} />
                            <span className="text-sm font-medium text-text-neutral-primary ml-1">{order.unit}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Slider (fully filled, disabled) */}
                    <div className="px-3">
                      <div className="relative flex items-center h-6">
                        <div className="absolute inset-x-0 h-0.5 bg-bg-neutral-02 rounded-full" />
                        {[0, 25, 50, 75, 100].map((tick) => (
                          <div key={tick} className="absolute -translate-x-1/2 size-2 rounded-full bg-bg-neutral-01 z-10 border-2 border-border-neutral-03" style={{ left: `${tick}%` }} />
                        ))}
                      </div>
                    </div>

                    {/* Close Order button */}
                    <button
                      onClick={() => { setCloseOrderAcknowledged(false); setShowCloseOrderModal(true); }}
                      className="w-full py-2.5 rounded-[10px] text-base font-medium text-[#fd5e67] bg-[rgba(255,59,70,0.2)] hover:bg-[rgba(255,59,70,0.3)] transition-colors">
                      Close Order
                    </button>

                    {/* Info rows */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 leading-5">Price</span>
                        <span className="text-sm font-medium text-text-neutral-primary">{order.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 leading-5">Filled</span>
                          <span className="text-sm text-text-neutral-tertiary">/</span>
                          <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 leading-5">Total Amount</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <span className="text-text-success">-</span>
                          <span className="text-text-neutral-primary">/</span>
                          <span className="text-text-neutral-primary">{order.collateral} {order.unit}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 leading-5">To be Received</span>
                          <span className="text-sm text-text-neutral-tertiary">/</span>
                          <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 leading-5">Total</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <span className="text-text-success">-</span>
                          <span className="text-text-neutral-primary">/</span>
                          <span className="text-text-neutral-primary">{order.amount} {market.name}</span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })() : selectedOrder ? (() => {
                const isBuy = selectedOrder.type === "buy";
                const isResell = selectedOrder.badge === "RS";
                const tokenImg = selectedOrder.token === "sol" ? imgChainSolana : selectedOrder.token === "sui" ? imgChainSui : imgChainEthereum;
                const tokenLabel = selectedOrder.token === "sol" ? "SOL" : selectedOrder.token === "sui" ? "SUI" : "USDT";
                const collateralAmt = (parseFloat(selectedOrder.collateral) * sliderValue / 100).toFixed(2);
                const tokenAmt = (parseFloat(selectedOrder.amount.replace(/[KM]/g, (m) => m === "K" ? "e3" : "e6")) * sliderValue / 100);
                const tokenDisplay = tokenAmt >= 1000 ? (tokenAmt / 1000).toFixed(2) + "K" : tokenAmt.toFixed(0);

                // Panel states
                const BALANCE = 18.32;
                const isFull = selectedOrder.isFull === true;
                const collateralNum = parseFloat(collateralAmt);
                const isInsufficientBalance = collateralNum > BALANCE;
                const isCollateralLow = collateralNum > 0 && collateralNum < 0.01;
                const isDisabled = isInsufficientBalance || isCollateralLow;
                const buttonLabel = isInsufficientBalance
                  ? "Insufficient Balance"
                  : isCollateralLow
                  ? "Minimum deposit is $10"
                  : isResell ? "Buy Resell"
                  : isBuy ? "Buy" : "Sell";
                const sellingTextClass = isInsufficientBalance || isCollateralLow
                  ? "text-text-danger"
                  : "text-text-neutral-primary";
                const buyingBg = isFull ? "bg-bg-neutral-01 border-b border-border-neutral-01" : "bg-bg-neutral-02";
                const sellingBg = isFull ? "bg-bg-neutral-01" : "";

                return (
                  <>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[18px] font-medium leading-7 ${isBuy ? "text-text-success" : "text-text-danger"}`}>
                            {isBuy ? "Buy" : "Sell"} {market.name}
                          </span>
                          {isResell ? (
                            <span className="bg-[#eab308] text-[#0a0a0b] text-[10px] font-medium uppercase px-2 py-1 rounded-full leading-3">RS</span>
                          ) : isFull ? (
                            <span className="bg-bg-neutral-02 text-text-neutral-tertiary text-[10px] font-medium uppercase px-2 py-1 rounded-full leading-3">Full</span>
                          ) : null}
                        </div>
                        {isResell ? (
                          <div className="flex flex-col gap-0.5 text-xs">
                            <div className="flex items-center gap-1">
                              <span className="text-text-neutral-tertiary">Price</span>
                              <span className="text-[#facc15]">${selectedOrder.price}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-text-neutral-tertiary">Org. Price / Collateral</span>
                              <span className="text-text-neutral-primary">${selectedOrder.originalPrice} / {selectedOrder.collateral} {tokenLabel}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-text-neutral-tertiary">
                            <span>Price</span>
                            <span className="text-text-neutral-primary">${selectedOrder.price}</span>
                          </div>
                        )}
                      </div>
                      <button className="p-1.5 bg-bg-neutral-02 rounded-md">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="7.5" stroke="#7a7a83" strokeWidth="1.5"/>
                          <path d="M10 9v5M10 7v.5" stroke="#7a7a83" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>

                    {/* Trade form */}
                    <div className="border border-border-neutral-01 rounded-[10px] overflow-hidden relative">
                      {/* Buying section */}
                      <div className={`${buyingBg} flex flex-col gap-2 p-4`}>
                        <span className="text-xs font-medium text-text-neutral-tertiary">Buying</span>
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-medium text-text-neutral-primary flex-1 tabular-nums">{tokenDisplay}</span>
                          <div className="flex items-center gap-1 border border-border-neutral-02 rounded-full pl-1 pr-4 py-1 shrink-0">
                            <img src={tokenImg} className="size-5 rounded-full object-cover" alt={tokenLabel} />
                            <span className="text-sm font-medium text-text-neutral-primary ml-1">{market.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Swap divider */}
                      <div className="relative h-px bg-bg-neutral-01">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-neutral-02 border border-bg-neutral-01 rounded-full p-1.5 z-10">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 4v12M6 12l4 4 4-4" stroke="#7a7a83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>

                      {/* Selling section */}
                      <div className={`${sellingBg} flex flex-col gap-2 p-4`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-text-neutral-tertiary">Selling</span>
                          <span className={`text-xs ${isInsufficientBalance ? "text-text-danger" : "text-text-neutral-tertiary"}`}>
                            Balance: {BALANCE} SOL
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-2xl font-medium flex-1 tabular-nums ${sellingTextClass}`}>{collateralAmt}</span>
                          <div className="flex items-center gap-1 border border-border-neutral-02 rounded-full pl-1 pr-4 py-1 shrink-0">
                            <img src={tokenImg} className="size-5 rounded-full object-cover" alt={tokenLabel} />
                            <span className="text-sm font-medium text-text-neutral-primary ml-1">{tokenLabel}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress slider */}
                    <div className="px-3">
                      <div className="relative flex items-center h-6">
                        {/* Track */}
                        <div className="absolute inset-x-0 h-0.5 bg-bg-neutral-02 rounded-full">
                          <div className="h-full bg-text-neutral-primary rounded-full" style={{ width: `${sliderValue}%` }} />
                        </div>
                        {/* Tick marks */}
                        {[0, 25, 50, 75, 100].map((tick) => (
                          <button
                            key={tick}
                            onClick={() => !isFull && setSliderValue(tick)}
                            className={`absolute -translate-x-1/2 rounded-full bg-bg-neutral-01 z-10 ${
                              tick <= sliderValue
                                ? "size-3 border-2 border-text-neutral-primary"
                                : "size-2 border-2 border-border-neutral-03"
                            }`}
                            style={{ left: `${tick}%` }}
                          />
                        ))}
                        {/* Draggable thumb */}
                        <input
                          type="range" min="0" max="100" value={sliderValue}
                          onChange={(e) => !isFull && setSliderValue(Number(e.target.value))}
                          className={`absolute inset-x-0 opacity-0 h-6 w-full ${isFull ? "cursor-not-allowed" : "cursor-pointer"}`}
                        />
                      </div>
                    </div>

                    {/* Action button */}
                    {isDisabled ? (
                      <button disabled className="w-full py-2.5 rounded-[10px] text-base font-medium text-[#0a0a0b] bg-[#f9f9fa] opacity-40 cursor-not-allowed">
                        {buttonLabel}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (isResell) {
                            setResellModalOrder({
                              unit: tokenLabel,
                              price: `$${selectedOrder.originalPrice}`,
                              amount: selectedOrder.amount,
                              collateral: collateralAmt,
                              pair: `${market.name}/${tokenLabel}`,
                              action: "Resell",
                            });
                            setResellPrice("");
                            setShowResellModal(true);
                          } else {
                            setConfirmed(false);
                            setShowConfirmModal(true);
                          }
                        }}
                        className={`w-full py-2.5 rounded-[10px] text-base font-medium text-white ${isBuy ? "bg-text-success" : "bg-text-danger"}`}
                      >
                        {buttonLabel}
                      </button>
                    )}

                    {/* Order info */}
                    <div className="flex flex-col gap-2">
                      {/* Price row — resell shows Price / Original Price */}
                      {isResell ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 leading-5">Price</span>
                            <span className="text-sm text-text-neutral-tertiary">/</span>
                            <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 leading-5">Original Price</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm font-medium">
                            <span className="text-[#facc15]">${selectedOrder.price}</span>
                            <span className="text-text-neutral-primary">/</span>
                            <span className="text-text-neutral-primary">${selectedOrder.originalPrice}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 cursor-default leading-5">Price</span>
                          <span className="text-sm font-medium text-text-neutral-primary">${selectedOrder.price}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 cursor-default leading-5">Amount Deliver</span>
                        <span className="text-sm font-medium text-text-neutral-primary">{collateralAmt} {tokenLabel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 cursor-default leading-5">To be Received</span>
                        <span className="text-sm font-medium text-text-neutral-primary">{tokenDisplay} {market.name}</span>
                      </div>
                    </div>
                  </>
                );
              })() : (
                <>
                  {/* Title */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[18px] font-medium leading-7 text-text-neutral-primary">
                      Trade {market.name}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-text-neutral-tertiary">
                      <span>Price</span>
                      <span>$-</span>
                    </div>
                  </div>

                  {/* Empty state */}
                  <div className="border border-border-neutral-01 rounded-[10px] flex flex-col items-center justify-center gap-0 p-8 h-[216px]">
                    <div className="size-24 flex items-center justify-center">
                      <img src={imgMascot} alt="mascot" className="size-24 object-contain" />
                    </div>
                    <p className="text-xs text-text-neutral-tertiary text-center leading-5">
                      No order selected yet.<br />
                      Pick one from the list to start trading.
                    </p>
                  </div>

                  {/* Trade button */}
                  <button disabled className="w-full py-2.5 bg-[#f9f9fa] rounded-[10px] text-base font-medium text-[#0a0a0b] opacity-40 cursor-not-allowed">
                    Trade {market.name}
                  </button>

                  {/* Order info fields */}
                  <div className="flex flex-col gap-2">
                    {["Price", "Amount Deliver", "To be Received"].map((label) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 cursor-default leading-5">{label}</span>
                        <span className="text-sm font-medium text-text-neutral-primary">-</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* My Orders */}
            <div className="flex flex-col gap-4 pt-4">

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-border-neutral-01">
                <button
                  onClick={() => setActiveOrderTab("filled")}
                  className="flex flex-col items-center h-[52px] justify-between"
                >
                  <div className="h-0.5" />
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium transition-colors ${activeOrderTab === "filled" ? "text-text-neutral-primary" : "text-text-neutral-tertiary"}`}>
                      My Filled Orders
                    </span>
                    <span className="text-[10px] font-medium text-text-success bg-[rgba(22,194,132,0.1)] px-2 py-0.5 rounded-full">24</span>
                  </div>
                  <div className={`h-0.5 w-full transition-colors ${activeOrderTab === "filled" ? "bg-text-success" : ""}`} />
                </button>
                <button
                  onClick={() => setActiveOrderTab("open")}
                  className="flex flex-col items-center h-[52px] justify-between"
                >
                  <div className="h-0.5" />
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium transition-colors ${activeOrderTab === "open" ? "text-text-neutral-primary" : "text-text-neutral-tertiary"}`}>
                      My Open Orders
                    </span>
                    <span className="text-[10px] font-medium text-text-neutral-tertiary bg-bg-neutral-02 px-2 py-0.5 rounded-full">12</span>
                  </div>
                  <div className={`h-0.5 w-full transition-colors ${activeOrderTab === "open" ? "bg-text-success" : ""}`} />
                </button>
              </div>

              {/* Order list */}
              <div className="flex flex-col">
                {(activeOrderTab === "filled" ? MY_FILLED_ORDERS : MY_OPEN_ORDERS).map((order, i) => (
                  <div key={i}
                    onClick={() => {
                      if (activeOrderTab === "open") {
                        setSelectedMyOpenOrder(order);
                        setSelectedOrder(null);
                      } else if (activeOrderTab === "filled" && order.action === "Resell" && order.side === "Buy") {
                        const unitLower = (order.unit || "SOL").toLowerCase();
                        const priceRaw = (order.entryPrice || order.price || "$0").replace("$", "");
                        const orgRaw = order.entryPrice ? order.price.replace("$", "") : (order.extraPrice || order.price || "$0").replace("$", "");
                        setSelectedOrder({ type: "buy", badge: "RS", isFull: true, price: priceRaw, originalPrice: orgRaw, amount: order.amount, collateral: order.collateral, token: unitLower });
                        setSelectedMyOpenOrder(null);
                        setSliderValue(100);
                      }
                    }}
                    className={`border-b border-border-neutral-01 py-4 flex flex-col gap-3 rounded-lg transition-colors ${
                      (activeOrderTab === "open" || (activeOrderTab === "filled" && order.action === "Resell" && order.side === "Buy")) ? "cursor-pointer hover:bg-bg-neutral-02 px-2 -mx-2" : ""
                    } ${selectedMyOpenOrder === order ? "bg-bg-neutral-02 px-2 -mx-2" : ""}`}
                  >

                    {/* Row 1: side + pair + badge + date */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${
                          order.side === "Buy" ? "text-text-success" :
                          order.side === "Sell" ? "text-text-danger" :
                          "text-[#facc15]"
                        }`}>
                          {order.side}
                        </span>
                        <span className="text-sm font-medium text-text-neutral-primary">{order.pair}</span>
                        {order.badge && (
                          <span className="text-[9px] font-medium uppercase bg-[#eab308] text-[#0a0a0b] px-2 py-0.5 rounded-full">
                            {order.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-text-neutral-tertiary shrink-0">{order.date}</span>
                    </div>

                    {/* Row 2: price details + action button */}
                    <div className="flex items-end justify-between gap-2">
                      <div className="flex flex-col gap-1 flex-1 min-w-0">

                        {/* Price line */}
                        <div className="flex items-center gap-1 flex-wrap text-xs">
                          <span className="text-text-neutral-tertiary">{order.priceLabel}</span>
                          {order.entryPrice ? (
                            <>
                              <span className="text-[#facc15]">{order.entryPrice}</span>
                              <span className="text-text-neutral-primary">/</span>
                              <span className="text-text-neutral-primary">{order.price}</span>
                            </>
                          ) : order.extraPrice ? (
                            <>
                              <span className="text-text-neutral-primary">{order.price}</span>
                              <span className="text-text-neutral-tertiary">/</span>
                              <span className="text-text-neutral-primary">{order.extraPrice}</span>
                            </>
                          ) : (
                            <span className="text-text-neutral-primary">{order.price}</span>
                          )}
                        </div>

                        {/* Amount / Collateral */}
                        <div className="flex items-center gap-1 text-xs flex-wrap">
                          <span className="text-text-neutral-tertiary">Amount</span>
                          <span className="text-text-neutral-tertiary">/</span>
                          <span className="text-text-neutral-tertiary">Collateral</span>
                          <span className="text-text-neutral-primary">{order.amount}</span>
                          <span className="text-text-neutral-primary">/</span>
                          <span className="text-text-neutral-primary">{order.collateral}</span>
                          <span className="text-text-neutral-tertiary">{order.unit}</span>
                        </div>
                      </div>

                      {/* Action button */}
                      {order.action && (
                        activeOrderTab === "filled" ? (
                          order.side === "Buy" && (
                            <button className="px-3 py-1.5 bg-[rgba(234,179,8,0.2)] rounded-lg text-xs font-medium text-[#facc15] hover:bg-[rgba(234,179,8,0.3)] transition-colors shrink-0">
                              {order.action}
                            </button>
                          )
                        ) : (
                          <button className="px-3 py-1.5 bg-[rgba(255,255,255,0.08)] rounded-lg text-xs font-medium text-white hover:bg-[rgba(255,255,255,0.15)] transition-colors shrink-0">
                            {order.action}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dashboard link */}
              <div className="flex items-center justify-between bg-bg-neutral-02 rounded-[10px] px-4 py-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <DashboardIcon className="size-5 text-text-success shrink-0" />
                  <span className="text-xs text-text-success leading-4">
                    Visit Dashboard to monitor all Pre-Market orders
                  </span>
                </div>
                <ArrowRightIcon className="size-5 text-text-neutral-primary shrink-0" />
              </div>
            </div>

          </div>{/* end right column */}
        </div>{/* end content grid */}
      </div>{/* end page body */}

      {/* ── Confirm Buy/Sell Modal ─────────────────────────────── */}
      {showConfirmModal && selectedOrder && (() => {
        const isBuy = selectedOrder.type === "buy";
        const tokenImg = selectedOrder.token === "sol" ? imgChainSolana : selectedOrder.token === "sui" ? imgChainSui : imgChainEthereum;
        const tokenLabel = selectedOrder.token === "sol" ? "SOL" : selectedOrder.token === "sui" ? "SUI" : "USDT";
        const collateralAmt = (parseFloat(selectedOrder.collateral) * sliderValue / 100).toFixed(2);
        const tokenAmt = parseFloat(selectedOrder.amount.replace(/[KM]/g, (m) => m === "K" ? "e3" : "e6")) * sliderValue / 100;
        const tokenDisplay = tokenAmt >= 1000 ? (tokenAmt / 1000).toFixed(2) + "K" : tokenAmt.toFixed(0);

        const reviewRows = [
          { label: "Buying", value: tokenDisplay, icon: tokenImg, iconAlt: market.name },
          { label: "For", value: collateralAmt, icon: tokenImg, iconAlt: tokenLabel },
          { label: "Price", value: `$${selectedOrder.price}`, icon: null },
          { label: "Collateral", value: collateralAmt, icon: tokenImg, iconAlt: tokenLabel },
        ];

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setShowConfirmModal(false)}
          >
            <div
              className="bg-bg-neutral-03 rounded-3xl shadow-[0_0_32px_rgba(0,0,0,0.2)] w-[480px] flex flex-col gap-6 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center gap-2">
                <div className="size-9 shrink-0" />
                <p className="flex-1 text-center text-[18px] font-medium text-text-neutral-primary leading-7">
                  Confirm {isBuy ? "Buy" : "Sell"} Order
                </p>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="size-9 shrink-0 flex items-center justify-center bg-bg-neutral-02 rounded-full hover:bg-bg-neutral-04 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5l10 10M15 5L5 15" stroke="#7a7a83" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Modal body */}
              <div className="flex flex-col gap-6">
                {/* Description */}
                <p className="text-sm text-text-neutral-secondary text-center leading-5">
                  You are{" "}
                  <span className={isBuy ? "text-text-success" : "text-text-danger"}>{isBuy ? "buying" : "selling"}</span>
                  {" "}<span className="text-text-neutral-primary font-medium">{tokenDisplay} {market.name}</span>
                  {" "}for{" "}
                  <span className="text-text-neutral-primary font-medium">{collateralAmt} {tokenLabel}</span>.{" "}
                  Are you sure?
                </p>

                {/* Review info table */}
                <div className="border border-border-neutral-03 rounded-[10px] overflow-hidden">
                  {reviewRows.map((row, i) => (
                    <div key={row.label} className={`flex items-center justify-between px-4 py-3 ${i < reviewRows.length - 1 ? "border-b border-border-neutral-03" : ""}`}>
                      <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">{row.label}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-text-neutral-primary">{row.value}</span>
                        {row.icon && <img src={row.icon} alt={row.iconAlt} className="size-4 rounded-full object-cover" />}
                      </div>
                    </div>
                  ))}
                  {/* Fee row */}
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border-neutral-03">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">Fee</span>
                      <span className="bg-[rgba(22,194,132,0.1)] text-text-success text-[10px] font-medium uppercase px-2 py-1 rounded-full leading-3">-0% Fee</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-text-neutral-primary">872.00</span>
                      <img src={tokenImg} alt={tokenLabel} className="size-4 rounded-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* Notice */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2L2 17h16L10 2z" fill="#f5a623" fillOpacity="0.15"/>
                      <path d="M10 2L2 17h16L10 2z" stroke="#f5a623" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M10 8v4M10 14v.5" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm font-medium text-text-neutral-primary">Notice</span>
                    <div className="flex-1 h-px bg-border-neutral-02" />
                  </div>
                  <p className="text-sm text-text-neutral-secondary leading-5">
                    You'll receive your tokens after Settle Starts when seller settles.{" "}
                    If they don't settle by Settle Ends, you can cancel the order to get{" "}
                    <span className="font-medium text-text-neutral-primary">{collateralAmt} {tokenLabel}</span> back, plus another{" "}
                    <span className="font-medium text-text-neutral-primary">{(parseFloat(collateralAmt) * 0.8).toFixed(2)} {tokenLabel}</span>{" "}
                    from original buyer as compensation.
                  </p>
                  {/* Checkbox */}
                  <label
                    className="flex items-center gap-2 cursor-pointer select-none"
                    onClick={() => setConfirmed(!confirmed)}
                  >
                    <div
                      className={`size-4 rounded shrink-0 border-2 flex items-center justify-center transition-colors ${
                        confirmed
                          ? "bg-text-success border-text-success"
                          : "bg-bg-neutral-03 border-border-neutral-04"
                      }`}
                    >
                      {confirmed && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium text-text-neutral-primary">
                      Yes, I understand.
                    </span>
                  </label>
                </div>

                {/* Deposit button */}
                <button
                  disabled={!confirmed}
                  onClick={() => {
                    if (!confirmed) return;
                    // Keep confirm modal open, show pending toast
                    setToastState("pending");
                    clearTimeout(toastTimerRef.current);
                    toastTimerRef.current = setTimeout(() => {
                      setShowConfirmModal(false);
                      setToastState("success");
                    }, 3000);
                  }}
                  className={`w-full py-2.5 rounded-[10px] text-base font-medium text-white transition-opacity ${
                    isBuy ? "bg-text-success" : "bg-text-danger"
                  } ${confirmed ? "opacity-100" : "opacity-40 cursor-not-allowed"}`}
                >
                  {isBuy ? "Deposit" : "Sell"} {collateralAmt} {tokenLabel}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Toast Notification ─────────────────────────────────── */}
      {toastState && (
        <div className="fixed bottom-4 left-4 z-[60] w-[360px] bg-bg-neutral-02 rounded-[10px] shadow-[0_0_8px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col p-3 gap-2">
          {/* Top row: icon + title + close — all vertically centered */}
          <div className="flex items-center gap-2">
            {/* Leading icon */}
            <div className="shrink-0 size-6 flex items-center justify-center">
              {toastState === "pending" && (
                <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#252527" strokeWidth="2.5"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#16c284" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              )}
              {toastState === "success" && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#16c284"/>
                  <path d="M7 12l3.5 3.5L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {toastState === "failed" && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 20h20L12 2z" fill="#ff3b46" fillOpacity="0.15"/>
                  <path d="M12 2L2 20h20L12 2z" stroke="#ff3b46" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M12 9v5M12 16.5v.5" stroke="#ff3b46" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            {/* Title */}
            <p className="flex-1 min-w-0 text-[14px] font-medium text-text-neutral-primary leading-5">
              {toastState === "pending" && "Waiting for wallet to sign transaction"}
              {toastState === "success" && "Transaction Confirmed"}
              {toastState === "failed" && "Transaction Failed"}
            </p>
            {/* Close icon */}
            <button
              onClick={() => { setToastState(null); clearTimeout(toastTimerRef.current); }}
              className="shrink-0 size-6 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="#7a7a83" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Subtitle */}
          {(toastState === "pending" || toastState === "failed") && (
            <p className="text-[12px] text-text-neutral-secondary leading-4 pl-8">
              {toastState === "pending" ? "Pending wallet to sign" : "Please try again."}
            </p>
          )}

          {/* Success actions */}
          {toastState === "success" && (
            <div className="flex gap-2 pl-8">
              <button
                onClick={() => {
                  setToastState(null);
                  setSelectedOrderInfo(selectedOrder || { price: "0.0022", amount: "6.34K", collateral: "0.10", unit: "sol", side: "Buy" });
                  setShowOrderInfoModal(true);
                }}
                className="border border-border-neutral-02 text-text-neutral-primary text-[12px] font-medium px-3 py-1.5 rounded-md hover:bg-bg-neutral-03 transition-colors"
              >
                View Transaction ↗
              </button>
            </div>
          )}

          {/* Timer bar */}
          <div
            key={toastState}
            className="absolute bottom-0 left-0 h-[2px]"
            style={{
              background: toastState === "failed" ? "#ff3b46" : "#16c284",
              animation: "toast-timer 3s linear forwards",
            }}
          />
        </div>
      )}

      {/* ── Order Info Modal ────────────────────────────────────── */}
      {showOrderInfoModal && selectedOrderInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowOrderInfoModal(false)}
        >
          <div
            className="bg-bg-neutral-03 rounded-3xl shadow-[0_0_32px_rgba(0,0,0,0.2)] w-[640px] flex flex-col p-6 gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: token image + name + close */}
            <div className="flex items-center gap-3">
              {/* Token image with chain badge */}
              <div className="relative shrink-0">
                <img src={imgMascot} alt={market.name} className="size-9 rounded-full object-cover" />
                <img src={imgChainSolana} alt="SOL" className="absolute -bottom-0.5 -right-0.5 size-4 rounded-full border border-bg-neutral-03" />
              </div>
              {/* Name */}
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="text-sm font-medium text-text-neutral-primary">{market.name}</span>
                <span className="text-xs text-text-neutral-secondary">${selectedOrderInfo.price}</span>
              </div>
              {/* Close button */}
              <button
                onClick={() => setShowOrderInfoModal(false)}
                className="size-9 shrink-0 flex items-center justify-center bg-bg-neutral-02 rounded-full hover:bg-bg-neutral-04 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="#7a7a83" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Sub-title */}
            <p className="text-sm text-text-neutral-secondary leading-5">
              <span className="text-text-neutral-tertiary">GH3k...Ui81</span> is{" "}
              <span className={selectedOrderInfo.side === "Buy" ? "text-text-success" : "text-text-danger"}>
                {selectedOrderInfo.side === "Buy" ? "buying" : "selling"}
              </span>{" "}
              <span className="text-text-neutral-primary font-medium">{selectedOrderInfo.amount} {market.name}</span>{" "}
              for{" "}
              <span className="text-text-neutral-primary font-medium">{selectedOrderInfo.collateral} {selectedOrderInfo.unit?.toUpperCase() || "SOL"}</span>
            </p>

            {/* 2-column info grid */}
            <div className="border border-border-neutral-03 rounded-[10px] overflow-hidden">
              {[
                [
                  { label: "Price", value: `$${selectedOrderInfo.price}` },
                  { label: "Fill Type", value: "FULL", badge: true },
                ],
                [
                  { label: "Amount", value: selectedOrderInfo.amount, icon: imgMascot },
                  { label: "For", value: selectedOrderInfo.collateral, icon: imgChainSolana },
                ],
                [
                  { label: "Filled Amount", value: "0", icon: imgMascot },
                  { label: "Remaining Amount", value: selectedOrderInfo.amount, icon: imgMascot },
                ],
                [
                  { label: "Settle Starts", value: "10/08/2025 10:24 AM" },
                  { label: "Settle Ends", value: "12/08/2025 10:24 AM" },
                ],
                [
                  { label: "Order TX", value: "Solscan", link: true },
                  { label: "Countdown", value: "Not Started" },
                ],
              ].map((row, ri) => (
                <div key={ri} className={`flex ${ri < 4 ? "border-b border-border-neutral-03" : ""}`}>
                  {row.map((cell, ci) => (
                    <div key={ci} className={`flex-1 flex flex-col gap-2 p-4 ${ci === 0 ? "border-r border-border-neutral-03" : ""}`}>
                      <span className="text-xs text-text-neutral-secondary border-b border-dashed border-border-neutral-04 pb-0 self-start leading-4">{cell.label}</span>
                      <div className="flex items-center gap-1">
                        {cell.badge ? (
                          <span className="bg-bg-neutral-02 text-text-neutral-tertiary text-[10px] font-medium uppercase px-2 py-1 rounded-full leading-3">{cell.value}</span>
                        ) : cell.link ? (
                          <span className="text-sm font-medium text-text-neutral-primary flex items-center gap-1">
                            {cell.value}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H6M11 3v5" stroke="#f9f9fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-text-neutral-primary">{cell.value}</span>
                        )}
                        {cell.icon && <img src={cell.icon} alt="" className="size-4 rounded-full object-cover" />}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Close Order Confirmation Modal ──────────────────────── */}
      {showCloseOrderModal && selectedMyOpenOrder && (() => {
        const order = selectedMyOpenOrder;
        const isBuy = order.side === "Buy";
        const isResell = order.side === "Resell";
        const isSell = order.side === "Sell";
        const sideColor = isBuy ? "text-text-success" : isResell ? "text-[#facc15]" : "text-text-danger";
        const tokenLabel = order.unit || "SOL";

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setShowCloseOrderModal(false)}
          >
            <div
              className="bg-bg-neutral-03 rounded-3xl shadow-[0_0_32px_rgba(0,0,0,0.2)] w-[480px] flex flex-col gap-6 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="size-9 shrink-0" />
                <p className="flex-1 text-center text-[18px] font-medium text-text-neutral-primary leading-7">
                  Confirm Transaction
                </p>
                <button
                  onClick={() => setShowCloseOrderModal(false)}
                  className="size-9 shrink-0 flex items-center justify-center bg-bg-neutral-02 rounded-full hover:bg-bg-neutral-04 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5l10 10M15 5L5 15" stroke="#7a7a83" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-6">
                {/* Subtitle */}
                <p className="text-sm text-text-neutral-secondary text-center leading-5">
                  You are closing this order. Are you sure?
                </p>

                {/* Review info table */}
                <div className="border border-border-neutral-03 rounded-[10px] overflow-hidden">
                  {/* Order Type */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border-neutral-03">
                    <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">Order Type</span>
                    <span className={`text-sm font-medium ${sideColor}`}>{order.side}</span>
                  </div>

                  {/* Amount row(s) */}
                  {isResell ? (
                    <>
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border-neutral-03">
                        <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">Total Amount</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-text-neutral-primary">{order.amount} {market.name}</span>
                          <img src={imgMascot} alt={market.name} className="size-4 rounded-full object-cover" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border-neutral-03">
                        <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">To be Received</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-text-neutral-primary">{order.collateral} {tokenLabel}</span>
                          <img src={imgChainSolana} alt={tokenLabel} className="size-4 rounded-full object-cover" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border-neutral-03">
                        <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">Filled / Total Amount</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-text-neutral-primary">0 / {order.amount} {market.name}</span>
                          <img src={imgMascot} alt={market.name} className="size-4 rounded-full object-cover" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border-neutral-03">
                        <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">To be Received / Total</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-text-neutral-primary">0 / {order.collateral} {tokenLabel}</span>
                          <img src={imgChainSolana} alt={tokenLabel} className="size-4 rounded-full object-cover" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Price row */}
                  {isResell ? (
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border-neutral-03">
                      <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">Price / Original Price</span>
                      <span className="text-sm font-medium text-text-neutral-primary">{order.price} / {order.entryPrice}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border-neutral-03">
                      <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">Price</span>
                      <span className="text-sm font-medium text-text-neutral-primary">{order.price}</span>
                    </div>
                  )}

                  {/* Close Fee */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">Close Fee</span>
                      <span className="bg-[rgba(22,194,132,0.1)] text-text-success text-[10px] font-medium uppercase px-2 py-1 rounded-full leading-3">-0% FEE</span>
                    </div>
                    <span className="text-sm font-medium text-text-neutral-primary">0.00 {tokenLabel}</span>
                  </div>
                </div>

                {/* Notice */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2L2 17h16L10 2z" fill="#f5a623" fillOpacity="0.15"/>
                      <path d="M10 2L2 17h16L10 2z" stroke="#f5a623" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M10 8v4M10 14v.5" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm font-medium text-text-neutral-primary">Notice</span>
                    <div className="flex-1 h-px bg-border-neutral-02" />
                  </div>
                  <p className="text-sm text-text-neutral-secondary leading-5">
                    {isResell
                      ? "By closing this resell order, you will receive your collateral back. Any unfilled portion of this order will be cancelled."
                      : isBuy
                      ? "By closing this buy order, you will get your collateral back. Any unfilled portion of this order will be cancelled."
                      : "By closing this sell order, you will get your collateral back. Any unfilled portion of this order will be cancelled."}
                  </p>
                  {/* Checkbox */}
                  <label
                    className="flex items-center gap-2 cursor-pointer select-none"
                    onClick={() => setCloseOrderAcknowledged(!closeOrderAcknowledged)}
                  >
                    <div
                      className={`size-4 rounded shrink-0 border-2 flex items-center justify-center transition-colors ${
                        closeOrderAcknowledged
                          ? "bg-text-success border-text-success"
                          : "bg-bg-neutral-03 border-border-neutral-04"
                      }`}
                    >
                      {closeOrderAcknowledged && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium text-text-neutral-primary">
                      Yes, I understand.
                    </span>
                  </label>
                </div>

                {/* Close Order button */}
                <button
                  disabled={!closeOrderAcknowledged}
                  onClick={() => {
                    if (!closeOrderAcknowledged) return;
                    setToastState("pending");
                    clearTimeout(toastTimerRef.current);
                    toastTimerRef.current = setTimeout(() => {
                      setShowCloseOrderModal(false);
                      setCloseOrderAcknowledged(false);
                      setSelectedMyOpenOrder(null);
                      setToastState("success");
                    }, 3000);
                  }}
                  className={`w-full py-2.5 rounded-[10px] text-base font-medium text-[#fd5e67] bg-[rgba(255,59,70,0.2)] transition-colors ${
                    closeOrderAcknowledged ? "hover:bg-[rgba(255,59,70,0.3)]" : "opacity-40 cursor-not-allowed"
                  }`}
                >
                  Close Order
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Resell Your Order – Input Modal ───────────────────────────── */}
      {showResellModal && resellModalOrder && (() => {
        const order = resellModalOrder;
        const unitLabel = order.unit || "SOL";
        const tokenImg = unitLabel === "SOL" ? imgChainSolana : unitLabel === "ETH" ? imgChainEthereum : unitLabel === "SUI" ? imgChainSui : imgChainEthereum;
        const orgPriceRaw = order.entryPrice ? order.entryPrice.replace("$", "") : order.price.replace("$", "");
        const parsedAmount = parseFloat(order.amount.replace(/[KkMm]/g, (m) => m.toLowerCase() === "k" ? "e3" : "e6")) || 0;

        const price = parseFloat(resellPrice) || 0;
        const buyingAmt = price > 0 ? (price * parsedAmount).toFixed(4) : null;
        const receivedAmt = buyingAmt;
        const depositedAmt = order.collateral;
        const pnl = price > 0 ? ((price - parseFloat(orgPriceRaw)) * parsedAmount).toFixed(4) : null;
        const pnlPositive = pnl !== null && parseFloat(pnl) >= 0;
        const canResell = resellPrice !== "" && price > 0;
        const tokenName = order.pair?.split("/")[0] || "SKATE";

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setShowResellModal(false)}>
            <div className="bg-bg-neutral-02 rounded-3xl shadow-[0_0_32px_rgba(0,0,0,0.2)] w-[480px] flex flex-col gap-6 p-6"
              onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="size-9 shrink-0" />
                <p className="flex-1 text-center text-[18px] font-medium text-text-neutral-primary leading-7">Resell Your Order</p>
                <button onClick={() => setShowResellModal(false)}
                  className="size-9 shrink-0 flex items-center justify-center bg-bg-neutral-02 rounded-full hover:bg-bg-neutral-04 transition-colors border border-border-neutral-03">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5l10 10M15 5L5 15" stroke="#7a7a83" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Form */}
              <div className="border border-border-neutral-02 rounded-[10px] overflow-hidden relative">
                {/* Price row */}
                <div className="bg-bg-neutral-03 px-4 pt-4 pb-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-neutral-tertiary">Price</span>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-text-neutral-tertiary border-b border-dashed border-border-neutral-04">Last Price</span>
                      <span className="text-text-neutral-primary">${orgPriceRaw}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={resellPrice}
                      onChange={(e) => setResellPrice(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 bg-transparent text-2xl font-medium text-text-neutral-primary placeholder-text-neutral-tertiary outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="bg-bg-neutral-02 text-xs font-medium text-text-neutral-primary px-3 py-1.5 rounded-md hover:bg-bg-neutral-04 transition-colors">Max</button>
                      <div className="border border-border-neutral-03 rounded-full px-4 py-1.5">
                        <span className="text-sm font-medium text-text-neutral-primary">$</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Swap arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: "calc(88px - 14px)" }}>
                  <div className="bg-bg-neutral-03 border-2 border-bg-neutral-02 rounded-full p-1.5 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 16l7 7 7-7" stroke="#7a7a83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Selling row */}
                <div className="bg-bg-neutral-02 border-b border-border-neutral-02 px-4 pt-4 pb-4 flex flex-col gap-2">
                  <span className="text-xs text-text-neutral-tertiary">Selling</span>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-medium text-text-neutral-primary">{order.amount}</span>
                    <div className="border border-border-neutral-03 rounded-full pl-1 pr-4 py-1 flex items-center gap-1.5">
                      <div className="size-5 rounded-full bg-bg-neutral-03 overflow-hidden">
                        <img src={tokenImg} alt={tokenName} className="size-full object-cover" />
                      </div>
                      <span className="text-sm font-medium text-text-neutral-primary">{tokenName}</span>
                    </div>
                  </div>
                </div>

                {/* Buying row */}
                <div className="bg-bg-neutral-02 px-4 pt-4 pb-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-neutral-tertiary">Buying</span>
                    <span className="text-xs text-text-neutral-tertiary">Balance: 18.32 {unitLabel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-medium ${buyingAmt ? "text-text-neutral-primary" : "text-text-neutral-tertiary"}`}>{buyingAmt ?? "0.00"}</span>
                    <div className="border border-border-neutral-03 rounded-full pl-1 pr-4 py-1 flex items-center gap-1.5">
                      <div className="size-5 rounded-full bg-bg-neutral-03 overflow-hidden">
                        <img src={tokenImg} alt={unitLabel} className="size-full object-cover" />
                      </div>
                      <span className="text-sm font-medium text-text-neutral-primary">{unitLabel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info rows */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-04">Resell</span>
                    <span className="text-sm text-text-neutral-tertiary">/</span>
                    <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-04">Org. Price</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <span className={canResell ? "text-[#facc15]" : "text-text-neutral-tertiary"}>{canResell ? `$${resellPrice}` : "-"}</span>
                    <span className="text-text-neutral-primary">/</span>
                    <span className="text-text-neutral-primary">${orgPriceRaw}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-04">To be Received</span>
                    <span className="text-sm text-text-neutral-tertiary">/</span>
                    <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-04">Deposited</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <span className={canResell ? "text-[#facc15]" : "text-text-neutral-tertiary"}>{canResell ? `${receivedAmt} ${unitLabel}` : "-"}</span>
                    <span className="text-text-neutral-primary">/</span>
                    <span className="text-text-neutral-primary">{depositedAmt} {unitLabel}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-04">Resell Amount</span>
                  <span className="text-sm font-medium text-text-neutral-primary">{order.amount} {tokenName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-04">PNL</span>
                  <span className={`text-sm font-medium ${pnl !== null ? (pnlPositive ? "text-text-success" : "text-text-danger") : "text-text-neutral-tertiary"}`}>
                    {pnl !== null ? `${pnlPositive ? "+" : ""}${pnl} ${unitLabel}` : "-"}
                  </span>
                </div>
              </div>

              {/* Alert */}
              <div className="bg-[rgba(249,115,22,0.1)] rounded-xl px-4 py-3 flex items-start gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                  <path d="M10 2L2 17h16L10 2z" fill="#f97316" fillOpacity="0.15"/>
                  <path d="M10 2L2 17h16L10 2z" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M10 8v4M10 14v.5" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className="text-xs text-white/60 leading-4">
                  Max profit for Resell Order is capped at{" "}
                  <span className="text-white font-medium">95%</span>
                </p>
              </div>

              {/* Resell button */}
              <button
                disabled={!canResell}
                onClick={() => {
                  if (!canResell) return;
                  setShowResellModal(false);
                  setResellAcknowledged(false);
                  setResellPending(false);
                  setShowResellConfirmModal(true);
                }}
                className={`w-full py-2.5 rounded-[10px] text-base font-medium text-[#0a0a0b] bg-text-success transition-colors ${
                  canResell ? "hover:bg-[#14a875] cursor-pointer" : "opacity-40 cursor-not-allowed"
                }`}
              >
                Resell
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── Resell Your Order – Confirm Modal ─────────────────────────── */}
      {showResellConfirmModal && resellModalOrder && (() => {
        const order = resellModalOrder;
        const unitLabel = order.unit || "SOL";
        const tokenImg = unitLabel === "SOL" ? imgChainSolana : unitLabel === "ETH" ? imgChainEthereum : unitLabel === "SUI" ? imgChainSui : imgChainEthereum;
        const orgPriceRaw = order.entryPrice ? order.entryPrice.replace("$", "") : order.price.replace("$", "");
        const parsedAmount = parseFloat(order.amount.replace(/[KkMm]/g, (m) => m.toLowerCase() === "k" ? "e3" : "e6")) || 0;
        const price = parseFloat(resellPrice) || 0;
        const receivedAmt = (price * parsedAmount).toFixed(2);
        const depositedAmt = order.collateral;
        const pnlAmt = ((price - parseFloat(orgPriceRaw)) * parsedAmount).toFixed(2);
        const pnlPositive = parseFloat(pnlAmt) >= 0;
        const tokenName = order.pair?.split("/")[0] || "SKATE";

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => { if (!resellPending) { setShowResellConfirmModal(false); setResellAcknowledged(false); }}}>
            <div className="bg-bg-neutral-02 rounded-3xl shadow-[0_0_32px_rgba(0,0,0,0.2)] w-[480px] flex flex-col gap-6 p-6"
              onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="size-9 shrink-0" />
                <p className="flex-1 text-center text-[18px] font-medium text-text-neutral-primary leading-7">Resell Your Order</p>
                <button
                  disabled={resellPending}
                  onClick={() => { setShowResellConfirmModal(false); setResellAcknowledged(false); }}
                  className="size-9 shrink-0 flex items-center justify-center bg-bg-neutral-02 rounded-full hover:bg-bg-neutral-04 transition-colors border border-border-neutral-03 disabled:opacity-40">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5l10 10M15 5L5 15" stroke="#7a7a83" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Description */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="bg-[#eab308] text-[#0a0a0b] text-xs font-medium uppercase px-2 py-1 rounded-full leading-3">RS</span>
                  <p className="text-sm text-text-neutral-secondary leading-5">
                    You are <span className="text-[#facc15] font-medium">reselling</span>{" "}
                    <span className="text-text-neutral-primary font-medium">{order.amount} {tokenName}</span>{" "}
                    for <span className="text-text-neutral-primary font-medium">{receivedAmt} {unitLabel}</span>
                  </p>
                </div>
                <p className="text-sm text-text-neutral-secondary">Are you sure?</p>
              </div>

              {/* Review info table */}
              <div className="border border-border-neutral-03 rounded-[10px] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border-neutral-03">
                  <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">Reselling</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-text-neutral-primary">{order.amount}</span>
                    <img src={tokenImg} alt={tokenName} className="size-4 rounded-full object-cover" />
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-b border-border-neutral-03">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">Resell</span>
                    <span className="text-sm text-text-neutral-secondary">/</span>
                    <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">Original Price</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <span className="text-[#facc15]">${resellPrice}</span>
                    <span className="text-text-neutral-primary">/</span>
                    <span className="text-text-neutral-primary">${orgPriceRaw}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-b border-border-neutral-03">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">To be Received</span>
                    <span className="text-sm text-text-neutral-secondary">/</span>
                    <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">Deposited</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <span className="text-[#facc15]">{receivedAmt}</span>
                    <img src={tokenImg} alt={unitLabel} className="size-4 rounded-full object-cover" />
                    <span className="text-text-neutral-primary">/</span>
                    <span className="text-text-neutral-primary">{depositedAmt}</span>
                    <img src={tokenImg} alt={unitLabel} className="size-4 rounded-full object-cover" />
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-b border-border-neutral-03">
                  <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">PNL</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-medium ${pnlPositive ? "text-text-success" : "text-text-danger"}`}>{pnlPositive ? "+" : ""}{pnlAmt}</span>
                    <img src={tokenImg} alt={unitLabel} className="size-4 rounded-full object-cover" />
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-neutral-secondary border-b border-dashed border-border-neutral-04 leading-5">Fee</span>
                    <span className="bg-[rgba(22,194,132,0.1)] text-text-success text-[10px] font-medium uppercase px-2 py-1 rounded-full leading-3">-0% Fee</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-text-neutral-primary">0.00</span>
                    <img src={tokenImg} alt={unitLabel} className="size-4 rounded-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <path d="M10 2L2 17h16L10 2z" fill="#f5a623" fillOpacity="0.15"/>
                    <path d="M10 2L2 17h16L10 2z" stroke="#f5a623" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M10 8v4M10 14v.5" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-sm font-medium text-text-neutral-primary">Notice</span>
                  <div className="flex-1 h-px bg-border-neutral-02" />
                </div>
                <p className="text-sm text-text-neutral-secondary leading-5">
                  By creating this resell order, you list your position for{" "}
                  <span className="font-medium text-text-neutral-primary">{receivedAmt} {unitLabel}</span>.{" "}
                  You will receive payment immediately when someone buys your resell order.{" "}
                  If no one fills this order, the original order is still yours. Net profit if sold:{" "}
                  <span className="font-medium text-text-neutral-primary">{pnlPositive ? "+" : ""}{pnlAmt} {unitLabel}</span>.
                </p>
                <label className="flex items-center gap-2 cursor-pointer select-none"
                  onClick={() => !resellPending && setResellAcknowledged(!resellAcknowledged)}>
                  <div className={`size-4 rounded shrink-0 border-2 flex items-center justify-center transition-colors ${
                    resellAcknowledged ? "bg-text-success border-text-success" : "bg-bg-neutral-03 border-border-neutral-04"
                  }`}>
                    {resellAcknowledged && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-text-neutral-primary">Yes, I understand.</span>
                </label>
              </div>

              {/* Confirm / Pending button */}
              <button
                disabled={!resellAcknowledged || resellPending}
                onClick={() => {
                  if (!resellAcknowledged || resellPending) return;
                  setResellPending(true);
                  setToastState("pending");
                  clearTimeout(resellTimerRef.current);
                  resellTimerRef.current = setTimeout(() => {
                    setShowResellConfirmModal(false);
                    setResellAcknowledged(false);
                    setResellPending(false);
                    setResellModalOrder(null);
                    setToastState("success");
                  }, 3000);
                }}
                className={`w-full py-2.5 rounded-[10px] text-base font-medium text-[#0a0a0b] bg-text-success transition-colors ${
                  resellAcknowledged && !resellPending ? "hover:bg-[#14a875] cursor-pointer" : "opacity-40 cursor-not-allowed"
                }`}
              >
                {resellPending ? "Pending Approval" : "Confirm Resell"}
              </button>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
