// App catalog. Only verified facts go here; leave a field empty rather than guess.
//   page:  static GEO page in public/apps/<slug>/ (full page load).
//   store: App Store URL.
export const APPS = [
  {
    slug: "congress-trade-detective",
    name: "Congress Trade Detective",
    platform: "iOS",
    tag: "STOCK Act data",
    summary: "Tracks the stock trades members of Congress disclose, and overlays the news of the time.",
    page: "/apps/congress-trade-detective/",
    store: "https://apps.apple.com/app/id6817971302",
  },
  {
    slug: "snapshot-puzzle",
    name: "Snapshot Puzzle",
    platform: "iPhone + iPad",
    tag: "Game",
    summary: "Turns your own photos into jigsaw puzzles, 25 to 1,024 pieces. No ads, no account.",
    page: "/apps/snapshot-puzzle/",
    store: "https://apps.apple.com/app/id6815477258",
  },
  {
    slug: "calm-coloring-book",
    name: "Calm Coloring Book",
    platform: "iOS",
    tag: "Creative",
    summary: "Tap-to-fill and a freehand brush. No timers, no scores, no streaks.",
    page: "/apps/calm-coloring-book/",
    store: "https://apps.apple.com/app/id6817875470",
  },
  {
    slug: "the-cut-card",
    name: "The Cut Card",
    platform: "iOS",
    tag: "Trainer",
    summary: "Blackjack trainer: real multi-deck shoes, cut-card reshuffles, always-on basic strategy.",
    page: "/apps/the-cut-card/",
    store: "https://apps.apple.com/app/id6814679728",
  },
];

// Open-source / other projects.
export const PROJECTS = [
  {
    name: "The Room",
    tag: "Open source · coming to GitHub",
    summary: "A self-hosted, real-time chat where a human, Claude and ChatGPT work in one room. Free to download.",
  },
];

export const getApp = (slug) => APPS.find((a) => a.slug === slug);
