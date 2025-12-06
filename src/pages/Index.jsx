import { useState, useEffect, useRef } from "react";
import { ToggleSwitch } from "@/components/ToggleSwitch.jsx";
import { BucketSection } from "@/components/BucketSection.jsx";
import { BadgePopup } from "@/components/BadgePopup.jsx";
import { BadgeDisplay } from "@/components/BadgeDisplay.jsx";
import { GlobalMoodMeter } from "@/components/GlobalMoodMeter.jsx";
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
      // hide overlay after 5s (matches previous behavior)
      setTimeout(() => setShowSpicyOverlay(false), 5000);
    }

    prevIsSpicyRef.current = isSpicy;
  }, [isSpicy]);

  useEffect(() => {
    const sweetCount = checkedSweet.size;
    const spicyCount = checkedSpicy.size;

    for (const badge of sweetBadges) {
      if (sweetCount >= badge.threshold && !collectedBadges.has(badge.id)) {
        setPendingBadge({ badge, type: "sweet" });
        return;
      }
    }

    for (const badge of spicyBadges) {
      if (spicyCount >= badge.threshold && !collectedBadges.has(badge.id)) {
        setPendingBadge({ badge, type: "spicy" });
        return;
      }
    }
  }, [checkedSweet, checkedSpicy, collectedBadges]);

  const handleCollectBadge = () => {
    if (pendingBadge) {
      setCollectedBadges((prev) => new Set([...prev, pendingBadge.badge.id]));
      setPendingBadge(null);
    }
  };

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
        <div className={cn("container", "mx-auto", "py-4", "px-4", "flex", "items-center", "justify-between", "gap-4")} style={{ maxWidth: "1300px", flexDirection: "row" }}>
          <h1 
            className={cn("font-bold", "transition-all", "duration-500", "text-2xl", "text-3xl")}
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

      {/* Fire + Elmo overlay when switching to spicy mode */}
      {showSpicyOverlay && (
        <div
          className={cn("fixed", "bottom-0", "left-0", "right-0", "z-10", "pointer-events-none")}
          style={{
            width: "100%",
            height: "300px",
            // slide the fire up and then fade the whole overlay out after 5s
            animation: "fireSlideUp 3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, fireOverlayFadeOut 0.6s ease-in-out 5s forwards",
            willChange: "transform, opacity"
          }}
        >
          {/* Fire GIF */}
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
          >
            {/* Elmo inside overlay (align to overlay bottom) */}
            <img
              src="/resources/bg/spicy/elmo.png"
              alt="Elmo"
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                height: "220px",
                width: "auto",
                zIndex: 9999,
                animation: "elmoSlideUpBottom 3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                willChange: "bottom",
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
          style={{
            position: "fixed",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            height: "220px",
            width: "auto",
            zIndex: 9999,
            animation: "elmoSlideUpBottom 3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            willChange: "bottom",
            pointerEvents: "none"
          }}
        />
      )}

      <main className={cn("container", "mx-auto", "py-8", "px-4")} style={{ maxWidth: "1300px", width: "100%", paddingTop: "100px" }}>
        <div className={cn("mb-8", "flex", "items-stretch", "gap-4")} style={{ width: "100%" }}>
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
        </div>
      </main>

      {pendingBadge && (
        <BadgePopup
          badge={pendingBadge.badge}
          type={pendingBadge.type}
          onCollect={handleCollectBadge}
        />
      )}
    </div>
  );
};

export default Index;
