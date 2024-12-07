import Hero from "./components/shared/Header/hero";
import MindsBehindInnovation from "./components/guest/minds-behind-innovation";
import WhyChooseUs from "./components/guest/why-choose-us";
import GuestPageSlider from "./components/guest/guest-page-slider";
import MainHeader from "./components/shared/Header/main-header";
export default function Home() {
  return (
    <>
      <Hero buttonTitle="Grab the opportunity" />
      <MindsBehindInnovation />
      <WhyChooseUs />
      <GuestPageSlider />
    </>
  );
}
