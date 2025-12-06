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
        className={cn("absolute", "rounded-full", "shadow-md", "flex", "items-center", "justify-center", "text-2xl", "transition-all", "duration-500", "ease-in-out")}
        style={{
          top: "0.25rem",
          width: "3rem",
          height: "3rem",
          backgroundColor: "var(--card)",
          left: isSpicy ? "calc(100% - 3.25rem)" : "0.25rem"
        }}
      >
        {isSpicy ? "🔥" : "🍬"}
      </div>
      <span
        className={cn("absolute", "text-sm", "font-semibold", "transition-all", "duration-300")}
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--primary-foreground)",
          left: isSpicy ? "0.75rem" : "calc(100% - 3rem)"
        }}
      >
        {isSpicy ? "Sweet" : "Spicy"}
      </span>
    </button>
  );
};
