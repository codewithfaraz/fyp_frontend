"use client";
import SigninForm from "./signin-form";
import Authwrapper from "@/components/shared/auth-layout/auth-wrapper";
export default function SigninPage() {
  return (
    <Authwrapper
      heading="Welcome Back!"
      description="Pleae login to access a world of innovation and opportunities"
    >
      <SigninForm />
    </Authwrapper>
  );
}
