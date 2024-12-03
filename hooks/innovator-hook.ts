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
  return {
    addInnovatorHandler,
  };
};
