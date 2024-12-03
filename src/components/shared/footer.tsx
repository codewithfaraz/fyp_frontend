import Logo from "../../assets/Images/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="mt-5 absolute bottom-0 w-full">
      <div className="bg-[#d9d9d9]">
        <div className="max-w-6xl mx-auto flex justify-center md:block">
          <Link to="/" className="">
            <img src={Logo} alt="innovate logo" />
          </Link>
        </div>
      </div>
      <div className="flex justify-between bg-[#4b4b4b] p-6 flex-col items-center md:flex-row">
        <div className="text-white">
          &copy; 2024{" "}
          <Link
            to="/privacy-policy"
            className="text-green-200 border-b border-b-green-200"
          >
            Innovate
          </Link>
          , All rights reserved.
        </div>
        <div>
          <Link
            to="/privacy-policy"
            className="text-white border-b hover:pb-1 transition-all"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
