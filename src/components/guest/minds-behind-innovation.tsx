import Card from "../layout/ui/card";
import UnderlineShape from "../shape/underline";
import HeadingPrimary from "../layout/ui/heading-primary";
export default function MindsBehindInnovation() {
  return (
    <Card styles="mt-24">
      <div className="flex flex-col items-center">
        <HeadingPrimary>
          Meet the Minds Behind{" "}
          <span className="inline-block text-green-900">
            Innovation
            <UnderlineShape />
          </span>
        </HeadingPrimary>
        <div className="flex flex-col mt-12 space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <div className="border border-green-900 p-6 text-center space-y-12">
            <h1 className="text-green-900 text-3xl md:text-5xl">Innovator</h1>
            <p className="w-48">
              Creative thinkers bringing transformative ideas to this platform.
            </p>
          </div>
          <div className="border border-green-900 p-6 text-center space-y-12">
            <h1 className="text-green-900 text-3xl md:text-5xl">Investor</h1>
            <p className="w-48">
              Visionaries funding ground breaking ideas with high growth
              potential.
            </p>
          </div>
          <div className="border border-green-900 p-6 text-center space-y-12">
            <h1 className="text-green-900 text-3xl md:text-5xl">Expert</h1>
            <p className="w-48">
              Professionals offering the technical skills to develop and refine
              projects.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
