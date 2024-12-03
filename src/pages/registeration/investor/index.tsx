"use client";
import { Stepper } from "rizzui";
import {
  UserProfile,
  ContactInformation,
} from "../../../../validators/zod-schemas";
import { useState } from "react";
import ContactInformationPage from "../../../components/shared/userProfile/contact-information";
import UserProfle from "../../../components/shared/userProfile/user-profile";
import InvestorFinishPage from "./investor-finish-page";
import { investorFinishPagedata } from "../../../../types/types";
import { useNavigate } from "react-router-dom";
import { useInvestor } from "../../../../hooks/investor-hook";
import toast from "react-hot-toast";
import GetAToast from "../../../components/shared/get-a-toast";
import { useSelector } from "react-redux";
let userProfiling = {};
export default function InvestorRegiseration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();
  const { addInvestorHandler } = useInvestor();
  const user = useSelector((state: any) => state.user.user);

  async function submit(
    data: UserProfile | ContactInformation | investorFinishPagedata
  ) {
    userProfiling = { ...userProfiling, ...data };
    console.log(userProfiling);
    const username = user.username;
    if (currentStep === 2) {
      setIsSubmiting(true);
      const response = await addInvestorHandler({ ...userProfiling, username });
      setIsSubmiting(false);
      if (response.status == 200) {
        navigate("/profile/investor");
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
        <InvestorFinishPage submit={submit} setIsSubmiting={isSubmiting} />
      )}
    </div>
  );
}
