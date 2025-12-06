import { cn } from "@/lib/utils";

export const MoodIndicator = ({ label, emoji, type }) => {
  return (
    <div
      className={cn("text-center", "py-4", "px-6", "rounded-xl", "transition-all", "duration-300")}
      style={{
        background: type === "sweet"
          ? "rgba(252, 231, 243, 0.5)"
          : "rgba(38, 38, 38, 0.5)",
        border: `1px solid ${type === "sweet" ? "rgba(249, 168, 212, 0.5)" : "rgba(249, 115, 22, 0.3)"}`
      }}
    >
      <span className={cn("text-3xl", "mb-2", "block", "animate-float")}>{emoji}</span>
      <span
        className={cn("font-semibold", "text-lg")}
        style={{
          color: type === "sweet"
            ? "#be185d"
            : "#fb923c"
        }}
      >
        {label}
      </span>
    </div>
  );
};
