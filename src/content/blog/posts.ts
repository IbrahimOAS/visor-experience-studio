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
  {
    slug: "6-pack-transformation-guide",
    title: "How to Get a 6-Pack: A Realistic Transformation Guide",
    description:
      "What it actually takes to reveal visible abs — body fat, training, nutrition and timelines — plus why seeing your future physique makes the process far easier to stick to.",
    category: "Training",
    readMinutes: 9,
    publishedAt: "2026-09-09",
    body: [
      { type: "p", text: "Almost everyone already has a six-pack. The rectus abdominis is there on every human body — it is simply covered by a layer of fat and, in many cases, underdeveloped. So the real question is not \"how do I build abs?\" but \"how do I lower body fat far enough to see them, without wrecking the rest of my life doing it?\"" },
      { type: "h2", text: "The body-fat reality" },
      { type: "p", text: "Visible abs are mostly a body-composition outcome. For most men, faint definition appears somewhere around the mid-teens in body-fat percentage and a clear six-pack usually shows in the region of 10-12%. For most women the equivalent range sits roughly ten points higher, because essential fat stores are higher. These are ranges, not promises — genetics decide where you store fat and how your abdominal wall is shaped." },
      { type: "ul", items: [
        "Your starting body fat determines your timeline more than any workout plan.",
        "A sustainable loss of roughly 0.5-1% of bodyweight per week protects muscle.",
        "Someone starting at 25% body fat is realistically looking at months, not weeks.",
        "Spot reduction is not a thing — you cannot choose where fat leaves first.",
      ] },
      { type: "h2", text: "Train the abs like any other muscle" },
      { type: "p", text: "Losing fat reveals the muscle; training gives it something worth revealing. Endless crunches are a poor use of time. Treat the core as a muscle group that responds to progressive overload and direct work two to three times per week." },
      { type: "ul", items: [
        "Weighted flexion work: cable crunches, decline sit-ups with a plate, machine crunches.",
        "Anti-extension work: hollow holds, ab wheel rollouts, dead bugs.",
        "Anti-rotation work: Pallof presses, suitcase carries.",
        "Heavy compound lifts — squats, deadlifts, presses — build the thickness that makes a lean midsection look muscular rather than merely thin.",
      ] },
      { type: "h2", text: "Nutrition does the uncovering" },
      { type: "p", text: "A moderate calorie deficit, enough protein to hold onto muscle, and a diet you can repeat for months beats any aggressive cut you abandon in week three. Roughly 1.6-2.2 g of protein per kilogram of bodyweight is the range most research settles on for people training while losing fat." },
      { type: "ul", items: [
        "Set a deficit you barely notice rather than one you have to survive.",
        "Anchor every meal around a protein source.",
        "Keep resistance training in — a deficit without lifting costs you muscle.",
        "Sleep and step count move fat loss more than any supplement will.",
      ] },
      { type: "h2", text: "Why most people quit before the abs arrive" },
      { type: "p", text: "The physiology is not the hard part. The hard part is that fat loss is slow, mirrors are unreliable, and progress between week four and week twelve is largely invisible day to day. People stop because they cannot see where the effort is going." },
      { type: "quote", text: "Nobody quits because the plan stopped working. They quit because they stopped believing it was working." },
      { type: "h2", text: "Seeing your future physique changes the psychology" },
      { type: "p", text: "This is the gap VISOR was built for. You upload a body photo and VISOR's AI generates a realistic preview of your own physique at month one, month three and beyond — your body, leaner, not a stranger from a stock photo. That preview gives the abstract target a face, and it turns a vague \"maybe someday\" into something concrete enough to train for." },
      { type: "p", text: "Alongside it, your Soul Track records the daily behaviours that actually get you there — training, nutrition and habits — so progress stays visible on the days the mirror refuses to cooperate." },
      { type: "h2", text: "A realistic plan you can start this week" },
      { type: "ul", items: [
        "Estimate your starting point honestly with a photo and a waist measurement.",
        "Lift three to four times a week, with direct core work twice.",
        "Eat in a small deficit with high protein, and keep it boring and repeatable.",
        "Walk daily — the easiest fat-loss lever most people ignore.",
        "Check progress every four weeks with photos, not daily with the scale.",
      ] },
      { type: "p", text: "Abs are a byproduct of consistency, not a separate project. Pick a plan slow enough to keep, make the destination visible, and let the months do the work." },
    ],
  },
];


export const findPost = (slug: string) =>
  BLOG_POSTS.find((p) => p.slug === slug);
