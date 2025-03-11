import { useCallback } from "react";
import ForgotPasswordController from "../api/forgot-password-controller";

export const useForgotPassword = () => {
  const sendOtp = useCallback(async (email: string) => {
    try {
      const response = await ForgotPasswordController.sendOtp(email);
      return response;
    } catch (err) {
      console.log(err, "@handle");
      return err;
    }
  }, []);

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    try {
      const response = await ForgotPasswordController.verifyOtp(email, otp);
      return response;
    } catch (err) {
      console.log(err, "@handle");
      return err;
    }
  }, []);

  const resetPassword = useCallback(async (email: string, otp: string, newPassword: string) => {
    try {
      const response = await ForgotPasswordController.resetPassword(email, otp, newPassword);
      return response;
    } catch (err) {
      console.log(err, "@handle");
      return err;
    }
  }, []);

  return {
    sendOtp,
    verifyOtp,
    resetPassword,
  };
}; 