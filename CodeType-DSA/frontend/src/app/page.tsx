import Navigation from "@/components/Shared/Navigation";
import CustomCursor from "@/components/Shared/CustomCursor";
import ScrollProgress from "@/components/Shared/ScrollProgress";
import HeroSection from "@/components/Hero/HeroSection";
import FeaturesContainer from "@/components/Features/FeaturesContainer";
import Timeline from "@/components/HowItWorks/Timeline";
import DemoWindow from "@/components/InteractiveDemo/DemoWindow";
import AnalyticsContainer from "@/components/Analytics/AnalyticsContainer";
import TestimonialsMarquee from "@/components/Testimonials/TestimonialsMarquee";
import CTASection from "@/components/CTA/CTASection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-primary">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />

      <HeroSection />
      <FeaturesContainer />
      <Timeline />
      <DemoWindow />
      <AnalyticsContainer />
      <TestimonialsMarquee />
      <CTASection />
      <Footer />
    </main>
  );
}
