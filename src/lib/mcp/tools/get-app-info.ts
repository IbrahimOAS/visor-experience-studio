import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_app_info",
  title: "Get VISOR app info",
  description: "Returns overview information about the VISOR AI fitness app, including its purpose, key features, and subscription tiers.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            name: "VISOR",
            tagline: "AI Body Transformation App",
            description:
              "VISOR is an emotionally intelligent AI fitness platform combining adaptive coaching, AI body transformation visuals, and behavior-driven identity tracking (Soul Track).",
            keyFeatures: [
              "Emotionally Adaptive AI Coach",
              "AI Body Transformation (Months 1, 3, Olympia)",
              "Soul Track identity alignment system",
              "Personalized workout & nutrition planning",
            ],
            tiers: [
              { name: "Free — Awakening", priceUsdPerMonth: 0 },
              { name: "Core — Builder", priceUsdPerMonth: 12.99 },
              { name: "Pro — Performer", priceUsdPerMonth: 19.99 },
              { name: "Elite — Olympia Path", priceUsdPerMonth: 27.99 },
            ],
            personalCoaching: "Human Elite Coaches — coming soon, not yet available.",
            legalOperator: "Cedra Kaddour FZ-LLC, Ras Al Khaimah, United Arab Emirates",
            appStore: "https://apps.apple.com/us/app/visor-fitness/id6776579817",
            website: "https://visorfitness.com",

          },
          null,
          2,
        ),
      },
    ],
  }),
});
