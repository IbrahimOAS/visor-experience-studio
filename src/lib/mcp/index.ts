import { defineMcp } from "@lovable.dev/mcp-js";
import getAppInfoTool from "./tools/get-app-info";
import listFeaturesTool from "./tools/list-features";

export default defineMcp({
  name: "visor-mcp",
  title: "VISOR MCP",
  version: "0.1.0",
  instructions:
    "Tools for the VISOR AI fitness app. Use `get_app_info` for an overview and `list_features` to explore product capabilities.",
  tools: [getAppInfoTool, listFeaturesTool],
});
