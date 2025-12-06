import { cn } from "@/lib/utils";

export const ProgressBar = ({ current, total, type }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={cn("space-y-2")}>
      <div className={cn("flex", "justify-between", "text-sm")}>
        <span style={{ color: type === "sweet" ? "#be185d" : "#fb923c" }}>
          {current} / {total} completed
        </span>
        <span 
          className={cn("font-semibold")}
          style={{
            color: type === "sweet" ? "#db2777" : "#facc15"
          }}
        >
          {Math.round(percentage)}%
        </span>
      </div>
      <div 
        className={cn("h-3", "rounded-full", "overflow-hidden")}
        style={{
          backgroundColor: type === "sweet" ? "#fbcfe8" : "#262626"
        }}
      >
        <div
          className={type === "sweet" ? "progress-sweet" : "progress-spicy"}
          style={{ 
            height: "100%",
            borderRadius: "9999px",
            transition: "width 500ms ease-out",
            width: `${percentage}%` 
          }}
        />
      </div>
    </div>
  );
};
