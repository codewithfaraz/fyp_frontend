"use client";
import { Stepper } from "rizzui";
import {
  UserProfile,
  ContactInformation,
} from "../../../../validators/zod-schemas";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GetAToast from "../../../components/shared/get-a-toast";

import { innovatorFinishPagedata } from "../../../../types/types";
import { useState } from "react";
import { useInnovator } from "../../../../hooks/innovator-hook";
import InnovatorFinishForm from "./innovator-finish-form";

import UserProfle from "../../../components/shared/userProfile/user-profile";
import ContactInformationPage from "../../../components/shared/userProfile/contact-information";
let userProfiling = {};
export default function InnovatorRegiseration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);
  const { addInnovatorHandler } = useInnovator();
  async function submit(
    data: UserProfile | ContactInformation | innovatorFinishPagedata
  ) {
    userProfiling = { ...userProfiling, ...data };
    console.log(userProfiling);
    const username = user.username;
    if (currentStep === 2) {
      setIsSubmiting(true);
      console.log(userProfiling);
      const response = await addInnovatorHandler({
        ...userProfiling,
        username,
      });
      setIsSubmiting(false);
      console.log(response);
      if (response.status === 200) {
        navigate("/innovator");
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
        <InnovatorFinishForm submit={submit} setIsSubmiting={isSubmiting} />
      )}
    </div>
  );
}
