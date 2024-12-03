import { useCallback } from "react";
import InvestorController from "../api/investor-controllers";
export const useInvestor = () => {
  const addInvestorHandler = useCallback(
    async (payload: { email: ""; password: "" }) => {
      console.log(payload);
      try {
        const response = await InvestorController.addInvestor(payload);
        return response;
      } catch (err) {
        console.log(err, "@handle");
        return err;
      }
    },
    []
  );
  return {
    addInvestorHandler,
  };
};
