import { Tab } from "rizzui";
import { useState, useEffect } from "react";
import Card from "../../components/layout/ui/card";
import UserAcount from "../../components/shared/userProfile/user-account";
import { useInvestor } from "../../../hooks/investor-hook";
import IdeaTable from "../../components/table/ideaTable";
export default function InvestorProfile({ user }: { user: any }) {
  const { getInvestor } = useInvestor();
  const [investorData, setInvestorData] = useState({});
  const [isVertical, setIsVertical] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await getInvestor(user.username);
      setInvestorData(response.data.data.investor);
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
            Your Investments
          </Tab.ListItem>
          <Tab.ListItem className="whitespace-nowrap">
            Account Settings
          </Tab.ListItem>
        </Tab.List>
        <Tab.Panels className="w-full mt-4 md:mt-0">
          <Tab.Panel>
            <UserAcount data={investorData} userType="investor" />
          </Tab.Panel>
          <Tab.Panel>
            <IdeaTable data={investorData} />
          </Tab.Panel>
          <Tab.Panel>Account Settings</Tab.Panel>
        </Tab.Panels>
      </Tab>
    </Card>
  );
}
