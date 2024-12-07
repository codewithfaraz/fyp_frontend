import { useState, useEffect } from "react";
import { Tab } from "rizzui";
import Card from "../../components/layout/ui/card";
import UserAcount from "../../components/shared/userProfile/user-account";
import { useInnovator } from "../../../hooks/innovator-hook";
export default function InnovatorProfile({ user }: { user: any }) {
  const { getInnovator } = useInnovator();
  const [innovatorData, setInnovatorData] = useState({});

  useEffect(() => {
    async function fetchData() {
      console.log(user.username);
      const response = await getInnovator(user.username);
      console.log(response.data.data);
      setInnovatorData(response.data.data.innovator);
    }
    fetchData();
  }, []);
  console.log(innovatorData);
  return (
    <Card styles="w-full ">
      <Tab vertical className="w-full">
        <Tab.List>
          <Tab.ListItem>Your Profile</Tab.ListItem>
          <Tab.ListItem>Your Innovations</Tab.ListItem>
          <Tab.ListItem>Account Settings</Tab.ListItem>
        </Tab.List>
        <Tab.Panels className="w-full">
          <Tab.Panel>
            <UserAcount data={innovatorData} userType="innovator" />
          </Tab.Panel>
          <Tab.Panel>Idea Table</Tab.Panel>
          <Tab.Panel>Account Settings</Tab.Panel>
        </Tab.Panels>
      </Tab>
    </Card>
  );
}
