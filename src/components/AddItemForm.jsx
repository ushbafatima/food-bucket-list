import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const SWEET_EMOJIS = ["🍰", "🍩", "🧁", "🍪", "🍫", "🍬", "🍭", "🍨", "🎂", "🥧"];
const SPICY_EMOJIS = ["🌶️", "🔥", "🍜", "🍛", "🥘", "🍗", "🌮", "🥡", "🍲", "🫕"];

export const AddItemForm = ({ onAdd, type }) => {
  const [name, setName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(type === "sweet" ? "🍰" : "🌶️");
  const [isExpanded, setIsExpanded] = useState(false);

  const emojis = type === "sweet" ? SWEET_EMOJIS : SPICY_EMOJIS;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), selectedEmoji);
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
            Pick an emoji:
          </p>
          <div className={cn("flex", "flex-wrap", "gap-2")}>
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedEmoji(emoji)}
                className={cn("text-2xl", "p-2", "rounded-lg", "transition-all")}
                style={{
                  background: selectedEmoji === emoji
                    ? type === "sweet"
                      ? "#f9a8d4"
                      : "rgba(249, 115, 22, 0.4)"
                    : "transparent",
                  transform: selectedEmoji === emoji ? "scale(1.1)" : "scale(1)"
                }}
                onMouseEnter={(e) => {
                  if (selectedEmoji !== emoji) {
                    e.currentTarget.style.background = type === "sweet" ? "#fbcfe8" : "rgba(64, 64, 64, 0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedEmoji !== emoji) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className={cn("flex", "gap-2")}>
          <Button
            type="submit"
            disabled={!name.trim()}
            className={cn("flex-1")}
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
            Add {selectedEmoji}
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
