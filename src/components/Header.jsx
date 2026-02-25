import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ArrowUpRightIcon, ArrowRightIcon } from "../assets/icons";
import ConnectWalletModal from "./ConnectWalletModal";
import PointsMarketModal from "./PointsMarketModal";
import imgNetworkSolana from "../assets/chains/solana.png";
import imgNetworkEthereum from "../assets/chains/ethereum.png";
import imgNetworkHyperliquid from "../assets/chains/hyperliquid.png";
import imgNetworkBnb from "../assets/chains/bnb.png";

const imgLogo = "https://www.figma.com/api/mcp/asset/f9527f3f-5f48-441a-a583-9a55c4d49f05";

const imgSolana = "https://www.figma.com/api/mcp/asset/ed82f7b3-8f78-4de0-82a4-7255626ce095";
const imgTokenFee = "https://www.figma.com/api/mcp/asset/5657b379-4bf0-4cb2-b300-2457aa5c3777";
const imgTokenBalance = "https://www.figma.com/api/mcp/asset/3a85a46e-fc78-4d0d-95c7-11f2ae557a14";
const imgAvatar1 = "https://www.figma.com/api/mcp/asset/20e339d9-148b-4cd3-a7a8-0a6eebb25ab5";
const imgAvatar2 = "https://www.figma.com/api/mcp/asset/5e716390-9ec2-4bfe-abc9-638c241a1c29";

const EARN_ITEMS = [
  {
    label: "Staking",
    description: "Secure. Stake. Earn.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7.5l10 5.5L22 7.5 12 2z"/>
        <path d="M2 11v1.5l10 5.5 10-5.5V11L12 16.5 2 11z" opacity="0.75"/>
        <path d="M2 16v1.5l10 5.5 10-5.5V16L12 21.5 2 16z" opacity="0.5"/>
      </svg>
    ),
  },
  {
    label: "Incentives",
    description: "Do more. Get more.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 2C8.12 2 7 3.12 7 4.5h5C12 3.12 10.88 2 9.5 2zM14.5 2C15.88 2 17 3.12 17 4.5h-5C12 3.12 13.12 2 14.5 2z"/>
        <rect x="2" y="4.5" width="20" height="4" rx="1"/>
        <path d="M3 9.5h7.5V21H5a2 2 0 01-2-2V9.5z"/>
        <path d="M13.5 9.5H21V19a2 2 0 01-2 2h-5.5V9.5z"/>
        <rect x="11" y="4.5" width="2" height="16.5"/>
      </svg>
    ),
  },
  {
    label: "Referral",
    description: "Bring users. Share gains.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12a5 5 0 100-10 5 5 0 000 10z"/>
        <path d="M0 22C0 17.03 4.03 13 9 13c1.81 0 3.5.54 4.92 1.47V22H0z"/>
        <rect x="17" y="14" width="2" height="8" rx="1"/>
        <rect x="14" y="17" width="8" height="2" rx="1"/>
      </svg>
    ),
  },
];

const NAV_ITEMS = [
  { label: "Pre-market" },
  { label: "Points Market" },
  { label: "Dashboard" },
  { label: "Earn", hasDropdown: true },
  { label: "About" },
];

