import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "rizzui";

type PropsType = {
  children: React.ReactNode;
};

export default function Layout() {
  const user = useSelector((state: any) => state.user.username); // Redux selector
  const location = useLocation(); // React Router hook to get the current path
  const path = location.pathname;

  function getRoleSpecificHeading() {
    if (path === "/registeration/innovator") {
      return (
        <h1 className="text-green-900 text-center text-2xl my-12 font-bold">
          Register Yourself and start Innovating
        </h1>
      );
    } else if (path === "/registeration/expert") {
      return (
        <h1 className="text-green-900 text-center text-2xl my-12 font-bold">
          Register yourself and start Investing
        </h1>
      );
    } else if (path === "/registeration/investor") {
      return (
        <h1 className="text-green-900 text-center text-2xl my-12 font-bold">
          Register Yourself and start refining Ideas
        </h1>
      );
    }
  }

  console.log(path);

  return (
    <div className="mt-24">
      {/* Navigation Links */}
      {/* <div className="bg-green-900 p-2 md:p-4 max-w-xs md:max-w-xl mx-auto m-4 rounded-full flex justify-around space-x-3">
        <Link
          to="/registeration/innovator"
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
          to="/registeration/expert"
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
          to="/registeration/investor"
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

      {/* Dynamic Heading */}
      {getRoleSpecificHeading()}

      {/* Render Children */}
      <Outlet />
    </div>
  );
}
