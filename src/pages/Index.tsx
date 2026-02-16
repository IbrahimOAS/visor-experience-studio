import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesCarousel from "@/components/landing/FeaturesCarousel";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import PricingSection from "@/components/landing/PricingSection";
import DownloadCTA from "@/components/landing/DownloadCTA";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <main className="bg-background text-foreground overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <FeaturesCarousel />
    <HowItWorks />
    <Testimonials />
    <PricingSection />
    <DownloadCTA />
    <Footer />
  </main>
);

export default Index;
