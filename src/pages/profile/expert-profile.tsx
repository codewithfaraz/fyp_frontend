import { Tab,Table,Badge,Password,Button,Box,Grid, Bold } from "rizzui";
import UserAcount from "../../components/shared/userProfile/user-account";
import Card from "../../components/layout/ui/card";
<<<<<<< Updated upstream
import MainTable from "../../components/table/table";
import From from "../../components/shared/form/form";
import { useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { defaultData } from "..//..//..//data/table";
import { defaultColumns } from "..//..//components/table/column";
import TableToolbar from "..//..//components/table/toolbar";
import TablePagination from "..//..//components/table/pagination";
=======
import IdeaTable from "../../components/table/ideaTable";
>>>>>>> Stashed changes



export default function ExpertProfile() {

  const [isReset, setIsReset] = useState(false); // State to track if reset button is clicked

  const handleResetClick = () => {
    setIsReset(true); // Set to true when the reset button is clicked
  };


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

  const data = [
    { label: "Total Ideas", value: 4 },
    { label: "Ideas Viewers", value: 10 },
    { label: "Approachers", value: 2 },
  ];

  const table = useReactTable({
    data: defaultData,
    columns: defaultColumns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  

  return (
    <Card styles="">
      <Tab vertical className="">
        <Tab.List>
          <Tab.ListItem>Your Profile</Tab.ListItem>
          <Tab.ListItem>Innovations</Tab.ListItem>
          <Tab.ListItem>Settings</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <UserAcount data={user} />
          </Tab.Panel>
<<<<<<< Updated upstream
//Achievements here
          <Tab.Panel>

          <h1 className="font-bold text-center ">Your Innovations Here</h1>

            <div >

            <Box className="p-4 bg-gray-100 rounded flex mb-8">
      {data.map((item, index) => (
        <Box
          key={index}
          className="p-4 bg-white rounded text-center border flex-1"
        >
          <h3 className="text-lg font-semibold">{item.label}</h3>
          <p className="text-2xl font-bold">{item.value}</p>
        </Box>
      ))}
    </Box>
            </div>

          <>
          <TableToolbar table={table} />
      <MainTable table={table} />
      <TablePagination table={table} />
      </>

          
          </Tab.Panel>
//Settings here
    <Tab.Panel>

    <h1 className="font-bold text-center ">
  Change Password
</h1>

      <From onSubmit={""}>
      {/* Render the current password field until reset is clicked */}
      {!isReset && (
        <div className="space-y-3">
          <Password label="Current Password" placeholder="Enter current password" />
        </div>
      )}

      {/* Render New Password and Confirm New Password fields when reset is clicked */}
      {isReset && (
        <div className="space-y-10">
          <Password label="New Password" placeholder="Enter new password" />
        </div>
      )}

      {isReset && (
        <div className="space-y-10">
          <Password label="Confirm New Password" placeholder="Confirm new password" />
        </div>
      )}

      <div className="space-y-10">
        <Button onClick={handleResetClick}>Reset</Button>
      </div>
      </From>
    </Tab.Panel>
=======
          <Tab.Panel>
            <IdeaTable data={expertData}/>
          </Tab.Panel>
          <Tab.Panel>Account Settings</Tab.Panel>
>>>>>>> Stashed changes
        </Tab.Panels>
      </Tab>
    </Card>
    
  );
}