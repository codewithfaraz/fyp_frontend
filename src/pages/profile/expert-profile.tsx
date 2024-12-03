import { Tab } from "rizzui";
import UserAcount from "../../components/shared/userProfile/user-account";
import Card from "../../components/layout/ui/card";
export default function ExpertProfile() {
  const user = {
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/webprojectimages-4ad07.appspot.com/o/fyp%20profile%20images%2F5780ecfd-dc03-436b-bb7c-f9ccb47709ff?alt=media&token=1e7a7ace-bcb3-4c9e-b476-8015c935faf3",
    username: "faraz",
    email: "farazmaqsood",
    firstName: "Faraz",
    lastName: "Maqsood",
    profileContent:
      "<p><strong>About Me</strong></p><p>Im a software engineer, always looking</p><p>for new things to learn and then add them into my user progfile.</p><ul style='list-style-type: circle';><li>React</li></ul><ol><li>React Native</li></ol><ul style='list-style-type: circle';><li>Python</li><li>Talwindcss</li><li>Node</li></ul><p>cvzx</p><ol><li>xzc</li><li>czx</li><br></ol><br>",
    roles: [],
  };
  return (
    <Card styles="">
      <Tab vertical className="">
        <Tab.List>
          <Tab.ListItem>Your Profile</Tab.ListItem>
          <Tab.ListItem>Settings</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <UserAcount data={user} />
          </Tab.Panel>
          <Tab.Panel>Setting</Tab.Panel>
        </Tab.Panels>
      </Tab>
    </Card>
  );
}
