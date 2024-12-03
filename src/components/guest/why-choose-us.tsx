import Card from "../layout/ui/card";
import HeadingPrimary from "../layout/ui/heading-primary";
import UnderlineShape from "../shape/underline";
import WhyChooseUsImage from "../../assets/Images/why-choose-us.png";
import HeadingSecondary from "../layout/ui/heading-secondary";
export default function WhyChooseUs() {
  return (
    <Card styles="mt-24">
      <HeadingPrimary styles="text-center">
        Why{" "}
        <span className="inline-block text-green-900">
          Choose
          <UnderlineShape />
        </span>{" "}
        Us
      </HeadingPrimary>
      <div className="flex space-y-4 mt-12 items-center space-x-6 px-4 md:px-0">
        <div className="flex-1 flex flex-col items-center">
          <HeadingSecondary styles="text-center">
            Secure Your Ideas With Confidence
          </HeadingSecondary>
          <p className="text-xl mt-6 text-center">
            Our platform{" "}
            <span className="text-green-900 font-bold">safeguards</span> your
            ideas with advanced security, intellectual property checks, and
            binding <span className="text-green-900 font-bold">agreements</span>
            , ensuring each submission remains original and protected from
            <span className="text-green-900 font-bold">unauthorized use</span>.
            Innovate confidently, knowing your concepts are safe and l
            <span className="text-green-900 font-bold">legally secure</span>.
          </p>
        </div>
        <div className="flex-1">
          <img src={WhyChooseUsImage} />
        </div>
      </div>
    </Card>
  );
}
