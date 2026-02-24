import { ChevronDownIcon } from "../assets/icons";

const imgLogo = "https://www.figma.com/api/mcp/asset/f9527f3f-5f48-441a-a583-9a55c4d49f05";
const imgSolana = "https://www.figma.com/api/mcp/asset/ed82f7b3-8f78-4de0-82a4-7255626ce095";
const imgTokenFee = "https://www.figma.com/api/mcp/asset/5657b379-4bf0-4cb2-b300-2457aa5c3777";
const imgTokenBalance = "https://www.figma.com/api/mcp/asset/3a85a46e-fc78-4d0d-95c7-11f2ae557a14";
const imgAvatar1 = "https://www.figma.com/api/mcp/asset/20e339d9-148b-4cd3-a7a8-0a6eebb25ab5";
const imgAvatar2 = "https://www.figma.com/api/mcp/asset/5e716390-9ec2-4bfe-abc9-638c241a1c29";

const NAV_ITEMS = [
  { label: "Pre-market", active: true },
  { label: "Points Market" },
  { label: "Dashboard" },
  { label: "Earn", hasDropdown: true },
  { label: "About", hasDropdown: true },
];

export default function Header() {
  return (
    <header className="flex items-center justify-center border-b border-border-neutral-01 py-3">
      <div className="flex items-center flex-1 max-w-[1440px] px-8">
        <div className="flex items-center flex-1 gap-2 px-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1.5 p-1.5 shrink-0">
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
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  item.active ? "text-text-primary" : "text-text-neutral-primary"
                }`}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDownIcon className="size-4 text-text-neutral-tertiary" />
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Chain selector */}
          <button className="flex items-center gap-1.5 p-2 border border-border-neutral-02 rounded-lg">
            <img src={imgSolana} alt="Solana" className="size-4 rounded-sm" />
            <ChevronDownIcon className="size-4 text-text-neutral-primary" />
          </button>

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

          {/* Avatar */}
          <div className="p-0.5 shrink-0">
            <div className="size-8 rounded-full bg-bg-neutral-03 border-2 border-bg-neutral-01 overflow-hidden relative">
              <img
                src={imgAvatar1}
                alt=""
                className="absolute inset-0 size-full"
                style={{
                  maskImage: `url('${imgAvatar1}')`,
                  maskSize: "cover",
                }}
              />
              <img src={imgAvatar2} alt="" className="absolute inset-0 size-full" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
