"use client";
import { useState } from "react";
import Form from "../../components/shared/form/form";
import { Input, Password, Button } from "rizzui";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/store";
import { PiArrowRightBold } from "react-icons/pi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../hooks/use-auth";
import AuthController from "../../../api/AuthController";
import { Signup, signup } from "../../../validators/zod-schemas";

export default function SignupForm() {
  //states
  const [duplicateUsername, setDuplicateUsername] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [isLoading, setIsLodaing] = useState(false);

  const dispatcher = useDispatch();
  const { handleSignup } = useAuth();
  const navigate = useNavigate();
  async function submit(data: Signup) {
    const { email, password, username } = data;
    setIsLodaing(true);
    const response = await handleSignup({
      email,
      password,
      username,
    });
    AuthController.setSession(response.data.token);
    if (response.status === 401) {
      setDuplicateUsername(false);
      setDuplicateEmail(true);
      setIsLodaing(false);
    } else if (response.status == 402) {
      setDuplicateEmail(false);
      setDuplicateUsername(true);
      setIsLodaing(false);
    } else if (response.status === 201) {
      dispatcher(userActions.setUser(response.data.user));
      navigate("/");
    }
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
        error={
          errors.email
            ? errors.email.message
            : duplicateEmail && "Email already exist"
        }
      />
      <Input
        type="text"
        label="Username"
        placeholder="Enter username"
        {...register("username")}
        error={
          errors.username
            ? errors.username.message
            : duplicateUsername && "Username already exist"
        }
      />
      <div className="flex space-x-3">
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
      </div>

      <div className="space-y-3">
        <Button
          isLoading={isLoading}
          type="submit"
          size="lg"
          variant="solid"
          className="bg-green-900 text-white flex space-x-3 w-full"
        >
          <span>Sign up</span>
          <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
        </Button>
        <Link to="/sign-in" className="block">
          <Button variant="outline" className="w-full">
            Already have an account
          </Button>
        </Link>
      </div>
    </Form>
  );
}
