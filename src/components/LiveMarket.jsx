import { SearchIcon, FilterIcon, ChevronDownIcon, SortIcon } from "../assets/icons";

// Token images per row (fresh from Figma)
const imgTokenSkateOn = "https://www.figma.com/api/mcp/asset/2a99674e-23a8-4301-92c6-fd9c2b9d872e";
const imgTokenSkateChain = "https://www.figma.com/api/mcp/asset/195523ef-f05f-44b3-9451-b37f3bd6698c";
const imgTokenEra = "https://www.figma.com/api/mcp/asset/f89213c4-beed-4bbf-b7d5-1d1aecf538b7";
const imgTokenGrass = "https://www.figma.com/api/mcp/asset/0b4eba02-4b25-4002-973f-38c4abaa1c76";
const imgTokenLoud = "https://www.figma.com/api/mcp/asset/36d28ff0-55ea-4146-81e0-65b6e3a4a512";
const imgTokenMmt = "https://www.figma.com/api/mcp/asset/f5a0e0d2-fa5d-402f-878a-17135089c514";

// Chain images per row (fresh from Figma)
const imgChainSolana1 = "https://www.figma.com/api/mcp/asset/d919a33f-326a-429a-b063-fabb2aaa6da9";
const imgChainSolana2 = "https://www.figma.com/api/mcp/asset/f5eee8c4-3814-494b-82ba-ba8dadabfab6";
const imgChainEthereum = "https://www.figma.com/api/mcp/asset/b5d8ea9c-e577-473b-b08a-132f0ea73c7b";
const imgChainSolana4 = "https://www.figma.com/api/mcp/asset/72c46d4a-3955-4949-932f-fe937cc4018e";
const imgChainSolana5 = "https://www.figma.com/api/mcp/asset/192c3042-72c1-4826-850d-211785a7b401";
const imgChainSui = "https://www.figma.com/api/mcp/asset/4ec662e3-2ebf-4303-8cb9-66041723d1b7";

const COLUMNS = [
  { label: "Token", align: "left", sortable: false },
  { label: "Last Price ($)", align: "right", sortable: true },
  { label: "24h Vol. ($)", align: "right", sortable: true },
  { label: "Total Vol. ($)", align: "right", sortable: true },
  { label: "Settle Starts (UTC)", align: "right", sortable: false, dashed: true },
  { label: "Settle Ends (UTC)", align: "right", sortable: false, dashed: true },
];

const MARKET_DATA = [
  { tokenImg: imgTokenSkateOn, chainImg: imgChainSolana1, name: "SKATE", sub: "SKATEON", price: "0.055", priceChange: "+162.18%", priceUp: true, vol24h: "7,375.62", vol24hChange: "-16.18%", vol24hUp: false, totalVol: "25,197.18", totalVolChange: "+6.38%", totalVolUp: true, settleStart: "30/05/2025\n01:00 PM", settleEnd: "30/05/2025\n04:00 PM" },
  { tokenImg: imgTokenSkateChain, chainImg: imgChainSolana2, name: "SKATE", sub: "Skate Chain", price: "0.119", priceChange: "+63.8%", priceUp: true, vol24h: "445.86", vol24hChange: "+1,159.36%", vol24hUp: true, totalVol: "21,904.26", totalVolChange: "+19.12%", totalVolUp: true, settleStart: "10/06/2025\n03:00 PM", settleEnd: "10/06/2025\n07:00 PM" },
  { tokenImg: imgTokenEra, chainImg: imgChainEthereum, name: "ERA", sub: "Caldera", price: "0.0464", priceChange: "+98.31%", priceUp: true, vol24h: "418,326.12", vol24hChange: "-32.16%", vol24hUp: false, totalVol: "7,483,875.48", totalVolChange: "+9.18%", totalVolUp: true, settleStart: null, settleEnd: null },
  { tokenImg: imgTokenGrass, chainImg: imgChainSolana4, name: "GRASS", sub: "Grass", price: "0.11", priceChange: "+124.52%", priceUp: true, vol24h: "10,418.71", vol24hChange: "+228.25%", vol24hUp: true, totalVol: "64,110.29", totalVolChange: "+0.81%", totalVolUp: true, settleStart: null, settleEnd: null },
  { tokenImg: imgTokenLoud, chainImg: imgChainSolana5, name: "LOUD", sub: "Loud", price: "$0.9638", priceChange: "+22.60%", priceUp: true, vol24h: "18,312.61", vol24hChange: "+49.13%", vol24hUp: true, totalVol: "628,875.43", totalVolChange: "+8.42%", totalVolUp: true, settleStart: null, settleEnd: null },
  { tokenImg: imgTokenMmt, chainImg: imgChainSui, name: "MMT", sub: "Momentum", price: "0.65", priceChange: "+48.32%", priceUp: true, vol24h: "0.00", vol24hChange: "-100.00%", vol24hUp: false, totalVol: "7,244.16", totalVolChange: "+0.00%", totalVolUp: true, settleStart: null, settleEnd: null },
];

