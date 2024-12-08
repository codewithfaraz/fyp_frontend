import UserControllers from "../api/user-controller";
export const useUser = () => {
  const getUserRoles = async (username: string) => {
    try {
      const response = await UserControllers.getUserRoles({
        username: username,
      });
      return response;
    } catch (err) {
      console.log(err, "@handle");
      return err;
    }
  };
  const getUser = async (username: string) => {
    try {
      const response = await UserControllers.getUser({
        username: username,
      });
      return response;
    } catch (err) {
      console.log(err, "@handle");
      return err;
    }
  };
  const getUserByEmail = async (payload: any) => {
    try {
      const response = await UserControllers.getUser({
        payload,
      });
      return response;
    } catch (err) {
      console.log(err, "@handle");
      return err;
    }
  };
  return {
    getUserRoles,
    getUser,
    getUserByEmail,
  };
};
