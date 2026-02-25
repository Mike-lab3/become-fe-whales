import { useState } from "react";
import imgNetworkSolana from "../assets/chains/solana.png";
import imgNetworkEthereum from "../assets/chains/ethereum.png";
import imgNetworkStarknet from "../assets/chains/starknet.png";
import imgNetworkTon from "../assets/chains/ton.png";
import imgNetworkSui from "../assets/chains/sui.png";
import imgNetworkAptos from "../assets/chains/aptos.png";

const NETWORKS = [
  { id: "evm",      label: "EVM",      icon: imgNetworkEthereum, networkName: "Ethereum Mainnet" },
  { id: "solana",   label: "Solana",   icon: imgNetworkSolana,   networkName: "Solana Mainnet"   },
  { id: "starknet", label: "Starknet", icon: imgNetworkStarknet, networkName: "Starknet Mainnet" },
  { id: "ton",      label: "Ton",      icon: imgNetworkTon,      networkName: "TON Mainnet"      },
  { id: "sui",      label: "Sui",      icon: imgNetworkSui,      networkName: "Sui Mainnet"      },
  { id: "aptos",    label: "Aptos",    icon: imgNetworkAptos,    networkName: "Aptos Mainnet"    },
];

const WALLETS_BY_NETWORK = {
  evm: [
    { id: "phantom",  name: "Phantom",  installed: false },
    { id: "rabby",    name: "Rabby",    installed: false },
    { id: "trust",    name: "Trust",    installed: true  },
    { id: "coinbase", name: "Coinbase", installed: true  },
    { id: "okx",      name: "OKX",      installed: true  },
  ],
  solana: [
    { id: "phantom",  name: "Phantom",  installed: true  },
    { id: "solflare", name: "Solflare", installed: true  },
    { id: "backpack", name: "Backpack", installed: false },
    { id: "okx",      name: "OKX",      installed: true  },
  ],
  starknet: [
    { id: "argent",  name: "Argent X", installed: false },
    { id: "braavos", name: "Braavos",  installed: false },
  ],
  ton: [
    { id: "tonkeeper", name: "Tonkeeper", installed: true  },
    { id: "tonhub",    name: "TON Hub",   installed: false },
  ],
  sui: [
    { id: "suiet", name: "Suiet", installed: false },
    { id: "okx",   name: "OKX",   installed: true  },
  ],
  aptos: [
    { id: "petra",   name: "Petra",   installed: false },
    { id: "martian", name: "Martian", installed: false },
  ],
};

const WALLET_COLORS = {
  Phantom:   "bg-[#4f46e5]",
  Rabby:     "bg-[#7c3aed]",
  Trust:     "bg-[#3b82f6]",
  Coinbase:  "bg-[#1652f0]",
  OKX:       "bg-[#111111]",
  Solflare:  "bg-[#f97316]",
  Backpack:  "bg-[#e11d48]",
  "Argent X":"bg-[#ff6b2b]",
  Braavos:   "bg-[#f59e0b]",
  Tonkeeper: "bg-[#2563eb]",
  "TON Hub": "bg-[#0ea5e9]",
  Suiet:     "bg-[#06b6d4]",
  Petra:     "bg-[#7c3aed]",
  Martian:   "bg-[#16a34a]",
};

