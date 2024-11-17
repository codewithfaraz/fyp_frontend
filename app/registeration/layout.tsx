"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "rizzui";
type propsType = {
  children: React.ReactNode;
};
export default function Layout({ children }: propsType) {
  const user = useSelector((state: any) => state.user.username);
  const path = usePathname();
  console.log(path);
  return (
    <div className="mt-24">
      {/* <div className="bg-green-900 p-2 md:p-4 max-w-xs md:max-w-xl mx-auto m-4 rounded-full flex justify-around space-x-3">
        <Link
          href="/registeration/innovator"
          className={`md:py-2 text-center rounded-full flex-1 ${
            path === "/registeration/innovator"
              ? "bg-white text-black"
              : "text-white"
          }`}
        >
          <Button
            className="text-l md:text-xl bg-inherit text-inherit hover:bg-inherit"
            rounded="pill"
          >
            Innovator
          </Button>
        </Link>
        <Link
          href="/registeration/expert"
          className={`md:p-2 text-center rounded-full text-xl flex-1 ${
            path === "/registeration/expert"
              ? "bg-white text-black"
              : "text-white"
          }`}
        >
          <Button
            className="text-l md:text-xl bg-inherit text-inherit hover:bg-inherit"
            rounded="pill"
          >
            Expert
          </Button>
        </Link>
        <Link
          href="/registeration/investor"
          className={`md:p-2 text-center rounded-full text-xl flex-1 ${
            path === "/registeration/investor"
              ? "bg-white text-black"
              : "text-white"
          }`}
        >
          <Button
            className="text-l md:text-xl bg-inherit text-inherit hover:bg-inherit"
            rounded="pill"
          >
            Investor
          </Button>
        </Link>
      </div> */}
      <h1>Hi Welcome {user}</h1>
      {children}
    </div>
  );
}
