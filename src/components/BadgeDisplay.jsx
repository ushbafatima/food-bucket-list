import { useState } from "react";
import { sweetBadges, spicyBadges } from "@/data/bucketListData.js";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Award } from "lucide-react";

export const BadgeDisplay = ({ collectedBadges, isSpicy }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const allBadges = isSpicy ? spicyBadges : sweetBadges;
  const unlockedBadges = allBadges.filter((badge) => collectedBadges.has(badge.id));

  return (
    <div 
      className={cn("rounded-2xl", "p-4", "border", "transition-colors", "duration-500")}
      style={{
        width: "100%",
        background: isSpicy 
          ? "rgba(23, 23, 23, 0.8)"
          : "rgba(253, 242, 248, 0.8)",
        borderColor: isSpicy 
          ? "rgba(249, 115, 22, 0.3)"
          : "rgba(249, 168, 212, 0.5)"
      }}
    >
      <div className={cn("flex", "items-center", "justify-between", "mb-3")}>
        <h3 
          className={cn("text-lg", "font-semibold")}
          style={{
            color: isSpicy ? "#fb923c" : "#db2777"
          }}
        >
          {isSpicy ? "🔥 Spicy Badges" : "✨ Sweet Badges"}
        </h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className={cn("transition-colors")}
              style={{
                borderColor: isSpicy 
                  ? "rgba(249, 115, 22, 0.5)"
                  : "rgba(249, 168, 212, 0.5)",
                color: isSpicy ? "#fb923c" : "#db2777"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isSpicy 
                  ? "rgba(249, 115, 22, 0.2)"
                  : "#fce7f3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Award style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }} />
              View All
            </Button>
          </DialogTrigger>
          <DialogContent 
            className={cn("max-w-md")}
            style={{
              background: isSpicy 
                ? "#171717"
                : "#fdf2f8",
              borderColor: isSpicy 
                ? "rgba(249, 115, 22, 0.3)"
                : "rgba(249, 168, 212, 0.5)",
              color: isSpicy ? "#ffffff" : "inherit"
            }}
          >
            <DialogHeader>
              <DialogTitle 
                style={{
                  color: isSpicy ? "#fb923c" : "#db2777"
                }}
              >
                {isSpicy ? "🔥 All Spicy Badges" : "✨ All Sweet Badges"}
              </DialogTitle>
            </DialogHeader>
            <div className={cn("grid", "gap-3", "mt-4")}>
              {allBadges.map((badge) => {
                const isUnlocked = collectedBadges.has(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={cn("flex", "items-center", "gap-4", "p-4", "rounded-xl", "border", "transition-all")}
                    style={{
                      background: isUnlocked
                        ? isSpicy
                          ? "rgba(249, 115, 22, 0.2)"
                          : "rgba(252, 231, 243, 0.5)"
                        : "rgba(38, 38, 38, 0.5)",
                      borderColor: isUnlocked
                        ? isSpicy
                          ? "rgba(249, 115, 22, 0.4)"
                          : "rgba(249, 168, 212, 0.4)"
                        : "rgba(64, 64, 64, 0.5)",
                      filter: isUnlocked ? "none" : "grayscale(100%)",
                      opacity: isUnlocked ? 1 : 0.5
                    }}
                  >
                    <img 
                      src={badge.image} 
                      alt={badge.name}
                      className={cn("w-12", "h-12", "max-w-12", "max-h-12", "object-contain", "flex-shrink-0")}
                      style={{ maxWidth: "48px", maxHeight: "48px", width: "48px", height: "48px" }}
                    />
                    <div className={cn("flex-1")}>
                      <h4 
                        className={cn("font-bold")}
                        style={{
                          color: isUnlocked 
                            ? isSpicy ? "#fbbf24" : "#831843"
                            : "#737373"
                        }}
                      >
                        {badge.name}
                      </h4>
                      <p 
                        className={cn("text-sm")}
                        style={{
                          color: isUnlocked 
                            ? isSpicy ? "#d4d4d8" : "rgba(219, 39, 119, 0.8)"
                            : "#525252"
                        }}
                      >
                        {badge.description}
                      </p>
                      <span 
                        className={cn("text-xs", "mt-1", "inline-block")}
                        style={{
                          color: isUnlocked
                            ? isSpicy ? "#facc15" : "#ec4899"
                            : "#737373"
                        }}
                      >
                        {badge.threshold} items needed
                      </span>
                    </div>
                    {isUnlocked && (
                      <span className={cn("text-2xl")}>✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {unlockedBadges.length > 0 ? (
        <div className={cn("flex", "flex-wrap", "gap-3")}>
          {unlockedBadges.map((badge) => (
            <div
              key={badge.id}
              className={cn("flex", "items-center", "justify-center", "p-2", "rounded-xl", "transition-all", "animate-scale-in")}
              style={{
                background: isSpicy 
                  ? "rgba(249, 115, 22, 0.2)"
                  : "rgba(252, 231, 243, 0.6)",
                border: `1px solid ${isSpicy 
                  ? "rgba(249, 115, 22, 0.4)"
                  : "rgba(249, 168, 212, 0.4)"
                }`
              }}
            >
              <img 
                src={badge.image} 
                alt={badge.name}
                className={cn("w-10", "h-10", "max-w-10", "max-h-10", "object-contain", "flex-shrink-0")}
                style={{ maxWidth: "40px", maxHeight: "40px", width: "40px", height: "40px" }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p 
          className={cn("text-sm", "text-center", "py-2")}
          style={{
            color: isSpicy ? "#737373" : "#f472b6"
          }}
        >
          No badges unlocked yet. Start adding items!
        </p>
      )}
    </div>
  );
};
