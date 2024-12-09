import { useCallback } from "react";
import InnovatorController from "../api/innovator-controller";
export const useInnovator = () => {
  const addInnovatorHandler = useCallback(
    async (payload: { email: ""; password: "" }) => {
      console.log(payload);
      try {
        const response = await InnovatorController.addInnovator(payload);
        return response;
      } catch (err) {
        console.log(err, "@handle");
        return err;
      }
    },
    []
  );
  const getInnovator = async (username: string) => {
    try {
      const response = await InnovatorController.getInnovator({
        username: username,
      });
      return response;
    } catch (err) {
      console.log(err, "@handle");
      return err;
    }
  };
  const updateInnovator = async (payload: any) => {
    try {
      const response = await InnovatorController.updateInnovator(payload);
      return response;
    } catch (err) {
      console.log(err, "@handle");
      return err;
    }
  };
  return {
    addInnovatorHandler,
    getInnovator,
    updateInnovator
  };
};
