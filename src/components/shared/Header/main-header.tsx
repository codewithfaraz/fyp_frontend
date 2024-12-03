import Logo from "../../../assets/Images/logo.png";
import { useSelector } from "react-redux";
import { Button, Dropdown, Avatar } from "rizzui";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "../footer";
export default function MainHeader() {
  const user = useSelector((state: any) => state.user.user);
  const locaton = useLocation();
  return (
    <>
      <div className="md:max-w-full border-b">
        <div className="max-w-xl mx-auto md:max-w-[1400px] flex justify-between items-center">
          <Link to="/">
            <img src={Logo} alt="innovate logo" />
          </Link>
          <div className="md:space-x-12 space-x-0">
            <Link
              to="/categories"
              className={`hover:text-green-900 ${
                location.pathname === "/categories" &&
                "text-green-900 border-b border-green-900"
              }`}
            >
              Categories
            </Link>
            <Link
              to="/privacy-policy"
              className={`hover:text-green-900 ${
                location.pathname === "/privacy-policy" &&
                "text-green-900 border-b border-green-900"
              }`}
            >
              Privay Policy
            </Link>
            {!user?.username ? (
              <Link to="/sign-up">
                <Button>Join us</Button>
              </Link>
            ) : (
              <DropDown />
            )}
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
const DropDown = () => {
  const user = useSelector((state: any) => state.user.user);

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
          <Link to="/sign-up">Sign Out</Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
