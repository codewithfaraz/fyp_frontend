import { apiClient } from "./api.config";
class IdeaControllers {
  static addIdea(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/idea/add-idea", data, {
          validateStatus: (status) => {
            return true;
          },
        })
        .then((res) => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res); // Handles non-200 statuses
          }
        })
        .catch(({ response }) => {
          reject(response); // Handles network or unexpected errors
        });
    });
  }
}
export default IdeaControllers;
