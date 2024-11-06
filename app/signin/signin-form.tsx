import Form from "@/components/shared/form/form";
import { Input, Password, Checkbox, Button } from "rizzui";
import { useForm } from "react-hook-form";
import { PiArrowRightBold } from "react-icons/pi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Signin, signin } from "@/validators/zod-schemas";
export default function SigninForm() {
  function submit(data: Signin) {
    console.log(data);
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
        <Checkbox
          label="Remember me"
          size="sm"
          {...register("rememverMe")}
          className="hidden md:block"
        />
        <Link href="/" className="text-blue-500 text-sm underline">
          Forgot Password?
        </Link>
      </div>
      <div className="space-y-3">
        <Button
          isLoading={false}
          type="submit"
          size="lg"
          variant="solid"
          className="bg-green-900 text-white flex space-x-3 w-full"
        >
          <span>Sign in</span>
          <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
        </Button>
        <Link href="/signup" className="block">
          <Button variant="outline" className="w-full">
            Create Account
          </Button>
        </Link>
      </div>
    </Form>
  );
}
