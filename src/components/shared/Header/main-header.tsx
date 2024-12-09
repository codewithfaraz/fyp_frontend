import Logo from "../../../assets/Images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown, Avatar } from "rizzui";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { userActions } from "../../../../store/store";
import Footer from "../footer";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function MainHeader() {
  const user = useSelector((state: any) => state.user.user);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/innovators", label: "Innovators" },
    { to: "/investors", label: "Investors" },
    { to: "/experts", label: "Experts" },
    { to: "/privacy-policy", label: "Privacy Policy" },
  ];

  return (
    <>
      <div className="md:max-w-full border-b relative">
        <div className="max-w-xl mx-auto md:max-w-[1400px] flex justify-between items-center px-4 md:px-12 py-4">
          <Link to="/">
            <img src={Logo} alt="innovate logo" className="h-8 md:h-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-green-900 ${
                  location.pathname === link.to &&
                  "text-green-900 border-b border-green-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!user?.username ? (
              <Link to="/sign-up">
                <Button>Join us</Button>
              </Link>
            ) : (
              <DropDown />
            )}
          </div>

          {/* Mobile Menu Button and Profile */}
          <div className="flex items-center space-x-4 md:hidden">
            {user?.username && <DropDown />}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-green-900"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="z-10 absolute top-full left-0 right-0 bg-white border-b shadow-lg md:hidden">
              <div className="flex flex-col space-y-4 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`hover:text-green-900 ${
                      location.pathname === link.to &&
                      "text-green-900 border-b border-green-900"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {!user?.username && (
                  <Link
                    to="/sign-up"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className="w-full">Join us</Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
}

const DropDown = () => {
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //function to signout user
  function signoutHandler(e: any) {
    e.preventDefault();
    localStorage.removeItem("loginToken");
    localStorage.removeItem("persist:profile");
    localStorage.removeItem("persist:user");
    dispatch(userActions.setUser({}));
    navigate("/sign-up");
  }
  return (
    <Dropdown placement="bottom-end" className="">
      <Dropdown.Trigger>
        <Avatar name={user?.username} />
      </Dropdown.Trigger>
      <Dropdown.Menu className="w-86 !bg-white">
        <Dropdown.Item className="hover:bg-white">
          <div className="flex items-center border-b  border-b-[#ccc] pb-2">
            <Avatar name={user?.username} />
            <div className="flex flex-col items-start">
              <span className="ml-2 uppercase font-bold">{user?.username}</span>
              <span className="ml-2">{user?.email}</span>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item className="hover:bg-green-900 hover:text-white">
          <Link to="/profile">Profile</Link>
        </Dropdown.Item>
        <Dropdown.Item className="border-t border-t-[#ccc] mt-4 pt-3">
          <Link to="#" onClick={signoutHandler}>
            Logout
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
