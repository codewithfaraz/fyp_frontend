import { Tab } from "rizzui";
import { useState, useEffect } from "react";
import Card from "../../components/layout/ui/card";
import UserAcount from "../../components/shared/userProfile/user-account";
import { useInvestor } from "../../../hooks/investor-hook";
export default function InvestorProfile({ user }: { user: any }) {
  const { getInvestor } = useInvestor();
  const [investorData, setInvestorData] = useState({});
  console.log(investorData);
  const userData = {
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/webprojectimages-4ad07.appspot.com/o/fyp%20profile%20images%2F5780ecfd-dc03-436b-bb7c-f9ccb47709ff?alt=media&token=1e7a7ace-bcb3-4c9e-b476-8015c935faf3",
    username: "faraz",
    email: "farazmaqsood",
    firstName: "Faraz",
    lastName: "Maqsood",
    profileContent:
      "<p><strong>About Me</strong></p><p>Im a software engineer, always looking</p><p>for new things to learn and then add them into my user progfile.</p><ul style='list-style-type: circle';><li>React</li></ul><ol><li>React Native</li></ol><ul style='list-style-type: circle';><li>Python</li><li>Talwindcss</li><li>Node</li></ul><p>cvzx</p><ol><li>xzc</li><li>czx</li><br></ol><br>",
    skills: ["Aritificial Inteligence", "Data Science", "Education"],
  };
  useEffect(() => {
    async function fetchData() {
      const response = await getInvestor(user.username);
      setInvestorData(response.data.data.investor);
    }
    fetchData();
  }, []);
  return (
    <Card styles="w-full ">
      <Tab vertical className="w-full">
        <Tab.List>
          <Tab.ListItem>Your Profile</Tab.ListItem>
          <Tab.ListItem>Your Investments</Tab.ListItem>
          <Tab.ListItem>Account Settings</Tab.ListItem>
        </Tab.List>
        <Tab.Panels className="w-full">
          <Tab.Panel>
            <UserAcount data={investorData} userType="investor" />
          </Tab.Panel>
          <Tab.Panel>Investments Table</Tab.Panel>
          <Tab.Panel>Account Settings</Tab.Panel>
        </Tab.Panels>
      </Tab>
    </Card>
  );
}
