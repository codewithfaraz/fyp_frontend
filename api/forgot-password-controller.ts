import { apiClient } from "./api.config";

interface ApiResponse {
  status: number;
  data: {
    status: 'success' | 'fail';
    message: string;
  };
}

class ForgotPasswordController {
  static sendOtp(email: string): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/forgot-password", { email })
        .then((res) => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }

  static verifyOtp(email: string, otp: string): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/verify-otp", { email, otp })
        .then((res) => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }

  static resetPassword(email: string, otp: string, newPassword: string): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/reset-password-with-otp", { email, otp, newPassword })
        .then((res) => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
}

export default ForgotPasswordController; 