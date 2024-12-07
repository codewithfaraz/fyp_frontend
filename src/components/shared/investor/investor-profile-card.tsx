import { Avatar, Button, Badge } from "rizzui";
export default function InvestorProfileCard({ user }: { user: any }) {
  return (
    <>
      <div className="border p-3 mr-3">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <Avatar name={user.name} src={user.imageUrl} />
            <div>
              <h1 className="text-green-900 font-bold">{user.name}</h1>
              <span className="text-gray-500">{user.userType}</span>
            </div>
          </div>
          <Button variant="outline">Profile</Button>
        </div>
        <div className="mt-4">
          <p>{user.description}</p>
        </div>
        <div className="mt-2 space-x-2">
          {user.skills.map((skill: string) => {
            return <Badge variant="flat">{skill}</Badge>;
          })}
        </div>
      </div>
    </>
  );
}
