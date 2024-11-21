import MainHeader from "./components/shared/Header/main-header";
import { useSelector } from "react-redux";
import Hero from "./components/shared/Header/hero";
export default function Home() {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <MainHeader />
      {!user && <Hero buttonTitle="Grab the opportunity" />}
    </>
  );
}
