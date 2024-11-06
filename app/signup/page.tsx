"use client";
import SignupForm from "./signup-form";
import Authwrapper from "@/components/shared/auth-layout/auth-wrapper";
export default function SignupPage() {
  return (
    <Authwrapper
      heading="Ready to Join!"
      description="Join us today and turn your ideas into reality!"
    >
      <SignupForm />
    </Authwrapper>
  );
}