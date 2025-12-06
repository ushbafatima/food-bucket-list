import { useState, useEffect } from "react";
import { ToggleSwitch } from "@/components/ToggleSwitch.jsx";
import { BucketSection } from "@/components/BucketSection.jsx";
import { BadgePopup } from "@/components/BadgePopup.jsx";
import { BadgeDisplay } from "@/components/BadgeDisplay.jsx";
import { GlobalMoodMeter } from "@/components/GlobalMoodMeter.jsx";
import { sweetBadges, spicyBadges } from "@/data/bucketListData.js";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isSpicy, setIsSpicy] = useState(false);
  const [sweetItems, setSweetItems] = useState([]);
  const [spicyItems, setSpicyItems] = useState([]);
  const [checkedSweet, setCheckedSweet] = useState(new Set());
  const [checkedSpicy, setCheckedSpicy] = useState(new Set());
  const [collectedBadges, setCollectedBadges] = useState(new Set());
  const [pendingBadge, setPendingBadge] = useState(null);

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
        <div className={cn("container", "mx-auto", "py-4", "px-4", "flex", "items-center", "justify-between", "gap-4")} style={{ maxWidth: "100%", flexDirection: "row" }}>
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

      <main className={cn("container", "mx-auto", "py-8", "px-4")} style={{ maxWidth: "100%", width: "100%", paddingTop: "100px" }}>
        <div className={cn("mb-8")} style={{ width: "100%" }}>
          <BadgeDisplay collectedBadges={collectedBadges} isSpicy={isSpicy} />
        </div>

        <div className={cn("mb-8")} style={{ width: "100%" }}>
          <GlobalMoodMeter sweetCount={checkedSweet.size} spicyCount={checkedSpicy.size} isSpicy={isSpicy} />
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
