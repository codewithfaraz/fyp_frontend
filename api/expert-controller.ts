import { apiClient } from "./api.config";
class ExpertController {
  static addExpert(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/expert/add-expert", data, {
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
  static getExpert(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("/expert/get-expert", { params: data })
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
  static updateExpert(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .patch("/expert/update-expert", data, {
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
export default ExpertController;
