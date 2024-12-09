import { useCallback } from "react";
import ExpertController from "../api/expert-controller";
export const useExpert = () => {
  const addExpertHandler = useCallback(
    async (payload: { email: ""; password: "" }) => {
      console.log(payload);
      try {
        const response = await ExpertController.addExpert(payload);
        return response;
      } catch (err) {
        console.log(err, "@handle");
        return err;
      }
    },
    []
  );
  const getExpert = async (username: string) => {
    try {
      const response = await ExpertController.getExpert({
        username: username,
      });
      return response;
    } catch (err) {
      console.log(err, "@handle");
      return err;
    }
  };
  const updateExpert = async (payload: any) => {
    try {
      const response = await ExpertController.updateExpert(payload);
      return response;
    } catch (err) {
      console.log(err, "@handle");
      return err;
    }
  };
  return {
    addExpertHandler,
    getExpert,
    updateExpert
  };
};
