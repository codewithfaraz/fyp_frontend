import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/user-hook";
import { useSelector } from "react-redux";
import SignedUpUserProfile from "./signed-up-user-profile";
import ExpertProfile from "./expert-profile";
import InnovatorProfile from "./innovator-profile";
import InvestorProfile from "./investor-profile";
export default function Profile() {
  const { getUser } = useUser();
  const username = useSelector((state: any) => state.user.user.username);
  const [user, setUser] = useState([]);
  const [userObject, setUserObject] = useState({});
  useEffect(() => {
    async function fetchData() {
      const response = await getUser(username);
      setUserObject(response.data.data.user);
      setUser(response.data.data.user.role);
    }
    fetchData();
  }, []);
  return (
    <>
      {user.length <= 0 ? (
        <SignedUpUserProfile user={userObject} />
      ) : user[0] === "innovator" ? (
        <InnovatorProfile user={userObject} />
      ) : user[0] === "investor" ? (
        <InvestorProfile user={userObject} />
      ) : (
        <ExpertProfile user={userObject} />
      )}
    </>
  );
}
