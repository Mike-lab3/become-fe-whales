import { ArrowUpRightIcon } from "../assets/icons";

// Token & coin images (fresh from Figma)
const imgToken = "https://www.figma.com/api/mcp/asset/b7d5c406-af4b-4e43-8e69-9fbf4672499f";
const imgUSDC = "https://www.figma.com/api/mcp/asset/8810e740-e736-4ad7-8c21-4a4e65453bb5";

// Tier icons
const imgShark = "https://www.figma.com/api/mcp/asset/8831a759-6bdc-4cba-ae59-4903d0eb3aea";
const imgWhale = "https://www.figma.com/api/mcp/asset/a4fcab27-60cd-46c6-b411-818a29292fe8";
const imgShrimp = "https://www.figma.com/api/mcp/asset/dd133e59-523b-415b-92ce-cc333c3eff9a";

const TIER_ICONS = {
  shark: imgShark,
  whale: imgWhale,
  shrimp: imgShrimp,
};

const COLUMNS = [
  { label: "Time", width: "w-[128px]", align: "left" },
  { label: "Side", width: "w-[128px]", align: "left" },
  { label: "Market", width: "flex-1", align: "left" },
  { label: "Price ($)", width: "w-[192px]", align: "right" },
  { label: "Filled Qty", width: "w-[192px]", align: "right" },
  { label: "Total ($)", width: "w-[192px]", align: "right" },
  { label: "", width: "w-[192px]", align: "right" },
];

const TRADES = [
  { time: "1m ago", side: "Sell", market: "SKATE/USDC", price: "0.0050", qty: "100.00K", total: "500.00", tier: "shark" },
  { time: "1m ago", side: "Sell", market: "SKATE/USDC", price: "0.0050", qty: "100.00K", total: "500.00", tier: "whale" },
  { time: "1m ago", side: "Buy", badge: "RS", market: "SKATE/USDC", price: "0.0050", qty: "100.00K", total: "500.00", tier: "shark" },
  { time: "1m ago", side: "Buy", badge: "RS", market: "SKATE/USDC", price: "0.0050", qty: "100.00K", total: "500.00", tier: "shark" },
  { time: "1m ago", side: "Buy", market: "SKATE/USDC", price: "0.0050", qty: "100.00K", total: "500.00", tier: "shark" },
  { time: "1m ago", side: "Buy", market: "SKATE/USDC", price: "0.0050", qty: "100.00K", total: "500.00", tier: "shark" },
  { time: "1m ago", side: "Buy", market: "SKATE/USDC", price: "0.0050", qty: "100.00K", total: "500.00", tier: "shark" },
  { time: "1m ago", side: "Buy", market: "SKATE/USDC", price: "0.0050", qty: "100.00K", total: "500.00", tier: "shark" },
  { time: "1m ago", side: "Buy", market: "SKATE/USDC", price: "0.0050", qty: "100.00K", total: "500.00", tier: "shrimp" },
  { time: "1m ago", side: "Buy", market: "SKATE/USDC", price: "0.0050", qty: "100.00K", total: "500.00", tier: "shrimp" },
];

export default function RecentTrades() {
  return (
    <section className="flex flex-col gap-4 p-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium leading-8 text-text-neutral-primary">Recent Trades</h2>
      </div>

      {/* Table */}
      <div className="w-full">
        {/* Heading */}
        <div className="flex items-center border-b border-border-neutral-01 px-2">
          {COLUMNS.map((col, i) => (
            <div key={i} className={`py-2 ${col.width} ${col.align === "right" ? "flex justify-end" : ""}`}>
              <span className="text-xs text-text-neutral-tertiary">{col.label}</span>
            </div>
          ))}
        </div>

        {/* Rows */}
        {TRADES.map((trade, idx) => (
          <div key={idx} className="flex items-center border-b border-border-neutral-01 px-2">
            {/* Time */}
            <div className="w-[128px] py-4">
              <span className="text-sm text-text-neutral-tertiary">{trade.time}</span>
            </div>

            {/* Side */}
            <div className="w-[128px] py-4 flex items-center gap-2">
              {trade.badge === "RS" && (
                <span className="inline-flex items-center px-1.5 rounded text-[10px] font-medium leading-[18px] bg-bg-yellow text-text-neutral-inverse">
                  RS
                </span>
              )}
              <span className={`text-sm font-medium ${trade.side === "Buy" ? "text-text-success" : "text-text-danger"}`}>
                {trade.side}
              </span>
            </div>

            {/* Market */}
            <div className="flex-1 flex items-center gap-2 py-4">
              <img src={imgToken} alt="" className="size-4 rounded-full" />
              <span className="text-sm font-medium text-text-neutral-primary">{trade.market}</span>
            </div>

            {/* Price */}
            <div className="w-[192px] flex justify-end py-4">
              <span className="text-sm font-medium text-text-neutral-primary">{trade.price}</span>
            </div>

            {/* Qty */}
            <div className="w-[192px] flex justify-end py-4">
              <span className="text-sm font-medium text-text-neutral-primary">{trade.qty}</span>
            </div>

            {/* Total */}
            <div className="w-[192px] flex items-center justify-end gap-1.5 py-4">
              <span className="text-sm font-medium text-text-neutral-primary">{trade.total}</span>
              <img src={imgUSDC} alt="USDC" className="size-4 rounded-full" />
              {trade.tier && (
                <img src={TIER_ICONS[trade.tier]} alt={trade.tier} className="size-4" />
              )}
            </div>

            {/* Action */}
            <div className="w-[192px] flex justify-end py-4">
              <button className="flex items-center justify-center w-[52px] h-[28px] border border-border-neutral-02 rounded-md cursor-pointer transition-colors hover:bg-bg-neutral-02">
                <ArrowUpRightIcon className="size-5 text-text-neutral-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
