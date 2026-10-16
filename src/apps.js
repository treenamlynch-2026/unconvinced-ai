// App catalog. Only verified facts go here.
//   live:  true only when the app returns a result from the US App Store lookup.
//   page:  static GEO page in public/apps/<slug>/.
const IMG = "/images/apps";
export const APPS = [
  {
    slug: "snapshot-puzzle",
    name: "Snapshot Puzzle",
    platform: "iPhone + iPad",
    tag: "Game",
    live: true,
    summary: "Turns your own photos into jigsaw puzzles, 25 to 1,024 pieces. No ads, no account, no internet needed.",
    icon: `${IMG}/snapshot-puzzle-icon.webp`,
    shots: [1, 2, 3].map((n) => `${IMG}/snapshot-puzzle-${n}.webp`),
    page: "/apps/snapshot-puzzle/",
    store: "https://apps.apple.com/us/app/snapshot-puzzle-photo-jigsaw/id6815477258",
  },
  {
    slug: "the-cut-card",
    name: "The Cut Card",
    platform: "iPhone",
    tag: "Blackjack trainer",
    live: true,
    summary: "Blackjack trainer: full multi-deck shoes, real cut-card reshuffles, live basic-strategy guidance and a shoe tracker.",
    icon: `${IMG}/the-cut-card-icon.webp`,
    shots: [1, 2, 3].map((n) => `${IMG}/the-cut-card-${n}.webp`),
    page: "/apps/the-cut-card/",
    store: "https://apps.apple.com/us/app/the-cut-card/id6814679728",
  },
  {
    slug: "congress-trade-detective",
    name: "Congress Trade Detective",
    platform: "iPhone",
    tag: "STOCK Act data",
    live: false,
    summary: "Tracks the stock trades members of Congress disclose, and overlays the news of the time.",
    icon: null,
    shots: [],
    page: "/apps/congress-trade-detective/",
    store: null,
  },
  {
    slug: "calm-coloring-book",
    name: "Calm Coloring Book",
    platform: "iPhone",
    tag: "Creative",
    live: false,
    summary: "Tap-to-fill and a freehand brush. No timers, no scores, no streaks.",
    icon: null,
    shots: [],
    page: "/apps/calm-coloring-book/",
    store: null,
  },
];

export const PROJECTS = [
  {
    name: "The Room",
    tag: "Open source · coming to GitHub",
    summary: "A self-hosted, real-time chat where a human, Claude and ChatGPT work in one room. Free to download.",
  },
];

export const getApp = (slug) => APPS.find((a) => a.slug === slug);
