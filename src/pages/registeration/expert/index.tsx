"use client";
import toast, { Toaster } from "react-hot-toast";
import { Stepper } from "rizzui";
import {
  UserProfile,
  ContactInformation,
} from "../../../../validators/zod-schemas";
import GetAToast from "../../../components/shared/get-a-toast";
import { expertFinishPageData } from "../../../../types/types";
import { useState } from "react";
import { useExpert } from "../../../../hooks/expert-hook";
import ContactInformationPage from "../../../components/shared/userProfile/contact-information";
import UserProfle from "../../../components/shared/userProfile/user-profile";
import ExpertFinishPage from "./expert-finish-page";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
let userProfiling = {};
export default function ExpertRegisteration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();
  const { addExpertHandler } = useExpert();
  const user = useSelector((state: any) => state.user.user);

  async function submit(
    data: UserProfile | ContactInformation | expertFinishPageData
  ) {
    userProfiling = { ...userProfiling, ...data };
    console.log(userProfiling);
    const username = user.username;
    if (currentStep === 2) {
      setIsSubmiting(true);
      const response = await addExpertHandler({ ...userProfiling, username });
      setIsSubmiting(false);
      if (response.status == 200) {
        navigate("/profile/expert");
      } else {
        toast.error(response.data.data.message);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }
  function goBackHandler() {
    setCurrentStep((prev) => prev - 1);
  }
  return (
    <div className="max-w-4xl mx-auto mt-9">
      <GetAToast />
      <Stepper currentIndex={currentStep}>
        <Stepper.Step title="Step 1" description="Personal Information" />
        <Stepper.Step title="Step 2" description="Contact Information" />
        <Stepper.Step title="Step 3" description="Finish" />
      </Stepper>
      {/* form for personal information */}
      {currentStep === 0 && <UserProfle submit={submit} />}
      {currentStep === 1 && (
        <ContactInformationPage submit={submit} goBack={goBackHandler} />
      )}
      {currentStep === 2 && (
        <ExpertFinishPage submit={submit} setIsSubmiting={isSubmiting} />
      )}
    </div>
  );
}
