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
import { Award, ChevronLeft, ChevronRight } from "lucide-react";

export const BadgeDisplay = ({ collectedBadges, isSpicy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);
  
  const allBadges = [...sweetBadges, ...spicyBadges];
  const unlockedBadges = allBadges.filter((badge) => collectedBadges.has(badge.id));

  const handlePrevious = () => {
    setCurrentBadgeIndex((prev) => (prev === 0 ? allBadges.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentBadgeIndex((prev) => (prev === allBadges.length - 1 ? 0 : prev + 1));
  };

  const handleDialogOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      setCurrentBadgeIndex(0);
    }
  };

  return (
    <div 
      className={cn("rounded-2xl", "p-4", "border", "transition-colors", "duration-500", "h-full", "flex", "flex-col")}
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
      <div className={cn("flex", "items-center", "justify-between", "gap-3", "h-full")}>
        <div className={cn("flex", "items-center", "gap-3", "flex-1", "min-w-0")}>
          <span 
            className={cn("text-lg", "font-semibold", "whitespace-nowrap", "flex-shrink-0")}
            style={{
              color: isSpicy ? "#fb923c" : "#db2777",
              fontFamily: "'Pixelify Sans', sans-serif"
            }}
          >
            Badges:
          </span>
          
          {unlockedBadges.length > 0 ? (
            <div className={cn("flex", "flex-wrap", "gap-2")}>
              {unlockedBadges.map((badge) => {
                return (
                  <div
                    key={badge.id}
                    className={cn("flex", "items-center", "justify-center", "p-2", "rounded-lg", "transition-all", "animate-scale-in", "flex-shrink-0")}
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
                      className={cn("w-12", "h-12", "max-w-12", "max-h-12", "object-contain", "flex-shrink-0")}
                      style={{ maxWidth: "48px", maxHeight: "48px", width: "48px", height: "48px" }}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <span 
              className={cn("text-xs")}
              style={{
                color: isSpicy ? "#737373" : "#f472b6"
              }}
            >
              No badges unlocked yet
            </span>
          )}
        </div>
        
        <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className={cn("transition-colors", "flex-shrink-0")}
              style={{
                borderColor: isSpicy 
                  ? "rgba(249, 115, 22, 0.5)"
                  : "rgba(249, 168, 212, 0.5)",
                color: isSpicy ? "#fb923c" : "#db2777",
                backgroundColor: "transparent"
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
            className={cn("max-w-md", "p-0", "overflow-visible")}
            style={{
              background: "transparent",
              border: "none"
            }}
          >
            <div className={cn("relative", "flex", "items-center", "justify-center", "w-full", "gap-2")}>
              {allBadges.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevious}
                  className={cn("z-20", "rounded-full", "backdrop-blur-sm", "border", "flex-shrink-0", "transition-all")}
                  style={{
                    color: "#ffffff",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    width: "2.5rem",
                    height: "2.5rem"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isSpicy ? "rgba(249, 115, 22, 0.6)" : "rgba(249, 168, 212, 0.6)";
                    e.currentTarget.style.borderColor = isSpicy ? "rgba(249, 115, 22, 0.8)" : "rgba(249, 168, 212, 0.8)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <ChevronLeft style={{ width: "1.5rem", height: "1.5rem" }} />
                </Button>
              )}
              
              <div
                key={currentBadgeIndex}
                className={cn("p-8", "rounded-3xl", "text-center", "flex-1", "border-2", "relative")}
                style={{
                  background: isSpicy ? "#171717" : "#fce7f3",
                  borderColor: isSpicy ? "#f97316" : "#f472b6",
                  animation: "badgeSlideIn 0.4s ease-in-out",
                  minWidth: 0
                }}
              >
                {(() => {
                  const badge = allBadges[currentBadgeIndex];
                  const isUnlocked = collectedBadges.has(badge.id);
                  
                  return (
                    <>
                      <div className={cn("mb-4", "flex", "justify-center")}>
                        <img 
                          src={badge.image} 
                          alt={badge.name}
                          className={cn("w-20", "h-20", "max-w-20", "max-h-20", "object-contain", "flex-shrink-0")}
                          style={{ 
                            maxWidth: "80px", 
                            maxHeight: "80px", 
                            width: "80px", 
                            height: "80px",
                            filter: isUnlocked ? "none" : "grayscale(100%)",
                            opacity: isUnlocked ? 1 : 0.5
                          }}
                        />
                      </div>
                      <h2
                        className={cn("text-2xl", "font-bold", "mb-2")}
                        style={{
                          color: isSpicy ? "#fb923c" : "#831843",
                          fontFamily: "'Pixelify Sans', sans-serif"
                        }}
                      >
                        {isUnlocked ? "Badge Unlocked!" : "Badge Locked"}
                      </h2>
                      <p
                        className={cn("text-xl", "font-semibold", "mb-2")}
                        style={{
                          color: isSpicy ? "#facc15" : "#db2777",
                          fontFamily: "'Pixelify Sans', sans-serif"
                        }}
                      >
                        {badge.name}
                      </p>
                      <p 
                        className={cn("text-sm", "mb-4")}
                        style={{
                          color: isSpicy ? "#d4d4d8" : "#ec4899"
                        }}
                      >
                        {badge.description}
                      </p>
                      <div 
                        className={cn("text-xs", "mb-2")}
                        style={{
                          color: isSpicy ? "#facc15" : "#ec4899"
                        }}
                      >
                        {badge.threshold} items needed
                      </div>
                      {allBadges.length > 1 && (
                        <div 
                          className={cn("text-xs", "mt-4")}
                          style={{
                            color: isSpicy ? "#737373" : "#9ca3af"
                          }}
                        >
                          {currentBadgeIndex + 1} / {allBadges.length}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              {allBadges.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className={cn("z-20", "rounded-full", "backdrop-blur-sm", "border", "flex-shrink-0", "transition-all")}
                  style={{
                    color: "#ffffff",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    width: "2.5rem",
                    height: "2.5rem"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isSpicy ? "rgba(249, 115, 22, 0.6)" : "rgba(249, 168, 212, 0.6)";
                    e.currentTarget.style.borderColor = isSpicy ? "rgba(249, 115, 22, 0.8)" : "rgba(249, 168, 212, 0.8)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <ChevronRight style={{ width: "1.5rem", height: "1.5rem" }} />
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
