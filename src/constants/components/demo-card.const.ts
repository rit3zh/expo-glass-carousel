import type { TDemoCardData } from "@/components/ui/demo-card/interface";

const DEMO_CARDS: readonly TDemoCardData[] = [
  { title: "Orbit", caption: "Motion study", color: "#0090ff" },
  { title: "Bloom", caption: "Colour system", color: "#e54666" },
  { title: "Field", caption: "Type specimen", color: "#30a46c" },
  { title: "Ember", caption: "Brand refresh", color: "#f76b15" },
  { title: "Tide", caption: "Product launch", color: "#12a594" },
  { title: "Nova", caption: "Visual identity", color: "#6e56cf" },
  { title: "Dune", caption: "Editorial", color: "#ffc53d" },
  { title: "Slate", caption: "Design tokens", color: "#1c2024" },
];

const DEMO_CARD_TEXT: string = "#ffffff";

export { DEMO_CARD_TEXT, DEMO_CARDS };
