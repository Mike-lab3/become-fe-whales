import { LiveIcon, ArrowUpRightIcon, XIcon, DiscordIcon } from "../assets/icons";

const LINKS = ["Docs", "Dune", "Link3"];

export default function BottomStats() {
  return (
    <footer className="flex items-center justify-center gap-4 px-4 bg-bg-neutral-01">
      <div className="flex items-center flex-1 gap-4 h-11">
        {/* Live indicator */}
        <div className="flex items-center gap-1 shrink-0">
          <LiveIcon className="size-5" />
          <span className="text-xs font-medium text-text-primary">LIVE DATA</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-1 text-xs shrink-0">
          <span className="text-text-neutral-secondary">Total Vol</span>
          <span className="text-text-neutral-primary">$5,375,932.81</span>
        </div>
        <div className="flex items-center gap-1 text-xs shrink-0">
          <span className="text-text-neutral-secondary">Vol 24h</span>
          <span className="text-text-neutral-primary">$832,750.55</span>
        </div>
      </div>

      {/* Links & Social */}
      <div className="flex items-center gap-4 h-11 shrink-0">
        {/* Links */}
        <div className="flex items-center gap-4">
          {LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="flex items-center gap-0.5 text-xs text-text-neutral-secondary border-b border-border-neutral-02"
            >
              {link}
              <ArrowUpRightIcon className="size-4" />
            </a>
          ))}
        </div>

        {/* Social */}
        <div className="flex items-center gap-2">
          <button className="bg-bg-neutral-02 p-1.5 rounded-md">
            <XIcon className="size-5 text-text-neutral-primary" />
          </button>
          <button className="bg-bg-neutral-02 p-1.5 rounded-md">
            <DiscordIcon className="size-5 text-text-neutral-primary" />
          </button>
        </div>
      </div>
    </footer>
  );
}