export default function LiveMarket() {
  return (
    <section className="flex flex-col gap-4 p-4">
      {/* Title bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-medium leading-8 text-text-neutral-primary">Live Market</h2>
          <span className="text-2xl font-medium leading-8 text-text-neutral-tertiary">Ended</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="w-[360px]">
            <div className="flex items-center gap-2 bg-bg-neutral-02 rounded-lg p-2">
              <SearchIcon className="size-5 text-text-neutral-tertiary shrink-0" />
              <span className="text-sm text-text-neutral-tertiary">Search</span>
            </div>
          </div>

          {/* Network filter */}
          <button className="flex items-center gap-1.5 border border-border-neutral-02 rounded-lg p-2">
            <FilterIcon className="size-5 text-text-neutral-primary" />
            <span className="text-sm font-medium text-text-neutral-primary">Network</span>
            <ChevronDownIcon className="size-4 text-text-neutral-primary" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full">
        {/* Heading */}
        <div className="flex items-center border-b border-border-neutral-01 px-2">
          {COLUMNS.map((col, i) => (
            <div
              key={col.label}
              className={`py-2 ${i === 0 ? "flex-1" : "w-[192px]"} ${
                col.align === "right" ? "text-right flex justify-end" : ""
              }`}
            >
              <div className={`flex items-center gap-0 ${col.dashed ? "border-b border-dashed border-border-neutral-03" : ""}`}>
                <span className="text-xs text-text-neutral-tertiary">{col.label}</span>
                {col.sortable && <SortIcon className="size-4" />}
              </div>
            </div>
          ))}
        </div>

        {/* Rows */}
        {MARKET_DATA.map((item, idx) => (
          <div key={idx} className="flex items-center border-b border-border-neutral-01 px-2">
            {/* Token */}
            <div className="flex-1 flex items-center gap-3 py-4">
              <div className="relative p-1 shrink-0">
                <img src={item.tokenImg} alt="" className="size-9 rounded-full object-cover" />
                <img
                  src={item.chainImg}
                  alt=""
                  className="absolute bottom-0 left-0 size-4 rounded-sm border-2 border-bg-neutral-01 object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-text-neutral-primary">{item.name}</span>
                <span className="text-sm text-text-neutral-tertiary">{item.sub}</span>
              </div>
            </div>

            {/* Price */}
            <div className="w-[192px] flex flex-col gap-1 items-end py-3">
              <span className="text-sm font-medium text-text-neutral-primary">{item.price}</span>
              <span className={`text-sm ${item.priceUp ? "text-text-success" : "text-text-danger"}`}>
                {item.priceChange}
              </span>
            </div>

            {/* 24h Vol */}
            <div className="w-[192px] flex flex-col gap-1 items-end py-3">
              <span className="text-sm font-medium text-text-neutral-primary">{item.vol24h}</span>
              <span className={`text-sm ${item.vol24hUp ? "text-text-success" : "text-text-danger"}`}>
                {item.vol24hChange}
              </span>
            </div>

            {/* Total Vol */}
            <div className="w-[192px] flex flex-col gap-1 items-end py-3">
              <span className="text-sm font-medium text-text-neutral-primary">{item.totalVol}</span>
              <span className={`text-sm ${item.totalVolUp ? "text-text-success" : "text-text-danger"}`}>
                {item.totalVolChange}
              </span>
            </div>

            {/* Settle Start */}
            <div className="w-[192px] flex flex-col gap-1 items-end py-3 text-right">
              {item.settleStart ? (
                item.settleStart.split("\n").map((line, i) => (
                  <span key={i} className={`text-sm ${i === 0 ? "font-medium text-text-neutral-primary" : "text-text-neutral-tertiary"}`}>
                    {line}
                  </span>
                ))
              ) : (
                <span className="text-sm text-text-neutral-tertiary">TBA</span>
              )}
            </div>

            {/* Settle End */}
            <div className="w-[192px] flex flex-col gap-1 items-end py-3 text-right">
              {item.settleEnd ? (
                item.settleEnd.split("\n").map((line, i) => (
                  <span key={i} className={`text-sm ${i === 0 ? "font-medium text-text-neutral-primary" : "text-text-neutral-tertiary"}`}>
                    {line}
                  </span>
                ))
              ) : (
                <span className="text-sm text-text-neutral-tertiary">TBA</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
