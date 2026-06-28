import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VsMyFitnessPal from "./pages/compare/VsMyFitnessPal";
import VsFreeletics from "./pages/compare/VsFreeletics";
import VsNoom from "./pages/compare/VsNoom";
import WhyVisor from "./pages/compare/WhyVisor";
import EmotionallyAdaptiveCoaching from "./pages/concepts/EmotionallyAdaptiveCoaching";
import AiBodyTransformation from "./pages/concepts/AiBodyTransformation";
import BehaviorDrivenFitness from "./pages/concepts/BehaviorDrivenFitness";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/why-visor" element={<WhyVisor />} />
          <Route path="/vs/myfitnesspal" element={<VsMyFitnessPal />} />
          <Route path="/vs/freeletics" element={<VsFreeletics />} />
          <Route path="/vs/noom" element={<VsNoom />} />
          <Route path="/concepts/emotionally-adaptive-coaching" element={<EmotionallyAdaptiveCoaching />} />
          <Route path="/concepts/ai-body-transformation" element={<AiBodyTransformation />} />
          <Route path="/concepts/behavior-driven-fitness" element={<BehaviorDrivenFitness />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
