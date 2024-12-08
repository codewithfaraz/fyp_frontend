import { useState } from "react";
import Form from "../../components/shared/form/form";
import { Input, Password, Button } from "rizzui";
import { set, useForm } from "react-hook-form";
import { PiArrowRightBold } from "react-icons/pi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../hooks/use-auth";
import { useUser } from "../../../hooks/user-hook";
import { Signin, signin } from "../../../validators/zod-schemas";
import GetAToast from "../../components/shared/get-a-toast";
export default function SigninForm() {
  //states
  const { handleLogin, setSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function submit(data: Signin) {
    console.log(data);
    const { email, password } = data;
    setIsLoading(true);
    const response = await handleLogin({ email, password });
    setIsLoading(false);
    if (response.status != 200) {
      toast.error("Invalid email or password");
    } else if (response.status == 200) {
      setSession(response.data.data.token);
      // const user = await getUserByEmail({ email });
      // console.log(user);
      navigate("/");
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signin>({
    resolver: zodResolver(signin),
  });
  return (
    <Form style="" onSubmit={handleSubmit(submit)}>
      <GetAToast />
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        inputClassName={`${errors.email ? "border-red-500" : ""}`}
        errorClassName="text-red-500"
        error={errors.email?.message}
      />
      <Password
        label="Password"
        placeholder="Enter you password"
        {...register("password")}
        error={errors.password?.message}
        inputClassName={`${errors.password ? "border-red-500" : ""}`}
        errorClassName="text-red-500"
      />
      <div className="flex items-center justify-between">
        {/* <Checkbox
          label="Remember me"
          size="sm"
          {...register("rememverMe")}
          className="hidden md:block"
        /> */}
        <Link to="/" className="text-blue-500 text-sm underline">
          Forgot Password?
        </Link>
      </div>
      <div className="space-y-3">
        <Button
          isLoading={isLoading}
          type="submit"
          size="lg"
          variant="solid"
          className="bg-green-900 text-white flex space-x-3 w-full"
        >
          <span>Sign in</span>
          <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
        </Button>
        <Link to="/sign-up" className="block">
          <Button variant="outline" className="w-full">
            Create Account
          </Button>
        </Link>
      </div>
    </Form>
  );
}
