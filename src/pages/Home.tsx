import { HeroSectionChristmas } from "@/components/HeroSectionChristmas";
import { ProductInfo } from "@/components/ProductInfo";
import { ResultsSection } from "@/components/ResultsSection";
import { HowItWorksRoulette } from "@/components/HowItWorksRoulette";
import { PromotionSectionRoulette } from "@/components/PromotionSectionRoulette";
import { UrgencySection } from "@/components/UrgencySection";
import { MarqueeBanner } from "@/components/MarqueeBanner";
import { FixedTopBanner } from "@/components/FixedTopBanner";
import { ChristmasBackground } from "@/components/ChristmasBackground";

const Home = ({ lang = 'pt' }: { lang?: 'pt' | 'en' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-green-900 to-black relative overflow-hidden">
      <ChristmasBackground />
      <div className="relative z-20">
        <FixedTopBanner lang={lang} />
        <HeroSectionChristmas lang={lang} />
        <ProductInfo lang={lang} />
        <ResultsSection lang={lang} />
        <HowItWorksRoulette lang={lang} />
        <MarqueeBanner lang={lang} />
        <PromotionSectionRoulette lang={lang} />
        <MarqueeBanner lang={lang} />
        <UrgencySection lang={lang} />
      </div>
    </div>
  );
};

export default Home;
