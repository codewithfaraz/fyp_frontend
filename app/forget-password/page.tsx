"use client";
import ForgetPassword from "./forget-password";
import UnderlineShape from "@/components/shape/underline";
import Authwrapper from "@/components/shared/auth-layout/auth-wrapper";
export default function ForgetPasswordPage() {
  return (
    <Authwrapper
      heading={
        <>
          Find Your{" "}
          <span className="relative">
            Account
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-green-900 xl:w-36" />
          </span>
        </>
      }
      description="Please enter your email address to find your account."
    >
      <ForgetPassword />
    </Authwrapper>
  );
}
