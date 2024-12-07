import { useCallback } from "react";
import AuthController from "../api/AuthController";
import { useDispatch } from "react-redux";
import { userActions } from "../store/store";
export const useAuth = () => {
  const dispatcher = useDispatch();
  const handleLogin = useCallback(
    async (payload: { email: ""; password: "" }) => {
      console.log(payload);
      try {
        const response = await AuthController.userLogin(payload);
        // console.log(response, "@handle");
        return response;
      } catch (err) {
        console.log(err, "@handle");
        return err;
      }
    },
    []
  );
  const setSession = (token: string) => AuthController.setSession(token);
  const handleSignup = useCallback(
    async (payload: { email: ""; password: ""; username: "" }) => {
      console.log(payload);
      try {
        const response = await AuthController.userSignup(payload);
        return response;
      } catch (err) {
        console.log(err, "@handle");
        return err;
      }
    },
    []
  );
  const isUserAuthenticated = useCallback(async () => {
    try {
      const response = await AuthController.isAuthenticated();
      if (response.status === 200) {
        dispatcher(userActions.setUser(response.data.user));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const resetUserPassword = useCallback(
    async (payload: { username: ""; currentPassword: ""; newPassword: "" }) => {
      console.log(payload);
      try {
        const response = await AuthController.updatePassword(payload);
        // console.log(response, "@handle");
        return response;
      } catch (err) {
        console.log(err, "@handle");
        return err;
      }
    },
    []
  );
  return {
    resetUserPassword,
    handleLogin,
    handleSignup,
    setSession,
    isUserAuthenticated,
  };
};
