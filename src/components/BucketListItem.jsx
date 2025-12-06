import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

export const BucketListItem = ({ item, checked, onToggle, type }) => {
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
      <span className={cn("text-xl")}>{item.emoji}</span>
      <span
        className={cn("font-medium", "transition-all", "duration-300")}
        style={{
          textDecoration: checked ? "line-through" : "none",
          opacity: checked ? 0.7 : 1,
          color: type === "sweet" ? "#831843" : "#ffffff"
        }}
      >
        {item.name}
      </span>
      {checked && (
        <span className={cn("ml-auto", "text-lg", "animate-bounce-in")}>
          {type === "sweet" ? "✨" : "🔥"}
        </span>
      )}
    </label>
  );
};
