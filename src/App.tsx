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
import DeleteAccount from "./pages/DeleteAccount";
import TermsOfUse from "./pages/TermsOfUse";
import Support from "./pages/Support";
import EliteCoaches from "./pages/EliteCoaches";
import ForCoaches from "./pages/ForCoaches";
import CoachesIndex from "./pages/coaches/CoachesIndex";
import CoachProfile from "./pages/coaches/CoachProfile";
import CityPage from "./pages/cities/CityPage";
import SpecialtyPage from "./pages/specialties/SpecialtyPage";
import Trust from "./pages/Trust";
import Transformations from "./pages/Transformations";
import Compare from "./pages/Compare";
import Business from "./pages/Business";
import Careers from "./pages/Careers";
import Elite from "./pages/Elite";
import BlogIndex from "./pages/blog/BlogIndex";
import BlogPost from "./pages/blog/BlogPost";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import AccountLayout from "./pages/account/AccountLayout";
import Account from "./pages/account/Account";
import ProfilePage from "./pages/account/Profile";
import Billing from "./pages/account/Billing";
import CheckoutSuccess from "./pages/checkout/Success";
import CheckoutCancel from "./pages/checkout/Cancel";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminProtectedRoute } from "./components/auth/AdminProtectedRoute";
import { AffiliateProtectedRoute } from "./components/auth/AffiliateProtectedRoute";
import AdminHome from "./pages/admin/AdminHome";
import AdminAffiliates from "./pages/admin/AdminAffiliates";
import AdminAffiliateDetail from "./pages/admin/AdminAffiliateDetail";
import AffiliateApply from "./pages/affiliate/Apply";
import AffiliateDashboard from "./pages/affiliate/AffiliateDashboard";
import ReferralLanding from "./pages/affiliate/ReferralLanding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/why-visor" element={<WhyVisor />} />
          <Route path="/vs/myfitnesspal" element={<VsMyFitnessPal />} />
          <Route path="/vs/freeletics" element={<VsFreeletics />} />
          <Route path="/vs/noom" element={<VsNoom />} />
          <Route path="/concepts/emotionally-adaptive-coaching" element={<EmotionallyAdaptiveCoaching />} />
          <Route path="/concepts/ai-body-transformation" element={<AiBodyTransformation />} />
          <Route path="/concepts/behavior-driven-fitness" element={<BehaviorDrivenFitness />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/support" element={<Support />} />
          <Route path="/elite-coaches" element={<EliteCoaches />} />
          <Route path="/for-coaches" element={<ForCoaches />} />
          <Route path="/coaches" element={<CoachesIndex />} />
          <Route path="/coaches/:slug" element={<CoachProfile />} />
          <Route path="/cities/:city" element={<CityPage />} />
          <Route path="/specialties/:slug" element={<SpecialtyPage />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/transformations" element={<Transformations />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/business" element={<Business />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/elite" element={<Elite />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          <Route path="/account" element={<ProtectedRoute><AccountLayout /></ProtectedRoute>}>
            <Route index element={<Account />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="billing" element={<Billing />} />
          </Route>
          <Route path="/admin" element={<AdminProtectedRoute><AdminHome /></AdminProtectedRoute>} />
          <Route path="/admin/affiliates" element={<AdminProtectedRoute><AdminAffiliates /></AdminProtectedRoute>} />
          <Route path="/admin/affiliates/:id" element={<AdminProtectedRoute><AdminAffiliateDetail /></AdminProtectedRoute>} />

          <Route path="/affiliate/apply" element={<AffiliateApply />} />
          <Route path="/affiliate" element={<AffiliateProtectedRoute><AffiliateDashboard /></AffiliateProtectedRoute>} />
          <Route path="/r/:code" element={<ReferralLanding />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
