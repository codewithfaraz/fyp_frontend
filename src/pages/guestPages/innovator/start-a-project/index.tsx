import { useState } from "react";
import { Link } from "react-router-dom";
import { Stepper, Modal } from "rizzui";
import { useNavigate } from "react-router-dom";
import HeadingPrimary from "../../../../components/layout/ui/heading-primary";
import UnderlineShape from "../../../../components/shape/underline";
import StartStep from "./start-step";
import Card from "../../../../components/layout/ui/card";
import FinishStep from "./finish-step";
import GetAToast from "../../../../components/shared/get-a-toast";
import toast from "react-hot-toast";
import ProblemStep from "./problem-step";
import { useSelector } from "react-redux";
import { useIdea } from "../../../../../hooks/use-idea";
export default function StartAProject() {
  const navigate = useNavigate();
  const [isErrorModal, setIsErrorModal] = useState(false);
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
      console.log(response);
      setIsSubmitting(false);
      if (response.status === 409) {
        setIsErrorModal(true);
        toast.error("Idea already exists");
      } else {
        navigate("/innovators");
      }
      console.log(response);
    }
    setCurrentStep((prev) => prev + 1);
  }
  return (
    <Card styles="">
      <GetAToast />
      <Modal isOpen={isErrorModal} onClose={() => setIsErrorModal(false)}>
        <div className="p-6">
          <h1>Idea Already Exists</h1>
          <Link to="/innovators">Go Back</Link>
        </div>
      </Modal>
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
