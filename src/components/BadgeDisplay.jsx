import { useState, useRef, useEffect } from "react";
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
  const badgeScrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  
  const allBadges = [...sweetBadges, ...spicyBadges];
  const unlockedBadges = allBadges.filter((badge) => collectedBadges.has(badge.id));
  
  const checkScrollButtons = () => {
    if (badgeScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = badgeScrollRef.current;
      const hasOverflow = scrollWidth > clientWidth;
      setShowLeftArrow(hasOverflow && scrollLeft > 5);
      setShowRightArrow(hasOverflow && scrollLeft < scrollWidth - clientWidth - 5);
    }
  };
  
  const scrollBadges = (direction) => {
    const element = badgeScrollRef.current;
    if (!element) {
      return;
    }
    
    const scrollAmount = 60; // Scroll by badge width + gap
    const currentScroll = element.scrollLeft;
    const maxScroll = element.scrollWidth - element.clientWidth;
    
    let newScroll;
    if (direction === 'left') {
      newScroll = Math.max(0, currentScroll - scrollAmount);
    } else {
      newScroll = Math.min(maxScroll, currentScroll + scrollAmount);
    }
    
    // Use scrollBy for relative scrolling - this is more reliable
    const scrollDelta = direction === 'left' ? -scrollAmount : scrollAmount;
    
    // Try scrollBy first (more reliable for smooth scrolling)
    if (element.scrollBy) {
      element.scrollBy({
        left: scrollDelta,
        behavior: 'smooth'
      });
    } else {
      // Fallback to direct assignment
      element.scrollLeft = newScroll;
    }
    
    // Also set it directly as a backup
    requestAnimationFrame(() => {
      const targetScroll = direction === 'left' 
        ? Math.max(0, currentScroll + scrollDelta)
        : Math.min(maxScroll, currentScroll + scrollDelta);
      element.scrollLeft = targetScroll;
      
      // Verify it worked
      setTimeout(() => {
        checkScrollButtons();
      }, 200);
    });
  };

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
  
  // Check scroll buttons on mount and when badges change
  useEffect(() => {
    const checkButtons = () => {
      if (badgeScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = badgeScrollRef.current;
        const hasOverflow = scrollWidth > clientWidth;
        setShowLeftArrow(hasOverflow && scrollLeft > 5);
        setShowRightArrow(hasOverflow && scrollLeft < scrollWidth - clientWidth - 5);
      }
    };
    
    // Initial check with multiple delays to ensure DOM is ready
    const timer1 = setTimeout(checkButtons, 100);
    const timer2 = setTimeout(checkButtons, 300);
    const timer3 = setTimeout(checkButtons, 500);
    
    // Add scroll event listener
    const scrollElement = badgeScrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkButtons);
      // Also check on resize
      window.addEventListener('resize', checkButtons);
    }
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkButtons);
        window.removeEventListener('resize', checkButtons);
      }
    };
  }, [unlockedBadges.length]);

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
      <div className={cn("flex", "items-center", "justify-between", "gap-3", "h-full")} style={{ width: "100%" }}>
        <div className={cn("flex", "items-center", "gap-3", "flex-1", "min-w-0")} style={{ minWidth: 0 }}>
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
            <div className={cn("relative", "flex", "items-center", "flex-1", "min-w-0")} style={{ position: "relative", minWidth: 0, maxWidth: "100%" }}>
              {showLeftArrow && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Left arrow clicked');
                    scrollBadges('left');
                  }}
                  className={cn("absolute", "left-0", "z-10", "rounded-full", "p-1", "transition-all", "flex-shrink-0")}
                  style={{
                    backgroundColor: isSpicy ? "rgba(249, 115, 22, 0.8)" : "rgba(249, 168, 212, 0.8)",
                    border: `1px solid ${isSpicy ? "rgba(249, 115, 22, 1)" : "rgba(249, 168, 212, 1)"}`,
                    color: "#ffffff",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    pointerEvents: "auto",
                    zIndex: 20
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.backgroundColor = isSpicy ? "rgba(249, 115, 22, 1)" : "rgba(249, 168, 212, 1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.backgroundColor = isSpicy ? "rgba(249, 115, 22, 0.8)" : "rgba(249, 168, 212, 0.8)";
                  }}
                >
                  <ChevronLeft style={{ width: "16px", height: "16px" }} />
                </button>
              )}
              <div 
                ref={badgeScrollRef}
                className={cn("flex", "gap-2", "overflow-x-auto", "scrollbar-hide")}
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                  flex: 1,
                  minWidth: 0,
                  width: "100%",
                  maxWidth: "100%",
                  paddingLeft: showLeftArrow ? "32px" : "0",
                  paddingRight: showRightArrow ? "32px" : "0",
                  overflowX: "auto",
                  overflowY: "hidden",
                  position: "relative"
                }}
                onScroll={checkScrollButtons}
              >
                <style>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                  @media (max-width: 768px) {
                    .badge-item-mobile img {
                      max-width: 36px !important;
                      max-height: 36px !important;
                      width: 36px !important;
                      height: 36px !important;
                    }
                    .badge-item-mobile {
                      padding: 0.5rem !important;
                    }
                  }
                `}</style>
                {unlockedBadges.map((badge) => {
                  return (
                    <div
                      key={badge.id}
                      className={cn("flex", "items-center", "justify-center", "p-2", "rounded-lg", "transition-all", "animate-scale-in", "flex-shrink-0", "badge-item-mobile")}
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
              {showRightArrow && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollBadges('right');
                  }}
                  className={cn("absolute", "right-0", "z-10", "rounded-full", "p-1", "transition-all", "flex-shrink-0")}
                  style={{
                    backgroundColor: isSpicy ? "rgba(249, 115, 22, 0.8)" : "rgba(249, 168, 212, 0.8)",
                    border: `1px solid ${isSpicy ? "rgba(249, 115, 22, 1)" : "rgba(249, 168, 212, 1)"}`,
                    color: "#ffffff",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    pointerEvents: "auto",
                    zIndex: 20
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.backgroundColor = isSpicy ? "rgba(249, 115, 22, 1)" : "rgba(249, 168, 212, 1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.backgroundColor = isSpicy ? "rgba(249, 115, 22, 0.8)" : "rgba(249, 168, 212, 0.8)";
                  }}
                >
                  <ChevronRight style={{ width: "16px", height: "16px" }} />
                </button>
              )}
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
        
        <div style={{ flexShrink: 0 }}>
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
    </div>
  );
};
