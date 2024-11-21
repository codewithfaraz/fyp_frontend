import HeaderFrame from "../../../assets/Images/header-frame.png";
import UnderlineShape from "../../shape/underline";
import { Button } from "rizzui";
export default function Hero({ buttonTitle }) {
  return (
    <div className="max-w-4xl mx-auto  mt-12 flex flex-col justify-center items-center  space-y-24 md:mt-2 md:space-y-0 md:max-w-6xl">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-3xl md:text-6xl space-y-6 text-center md:text-left">
            <span className="block text-5xl">Where</span>
            <span className="block text-green-900 ml-3 text-5xl">Ideas</span>
            <span className="block text-5xl ml-6">
              Meet{" "}
              <span>
                Opportunities
                <UnderlineShape />
              </span>
            </span>
          </h1>
        </div>
        <div className="flex-1 hidden md:block">
          <img src={HeaderFrame} className="max-w-[700px]" />
        </div>
      </div>
      <Button className="" rounded="none" variant="outline" size="lg">
        {buttonTitle}
      </Button>
    </div>
  );
}
