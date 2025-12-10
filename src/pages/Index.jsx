import { useState, useEffect, useRef } from "react";
import { ToggleSwitch } from "@/components/ToggleSwitch.jsx";
import { BucketSection } from "@/components/BucketSection.jsx";
import { BadgePopup } from "@/components/BadgePopup.jsx";
import { BadgeDisplay } from "@/components/BadgeDisplay.jsx";
import { GlobalMoodMeter } from "@/components/GlobalMoodMeter.jsx";
import { WhackAChili } from "@/components/WhackAChili.jsx";
import { Button } from "@/components/ui/button";
import { sweetBadges, spicyBadges } from "@/data/bucketListData.js";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

const Index = () => {
  const [isSpicy, setIsSpicy] = useState(false);
  const [sweetItems, setSweetItems] = useState([]);
  const [spicyItems, setSpicyItems] = useState([]);
  const [checkedSweet, setCheckedSweet] = useState(new Set());
  const [checkedSpicy, setCheckedSpicy] = useState(new Set());
  const [collectedBadges, setCollectedBadges] = useState(new Set());
  const [pendingBadge, setPendingBadge] = useState(null);
  const prevIsSpicyRef = useRef(isSpicy);
  const [showSpicyOverlay, setShowSpicyOverlay] = useState(false);
  const [showWhackAChili, setShowWhackAChili] = useState(false);
  const [showGameElmo, setShowGameElmo] = useState(false);
  const fireSound = useRef(null);
  const successSound = useRef(null);

  const handleSweetToggle = (id) => {
    setCheckedSweet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSpicyToggle = (id) => {
    setCheckedSpicy((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  const stopfireSound = () => {
    if (fireSound.current) {
      fireSound.current.pause();
      fireSound.current.currentTime = 0;
    }
  };

  const fadeOutAudio = (audioElement, duration = 1000) => {
    if (!audioElement) return;
    
    const startVolume = audioElement.volume;
    const fadeOutInterval = 50;
    const steps = duration / fadeOutInterval;
    const volumeStep = startVolume / steps;
    
    const fadeInterval = setInterval(() => {
      if (audioElement.volume > 0) {
        audioElement.volume = Math.max(0, audioElement.volume - volumeStep);
      } else {
        clearInterval(fadeInterval);
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.volume = startVolume; // Reset volume for next play
      }
    }, fadeOutInterval);
  };


  const handleAddSweetItem = (name, emoji) => {
    const newItem = {
      id: `sweet-${Date.now()}`,
      name,
      emoji,
    };
    setSweetItems((prev) => [...prev, newItem]);
  };

  const handleAddSpicyItem = (name, emoji) => {
    const newItem = {
      id: `spicy-${Date.now()}`,
      name,
      emoji,
    };
    setSpicyItems((prev) => [...prev, newItem]);
  };

  const handleDeleteSweetItem = (id) => {
    setSweetItems((prev) => prev.filter((item) => item.id !== id));
    setCheckedSweet((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleDeleteSpicyItem = (id) => {
    setSpicyItems((prev) => prev.filter((item) => item.id !== id));
    setCheckedSpicy((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  useEffect(() => {
    // Trigger confetti when switching to sweet mode
    if (prevIsSpicyRef.current === true && isSpicy === false) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#f472b6', '#ec4899', '#db2777', '#f9a8d4', '#fbcfe8', '#fce7f3']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#f472b6', '#ec4899', '#db2777', '#f9a8d4', '#fbcfe8', '#fce7f3']
        });
      }, 250);
    }

    // Show spicy overlay (fire + elmo) when switching ON to spicy
    if (prevIsSpicyRef.current === false && isSpicy === true) {
      setShowSpicyOverlay(true);
       // 🔥 PLAY SOUND
      if (fireSound.current) {
        fireSound.current.currentTime = 0;
        fireSound.current.volume = 1;
        fireSound.current.play();
      }
      // Start fade out after 3 seconds (1 second fade out = 4 seconds total)
      setTimeout(() => {
        if (fireSound.current) {
          fadeOutAudio(fireSound.current, 1000);
        }
      }, 3000);
      setTimeout(() => {
        setShowSpicyOverlay(false);
        stopfireSound();
      }, 4500);
    }
    if (prevIsSpicyRef.current === true && isSpicy === false) {
      stopfireSound();
      setShowSpicyOverlay(false);  // force overlay to hide immediately
    }

    prevIsSpicyRef.current = isSpicy;
  }, [isSpicy]);

  useEffect(() => {
    const sweetCount = checkedSweet.size;
    const spicyCount = checkedSpicy.size;

    // Compute updated badge set (remove badges that no longer meet threshold)
    setCollectedBadges((prev) => {
      const newSet = new Set(prev);
      let changed = false;

      // Remove sweet badges if count is below threshold
      for (const badge of sweetBadges) {
        if (newSet.has(badge.id) && sweetCount < badge.threshold) {
          newSet.delete(badge.id);
          changed = true;
        }
      }

      // Remove spicy badges if count is below threshold
      for (const badge of spicyBadges) {
        if (newSet.has(badge.id) && spicyCount < badge.threshold) {
          newSet.delete(badge.id);
          changed = true;
        }
      }

      // Check if new badges should be awarded (using the updated set)
      for (const badge of sweetBadges) {
        if (sweetCount >= badge.threshold && !newSet.has(badge.id)) {
          setPendingBadge({ badge, type: "sweet" });
          return newSet; // Return updated set, badge will be added when collected
        }
      }

      for (const badge of spicyBadges) {
        if (spicyCount >= badge.threshold && !newSet.has(badge.id)) {
          setPendingBadge({ badge, type: "spicy" });
          return newSet; // Return updated set, badge will be added when collected
        }
      }

      return changed ? newSet : prev;
    });
  }, [checkedSweet, checkedSpicy]);

  const handleCollectBadge = () => {
    if (pendingBadge) {
      setCollectedBadges((prev) => new Set([...prev, pendingBadge.badge.id]));
      setPendingBadge(null);
    }
  };

  // Play success sound when badge popup appears
  useEffect(() => {
    if (pendingBadge && successSound.current) {
      successSound.current.volume = 0.5; // Lower volume
      successSound.current.currentTime = 0;
      successSound.current.play().catch((err) => {
        console.log("Could not play success sound:", err);
      });
    }
  }, [pendingBadge]);

  return (
    <div 
      className={cn("min-h-screen", "transition-all", "duration-500")}
      style={{
        background: isSpicy 
          ? "#000000"
          : "#fdf2f8",
        margin: 0,
        padding: 0,
        width: "100%",
        minHeight: "100vh",
        position: "relative"
      }}
    >
    <audio 
      ref={fireSound} 
      src="/resources/sounds/spicy.mp3" 
      preload="auto"
    />
    <audio 
      ref={successSound} 
      src="/resources/sounds/success.mp3" 
      preload="auto"
    />

      <style>{`
        @media (max-width: 768px) {
          .header-container {
            padding-top: 0.75rem !important;
            padding-bottom: 0.75rem !important;
          }
          .header-title {
            font-size: 1.25rem !important;
            line-height: 1.2 !important;
          }
          .header-wrapper {
            gap: 0.75rem !important;
          }
          .elmo-image {
            height: 200px !important;
          }
        }
      `}</style>
      <header 
        className={cn("fixed", "top-0", "left-0", "right-0", "z-40", "backdrop-blur-md", "border-b", "transition-colors", "duration-500")}
        style={{
          background: isSpicy 
            ? "rgba(0, 0, 0, 0.95)"
            : "rgba(253, 242, 248, 0.98)",
          borderColor: isSpicy 
            ? "rgba(249, 115, 22, 0.3)"
            : "rgba(249, 168, 212, 0.5)",
          width: "100%"
        }}
      >
        <div className={cn("container", "mx-auto", "py-4", "px-4", "flex", "items-center", "justify-between", "gap-4", "header-container", "header-wrapper")} style={{ maxWidth: "1300px", flexDirection: "row" }}>
          <h1 
            className={cn("font-bold", "transition-all", "duration-500", "text-2xl", "text-3xl", "header-title")}
            style={{
              color: isSpicy ? "#fb923c" : "#db2777",
              textShadow: isSpicy 
                ? "0 0 10px rgba(251, 146, 60, 0.5), 2px 2px 4px rgba(0, 0, 0, 0.3)"
                : "0 0 10px rgba(219, 39, 119, 0.3), 2px 2px 4px rgba(0, 0, 0, 0.1)",
              fontSize: "1.875rem",
              fontWeight: "700"
            }}
          >
            Sweet vs Spicy Bucket List
          </h1>
          <ToggleSwitch isSpicy={isSpicy} onToggle={() => setIsSpicy(!isSpicy)} />
        </div>
      </header>

      {/* Fire GIF - always visible when in spicy mode */}
      {isSpicy && (
        <div
          className={cn("fixed", "bottom-0", "left-0", "right-0", "z-10", "pointer-events-none")}
          style={{
            width: "100%",
            height: "300px",
            willChange: "transform, opacity"
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundImage: "url('/resources/bg/spicy/fire.gif')",
              backgroundSize: "cover",
              backgroundPosition: "bottom center",
              animation: "fireFlicker 0.6s ease-in-out infinite"
            }}
          />
        </div>
      )}

      {/* Elmo overlay when switching to spicy mode */}
      {showSpicyOverlay && (
        <div
          className={cn("fixed", "bottom-0", "left-0", "right-0", "pointer-events-none")}
          style={{
            width: "100%",
            height: "300px",
            zIndex: 99998
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%"
            }}
          >
            {/* Elmo inside overlay (align to overlay bottom) */}
            <img
              src="/resources/bg/spicy/elmo.png"
              alt="Elmo"
              className="elmo-image"
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                height: "350px",
                width: "auto",
                zIndex: 99999,
                animation: "elmoSlideUpAndDown 4.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                willChange: "bottom, opacity",
                pointerEvents: "none"
              }}
            />
          </div>
        </div>
      )}

      {/* Elmo-only animation when a spicy badge is unlocked (do not show while overlay active) */}
      {pendingBadge && pendingBadge.type === "spicy" && !showSpicyOverlay && (
        <img
          src="/resources/bg/spicy/elmo.png"
          alt="Elmo"
          className="elmo-image"
          style={{
            position: "fixed",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            height: "350px",
            width: "auto",
            zIndex: 99999,
            animation: "elmoSlideUpAndDown 4.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            willChange: "bottom, opacity",
            pointerEvents: "none"
          }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .badge-mood-container {
            flex-direction: column !important;
          }
          .badge-mood-container > div {
            flex: none !important;
            width: 100% !important;
          }
          .main-content {
            padding-top: 80px !important;
          }
        }
      `}</style>
      <main className={cn("container", "mx-auto", "py-8", "px-4", "main-content")} style={{ maxWidth: "1300px", width: "100%", paddingTop: "100px" }}>
        <div className={cn("mb-8", "flex", "items-stretch", "gap-4", "badge-mood-container")} style={{ width: "100%" }}>
          <div className={cn("flex-1", "flex")}>
            <BadgeDisplay collectedBadges={collectedBadges} isSpicy={isSpicy} />
          </div>
          <div className={cn("flex-1", "flex")}>
            <GlobalMoodMeter sweetCount={checkedSweet.size} spicyCount={checkedSpicy.size} isSpicy={isSpicy} />
          </div>
        </div>

        <div className={cn("relative", "overflow-hidden")} style={{ width: "100%" }}>
          <div
            className={cn("transition-all", "duration-500", "ease-in-out")}
            style={{
              opacity: isSpicy ? 0 : 1,
              transform: isSpicy ? "translateY(-100%)" : "translateY(0)",
              position: isSpicy ? "absolute" : "relative",
              inset: isSpicy ? 0 : "auto",
              pointerEvents: isSpicy ? "none" : "auto"
            }}
          >
            <div 
              className={cn("rounded-2xl", "p-6", "border", "transition-colors", "duration-500")}
              style={{
                width: "100%",
                background: "rgba(252, 231, 243, 0.6)",
                borderColor: "rgba(249, 168, 212, 0.5)"
              }}
            >
              <BucketSection
                title="✨ Sweet List"
                subtitle="For the dessert-core girlies & boys"
                items={sweetItems}
                checkedItems={checkedSweet}
                onToggle={handleSweetToggle}
                onAddItem={handleAddSweetItem}
                onDeleteItem={handleDeleteSweetItem}
                type="sweet"
              />
            </div>
          </div>

          <div
            className={cn("transition-all", "duration-500", "ease-in-out")}
            style={{
              opacity: isSpicy ? 1 : 0,
              transform: isSpicy ? "translateY(0)" : "translateY(100%)",
              position: isSpicy ? "relative" : "absolute",
              inset: isSpicy ? "auto" : 0,
              pointerEvents: isSpicy ? "auto" : "none"
            }}
          >
            <div 
              className={cn("rounded-2xl", "p-6", "border", "transition-colors", "duration-500")}
              style={{
                width: "100%",
                background: "rgba(23, 23, 23, 0.8)",
                borderColor: "rgba(249, 115, 22, 0.3)"
              }}
            >
              <BucketSection
                title="🔥 Spicy List"
                subtitle="For the heat demons"
                items={spicyItems}
                checkedItems={checkedSpicy}
                onToggle={handleSpicyToggle}
                onAddItem={handleAddSpicyItem}
                onDeleteItem={handleDeleteSpicyItem}
                type="spicy"
              />
            </div>
          </div>
          
          {/* Game button - fixed at bottom of page, only visible in spicy mode */}
          {isSpicy && (
            <div 
              className={cn("fixed", "bottom-0", "left-0", "right-0", "flex", "justify-center", "p-4", "z-30")}
              style={{
                background: "linear-gradient(to top, rgba(23, 23, 23, 0.95) 0%, rgba(23, 23, 23, 0.8) 50%, transparent 100%)",
                pointerEvents: "none"
              }}
            >
              <Button
                onClick={() => setShowWhackAChili(true)}
                className={cn("px-6", "py-3", "text-lg", "font-semibold", "rounded-full", "transition-all")}
                style={{
                  background: "#f97316",
                  color: "#ffffff",
                  fontFamily: "'Pixelify Sans', sans-serif",
                  pointerEvents: "auto",
                  boxShadow: "0 4px 12px rgba(249, 115, 22, 0.4)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ea580c";
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(249, 115, 22, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f97316";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(249, 115, 22, 0.4)";
                }}
              >
                WHACK A CHILLI GAME
              </Button>
            </div>
          )}
        </div>
      </main>

      {pendingBadge && (
        <BadgePopup
          badge={pendingBadge.badge}
          type={pendingBadge.type}
          onCollect={handleCollectBadge}
        />
      )}

      <WhackAChili
        isOpen={showWhackAChili}
        onClose={() => setShowWhackAChili(false)}
        onGameEnd={(score) => {
          if (score >= 10) {
            setShowGameElmo(true);
            setTimeout(() => {
              setShowGameElmo(false);
            }, 4500);
          }
        }}
      />

      {/* Elmo overlay for game high score */}
      {showGameElmo && (
        <div
          className={cn("fixed", "bottom-0", "left-0", "right-0", "pointer-events-none")}
          style={{
            width: "100%",
            height: "300px",
            zIndex: 99998
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%"
            }}
          >
            <img
              src="/resources/bg/spicy/elmo.png"
              alt="Elmo"
              className="elmo-image"
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                height: "350px",
                width: "auto",
                zIndex: 99999,
                animation: "elmoSlideUpAndDown 4.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                willChange: "bottom, opacity",
                pointerEvents: "none"
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
