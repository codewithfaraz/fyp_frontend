import { useCallback } from "react";
import IdeaControllers from "../api/idea-controllers";
export const useIdea = () => {
  const addIdea = useCallback(async (payload: any) => {
    try {
      const response = await IdeaControllers.addIdea(payload);
      return response;
    } catch (err) {
      console.log(err, "@handle");
      return err;
    }
  }, []);
  return {
    addIdea,
  };
};
