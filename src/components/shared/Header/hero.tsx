import { Button } from "rizzui";
import HeaderFrame from "../../../assets/Images/header-frame.png";
import UnderlineShape from "../../shape/underline";
import Card from "../../layout/ui/card";
import HeadingPrimary from "../../layout/ui/heading-primary";
export default function Hero({ buttonTitle }: { buttonTitle: string }) {
  return (
    <Card styles="flex flex-col justify-center items-center space-y-24 md:mt-2 md:space-y-0">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <HeadingPrimary styles="text-center">
            <span className="block text-5xl">Where</span>
            <span className="block text-green-900 ml-3 text-5xl">Ideas</span>
            <span className="block text-5xl ml-6">
              Meet{" "}
              <span className="inline-block">
                Opportunities
                <UnderlineShape />
              </span>
            </span>
          </HeadingPrimary>
        </div>
        <div className="flex-1 hidden md:block">
          <img src={HeaderFrame} className="max-w-[700px]" />
        </div>
      </div>
      <Button className="" rounded="none" variant="outline" size="lg">
        {buttonTitle}
      </Button>
    </Card>
  );
}
