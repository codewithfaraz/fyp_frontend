"use client";
import SignupForm from "./signup-form";
import Authwrapper from "@/components/shared/auth-layout/auth-wrapper";
export default function SignupPage() {
  return (
    <Authwrapper
      heading="Welcome Back!"
      description="Pleae login to access a world of innovation and opportunities"
    >
      <SignupForm />
    </Authwrapper>
  );
}