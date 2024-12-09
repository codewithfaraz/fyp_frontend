import { Tab } from "rizzui";
import { useEffect, useState } from "react";
import { useExpert } from "../../../hooks/expert-hook";
import UserAcount from "../../components/shared/userProfile/user-account";
import Card from "../../components/layout/ui/card";

export default function ExpertProfile({ user }: { user: any }) {
  const { getExpert } = useExpert();
  const [expertData, setExpertData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const response = await getExpert(user.username);
      setIsLoading(false);
      console.log(response.data.data);
      setExpertData(response.data.data.expert);
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
            Ideas Working On
          </Tab.ListItem>
          <Tab.ListItem className="whitespace-nowrap">
            Account Settings
          </Tab.ListItem>
        </Tab.List>
        <Tab.Panels className="w-full mt-4 md:mt-0">
          <Tab.Panel>
            <UserAcount
              data={expertData}
              userType="expert"
              isLoading={isLoading}
            />
          </Tab.Panel>
          <Tab.Panel>Idea Table</Tab.Panel>
          <Tab.Panel>Account Settings</Tab.Panel>
        </Tab.Panels>
      </Tab>
    </Card>
  );
}
