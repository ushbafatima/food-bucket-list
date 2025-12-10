import { BucketListItem } from "./BucketListItem.jsx";
import { AddItemForm } from "./AddItemForm.jsx";
import { cn } from "@/lib/utils";

export const BucketSection = ({
  title,
  subtitle,
  items,
  checkedItems,
  onToggle,
  onAddItem,
  onDeleteItem,
  onStartGame,
  type,
}) => {
  const checkedCount = Array.from(checkedItems).filter((id) =>
    items.some((item) => item.id === id)
  ).length;

  return (
    <div className={cn("space-y-6")} style={{ width: "100%" }}>
      <div className={cn("flex", "items-center", "justify-between")}>
        <div className={cn("flex", "items-center", "gap-2")}>
        <style>{`
          @media (max-width: 768px) {
            .bucket-section-title {
              font-size: 1.125rem !important;
              line-height: 1.4 !important;
            }
          }
        `}</style>
        <h2
            className={cn("text-2xl", "font-bold", "bucket-section-title")}
          style={{
              color: type === "sweet" ? "#db2777" : "#fb923c",
              fontFamily: "'Pixelify Sans', sans-serif"
          }}
        >
            {title.replace(/[✨🔥]/g, "").trim()}: {subtitle}
        </h2>
        </div>
        <span
          className={cn("text-xl", "font-semibold")}
          style={{
            color: type === "sweet" ? "#db2777" : "#fb923c",
            fontFamily: "'Pixelify Sans', sans-serif"
          }}
        >
          {checkedCount}/{items.length}
        </span>
      </div>

      <AddItemForm onAdd={onAddItem} type={type} />

      {items.length > 0 ? (
        <div className={cn("grid", "grid-cols-1", "gap-2")}>
          {items.map((item) => (
            <BucketListItem
              key={item.id}
              item={item}
              checked={checkedItems.has(item.id)}
              onToggle={onToggle}
              onDelete={onDeleteItem}
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
          <img
            src={type === "sweet" ? "/resources/labels/sweet/sparkle.png" : "/resources/labels/spicy/fire.png"}
            alt={type === "sweet" ? "sparkle" : "fire"}
            className={cn("mb-2")}
            style={{ width: "32px", height: "32px", objectFit: "contain", margin: "0 auto", display: "block" }}
          />
          <p>Your bucket list is empty!</p>
          <p className={cn("text-sm")} style={{ opacity: 0.7 }}>Add your first food item above</p>
        </div>
      )}
    </div>
  );
};
