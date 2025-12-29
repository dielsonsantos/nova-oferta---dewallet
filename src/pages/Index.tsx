import { HeroSection } from "@/components/HeroSection";
import { ProductInfo } from "@/components/ProductInfo";
import { ResultsSection } from "@/components/ResultsSection";
import { HowItWorksRoulette } from "@/components/HowItWorksRoulette";
import { PromotionSectionRoulette } from "@/components/PromotionSectionRoulette";
import { UrgencySection } from "@/components/UrgencySection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductInfo />
      <ResultsSection />
      <HowItWorksRoulette />
      <PromotionSectionRoulette />
      <UrgencySection />
    </div>
  );
};

export default Index;
