export const sweetBadges = [
  { id: "sb1", name: "Sugar Baby", emoji: "🍬", threshold: 5, description: "Just entering your sweet era." },
  { id: "sb2", name: "Cupcake Cutie", emoji: "🧁", threshold: 10, description: "You're officially a treat enjoyer." },
  { id: "sb3", name: "Princess Bubblegum", emoji: "👑", threshold: 50, description: "Final boss of sugary things." },
];

export const spicyBadges = [
  { id: "spb1", name: "Mild Menace", emoji: "🌡️", threshold: 5, description: "Barely spicy, but chaotic." },
  { id: "spb2", name: "Chili Champ", emoji: "🏆", threshold: 10, description: "Heat level: manageable but impressive." },
  { id: "spb3", name: "Hot Girl Hot Sauce", emoji: "💅", threshold: 20, description: "Slaying the spice scene." },
];

export const getMoodLevel = (count, type) => {
  if (type === "sweet") {
    if (count <= 5) return { label: "Sugar Baby Energy", emoji: "🍼" };
    if (count <= 15) return { label: "Dessert Diva Era", emoji: "💅" };
    return { label: "Cotton Candy Royalty", emoji: "👑" };
  } else {
    if (count <= 5) return { label: "Mild Chaos Energy", emoji: "😏" };
    if (count <= 15) return { label: "Hot Mess Express", emoji: "🚂" };
    return { label: "Inferno Icon Mode", emoji: "🌋" };
  }
};

export const getGlobalMood = (sweetCount, spicyCount) => {
  if (sweetCount > spicyCount) {
    return { label: "Soft Girl Energy", emoji: "✨", color: "sweet" };
  }
  if (spicyCount > sweetCount) {
    return { label: "Fire Tongue Era", emoji: "🔥", color: "spicy" };
  }
  return { label: "Perfectly Balanced, Like a Snack Thanos", emoji: "🌶️🍰", color: "balanced" };
};
