import { getGlobalMood } from "@/data/bucketListData.js";
import { cn } from "@/lib/utils";

export const GlobalMoodMeter = ({ sweetCount, spicyCount, isSpicy }) => {
  const mood = getGlobalMood(sweetCount, spicyCount);
  const total = sweetCount + spicyCount;
  const sweetPercentage = total > 0 ? (sweetCount / total) * 100 : 0;
  const spicyPercentage = total > 0 ? (spicyCount / total) * 100 : 0;

  return (
    <div 
      className={cn("p-4", "rounded-2xl", "border", "transition-colors", "duration-500", "h-full", "flex", "flex-col")}
      style={{
        width: "100%",
        minHeight: "100%",
        background: isSpicy
          ? "rgba(23, 23, 23, 0.8)"
          : "rgba(252, 231, 243, 0.6)",
        borderColor: isSpicy
          ? "rgba(249, 115, 22, 0.3)"
          : "rgba(249, 168, 212, 0.5)",
        boxShadow: isSpicy
          ? "0 2px 4px -1px rgba(249, 115, 22, 0.2)"
          : "0 2px 4px -1px rgba(249, 168, 212, 0.2)"
      }}
    >
      <div className={cn("flex", "items-center", "justify-between", "mb-3", "gap-4")}>
        <h3 
          className={cn("text-lg", "font-semibold")}
          style={{
            color: isSpicy ? "#fb923c" : "#db2777"
          }}
        >
          Mood Meter:
        </h3>
        <span 
          className={cn("font-bold", "text-lg")}
          style={{
            color: isSpicy
              ? mood.color === "spicy" ? "#fb923c" : mood.color === "sweet" ? "#f472b6" : "#facc15"
              : mood.color === "sweet" ? "#db2777" : mood.color === "spicy" ? "#fb923c" : "#ec4899"
          }}
        >
          {mood.emoji} {mood.label}
        </span>
      </div>

      <div 
        className={cn("rounded-full", "overflow-hidden", "relative")}
        style={{
          height: "12px",
          backgroundColor: isSpicy ? "rgba(38, 38, 38, 0.8)" : "rgba(252, 231, 243, 0.8)",
          border: `1px solid ${isSpicy ? "rgba(249, 115, 22, 0.3)" : "rgba(249, 168, 212, 0.4)"}`
        }}
      >
        {total > 0 ? (
          <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <div
              className={cn("h-full", "transition-all", "duration-500")}
              style={{
                width: `${sweetPercentage}%`,
                background: isSpicy
                  ? "linear-gradient(to right, #f472b6, #ec4899)"
                  : "linear-gradient(to right, #f9a8d4, #ec4899, #db2777)"
              }}
            />
            <div
              className={cn("h-full", "transition-all", "duration-500")}
              style={{
                width: `${spicyPercentage}%`,
                background: isSpicy
                  ? "linear-gradient(to right, #fb923c, #f97316, #ef4444)"
                  : "linear-gradient(to right, #fb923c, #f97316)"
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
