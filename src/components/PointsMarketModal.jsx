import { useEffect } from "react";
import bannerImg from "../assets/points-market-banner.png";

export default function PointsMarketModal({ onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative w-[576px] bg-bg-neutral-02 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top illustration banner ────────────────────────────────── */}
        <img
          src={bannerImg}
          alt="Point Market Comeback Soon"
          className="w-full block"
          style={{ height: "355px", objectFit: "cover" }}
        />

        {/* ── Close button ────────────────────────────────────────────── */}
        {/* Figma: x=526, y=14 → top-3.5 right-3.5, size 36×36, bg-neutral-02, rounded-lg */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 size-9 bg-bg-neutral-02 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Close"
        >
          {/* close_fill icon – inline SVG replaces expired Figma asset URL */}
          <svg
            className="size-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 5.5L14.5 14.5M14.5 5.5L5.5 14.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* ── Modal body ─────────────────────────────────────────────── */}
        {/* Figma: px-48, py-32, content px-32 gap-16 pb-16 */}
        <div className="px-12 py-8">
          {/* Text content */}
          <div className="text-center px-8 pb-4 flex flex-col gap-4">
            <p
              className="text-text-neutral-primary font-medium leading-9"
              style={{ fontSize: "28px" }}
            >
              Points Market returns soon!
            </p>
            <p className="text-base text-text-neutral-secondary leading-6">
              Points Market is evolving with a new version —
              <br />
              stay tuned, folks!
            </p>
          </div>

          {/* CTA button – Figma: bg #f9f9fa, pl-20 pr-10 py-10, rounded-[10px] */}
          <div className="flex justify-center mt-6">
            <button
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: "#f9f9fa",
                paddingLeft: "20px",
                paddingRight: "10px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "10px",
              }}
            >
              <span
                className="font-medium"
                style={{ fontSize: "16px", color: "#0a0a0b", lineHeight: "24px" }}
              >
                Follow us on
              </span>
              {/* X (Twitter) logo – inline SVG replaces expired Figma asset URL */}
              <span className="p-0.5 flex items-center justify-center size-6">
                <svg
                  viewBox="0 0 24 24"
                  fill="#0a0a0b"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[18px]"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
