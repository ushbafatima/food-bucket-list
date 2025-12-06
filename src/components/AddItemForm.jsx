import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const SWEET_LABELS = [
  { name: "bday-cake", path: "/resources/labels/sweet/bday-cake.png" },
  { name: "cake", path: "/resources/labels/sweet/cake.png" },
  { name: "candy", path: "/resources/labels/sweet/candy.png" },
  { name: "chocolate", path: "/resources/labels/sweet/chocolate.png" },
  { name: "cookie", path: "/resources/labels/sweet/cookie.png" },
  { name: "cupcake", path: "/resources/labels/sweet/cupcake.png" },
  { name: "donut", path: "/resources/labels/sweet/donut.png" },
  { name: "icecream", path: "/resources/labels/sweet/icecream.png" },
  { name: "lollipop", path: "/resources/labels/sweet/lollipop.png" },
  { name: "pie", path: "/resources/labels/sweet/pie.png" }
];

const SPICY_LABELS = [
  { name: "box", path: "/resources/labels/spicy/box.png" },
  { name: "burger", path: "/resources/labels/spicy/burger.png" },
  { name: "fire", path: "/resources/labels/spicy/fire.png" },
  { name: "hotdog", path: "/resources/labels/spicy/hotdog.png" },
  { name: "noodles", path: "/resources/labels/spicy/noodles.png" },
  { name: "pasta", path: "/resources/labels/spicy/pasta.png" },
  { name: "ramen", path: "/resources/labels/spicy/ramen.png" },
  { name: "soup", path: "/resources/labels/spicy/soup.png" },
  { name: "tacos", path: "/resources/labels/spicy/tacos.png" },
  { name: "wings", path: "/resources/labels/spicy/wings.png" }
];

export const AddItemForm = ({ onAdd, type }) => {
  const [name, setName] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(type === "sweet" ? SWEET_LABELS[0].path : SPICY_LABELS[0].path);
  const [isExpanded, setIsExpanded] = useState(false);

  const labels = type === "sweet" ? SWEET_LABELS : SPICY_LABELS;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), selectedLabel);
      setName("");
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        variant="outline"
        className={cn("w-full", "border-dashed", "transition-colors")}
        style={{
          borderColor: type === "sweet" ? "rgba(249, 168, 212, 0.5)" : "rgba(249, 115, 22, 0.5)",
          color: type === "sweet" ? "#db2777" : "#fb923c"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = type === "sweet" ? "#fce7f3" : "rgba(249, 115, 22, 0.2)";
          e.currentTarget.style.borderColor = type === "sweet" ? "#f472b6" : "#f97316";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = type === "sweet" ? "rgba(249, 168, 212, 0.5)" : "rgba(249, 115, 22, 0.5)";
        }}
      >
        <Plus style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }} />
        Add Food Item
      </Button>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn("p-4", "rounded-xl", "border", "transition-colors")}
      style={{
        background: type === "sweet"
          ? "rgba(252, 231, 243, 0.5)"
          : "rgba(38, 38, 38, 0.5)",
        borderColor: type === "sweet"
          ? "rgba(249, 168, 212, 0.5)"
          : "rgba(249, 115, 22, 0.3)"
      }}
    >
      <div className={cn("space-y-3")}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter food name..."
          className={cn("transition-colors")}
          style={{
            background: type === "sweet" ? "#ffffff" : "#171717",
            borderColor: type === "sweet" ? "#f9a8d4" : "rgba(249, 115, 22, 0.3)",
            color: type === "sweet" ? "inherit" : "#ffffff"
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = type === "sweet" ? "#ec4899" : "#f97316";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = type === "sweet" ? "#f9a8d4" : "rgba(249, 115, 22, 0.3)";
          }}
          autoFocus
        />
        
        <div>
          <p 
            className={cn("text-xs", "mb-2")}
            style={{
              color: type === "sweet" ? "#db2777" : "#fb923c"
            }}
          >
            Pick a label:
          </p>
          <div className={cn("flex", "flex-wrap", "gap-2")}>
            {labels.map((label) => (
              <button
                key={label.path}
                type="button"
                onClick={() => setSelectedLabel(label.path)}
                className={cn("p-2", "rounded-lg", "transition-all", "flex", "items-center", "justify-center")}
                style={{
                  background: selectedLabel === label.path
                    ? type === "sweet"
                      ? "#f9a8d4"
                      : "rgba(249, 115, 22, 0.4)"
                    : "transparent",
                  transform: selectedLabel === label.path ? "scale(1.1)" : "scale(1)",
                  border: selectedLabel === label.path 
                    ? `2px solid ${type === "sweet" ? "#ec4899" : "#f97316"}`
                    : "2px solid transparent"
                }}
                onMouseEnter={(e) => {
                  if (selectedLabel !== label.path) {
                    e.currentTarget.style.background = type === "sweet" ? "#fbcfe8" : "rgba(64, 64, 64, 0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedLabel !== label.path) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <img 
                  src={label.path} 
                  alt={label.name}
                  className={cn("w-8", "h-8", "object-contain")}
                  style={{ maxWidth: "32px", maxHeight: "32px", width: "32px", height: "32px" }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={cn("flex", "gap-2")}>
          <Button
            type="submit"
            disabled={!name.trim()}
            className={cn("flex-1", "flex", "items-center", "gap-2")}
            style={{
              background: type === "sweet" ? "#ec4899" : "#f97316",
              color: "#ffffff"
            }}
            onMouseEnter={(e) => {
              if (name.trim()) {
                e.currentTarget.style.background = type === "sweet" ? "#db2777" : "#ea580c";
              }
            }}
            onMouseLeave={(e) => {
              if (name.trim()) {
                e.currentTarget.style.background = type === "sweet" ? "#ec4899" : "#f97316";
              }
            }}
          >
            <img 
              src={selectedLabel} 
              alt="selected label"
              className={cn("w-5", "h-5", "object-contain")}
              style={{ maxWidth: "20px", maxHeight: "20px", width: "20px", height: "20px" }}
            />
            Add
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsExpanded(false)}
            style={{
              color: type === "sweet" ? "#db2777" : "#fb923c"
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};
