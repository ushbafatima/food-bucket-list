export const sweetBadges = [
  { id: "sb1", name: "Sugar Baby", image: "/resources/badges/sweet/sugar_baby.png", threshold: 5, description: "Just entering your sweet era." },
  { id: "sb2", name: "Cupcake Cutie", image: "/resources/badges/sweet/cupcake_cutie.png", threshold: 10, description: "You're officially a treat enjoyer." },
  { id: "sb3", name: "Princess Bubblegum", image: "/resources/badges/sweet/princess_bubblegum.png", threshold: 20, description: "Final boss of sugary things." },
];

export const spicyBadges = [
  { id: "spb1", name: "Mild Menace", image: "/resources/badges/spicy/mild-menace.png", threshold: 5, description: "Barely spicy, but chaotic." },
  { id: "spb2", name: "Chili Champ", image: "/resources/badges/spicy/chilli_champ.png", threshold: 10, description: "Heat level: manageable but impressive." },
  { id: "spb3", name: "Hot Girl Hot Sauce", image: "/resources/badges/spicy/hot_girl_hot_sauce.png", threshold: 20, description: "Slaying the spice scene." },
];

export const getMoodLevel = (count, type) => {
  if (type === "sweet") {
    if (count <= 5) return { label: "Sugar Baby Energy", image: "/resources/labels/sweet/candy.png" };
    if (count <= 15) return { label: "Dessert Diva Era", image: "/resources/labels/sweet/cupcake.png" };
    return { label: "Cotton Candy Royalty", image: "/resources/labels/sweet/bday-cake.png" };
  } else {
    if (count <= 5) return { label: "Mild Chaos Energy", image: "/resources/labels/spicy/chilli.png" };
    if (count <= 15) return { label: "Hot Mess Express", image: "/resources/labels/spicy/fire.png" };
    return { label: "Inferno Icon Mode", image: "/resources/labels/spicy/fire.png" };
  }
};

export const getGlobalMood = (sweetCount, spicyCount) => {
  if (sweetCount > spicyCount) {
    return { label: "Soft Girl Energy", image: "/resources/labels/sweet/sparkle.png", color: "sweet" };
  }
  if (spicyCount > sweetCount) {
    return { label: "Fire Tongue Era", image: "/resources/labels/spicy/fire.png", color: "spicy" };
  }
  return { label: "Perfectly Balanced, Like a Snack Thanos", image: "/resources/labels/sweet/cake.png", color: "balanced" };
};
