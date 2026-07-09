import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesCarousel from "@/components/landing/FeaturesCarousel";
import HowItWorks from "@/components/landing/HowItWorks";
import ExerciseCarousel from "@/components/landing/ExerciseCarousel";
import VideoDemo from "@/components/landing/VideoDemo";
import WhatsInside from "@/components/landing/WhatsInside";
import EliteCoachesTeaser from "@/components/landing/EliteCoachesTeaser";
import PricingSection from "@/components/landing/PricingSection";
import PersonalCoaching from "@/components/landing/PersonalCoaching";
import DownloadCTA from "@/components/landing/DownloadCTA";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <main className="bg-background text-foreground overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <FeaturesCarousel />
    <HowItWorks />
    <ExerciseCarousel />
    <VideoDemo />
    <WhatsInside />
    <EliteCoachesTeaser />
    <PricingSection />
    <PersonalCoaching />
    <DownloadCTA />
    <Footer />
  </main>
);

export default Index;
