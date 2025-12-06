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
  type,
}) => {
  const checkedCount = Array.from(checkedItems).filter((id) =>
    items.some((item) => item.id === id)
  ).length;

  return (
    <div className={cn("space-y-6")} style={{ width: "100%" }}>
      <div className={cn("flex", "items-center", "justify-between")}>
        <div className={cn("flex", "items-center", "gap-2")}>
          <h2
            className={cn("text-2xl", "font-bold")}
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
        <div className={cn("grid", "grid-cols-1", "md:grid-cols-2", "gap-2")}>
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
