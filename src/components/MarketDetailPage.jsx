import { useState, useRef, useCallback } from "react";
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
  { price: "0.0021", amount: "99.67K",  collateral: "1.50",   token: "sol", badge: "RS", isFull: true },
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
  { price: "0.0044", amount: "190.28K", collateral: "6.00",   token: "sol", badge: "RS", isFull: true },
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
                <button className="text-xs text-text-success text-left hover:opacity-80 transition-opacity">
                  How it works? →
                </button>
              </div>
              <div className="flex items-center gap-2">
                {["Collateral", "Fill Type", "Order Type"].map((label) => (
                  <button
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-2 bg-bg-neutral-02 rounded-lg text-sm text-text-neutral-primary hover:bg-bg-neutral-03 transition-colors"
                  >
                    {label}
                    <ChevronDownIcon className="size-4 text-text-neutral-primary" />
                  </button>
                ))}
                <button className="size-9 flex items-center justify-center bg-bg-neutral-02 rounded-lg hover:bg-bg-neutral-03 transition-colors">
                  <img src={imgFilterIcon} alt="filter" className="size-4" />
                </button>
              </div>
            </div>

            {/* ── Chart ─────────────────────────────────────────────── */}
            <div className="border border-border-neutral-01 rounded-lg overflow-hidden">

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
                <div className="w-px h-4 bg-border-neutral-01 self-center" />
                <div className="flex items-center gap-1 flex-1">
                  {["Price", "FDV"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setChartType(t.toLowerCase())}
                      className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                        chartType === t.toLowerCase()
                          ? "bg-bg-neutral-02 text-text-neutral-primary"
                          : "text-text-neutral-tertiary hover:text-text-neutral-primary"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
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
                  <div className="absolute top-2 right-2 pointer-events-none">
                    <span className="text-[10px] text-text-neutral-tertiary font-medium opacity-60">🐋 WHALES MARKET</span>
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
            </div>

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
              {SAMPLE_BUY_ORDERS.map((buy, i) => {
                const sell = SAMPLE_SELL_ORDERS[i];
                return (
                  <div key={i} className="flex gap-4">
                    {/* ── Buy side row ── */}
                    <div className="relative flex-1 flex items-center h-11 px-2 bg-[rgba(255,255,255,0.03)] hover:bg-bg-neutral-02 cursor-pointer transition-colors rounded-lg overflow-hidden">
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
                        <button className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${buy.badge ? "bg-[rgba(234,179,8,0.2)] text-[#facc15] hover:bg-[rgba(234,179,8,0.3)]" : "bg-[rgba(22,194,132,0.2)] text-text-success hover:bg-[rgba(22,194,132,0.3)]"}`}>
                          Buy
                        </button>
                      </div>
                    </div>

                    {/* ── Center divider ── */}
                    <div className="w-px bg-border-neutral-01 self-stretch shrink-0" />

                    {/* ── Sell side row ── */}
                    {sell && (
                      <div className="relative flex-1 flex items-center h-11 px-2 bg-[rgba(255,255,255,0.03)] hover:bg-bg-neutral-02 cursor-pointer transition-colors rounded-lg overflow-hidden">
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
                          <button className="px-3 py-1.5 bg-[rgba(255,59,70,0.2)] text-text-danger rounded-lg text-xs font-medium hover:bg-[rgba(255,59,70,0.3)] transition-colors">
                            Sell
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
                      <button className="p-1.5 border border-border-neutral-02 rounded-md text-text-neutral-primary hover:bg-bg-neutral-03 transition-colors">
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

              {/* Title + price */}
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
              <button
                disabled
                className="w-full py-2.5 bg-[#f9f9fa] rounded-[10px] text-base font-medium text-[#0a0a0b] opacity-40 cursor-not-allowed"
              >
                Trade STAKE
              </button>

              {/* Order info fields */}
              <div className="flex flex-col gap-2">
                {[
                  { label: "Price" },
                  { label: "Amount Deliver" },
                  { label: "To be Received" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-text-neutral-tertiary border-b border-dashed border-border-neutral-03 cursor-default leading-5">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-text-neutral-primary">-</span>
                  </div>
                ))}
              </div>
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
                    <span className="text-[10px] font-medium text-text-neutral-tertiary bg-bg-neutral-02 px-2 py-0.5 rounded-full">32</span>
                  </div>
                  <div className={`h-0.5 w-full transition-colors ${activeOrderTab === "open" ? "bg-text-success" : ""}`} />
                </button>
              </div>

              {/* Order list */}
              <div className="flex flex-col">
                {MY_FILLED_ORDERS.map((order, i) => (
                  <div key={i} className="border-b border-border-neutral-01 py-4 flex flex-col gap-3">

                    {/* Row 1: side + pair + date */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${order.side === "Buy" ? "text-text-success" : "text-text-danger"}`}>
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

                    {/* Row 2: price details + resell button */}
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

                      {/* Resell button (buy orders only) */}
                      {order.action && order.side === "Buy" && (
                        <button className="px-3 py-1.5 bg-[rgba(234,179,8,0.2)] rounded-lg text-xs font-medium text-[#facc15] hover:bg-[rgba(234,179,8,0.3)] transition-colors shrink-0">
                          {order.action}
                        </button>
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
    </div>
  );
}
