import { useState, useEffect } from "react";
import { Tab } from "rizzui";
import Card from "../../components/layout/ui/card";
import UserAcount from "../../components/shared/userProfile/user-account";
import { useInnovator } from "../../../hooks/innovator-hook";

export default function InnovatorProfile({ user }: { user: any }) {
  const { getInnovator } = useInnovator();
  const [innovatorData, setInnovatorData] = useState({});
  const [isVertical, setIsVertical] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log(user.username);
      const response = await getInnovator(user.username);
      console.log(response.data.data);
      setInnovatorData(response.data.data.innovator);
    }
    fetchData();
  }, []);

  return (
    <Card styles="w-full ">
      <Tab vertical={isVertical} className="w-full">
        <Tab.List className="md:space-y-1 flex md:flex-col space-x-4 md:space-x-0 p-2 md:p-0">
          <Tab.ListItem className="whitespace-nowrap">
            Your Profile
          </Tab.ListItem>
          <Tab.ListItem className="whitespace-nowrap">
            Your Innovations
          </Tab.ListItem>
          <Tab.ListItem className="whitespace-nowrap">
            Account Settings
          </Tab.ListItem>
        </Tab.List>
        <Tab.Panels className="w-full mt-4 md:mt-0">
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
