import { PiNotePencilThin } from "react-icons/pi";
import { Button } from "rizzui";
import Card from "../../layout/ui/card";
export default function UserAcount({ data }: { data: any }) {
  return (
    <Card styles="px-12 w-full">
      <div className="flex flex-col items-baseline space-y-12 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <img
              src={data.imageUrl}
              alt="profile"
              className="w-20 h-20 rounded-full"
            />
            <div className="">
              <h1 className="text-3xl font-bold">
                {data.firstName} {data.lastName}
              </h1>
              <h1 className="text-xl underline">@{data.username}</h1>
            </div>
          </div>
          <Button variant="outline" className="rounded-full w-12 h-12">
            <PiNotePencilThin size="lg" />
          </Button>
        </div>
        <div
          className="px-12"
          dangerouslySetInnerHTML={{ __html: data.profileContent }}
        />
      </div>
    </Card>
  );
}