const MENU_ITEMS = [
  {
    label: "Dashboard",
    icon: (
      // grid-2-line
      <svg className="size-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "Staking",
    icon: (
      // stack-line (3 layers)
      <svg className="size-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 7L10 11L17.5 7M2.5 11.5L10 15.5L17.5 11.5M10 4.5L17.5 8.5L10 12.5L2.5 8.5L10 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Incentives",
    icon: (
      // gift-2-line
      <svg className="size-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 5.5C10 5.5 10 3 8 3S5 4.5 5 5.5M10 5.5C10 5.5 10 3 12 3S15 4.5 15 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="3" y="5.5" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4.5 8.5V17a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 8.5V17.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "Referral",
    icon: (
      // user-add-line
      <svg className="size-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 17.5c0-3.038 2.686-5.5 6-5.5s6 2.462 6 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 7v5M18.5 9.5h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const NETWORKS = [
  { id: "solana", label: "Solana", icon: imgNetworkSolana },
  { id: "ethereum", label: "Ethereum", icon: imgNetworkEthereum },
  { id: "hyperliquid", label: "Hyperliquid", icon: imgNetworkHyperliquid },
  { id: "bnb", label: "BNB Chain", icon: imgNetworkBnb },
];

function NetworkDropdown({ selected, onSelect }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-[192px] bg-bg-neutral-02 rounded-xl shadow-[0px_0px_32px_0px_rgba(0,0,0,0.2)] overflow-hidden z-50 p-2">
      <p className="text-xs font-medium text-text-neutral-tertiary px-2 py-1">Switch Network</p>
      <div className="flex flex-col gap-1 mt-1">
        {NETWORKS.map((network) => (
          <button
            key={network.id}
            onClick={() => onSelect(network.id)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg w-full transition-colors ${
              selected === network.id ? "bg-bg-neutral-03" : "hover:bg-bg-neutral-03"
            }`}
          >
            <img src={network.icon} alt={network.label} className="size-4 rounded-[4px] shrink-0 object-cover" />
            <span className="text-sm font-medium text-text-neutral-primary flex-1 text-left">{network.label}</span>
            {selected === network.id && (
              <svg className="size-4 text-text-primary shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function EarnDropdown() {
  return (
    <div className="absolute left-0 top-full mt-2 w-[240px] bg-bg-neutral-02 rounded-xl shadow-[0px_0px_32px_0px_rgba(0,0,0,0.2)] overflow-hidden z-50 p-4 flex flex-col gap-4">
      {EARN_ITEMS.map((item, i) => (
        <a
          key={item.label}
          href="#"
          className={`flex items-start gap-2 group ${i < EARN_ITEMS.length - 1 ? "pb-4 border-b border-border-neutral-02" : ""}`}
        >
          <div className="shrink-0 mt-0.5 text-text-neutral-tertiary group-hover:text-text-primary transition-colors">
            {item.icon}
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-text-neutral-primary group-hover:text-text-primary transition-colors">
                {item.label}
              </span>
              <ArrowRightIcon className="size-4 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-text-neutral-tertiary leading-4">{item.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

function WalletDropdown({ onDisconnect }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-[260px] bg-bg-neutral-02 rounded-xl shadow-[0px_0px_32px_0px_rgba(0,0,0,0.2)] overflow-hidden z-50 border border-border-neutral-02">
      {/* Wallet info */}
      <div className="flex items-center gap-3 p-4 border-b border-border-neutral-02">
        <div className="p-0.5 shrink-0">
          <div className="size-10 rounded-full bg-bg-neutral-03 border-2 border-bg-neutral-01 overflow-hidden relative">
            <img src={imgAvatar1} alt="" className="absolute inset-0 size-full" style={{ maskImage: `url('${imgAvatar1}')`, maskSize: "cover" }} />
            <img src={imgAvatar2} alt="" className="absolute inset-0 size-full" />
          </div>
        </div>
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-base font-medium text-text-neutral-primary">GQ98...iA5Y</span>
            <button className="p-1 text-text-neutral-secondary hover:text-text-neutral-primary transition-colors">
              <svg className="size-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5.5" y="1.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M10.5 10.5v2a1.5 1.5 0 01-1.5 1.5H3a1.5 1.5 0 01-1.5-1.5V6A1.5 1.5 0 013 4.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <button className="flex items-center gap-0.5 text-sm text-text-neutral-secondary hover:text-text-neutral-primary transition-colors w-fit border-b border-transparent hover:border-text-neutral-secondary">
            <span>Open in Explorer</span>
            <ArrowUpRightIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* Menu items */}
      <div className="flex flex-col gap-1 p-2 border-b border-border-neutral-02">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium text-text-neutral-primary hover:bg-bg-neutral-03 transition-colors w-full text-left"
          >
            <span className="text-text-neutral-secondary">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Disconnect */}
      <div className="p-2">
        <button onClick={onDisconnect} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium text-text-danger hover:bg-bg-neutral-03 transition-colors w-full text-left">
          <svg className="size-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 17.5H4.167A1.667 1.667 0 012.5 15.833V4.167A1.667 1.667 0 014.167 2.5H7.5M13.333 14.167L17.5 10m0 0l-4.167-4.167M17.5 10h-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Disconnect
        </button>
      </div>
    </div>
  );
}

export default function Header({ onNavigateHome }) {
  const [connected, setConnected] = useState(true);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showPointsMarketModal, setShowPointsMarketModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("solana");
  const avatarRef = useRef(null);
  const earnRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (earnRef.current && !earnRef.current.contains(e.target)) {
        setEarnOpen(false);
      }
      if (networkRef.current && !networkRef.current.contains(e.target)) {
        setNetworkOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    <header className="sticky top-0 z-50 flex items-center justify-center border-b border-border-neutral-01 h-[60px] bg-bg-neutral-01">
      <div className="flex items-center flex-1 max-w-[1440px] px-8">
        <div className="flex items-center flex-1 gap-2 px-4">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome?.(); }} className="flex items-center gap-1.5 p-1.5 shrink-0">
            <img src={imgLogo} alt="Whales Market" className="size-6" />
            <svg width="172" height="15" viewBox="0 0 172 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="WHALES MARKET">
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
          </a>

          {/* Navigation */}
          <nav className="flex items-center flex-1">
            {NAV_ITEMS.map((item) => {
              if (item.label === "Earn") {
                return (
                  <div key="Earn" className="relative" ref={earnRef}>
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-medium whitespace-nowrap transition-colors hover:text-text-primary ${earnOpen ? "border-transparent text-text-primary" : "border-transparent text-text-neutral-primary"}`}
                      onClick={() => setEarnOpen((v) => !v)}
                    >
                      Earn
                      <ChevronDownIcon className={`size-4 transition-all ${earnOpen ? "rotate-180 text-text-primary" : "text-text-neutral-tertiary"}`} />
                    </button>
                    {earnOpen && <EarnDropdown />}
                  </div>
                );
              }
              if (item.label === "Points Market") {
                return (
                  <button
                    key="Points Market"
                    onClick={() => setShowPointsMarketModal(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors hover:text-text-primary text-text-neutral-primary"
                  >
                    Points Market
                  </button>
                );
              }
              return (
                <a
                  key={item.label}
                  href="#"
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors hover:text-text-primary ${
                    item.active ? "text-text-primary" : "text-text-neutral-primary"
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDownIcon className="size-4 text-text-neutral-tertiary" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          {connected ? (
            <>
              {/* Chain selector */}
              <div className="relative" ref={networkRef}>
                <button
                  className={`flex items-center gap-1.5 p-2 border rounded-lg transition-colors hover:bg-bg-neutral-02 ${networkOpen ? "border-text-neutral-primary" : "border-border-neutral-02"}`}
                  onClick={() => setNetworkOpen((v) => !v)}
                >
                  <img src={NETWORKS.find(n => n.id === selectedNetwork)?.icon} alt={selectedNetwork} className="size-4 rounded-[4px] object-cover" />
                  <ChevronDownIcon className={`size-4 transition-transform text-text-neutral-primary ${networkOpen ? "rotate-180" : ""}`} />
                </button>
                {networkOpen && (
                  <NetworkDropdown
                    selected={selectedNetwork}
                    onSelect={(id) => { setSelectedNetwork(id); setNetworkOpen(false); }}
                  />
                )}
              </div>

              {/* Fee */}
              <div className="flex items-center gap-1.5 h-9 px-2 border border-border-neutral-02 rounded-lg overflow-hidden">
                <img src={imgTokenFee} alt="" className="size-4 rounded-full" />
                <span className="text-sm font-medium text-text-neutral-primary">0.00</span>
                <span className="text-[10px] font-medium uppercase text-text-success bg-bg-success-muted px-2 py-1 rounded-full">
                  -0% Fee
                </span>
              </div>

              {/* Balance */}
              <div className="flex items-center gap-1.5 px-2 py-2 border border-border-neutral-02 rounded-lg">
                <img src={imgTokenBalance} alt="" className="size-4 rounded-full" />
                <span className="text-sm font-medium text-text-neutral-primary">18.32</span>
              </div>

              {/* Avatar with dropdown */}
              <div className="relative" ref={avatarRef}>
                <button
                  className="p-0.5 shrink-0 cursor-pointer"
                  onClick={() => setDropdownOpen((v) => !v)}
                >
                  <div className="size-8 rounded-full bg-bg-neutral-03 border-2 border-bg-neutral-01 overflow-hidden relative">
                    <img
                      src={imgAvatar1}
                      alt=""
                      className="absolute inset-0 size-full"
                      style={{ maskImage: `url('${imgAvatar1}')`, maskSize: "cover" }}
                    />
                    <img src={imgAvatar2} alt="" className="absolute inset-0 size-full" />
                  </div>
                </button>
                {dropdownOpen && (
                  <WalletDropdown
                    onDisconnect={() => { setConnected(false); setDropdownOpen(false); }}
                  />
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => setShowConnectModal(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-text-neutral-primary text-bg-neutral-01 hover:opacity-90 transition-opacity"
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </header>

    {showConnectModal && (
      <ConnectWalletModal
        onClose={() => setShowConnectModal(false)}
        onConnect={() => { setConnected(true); setShowConnectModal(false); }}
      />
    )}

    {showPointsMarketModal && (
      <PointsMarketModal onClose={() => setShowPointsMarketModal(false)} />
    )}
    </>
  );
}
