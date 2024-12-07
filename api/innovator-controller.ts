import { apiClient } from "./api.config";
class InnovatorController {
  static addInnovator(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/innovator/add-innovator", data, {
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
  static getInnovator(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("/innovator/get-innovator", { params: data })
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
export default InnovatorController;
