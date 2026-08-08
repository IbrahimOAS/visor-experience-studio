import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import CinematicStory from "@/components/landing/CinematicStory";
import FeaturesCarousel from "@/components/landing/FeaturesCarousel";
import HowItWorks from "@/components/landing/HowItWorks";
import ExerciseCarousel from "@/components/landing/ExerciseCarousel";
import VideoDemo from "@/components/landing/VideoDemo";
import WhatsInside from "@/components/landing/WhatsInside";
import EliteCoachesTeaser from "@/components/landing/EliteCoachesTeaser";
import PricingSection from "@/components/landing/PricingSection";
import PersonalCoaching from "@/components/landing/PersonalCoaching";
import DownloadCTA from "@/components/landing/DownloadCTA";
import JoinBanner from "@/components/landing/JoinBanner";
import Footer from "@/components/landing/Footer";
import StickyMobileCTA from "@/components/landing/StickyMobileCTA";

const Index = () => (
  <main className="bg-background text-foreground overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <CinematicStory />
    <FeaturesCarousel />
    <HowItWorks />
    <ExerciseCarousel />
    <VideoDemo />
    <WhatsInside />
    <EliteCoachesTeaser />
    <PricingSection />
    <PersonalCoaching />
    <DownloadCTA />
    <JoinBanner />
    <Footer />
    <StickyMobileCTA />
  </main>
);

export default Index;
