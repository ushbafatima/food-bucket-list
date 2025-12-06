import { getMoodLevel } from "@/data/bucketListData.js";
import { BucketListItem } from "./BucketListItem.jsx";
import { ProgressBar } from "./ProgressBar.jsx";
import { MoodIndicator } from "./MoodIndicator.jsx";
import { AddItemForm } from "./AddItemForm.jsx";
import { cn } from "@/lib/utils";

export const BucketSection = ({
  title,
  subtitle,
  items,
  checkedItems,
  onToggle,
  onAddItem,
  type,
}) => {
  const checkedCount = Array.from(checkedItems).filter((id) =>
    items.some((item) => item.id === id)
  ).length;

  const mood = getMoodLevel(checkedCount, type);

  return (
    <div className={cn("space-y-6")} style={{ width: "100%" }}>
      <div className={cn("text-center")}>
        <h2
          className={cn("text-3xl", "font-bold", "mb-1")}
          style={{
            color: type === "sweet" ? "#db2777" : "#fb923c"
          }}
        >
          {title}
        </h2>
        <p 
          className={cn("text-sm")}
          style={{
            color: type === "sweet" ? "rgba(236, 72, 153, 0.7)" : "#a3a3a3"
          }}
        >
          {subtitle}
        </p>
      </div>

      {items.length > 0 && (
        <ProgressBar current={checkedCount} total={items.length} type={type} />
      )}

      <MoodIndicator label={mood.label} emoji={mood.emoji} type={type} />

      <AddItemForm onAdd={onAddItem} type={type} />

      {items.length > 0 ? (
        <div className={cn("grid", "grid-cols-1", "md:grid-cols-2", "gap-2")}>
          {items.map((item) => (
            <BucketListItem
              key={item.id}
              item={item}
              checked={checkedItems.has(item.id)}
              onToggle={onToggle}
              type={type}
            />
          ))}
        </div>
      ) : (
        <div 
          className={cn("text-center", "py-8", "rounded-xl", "border-2", "border-dashed")}
          style={{
            borderColor: type === "sweet" ? "rgba(249, 168, 212, 0.5)" : "rgba(249, 115, 22, 0.3)",
            color: type === "sweet" ? "#ec4899" : "#fb923c"
          }}
        >
          <p className={cn("text-lg", "mb-2")}>
            {type === "sweet" ? "🍰" : "🔥"}
          </p>
          <p>Your bucket list is empty!</p>
          <p className={cn("text-sm")} style={{ opacity: 0.7 }}>Add your first food item above</p>
        </div>
      )}
    </div>
  );
};
