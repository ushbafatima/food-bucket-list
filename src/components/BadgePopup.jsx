import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BadgePopup = ({ badge, type, onCollect }) => {
  return (
    <div 
      className={cn("fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "animate-fade-in")}
      style={{
        background: "rgba(255, 0, 153, 0.6)",
        backdropFilter: "blur(4px)"
      }}
    >
      <div
        className={cn("badge-popup", "p-8", "rounded-3xl", "text-center", "max-w-sm", "mx-4", "border-2")}
        style={{
          background: type === "sweet"
            ? "#fce7f3"
            : "#171717",
          borderColor: type === "sweet" ? "#f472b6" : "#f97316"
        }}
      >
        <div className={cn("mb-4", "sparkle", "flex", "justify-center")}>
          <img 
            src={badge.image} 
            alt={badge.name}
            className={cn("w-20", "h-20", "max-w-20", "max-h-20", "object-contain", "flex-shrink-0")}
            style={{ maxWidth: "80px", maxHeight: "80px", width: "80px", height: "80px" }}
          />
        </div>
        <h2
          className={cn("text-2xl", "font-bold", "mb-2")}
          style={{
            color: type === "sweet" ? "#831843" : "#fb923c"
          }}
        >
          Badge Unlocked!
        </h2>
        <p
          className={cn("text-xl", "font-semibold", "mb-2")}
          style={{
            color: type === "sweet" ? "#db2777" : "#facc15"
          }}
        >
          {badge.name}
        </p>
        <p 
          className={cn("text-sm", "mb-6")}
          style={{
            color: type === "sweet" ? "#ec4899" : "#d4d4d8"
          }}
        >
          {badge.description}
        </p>
        <Button
          onClick={onCollect}
          className={cn("px-8", "py-3", "text-lg", "font-semibold", "rounded-full", "transition-all")}
          style={{
            background: type === "sweet"
              ? "#ec4899"
              : "#f97316",
            color: "#ffffff"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.background = type === "sweet" ? "#db2777" : "#ea580c";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = type === "sweet" ? "#ec4899" : "#f97316";
          }}
        >
          Collect! ✨
        </Button>
      </div>
    </div>
  );
};
