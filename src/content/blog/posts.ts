/**
 * Blog content registry.
 *
 * Blog is safe to publish today — it's educational and does not depend on
 * the Elite Coaches marketplace being live. Add new posts here.
 */
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readMinutes: number;
  publishedAt: string; // ISO date
  /** Ordered content blocks — kept structured so the template renders them. */
  body: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "quote"; text: string }
  >;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-identity-beats-motivation",
    title: "Why Identity Beats Motivation",
    description:
      "Motivation fades within days. Identity change is what actually rewires long-term behavior. Here's why VISOR is built around who you're becoming, not how you feel today.",
    category: "Mindset",
    readMinutes: 6,
    publishedAt: "2026-07-09",
    body: [
      { type: "p", text: "Every fitness app promises to keep you motivated. Almost none of them work — because motivation is a feeling, and feelings are unreliable narrators. The people who transform their bodies and health over years aren't more motivated than you. They've quietly changed something deeper: their identity." },
      { type: "h2", text: "Motivation is a mood. Identity is a lens." },
      { type: "p", text: "Motivation asks, \"do I feel like training today?\" Identity asks, \"what would the person I'm becoming do right now?\" That single reframe is the difference between quitting in week three and still training in year ten." },
      { type: "h2", text: "How identity change actually happens" },
      { type: "ul", items: [
        "Cast a vote every day — small, consistent actions that match the identity you want.",
        "Name the identity explicitly (\"I'm a strong person,\" not \"I want to be strong\").",
        "Design your environment so the identity is the easy path.",
        "Track behavior, not outcomes — the outcomes follow.",
      ] },
      { type: "quote", text: "You do not rise to the level of your goals. You fall to the level of your systems — and your systems are shaped by your identity." },
      { type: "h2", text: "Why VISOR is built this way" },
      { type: "p", text: "VISOR's Soul Track system tracks the behaviors of the person you're becoming, not just workouts completed. Every check-in is a small vote. Over months, those votes compound into a new default self — and that's what makes the transformation stick." },
    ],
  },
  {
    slug: "ai-vs-human-coaching",
    title: "AI vs Human Coaching: What Each One Is Actually Good At",
    description:
      "AI coaches and human coaches aren't competitors — they solve different problems. Here's an honest breakdown of where each wins, and how VISOR combines both.",
    category: "AI Coaching",
    readMinutes: 7,
    publishedAt: "2026-07-09",
    body: [
      { type: "p", text: "The \"AI will replace personal trainers\" debate misses the point. A good AI coach and a good human coach are solving fundamentally different problems. The best transformations we've studied use both." },
      { type: "h2", text: "What AI coaching is genuinely good at" },
      { type: "ul", items: [
        "24/7 availability — 3am cravings, Sunday programming questions, mid-workout swaps.",
        "Perfect memory — every set, every meal, every mood, every plateau, forever.",
        "Zero judgment — you can log a rough week honestly without human awkwardness.",
        "Instant iteration — programs adapt after every session, not every four weeks.",
      ] },
      { type: "h2", text: "What human coaches are irreplaceable for" },
      { type: "ul", items: [
        "Live technique correction under load.",
        "The accountability of a person who actually knows you.",
        "Hands-on cueing, spotting, and safety in complex lifts.",
        "The felt sense of \"someone believes in me\" — no LLM replicates that.",
      ] },
      { type: "h2", text: "The VISOR position" },
      { type: "p", text: "VISOR's Visor AI Coach handles daily programming, adaptation, mood-aware check-ins and behavior tracking. When a member wants a real human — for form work, contest prep, or in-person accountability — VISOR Elite Coaches (launching soon) will connect verified trainers directly through the app." },
      { type: "quote", text: "AI makes the daily loop frictionless. Humans make the hard moments survivable. You need both." },
    ],
  },
  {
    slug: "science-of-consistency",
    title: "The Science Behind Consistency (And Why It's Not About Willpower)",
    description:
      "Consistent people don't have more willpower. They've engineered their environment, their identity, and their feedback loops. Here's the research — and how to apply it this week.",
    category: "Habit Building",
    readMinutes: 8,
    publishedAt: "2026-07-09",
    body: [
      { type: "p", text: "Ask ten \"consistent\" people how they do it and nine will shrug: \"I just do it.\" That answer is technically correct and completely useless. The real answer is that they've — often unconsciously — engineered three things: cues, identity, and feedback." },
      { type: "h2", text: "1. Cues do the heavy lifting" },
      { type: "p", text: "Research on habit formation (Wood, Neal, Lally) is consistent: durable habits are triggered by stable contextual cues — same time, same place, same preceding action. Willpower is required only when the cue is missing." },
      { type: "h2", text: "2. Identity does the interpretation" },
      { type: "p", text: "When a hard day hits, motivated people ask \"do I feel like it?\" Consistent people ask \"is this who I am?\" The second question has a much higher yes-rate." },
      { type: "h2", text: "3. Feedback closes the loop" },
      { type: "p", text: "Behavior that gets measured, celebrated, and reflected back improves. Behavior that disappears into a void decays. This is why streaks, weekly reviews, and coach check-ins outperform pure discipline." },
      { type: "h2", text: "This week" },
      { type: "ul", items: [
        "Pick one non-negotiable action and one fixed cue for it.",
        "Name the identity it serves out loud.",
        "Log it somewhere that reflects it back to you (VISOR's Soul Track is built for exactly this).",
      ] },
      { type: "quote", text: "Consistency isn't a personality trait. It's an environment you build once and live inside." },
    ],
  },
];

export const findPost = (slug: string) =>
  BLOG_POSTS.find((p) => p.slug === slug);
