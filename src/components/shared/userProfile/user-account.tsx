import { useState } from "react";
import { PiNotePencilThin } from "react-icons/pi";
import { Button, Modal, Badge, Loader } from "rizzui";
import Card from "../../layout/ui/card";
import EditProfile from "./editProfile";
import { useExpert } from "../../../../hooks/expert-hook";
import { useInnovator } from "../../../../hooks/innovator-hook";
import { useInvestor } from "../../../../hooks/investor-hook";
export default function UserAcount({
  data,
  userType,
  isLoading = false,
}: {
  data: any;
  userType: string;
  isLoading?: boolean;
}) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { updateExpert } = useExpert();
  const { updateInnovator } = useInnovator();
  const { updateInvestor } = useInvestor();
  //function for handling save
  async function saveBtnHandeler(updatedData: any) {
    console.log(updatedData);
    setIsModelOpen(false);
    if (userType === "expert") {
      const response = await updateExpert({
        ...updatedData,
        username: data.username,
        yearsOfExperience: updatedData.yearsOfExperience.value,
      });
      console.log(response);
      if (response.status === 200) {
        window.location.reload();
      }
    } else if (userType === "innovator") {
      const response = await updateInnovator({
        ...updatedData,
        username: data.username,
        yearsOfExperience: updatedData.yearsOfExperience.value,
      });
      console.log(response);
      if (response.status === 200) {
        window.location.reload();
      }
    } else if (userType === "investor") {
      const response = await updateInvestor({
        ...updatedData,
        username: data.username,
        yearsOfExperience: updatedData.yearsOfExperience.value,
      });
      console.log(response);
      if (response.status === 200) {
        window.location.reload();
      }
    }
  }
  return (
    <Card styles="px-12 w-full">
      <Modal isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
        <EditProfile
          data={data}
          userType={userType}
          cancelButtonClick={() => setIsModelOpen(false)}
          onSave={saveBtnHandeler}
        />
      </Modal>
      {isLoading ? (
        <Loader size="lg" />
      ) : (
        <div className="flex flex-col items-baseline space-y-12 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <img
                src={data.imageUrl}
                alt="profile"
                className="w-20 h-20 rounded-full"
              />
              <div className="">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold uppercase">
                    {data.firstName} {data.lastName}
                  </h1>
                  <h1 className="text-xl">{data.yearsOfExperience}</h1>
                </div>
                <div className="flex space-x-4">
                  <h1 className="text-xl underline">@{data.username},</h1>
                  <h1 className="text-xl uppercase text-green-900">
                    {userType}
                  </h1>
                  <h1 className="uppercase text-xl">
                    {data.country}, {data.city}
                  </h1>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="rounded-full w-12 h-12"
              onClick={() => setIsModelOpen(true)}
            >
              <PiNotePencilThin size="lg" />
            </Button>
          </div>
          <div>
            <h1 className="text-xl text-black font-bold">Short Bio</h1>
            <p>{data.shortBio}</p>
          </div>
          <div>
            <h1 className="text-xl text-black font-bold">About</h1>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: data.profileDescription }}
            />
          </div>
          <div className="flex gap-3">
            {data.InvestingExperience &&
              data?.InvestingExperience.map((skill: string) => {
                return <Badge variant="flat">{skill.replace("_", " ")}</Badge>;
              })}
          </div>
          <div className="flex gap-3">
            {data.experties &&
              data?.experties.map((expertie: string) => {
                return (
                  <Badge variant="flat">{expertie.replace("_", " ")}</Badge>
                );
              })}
          </div>
          <div className="flex gap-3">
            {data.skills &&
              data?.skills.map((skill: string) => {
                return <Badge variant="flat">{skill.replace("_", " ")}</Badge>;
              })}
            {(skill: string) => {
              return <Badge variant="flat">{skill.replace("_", " ")}</Badge>;
            }}
          </div>
        </div>
      )}
    </Card>
  );
}
