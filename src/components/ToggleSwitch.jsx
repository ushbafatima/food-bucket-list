import { cn } from "@/lib/utils";

export const ToggleSwitch = ({ isSpicy, onToggle }) => {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .toggle-button {
            width: 7rem !important;
            height: 3rem !important;
          }
          .toggle-circle {
            width: 2rem !important;
            height: 2rem !important;
            top: 0.5rem !important;
          }
          .toggle-circle-left {
            left: 0.5rem !important;
          }
          .toggle-circle-right {
            left: calc(100% - 2.5rem) !important;
          }
          .toggle-icon {
            max-width: 18px !important;
            max-height: 18px !important;
            width: 18px !important;
            height: 18px !important;
          }
          .toggle-text {
            font-size: 0.75rem !important;
          }
          .toggle-text-left {
            left: 0.25rem !important;
          }
          .toggle-text-right {
            left: calc(100% - 2.75rem) !important;
          }
        }
      `}</style>
      <button
        onClick={onToggle}
        className={cn("relative", "rounded-full", "p-1", "transition-all", "duration-500", "ease-in-out", "shadow-lg", "toggle-button")}
        style={{
          width: "8rem",
          height: "3.5rem",
          background: isSpicy
            ? "linear-gradient(to right, #facc15, #f97316, #dc2626)"
            : "linear-gradient(to right, #f9a8d4, #f472b6, #a855f7)"
        }}
      >
        <div
          className={cn("absolute", "rounded-full", "shadow-md", "flex", "items-center", "justify-center", "transition-all", "duration-500", "ease-in-out", "toggle-circle", isSpicy ? "toggle-circle-right" : "toggle-circle-left")}
          style={{
            top: "0.375rem",
            width: "2.5rem",
            height: "2.5rem",
            backgroundColor: "var(--card)",
            left: isSpicy ? "calc(100% - 2.875rem)" : "0.375rem"
          }}
        >
          <img 
            src={isSpicy ? "/resources/toggle_icons/spicy.png" : "/resources/toggle_icons/sweet.png"}
            alt={isSpicy ? "spicy" : "sweet"}
            className={cn("w-6", "h-6", "object-contain", "toggle-icon")}
            style={{ maxWidth: "24px", maxHeight: "24px", width: "24px", height: "24px" }}
          />
        </div>
        <span
          className={cn("absolute", "text-sm", "font-semibold", "transition-all", "duration-300", "flex", "items-center", "toggle-text", isSpicy ? "toggle-text-left" : "toggle-text-right")}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--primary-foreground)",
            left: isSpicy ? "0.5rem" : "calc(100% - 3.5rem)",
            fontFamily: "'Pixelify Sans', sans-serif",
            whiteSpace: "nowrap"
          }}
        >
          {isSpicy ? "Spicy" : "Sweet"}
        </span>
      </button>
    </>
  );
};
