import { cn } from "@/lib/utils";

export const ToggleSwitch = ({ isSpicy, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={cn("relative", "rounded-full", "p-1", "transition-all", "duration-500", "ease-in-out", "shadow-lg")}
      style={{
        width: "8rem",
        height: "3.5rem",
        background: isSpicy
          ? "linear-gradient(to right, #facc15, #f97316, #dc2626)"
          : "linear-gradient(to right, #f9a8d4, #f472b6, #a855f7)"
      }}
    >
      <div
        className={cn("absolute", "rounded-full", "shadow-md", "flex", "items-center", "justify-center", "transition-all", "duration-500", "ease-in-out")}
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
          className={cn("w-6", "h-6", "object-contain")}
          style={{ maxWidth: "24px", maxHeight: "24px", width: "24px", height: "24px" }}
        />
      </div>
      <span
        className={cn("absolute", "text-sm", "font-semibold", "transition-all", "duration-300", "flex", "items-center")}
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
  );
};
