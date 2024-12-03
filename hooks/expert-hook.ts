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
  return {
    addExpertHandler,
  };
};
