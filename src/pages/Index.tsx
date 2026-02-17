import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import VideoDemo from "@/components/landing/VideoDemo";
import PricingSection from "@/components/landing/PricingSection";
import DownloadCTA from "@/components/landing/DownloadCTA";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <main className="bg-background text-foreground overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <HowItWorks />
    <VideoDemo />
    <PricingSection />
    <DownloadCTA />
    <Footer />
  </main>
);

export default Index;