function WalletIcon({ name, size = "size-9" }) {
  const bg = WALLET_COLORS[name] ?? "bg-bg-neutral-03";
  return (
    <div className={`${size} rounded-lg ${bg} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
      {name[0]}
    </div>
  );
}

function Spinner({ className = "size-5" }) {
  return (
    <svg
      className={`${className} animate-spin`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function WalletExtensionPopup({ wallet, onCancel, onConfirmConnect }) {
  const [isConnecting, setIsConnecting] = useState(false);

  function handleConnect() {
    setIsConnecting(true);
    setTimeout(() => {
      onConfirmConnect();
    }, 1500);
  }

  return (
    <div className="fixed top-[68px] right-4 z-[60] w-[360px] rounded-xl overflow-hidden shadow-[0px_8px_32px_0px_rgba(0,0,0,0.4)] border border-[#3a3a3f]">
      {/* macOS-style title bar */}
      <div className="bg-[#2a2a2e] flex items-center gap-2 px-4 py-3 border-b border-[#3a3a3f]">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57] block" />
          <span className="size-3 rounded-full bg-[#ffbd2e] block" />
          <span className="size-3 rounded-full bg-[#28c840] block" />
        </div>
        <span className="flex-1 text-center text-xs text-[#8a8a8f] font-medium truncate">
          Extension: ({wallet.name}) - {wallet.name} Wallet
        </span>
      </div>

      {/* Body */}
      <div className="bg-[#1c1c1e] flex flex-col">
        {/* Account info */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2a2a2e]">
          <div className="size-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {wallet.name[0]}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[#8a8a8f]">@user</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-[#f9f9fa] font-medium">0x8F3...2a4D</span>
              <button className="text-[#8a8a8f] hover:text-[#f9f9fa]">
                <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Connect info */}
        <div className="px-4 pt-6 pb-4 flex flex-col items-center gap-4">
          {/* Site + wallet */}
          <div className="flex items-center gap-3 w-full">
            <WalletIcon name={wallet.name} size="size-12" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-[#f9f9fa]">Connect</span>
              <span className="text-sm text-[#8a8a8f]">pro.whales.market</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#8a8a8f] leading-5 w-full">
            Confirming will allow this site to view balances and activity for the selected account.
          </p>

          {/* Account box */}
          <div className="w-full flex items-center justify-between border border-[#3a3a3f] rounded-lg px-4 py-3">
            <span className="text-sm text-[#f9f9fa]">Account</span>
            <span className="text-sm text-[#8a8a8f]">01</span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-[20px]" />

        {/* Footer */}
        <div className="px-4 pb-2 text-center">
          <span className="text-xs text-[#5a5a5f]">Only connect to websites you trust</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 px-4 pb-5 pt-2">
          <button
            onClick={onCancel}
            disabled={isConnecting}
            className="flex-1 h-11 rounded-xl bg-[#2a2a2e] text-[#f9f9fa] text-sm font-medium hover:bg-[#3a3a3f] transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="flex-1 h-11 rounded-xl bg-[#6366f1] text-white text-sm font-medium hover:bg-[#4f52d9] transition-colors disabled:opacity-80 flex items-center justify-center gap-2"
          >
            {isConnecting ? (
              <>
                <Spinner className="size-4 text-white" />
                <span>Connecting...</span>
              </>
            ) : (
              "Connect"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConnectWalletModal({ onClose, onConnect }) {
  const [selectedNetwork, setSelectedNetwork] = useState("evm");
  const [pendingWallet, setPendingWallet] = useState(null);

  const currentNetwork = NETWORKS.find((n) => n.id === selectedNetwork);
  const wallets = WALLETS_BY_NETWORK[selectedNetwork] ?? [];

  function handleWalletClick(wallet) {
    if (!wallet.installed) return;
    setPendingWallet(wallet);
  }

  function handleCancel() {
    setPendingWallet(null);
  }

  function handleConfirmConnect() {
    setPendingWallet(null);
    onConnect();
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        onClick={() => {
          if (pendingWallet) {
            setPendingWallet(null);
          } else {
            onClose();
          }
        }}
      >
        <div
          className="w-[672px] bg-bg-neutral-02 rounded-3xl shadow-[0px_0px_32px_0px_rgba(0,0,0,0.2)] p-6 flex flex-col gap-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {pendingWallet && (
            <div className="absolute inset-0 z-10 bg-black/60 rounded-3xl" />
          )}
          {/* Header */}
          <div className="flex items-center h-9 relative">
            <h2 className="flex-1 text-lg font-medium text-text-neutral-primary text-center leading-7">
              Connect Wallet
            </h2>
            <button
              onClick={onClose}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-bg-neutral-02 text-text-neutral-secondary hover:text-text-neutral-primary hover:bg-bg-neutral-03 transition-colors"
            >
              <svg className="size-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Network tabs */}
          <div className="flex items-center border border-border-neutral-02 rounded-[10px] p-1 gap-1">
            {NETWORKS.map((network) => (
              <button
                key={network.id}
                onClick={() => { setSelectedNetwork(network.id); setPendingWallet(null); }}
                className={`flex items-center gap-2 h-11 px-3 rounded-lg flex-1 justify-center transition-all ${
                  selectedNetwork === network.id
                    ? "bg-[#2e2e34]"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                {network.icon && (
                  <img src={network.icon} alt="" className="size-5 rounded-[4px] shrink-0 object-cover" />
                )}
                <span className="text-sm font-medium text-text-neutral-primary whitespace-nowrap">
                  {network.label}
                </span>
              </button>
            ))}
          </div>

          {/* Wallet section */}
          <div className="flex flex-col gap-4">
            {/* Title row */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-neutral-tertiary">Choose Wallet</span>
              {currentNetwork && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-success">
                    Selected to {currentNetwork.networkName}
                  </span>
                  {currentNetwork.icon && (
                    <img src={currentNetwork.icon} alt="" className="size-4 rounded-[4px] object-cover" />
                  )}
                </div>
              )}
            </div>

            {/* Wallet grid */}
            <div className="flex flex-wrap gap-4">
              {wallets.map((wallet) => {
                const isPending = pendingWallet?.id === wallet.id;
                return (
                  <div
                    key={wallet.id}
                    onClick={() => handleWalletClick(wallet)}
                    className={`w-[calc(50%-8px)] flex items-center gap-4 p-4 border rounded-xl transition-colors ${
                      isPending
                        ? "border-border-neutral-02 bg-bg-neutral-03"
                        : wallet.installed
                        ? "border-border-neutral-02 cursor-pointer hover:bg-bg-neutral-03"
                        : "border-border-neutral-02 cursor-default"
                    }`}
                  >
                    <WalletIcon name={wallet.name} />
                    <span className="flex-1 text-base font-medium text-text-neutral-primary">
                      {isPending ? "Connecting..." : wallet.name}
                    </span>
                    {isPending ? (
                      <Spinner className="size-5 text-text-success" />
                    ) : !wallet.installed ? (
                      <span className="px-3 py-1.5 rounded-md bg-bg-neutral-03 text-xs font-medium text-text-neutral-primary">
                        Install
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Extension Popup */}
      {pendingWallet && (
        <WalletExtensionPopup
          wallet={pendingWallet}
          onCancel={handleCancel}
          onConfirmConnect={handleConfirmConnect}
        />
      )}
    </>
  );
}
