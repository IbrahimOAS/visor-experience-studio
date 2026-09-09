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
  {
    slug: "meal-prep-guide",
    title: "Meal Prep for Fitness: A Practical Weekly System",
    description:
      "A repeatable meal prep system built around protein, time and real life — how much to cook, what stores well, and how to stop prep from collapsing by Wednesday.",
    category: "Nutrition",
    readMinutes: 8,
    publishedAt: "2026-09-09",
    body: [
      { type: "p", text: "Most people fail at nutrition on Tuesday evening, not on Sunday morning. The plan is fine — the problem is that at 7pm, tired and hungry, the easiest food in the house wins. Meal prep is not about eating out of identical containers for seven days. It is about making the food that matches your goal the easiest thing to reach for." },
      { type: "h2", text: "Start with protein, not recipes" },
      { type: "p", text: "Protein is the one nutrient that meaningfully protects muscle while you lose fat, and it is also the hardest to hit by accident. Most research on people training while dieting lands somewhere around 1.6-2.2 g per kilogram of bodyweight per day. Work backwards: decide your daily protein target, divide it across your meals, then cook to that number." },
      { type: "ul", items: [
        "Pick two protein sources per week so shopping stays simple.",
        "Cook them in bulk: a tray of chicken thighs, a pot of lentils, a batch of hard-boiled eggs.",
        "Portion by weight the first few weeks — eyeballing comes later.",
        "Keep one no-cook protein on hand (Greek yoghurt, cottage cheese, tinned fish) for collapsed days.",
      ] },
      { type: "h2", text: "The two-hour Sunday template" },
      { type: "p", text: "You do not need to prepare every meal. Prepare components, then assemble in minutes." },
      { type: "ul", items: [
        "Roast two trays: one protein, one mixed vegetables.",
        "Cook one large batch of a carb that reheats well — rice, potatoes, pasta or oats.",
        "Wash and chop raw vegetables so salads take sixty seconds.",
        "Make one sauce or dressing — flavour is what keeps prep edible on day four.",
        "Bag two grab-and-go snacks per weekday.",
      ] },
      { type: "h2", text: "What actually keeps in the fridge" },
      { type: "p", text: "Cooked chicken, beef, rice, roasted root vegetables, lentils and hard cheeses hold up for three to four days. Fish, leafy salads and anything with a crisp texture do not. Cook fish fresh, freeze half your batch on day one, and accept that days five to seven come from the freezer." },
      { type: "h2", text: "Make it survive a bad week" },
      { type: "ul", items: [
        "Build a fallback meal you can make in five minutes with pantry items.",
        "Prep twice for four days rather than once for seven — the second half of the week is where quality drops.",
        "Do not cut calories and cut convenience in the same week.",
        "Log what you actually ate, not what you planned — the gap is the useful data.",
      ] },
      { type: "quote", text: "A perfect plan you abandon on Wednesday loses to a decent plan you repeat for six months." },
      { type: "h2", text: "How VISOR fits in" },
      { type: "p", text: "VISOR's AI coach works from what you actually log, so your targets adjust to the week you really had rather than the week you intended. Nutrition habits sit in Soul Track alongside training, which means a consistent prep routine counts as progress even during the stretches when the scale refuses to move." },
      { type: "p", text: "Related reading: our guides on building a workout routine and tracking progress cover the other two thirds of the equation." },
    ],
  },
  {
    slug: "workout-routine-guide",
    title: "How to Build a Workout Routine That You'll Actually Keep",
    description:
      "How many days to train, how to split them, how to progress, and how to build a routine around your real schedule instead of an ideal one.",
    category: "Training",
    readMinutes: 9,
    publishedAt: "2026-09-09",
    body: [
      { type: "p", text: "The best training programme is not the most sophisticated one. It is the one that fits the number of days you can genuinely train, in the time you genuinely have, at an intensity you can repeat next week. Everything else is optimisation on top of that." },
      { type: "h2", text: "Choose your days before your split" },
      { type: "p", text: "Decide honestly how many sessions per week survive a busy month — not a good month. Then pick the split that matches." },
      { type: "ul", items: [
        "Two days: two full-body sessions.",
        "Three days: full body, or push / pull / legs.",
        "Four days: upper / lower, twice.",
        "Five or more days: push / pull / legs plus accessory or conditioning days.",
      ] },
      { type: "h2", text: "Cover the movement patterns" },
      { type: "p", text: "Rather than collecting exercises, cover six patterns each week: squat, hinge, horizontal push, horizontal pull, vertical push, vertical pull — plus direct core work. A routine that covers all six is already better balanced than most gym-floor programmes." },
      { type: "h2", text: "Volume and intensity that hold up" },
      { type: "ul", items: [
        "Roughly 10-20 hard sets per muscle group per week suits most people.",
        "Take most working sets to within one to three reps of failure.",
        "Rep ranges of 5-12 build strength and size; the exact number matters less than the effort.",
        "Rest two to three minutes on heavy compounds — cutting rest just cuts performance.",
      ] },
      { type: "h2", text: "Progression is the whole point" },
      { type: "p", text: "A routine without progression is just exercise. Each week, aim to add a small amount: one more rep, a little more load, or one cleaner set. When progress stalls on a lift for two to three sessions, reduce the load by around ten percent and build back up." },
      { type: "quote", text: "Change the programme when it stops progressing, not when it stops feeling novel." },
      { type: "h2", text: "Recovery is part of the routine" },
      { type: "ul", items: [
        "Sleep is the single largest recovery variable — protect it before adding sessions.",
        "Leave at least one full rest day most weeks.",
        "Deload roughly every six to ten weeks, or whenever performance drops across several lifts.",
        "Walking on rest days aids recovery rather than hindering it.",
      ] },
      { type: "h2", text: "Where VISOR helps" },
      { type: "p", text: "VISOR's AI coach adapts your programme session by session based on what you logged, how the sets actually felt and how consistent your week has been — so a rough week reshapes the plan instead of breaking it. When VISOR Elite Coaches opens, verified human trainers will be available in-app for form work and hands-on programming." },
      { type: "p", text: "Pair this with our meal prep guide and progress tracking guide for the full picture." },
    ],
  },
  {
    slug: "tracking-progress-guide",
    title: "Tracking Fitness Progress: What to Measure and What to Ignore",
    description:
      "The scale lies weekly. Here's which metrics actually reflect progress, how often to check them, and how to read your data without panicking.",
    category: "Progress",
    readMinutes: 7,
    publishedAt: "2026-09-09",
    body: [
      { type: "p", text: "Bodyweight can swing two kilograms in a day from water, salt, carbohydrate intake and digestion. If a single morning reading decides how you feel about a month of work, the measurement is doing more harm than the training is doing good. Better tracking is not more tracking — it is fewer metrics, measured properly, read over longer windows." },
      { type: "h2", text: "Metrics worth keeping" },
      { type: "ul", items: [
        "Weekly average bodyweight, not daily readings.",
        "Waist measurement at the navel, once a week, same conditions.",
        "Progress photos every four weeks in the same light, pose and clothing.",
        "Strength log — load, reps and effort on your main lifts.",
        "Behaviour counts: sessions completed, protein targets hit, steps, sleep.",
      ] },
      { type: "h2", text: "Metrics that mislead" },
      { type: "p", text: "Consumer body-fat scales are noisy enough to be nearly useless week to week. Calories burned on a watch are estimates layered on estimates. Daily scale weight is real data, but at a resolution too fine to interpret. Use them for direction over months, never for judgement over days." },
      { type: "h2", text: "How to read the trend" },
      { type: "ul", items: [
        "Compare this week's average against the average three to four weeks ago.",
        "Expect flat or upward weeks inside a downward trend — that is normal.",
        "Only change the plan after two to three weeks of genuinely no movement.",
        "If the waist shrinks while weight holds, you are recomposing — keep going.",
      ] },
      { type: "quote", text: "Judge the plan on the month. Judge yourself on the behaviours." },
      { type: "h2", text: "Track behaviour, not just outcomes" },
      { type: "p", text: "Outcomes lag behind effort by weeks. Behaviours do not. Sessions completed, protein hit, sleep and steps are all under your control today, and they are the honest early indicator that a plan is working. When outcomes eventually move, they simply confirm what the behaviour log already showed." },
      { type: "h2", text: "How VISOR makes progress visible" },
      { type: "p", text: "VISOR's Soul Track records the daily behaviours behind your goal, so effort stays visible during the stretches when the mirror and the scale disagree. And VISOR's AI body transformation preview shows a realistic projection of your own physique at month one and month three, giving the slow middle of a transformation something concrete to aim at." },
      { type: "p", text: "Read alongside our meal prep guide and workout routine guide to set the inputs the tracking measures." },
    ],
  },
];


export const findPost = (slug: string) =>
  BLOG_POSTS.find((p) => p.slug === slug);
