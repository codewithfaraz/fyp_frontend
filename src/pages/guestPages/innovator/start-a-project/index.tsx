import { useState } from "react";
import { Stepper } from "rizzui";
import HeadingPrimary from "../../../../components/layout/ui/heading-primary";
import UnderlineShape from "../../../../components/shape/underline";
import StartStep from "./start-step";
import Card from "../../../../components/layout/ui/card";
import FinishStep from "./finish-step";
import ProblemStep from "./problem-step";
import { useSelector } from "react-redux";
import { useIdea } from "../../../../../hooks/use-idea";
export default function StartAProject() {
  const username = useSelector((state: any) => state.user?.user.username);
  const { addIdea } = useIdea();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function submit(data: any) {
    const newData = { ...formData, ...data };
    setFormData(newData);
    if (currentStep === 2) {
      console.log("now submit data");
      setIsSubmitting(true);
      const response = await addIdea({ ...newData, username });
      setIsSubmitting(false);
      console.log(response);
    }
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
        {currentStep === 2 && (
          <FinishStep onSubmit={submit} isSubmitting={isSubmitting} />
        )}
      </Card>
    </Card>
  );
}
