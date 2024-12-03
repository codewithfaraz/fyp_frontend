import Hero from "./components/shared/Header/hero";
import MindsBehindInnovation from "./components/guest/minds-behind-innovation";
import WhyChooseUs from "./components/guest/why-choose-us";
import GuestPageSlider from "./components/guest/guest-page-slider";
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
