import React from "react";
import Logo from "../../../assets/Images/logo.png";
import Showcase from "../../../assets/Images/showcase-image.png";

type authTypes = {
  children: React.ReactNode;
  heading: any;
  description: string;
};
export default function Authwrapper({
  children,
  heading,
  description,
}: authTypes) {
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="flex flex-col h-screen">
          <img src={Logo} alt="logo" className="m-12 max-w-[200px]" />
          <div className="pl-12 pr:12 md:p-32 flex flex-col items-center justify-center space-y-4">
            <h1 className="md:text-5xl font-bold text-4xl">{heading}</h1>
            <p className="text-gray-500 text-center">{description}</p>
            {children}
          </div>
        </div>
      </div>
      <div className="flex-1 w-full relative h-[100vh] hidden md:block">
        <img
          src={Showcase}
          alt="auth"
          className="object-cover absolute right-0"
        />
      </div>
    </div>
  );
}
