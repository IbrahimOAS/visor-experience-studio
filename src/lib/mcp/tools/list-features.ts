import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_features",
  title: "List VISOR features",
  description: "Lists VISOR's main product features, optionally filtered by category (coaching, transformation, tracking, all).",
  inputSchema: {
    category: z
      .enum(["coaching", "transformation", "tracking", "all"])
      .default("all")
      .describe("Feature category filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const features: Record<string, string[]> = {
      coaching: [
        "Emotionally adaptive AI coach with multiple tones",
        "Personalized daily check-ins",
        "Context-aware motivation",
      ],
      transformation: [
        "AI body transformation visuals (Month 1, Month 3, Olympia)",
        "Progress photo timeline",
        "Realistic before/after simulation",
      ],
      tracking: [
        "Soul Track behavioral & identity alignment",
        "Workout & nutrition logging",
        "Streaks and consistency metrics",
      ],
    };
    const chosen =
      category === "all"
        ? Object.entries(features).flatMap(([k, v]) => v.map((f) => `[${k}] ${f}`))
        : features[category];
    return {
      content: [{ type: "text", text: chosen.join("\n") }],
      structuredContent: { category, features: chosen },
    };
  },
});
