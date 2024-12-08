import Logo from "../../../assets/Images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown, Avatar } from "rizzui";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { userActions } from "../../../../store/store";
import Footer from "../footer";
export default function MainHeader() {
  const user = useSelector((state: any) => state.user.user);
  const location = useLocation();
  return (
    <>
      <div className="md:max-w-full border-b">
        <div className="max-w-xl mx-auto md:max-w-[1400px] flex justify-between items-center px-12">
          <Link to="/">
            <img src={Logo} alt="innovate logo" />
          </Link>
          <div className="md:space-x-12 space-x-0">
            <Link
              to="/innovators"
              className={`hover:text-green-900 ${
                location.pathname === "/innovators" &&
                "text-green-900 border-b border-green-900"
              }`}
            >
              Innovators
            </Link>
            <Link
              to="/investors"
              className={`hover:text-green-900 ${
                location.pathname === "/investors" &&
                "text-green-900 border-b border-green-900"
              }`}
            >
              Investors
            </Link>
            <Link
              to="/experts"
              className={`hover:text-green-900 ${
                location.pathname === "/experts" &&
                "text-green-900 border-b border-green-900"
              }`}
            >
              Experts
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
      {/* <Footer /> */}
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
