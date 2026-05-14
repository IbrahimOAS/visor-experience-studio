import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import visorLogo from "@/assets/visor-logo.png";

// Preload the content-hashed logo URL so it benefits from immutable
// browser caching on any host, regardless of public/_headers support.
const preload = document.createElement("link");
preload.rel = "preload";
preload.as = "image";
preload.href = visorLogo;
preload.fetchPriority = "high";
document.head.appendChild(preload);

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
