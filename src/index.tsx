import Hero from "./components/shared/Header/hero";
import { useNavigate } from "react-router-dom";
import GuestPageSlider from "./components/guest/guest-page-slider";
import { StatsSection } from "./components/guest/stats";
import HowItWorksSection from "./components/guest/minds-behind-innovation";
import FaqAccordion from "./components/guest/FaqAccordion";
import IdeaProtectionSection from "./components/guest/IdeaProtectionSection";
import FeaturesSection from "./components/guest/FeaturesSection";
import CTASection from "./components/guest/CTASection";
import Footer from "./components/shared/footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import IdeasPreviewSection from "./components/guest/IdeasPreviewSection";
import {
  InnovatorSection,
  InvestorSection,
  ExpertSection,
} from "./components/guest/UserSections";

export default function Home() {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user?.user);
  useEffect(() => {
    if (!(Object.keys(user).length === 0)) {
      if (user.role) {
        console.log(user.role);
        if (user.role.includes("innovator")) {
          navigate("/innovators");
        } else if (user.role.includes("expert")) {
          navigate("/experts");
        } else {
          navigate("/investors");
        }
      }
    }
  }, [user]);

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
      <IdeasPreviewSection />
      <FeaturesSection />
      <GuestPageSlider />
      <CTASection />
      <Footer />
    </>
  );
}
