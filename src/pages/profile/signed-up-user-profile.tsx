import { Tab, Input, Button, Modal } from "rizzui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../components/layout/ui/card";
import Form from "../../../src/components/shared/form/form";
import toast from "react-hot-toast";
import GetAToast from "../../components/shared/get-a-toast";
import { resetPassword, ResetPassword } from "../../../validators/zod-schemas";
import { useAuth } from "../../../hooks/use-auth";
export default function SignedUpUserProfile({ user }: { user: any }) {
  const { resetUserPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: zodResolver(resetPassword),
  });
  async function submit(data: ResetPassword) {
    console.log(data);
    const userData: any = { ...data, username: user.username };
    const response = await resetUserPassword(userData);
    if (response.status === 401) {
      toast.error("user not found or current password is incorrect");
    } else if (response.status === 200) {
      toast.success("Password updated successfully");
    }
  }
  console.log(user);
  return (
    <Card styles="">
      <GetAToast />
      <h1 className="text-4xl text-center font-bold uppercase mb-4">
        Hi, {user.username}
      </h1>
      <Tab vertical className="w-full">
        <Tab.List>
          <Tab.ListItem>Account Settings</Tab.ListItem>
        </Tab.List>
        <Tab.Panels className="w-full">
          <Tab.Panel>
            <div className="">
              <h1 className="text-[#969696] text-2xl">Update Password</h1>
              <Form
                style="max-w-sm flex flex-col space-y-4 mt-3"
                onSubmit={handleSubmit(submit)}
              >
                <Input
                  placeholder="Current password"
                  {...register("currentPassword")}
                  error={errors.currentPassword?.message}
                />
                <Input
                  placeholder="New password"
                  {...register("newPassword")}
                  error={errors.newPassword?.message}
                />
                <Button type="submit" className="self-end">
                  Reset
                </Button>
              </Form>
            </div>
            {/* <div className="space-y-4">
              <h1 className="text-[#969696] text-2xl">Delete Account</h1>
              <Button className="bg-red-900">Delete Account</Button>
              <Modal isOpen={true} >fsdhjk</Modal>
            </div> */}
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </Card>
  );
}
