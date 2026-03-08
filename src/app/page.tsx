import { Navbar } from "@/components/layout";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero";
import { MarqueeStrip } from "@/components/landing/marquee";
import { FeaturesSection } from "@/components/landing/features";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { CtaSection } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </>
  );
}
