import { useState } from "react";
import { Stepper } from "rizzui";
import HeadingPrimary from "../../../../components/layout/ui/heading-primary";
import UnderlineShape from "../../../../components/shape/underline";
import StartStep from "./start-step";
import Card from "../../../../components/layout/ui/card";
import FinishStep from "./finish-step";
import ProblemStep from "./problem-step";
export default function StartAProject() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  function submit(data: any) {
    const newData = { ...formData, ...data };
    console.log(newData);
    setFormData(newData);
    setCurrentStep((prev) => prev + 1);
  }
  return (
    <Card styles="">
      <HeadingPrimary styles="text-center">
        Start{" "}
        <span className="relative text-green-900">
          Innovating
          <UnderlineShape className="absolute -bottom-2 start-0 h-2.5  text-green-900 w-full" />
        </span>
      </HeadingPrimary>
      <Card styles="">
        <Stepper currentIndex={currentStep}>
          <Stepper.Step title="Step 1" description="Start" />
          <Stepper.Step title="Step 2" description="Contact Information" />
          <Stepper.Step title="Step 3" description="Finish" />
        </Stepper>
        {currentStep === 0 && <StartStep onSubmit={submit} />}
        {currentStep === 1 && <ProblemStep onSubmit={submit} />}
        {currentStep === 2 && <FinishStep onSubmit={submit} />}
      </Card>
    </Card>
  );
}
