import Form from "@/components/shared/form/form";
import { Input, Password, Checkbox, Button } from "rizzui";
import { useForm } from "react-hook-form";
import { PiArrowRightBold } from "react-icons/pi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Signup, signup } from "@/validators/zod-schemas";
export default function SignupForm() {
    function submit(data: Signup) {
      console.log(data);
    }
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Signup>({
      resolver: zodResolver(signup),
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
         <Password
          label="Confirm Password"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          inputClassName={`${errors.confirmPassword ? "border-red-500" : ""}`}
          errorClassName="text-red-500"
        />
        <div className="space-y-3">
          <Button
            isLoading={false}
            type="submit"
            size="lg"
            variant="solid"
            className="bg-green-900 text-white flex space-x-3 w-full"
          >
            <span>Sign up</span>
            <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
          </Button>
          <Link href="/signin" className="block">
            <Button variant="outline" className="w-full">
              Already have an account
            </Button>
          </Link>
        </div>
      </Form>
    );
  }
  