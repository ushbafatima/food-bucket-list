import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

export const BucketListItem = ({ item, checked, onToggle, onDelete, type }) => {
  return (
    <label
      className={cn("flex", "items-center", "gap-3", "p-3", "rounded-lg", "cursor-pointer", "transition-all", "duration-300")}
      style={{
        transform: "scale(1)",
        boxShadow: checked 
          ? type === "sweet"
            ? "0 4px 6px -1px rgba(249, 168, 212, 0.3), 0 2px 4px -1px rgba(249, 168, 212, 0.2)"
            : "0 4px 6px -1px rgba(249, 115, 22, 0.1), 0 2px 4px -1px rgba(249, 115, 22, 0.05)"
          : "none",
        backgroundColor: checked
          ? type === "sweet"
            ? "rgba(252, 231, 243, 0.7)"
            : "rgba(249, 115, 22, 0.2)"
          : type === "sweet"
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(23, 23, 23, 0.5)",
        border: `1px solid ${checked
          ? type === "sweet"
            ? "rgba(249, 168, 212, 0.5)"
            : "rgba(249, 115, 22, 0.3)"
          : type === "sweet"
            ? "rgba(252, 231, 243, 0.5)"
            : "rgba(38, 38, 38, 0.5)"
        }`
      }}
      onMouseEnter={(e) => {
        if (!checked) {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        }
      }}
      onMouseLeave={(e) => {
        if (!checked) {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={() => onToggle(item.id)}
        className={cn("transition-colors")}
        style={{
          height: "1.25rem",
          width: "1.25rem",
          borderRadius: "0.375rem",
          borderColor: type === "sweet" ? "#f472b6" : "#525252",
        }}
      />
      {item.emoji && item.emoji.startsWith("/") ? (
        <img 
          src={item.emoji} 
          alt={item.name}
          className={cn("w-6", "h-6", "object-contain", "flex-shrink-0")}
          style={{ maxWidth: "24px", maxHeight: "24px", width: "24px", height: "24px" }}
        />
      ) : (
        <span className={cn("text-xl")}>{item.emoji}</span>
      )}
      <span
        className={cn("font-medium", "transition-all", "duration-300", "flex-1")}
        style={{
          textDecoration: checked ? "line-through" : "none",
          opacity: checked ? 0.7 : 1,
          color: type === "sweet" ? "#831843" : "#ffffff"
        }}
      >
        {item.name}
      </span>
      {!checked && onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(item.id);
          }}
          className={cn("ml-auto", "rounded-full", "transition-all", "flex-shrink-0", "flex", "items-center", "justify-center")}
          style={{
            width: "1.75rem",
            height: "1.75rem",
            color: type === "sweet" ? "#ffffff" : "#ffffff",
            backgroundColor: type === "sweet" ? "#ec4899" : "#fb923c",
            border: `2px solid ${type === "sweet" ? "#db2777" : "#f97316"}`,
            boxShadow: type === "sweet" 
              ? "0 2px 4px rgba(236, 72, 153, 0.3)" 
              : "0 2px 4px rgba(251, 146, 60, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = type === "sweet" ? "#db2777" : "#f97316";
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.boxShadow = type === "sweet" 
              ? "0 4px 8px rgba(236, 72, 153, 0.4)" 
              : "0 4px 8px rgba(251, 146, 60, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = type === "sweet" ? "#ec4899" : "#fb923c";
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = type === "sweet" 
              ? "0 2px 4px rgba(236, 72, 153, 0.3)" 
              : "0 2px 4px rgba(251, 146, 60, 0.3)";
          }}
        >
          <X style={{ width: "0.875rem", height: "0.875rem", strokeWidth: 3 }} />
        </button>
      )}
      {checked && (
        <span className={cn("ml-auto", "text-lg", "animate-bounce-in")}>
          {type === "sweet" ? "✨" : "🔥"}
        </span>
      )}
    </label>
  );
};
