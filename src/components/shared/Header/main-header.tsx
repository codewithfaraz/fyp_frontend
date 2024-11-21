import Logo from "../../../assets/Images/logo.png";
import { useSelector } from "react-redux";
import { Button, Dropdown, Avatar } from "rizzui";
import { Link } from "react-router-dom";
export default function MainHeader() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="md:max-w-full border-b">
      <div className="max-w-xl mx-auto md:max-w-[1400px] flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="innovate logo" />
        </Link>
        <div>
          {!user?.username ? (
            <Link to="/sign-up">
              <Button>Join us</Button>
            </Link>
          ) : (
            <Dropdown>
              <Dropdown.Trigger>
                <Avatar name={user?.username} />
              </Dropdown.Trigger>
              <Dropdown.Menu className="">
                <Dropdown.Item>Account Setting</Dropdown.Item>
                {/* <Dropdown.Item>Register as Investor</Dropdown.Item>
                <Dropdown.Item>Register as</Dropdown.Item>
                <Dropdown.Item>Register as an expert</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
}
