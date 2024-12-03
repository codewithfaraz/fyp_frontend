import { apiClient } from "./api.config";
class InvestorController {
  static addInvestor(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/investor/add-investor", data, {
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
export default InvestorController;
