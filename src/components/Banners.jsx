import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "../assets/icons";

const imgBannerBg = "https://www.figma.com/api/mcp/asset/6f453baa-e3b3-49d4-aa91-29aff7e5b2c2";
const imgTokenIcon = "https://www.figma.com/api/mcp/asset/57906ce3-1866-47a4-a6a3-1f2de04b6f7f";
const imgEthereum = "https://www.figma.com/api/mcp/asset/bd9f8962-66ce-4755-a765-cb453cb3cf94";
const imgSubBannerBg = "https://www.figma.com/api/mcp/asset/4a0e6edc-7adf-425e-abbd-cd8681c6a1c5";

export default function Banners() {
  return (
    <div className="flex gap-4 px-4">
      {/* Main Banner */}
      <div className="flex-1 h-[400px] rounded-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-bg-neutral-01 rounded-xl overflow-hidden">
          <img
            src={imgBannerBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient mask */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#172504] from-0% via-[#172504] via-40% to-transparent to-80%" />
        </div>

        {/* Banner content */}
        <div className="absolute bottom-0 left-0 flex flex-col gap-6 max-w-[384px] p-8 justify-end h-full">
          <div className="flex flex-col gap-4 w-full">
            {/* Token icon */}
            <div className="relative p-0.5 shrink-0 w-fit">
              <img
                src={imgTokenIcon}
                alt=""
                className="size-11 rounded-full border border-overlay-light-10"
              />
              <img
                src={imgEthereum}
                alt=""
                className="absolute bottom-0 left-0 size-4 rounded-sm border-2 border-bg-neutral-01"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-medium leading-[44px] text-text-neutral-primary">
                SKATE Live in<br />Pre-market
              </h2>
              <p className="text-base leading-6 text-overlay-light-60">
                Connecting all VMs - Interact with applications from any VM while staying on your favorite chain.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="flex items-center gap-2 bg-bg-primary text-text-neutral-on-color font-medium text-base pl-5 pr-2.5 py-2.5 rounded-[10px] w-fit cursor-pointer transition-[filter] hover:brightness-110 active:brightness-75 disabled:opacity-40 disabled:cursor-not-allowed">
            Trade $STAKE
            <ArrowRightIcon className="size-6" />
          </button>
        </div>

        {/* Nav buttons */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          <button className="size-10 rounded-full bg-overlay-dark-60 flex items-center justify-center">
            <ChevronLeftIcon className="size-6 text-text-neutral-on-color" />
          </button>
          <button className="size-10 rounded-full bg-overlay-dark-60 flex items-center justify-center">
            <ChevronRightIcon className="size-6 text-text-neutral-on-color" />
          </button>
        </div>
      </div>

      {/* Sub Banner */}
      <div className="w-[400px] h-[400px] rounded-xl overflow-hidden relative bg-[#010d1d] shrink-0">
        <img
          src={imgSubBannerBg}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[528px] h-[400px] object-cover"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[528px] h-[400px] bg-gradient-to-b from-transparent to-[#032051] to-80% opacity-80" />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col gap-6 items-center px-8 w-[384px]">
          <p className="text-xl font-medium leading-7 text-text-neutral-primary text-center">
            Stake $WHALES for Rewards and Lower Trading Fees
          </p>
          <button className="flex items-center gap-2 bg-bg-warning text-text-neutral-on-color font-medium text-base pl-5 pr-2.5 py-2.5 rounded-[10px] cursor-pointer transition-[filter] hover:brightness-110 active:brightness-75 disabled:opacity-40 disabled:cursor-not-allowed">
            Stake Now
            <ArrowRightIcon className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
