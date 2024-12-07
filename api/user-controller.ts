import { apiClient } from "./api.config";
class UserControllers {
  static getUserRoles(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("/user/user-role", { params: data })
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
  static getUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("/user/get-user", { params: data })
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
export default UserControllers;
