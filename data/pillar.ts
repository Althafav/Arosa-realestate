// data/pillars.ts
export interface Pillar {
  key: "dialogue" | "communities" | "marketplace";
  title: string;
  description: string;
}

export const PILLARS: Pillar[] = [
  {
    key: "dialogue",
    title: "Dialogue",
    description:
      "Panels and discussions focused on major trends shaping the investment landscape and global economy, key new economy sectors, and opportunities for investors.",
  },
  {
    key: "communities",
    title: "Communities",
    description:
      "Moderated and interactive roundtables for deeper engagement on selected themes or sectors, alongside a dedicated space for innovation, startups, and SMEs, and curated engagements for Investopia’s Communities.",
  },
  {
    key: "marketplace",
    title: "Marketplace",
    description:
      "A dedicated space for connecting investors with investment opportunities, facilitating MOU signings, and announcing deals and new partnerships.",
  },
];
