import Hero from "./components/shared/Header/hero";
import GuestPageSlider from "./components/guest/guest-page-slider";
import { StatsSection } from "./components/guest/stats";
import HowItWorksSection from "./components/guest/minds-behind-innovation";
import FaqAccordion from "./components/guest/FaqAccordion";
import IdeaProtectionSection from "./components/guest/IdeaProtectionSection";
import FeaturesSection from "./components/guest/FeaturesSection";
import CTASection from "./components/guest/CTASection";
import Footer from "./components/shared/footer";
import {
  InnovatorSection,
  InvestorSection,
  ExpertSection,
} from "./components/guest/UserSections";
export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <HowItWorksSection />
      <InnovatorSection />
      <InvestorSection />
      <ExpertSection />
      <FaqAccordion />
      <IdeaProtectionSection />
      <FeaturesSection />
      <GuestPageSlider />
      <CTASection />
      <Footer />
    </>
  );
}
