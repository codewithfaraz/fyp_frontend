import { Tab } from "rizzui";
import { useEffect, useState } from "react";
import { useExpert } from "../../../hooks/expert-hook";
import UserAcount from "../../components/shared/userProfile/user-account";
import Card from "../../components/layout/ui/card";

export default function ExpertProfile({ user }: { user: any }) {
  const { getExpert } = useExpert();
  const [expertData, setExpertData] = useState({});

  useEffect(() => {
    async function fetchData() {
      console.log(user.username);
      const response = await getExpert(user.username);
      console.log(response.data.data);
      setExpertData(response.data.data.expert);
    }
    fetchData();
  }, []);
  console.log(expertData);
  return (
    <Card styles="w-full ">
      <Tab vertical className="w-full">
        <Tab.List>
          <Tab.ListItem>Your Profile</Tab.ListItem>
          <Tab.ListItem>Ideas Working On</Tab.ListItem>
          <Tab.ListItem>Account Settings</Tab.ListItem>
        </Tab.List>
        <Tab.Panels className="w-full">
          <Tab.Panel>
            <UserAcount data={expertData} userType="expert" />
          </Tab.Panel>
          <Tab.Panel>Idea Table</Tab.Panel>
          <Tab.Panel>Account Settings</Tab.Panel>
        </Tab.Panels>
      </Tab>
    </Card>
  );
}
