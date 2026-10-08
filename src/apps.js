// App catalog. Only verified facts go here; leave a field empty rather than guess.
//   play:   URL of a working browser build. The Play button renders only when set.
//   links:  [{ label, href }] for real, published destinations (e.g. App Store page).
//   caseStudy: slug in content/cases/; linked only once that file has draft: false.
export const APPS = [
  {
    slug: "congress-trade-detective",
    name: "Congress Trade Detective",
    platform: "iOS",
    status: "In App Store review",
    summary: "Tracks stock trades by members of Congress and overlays the news of the time.",
    about: [
      "An iOS app that tracks stock trades by members of Congress and overlays the news of the time.",
      "AI did much of the build. It is currently in App Store review.",
    ],
    play: null,
    links: [],
    caseStudy: "congress-trade-detective",
  },
];

export const getApp = (slug) => APPS.find((a) => a.slug === slug);
