import { useState } from "react";
import Form from "../../components/shared/form/form";
import { Input, Password, Button } from "rizzui";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import GetAToast from "../../components/shared/get-a-toast";
import { useForgotPassword } from "../../../hooks/use-forgot-password";

// Validation schema for email
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Validation schema for OTP
const otpSchema = z.object({
  otp: z.string().length(4, "OTP must be 4 digits"),
});

// Validation schema for new password
const newPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
type OtpForm = z.infer<typeof otpSchema>;
type NewPasswordForm = z.infer<typeof newPasswordSchema>;

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { sendOtp, verifyOtp, resetPassword } = useForgotPassword();

  // Email form
  const emailForm = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // OTP form
  const otpForm = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
  });

  // New password form
  const passwordForm = useForm<NewPasswordForm>({
    resolver: zodResolver(newPasswordSchema),
  });

  const handleEmailSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    try {
      const response = await sendOtp(data.email);
      if (response.status === 200) {
        setEmail(data.email);
        setStep(2);
        toast.success("OTP sent to your email");
      } else {
        toast.error(response.data.message || "Failed to send OTP");
      }
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (data: OtpForm) => {
    setIsLoading(true);
    try {
      const response = await verifyOtp(email, data.otp);
      if (response.status === 200) {
        setOtp(data.otp);
        setStep(3);
        toast.success("OTP verified");
      } else {
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch {
      toast.error("Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (data: NewPasswordForm) => {
    setIsLoading(true);
    try {
      const response = await resetPassword(email, otp, data.newPassword);
      if (response.status === 200) {
        toast.success("Password reset successfully");
        navigate("/sign-in");
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    } catch {
      toast.error("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
        </div>
        <GetAToast />

        {step === 1 && (
          <Form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...emailForm.register("email")}
              error={emailForm.formState.errors.email?.message}
            />
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-green-900 text-white"
            >
              Send OTP
            </Button>
          </Form>
        )}

        {step === 2 && (
          <Form onSubmit={otpForm.handleSubmit(handleOtpSubmit)}>
            <Input
              label="Enter OTP"
              placeholder="Enter 4-digit OTP"
              {...otpForm.register("otp")}
              error={otpForm.formState.errors.otp?.message}
            />
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-green-900 text-white"
            >
              Verify OTP
            </Button>
          </Form>
        )}

        {step === 3 && (
          <Form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
            <Password
              label="New Password"
              placeholder="Enter new password"
              {...passwordForm.register("newPassword")}
              error={passwordForm.formState.errors.newPassword?.message}
            />
            <Password
              label="Confirm Password"
              placeholder="Confirm new password"
              {...passwordForm.register("confirmPassword")}
              error={passwordForm.formState.errors.confirmPassword?.message}
            />
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-green-900 text-white"
            >
              Reset Password
            </Button>
          </Form>
        )}

        <div className="text-center">
          <Link to="/sign-in" className="text-blue-600 hover:text-blue-800">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
} 