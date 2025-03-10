import InvestorController from "../api/investor-controllers";
import { apiClient } from "../api/api.config";

jest.mock("../api/api.config");

describe("InvestorController", () => {
  it("should add an investor", async () => {
    const data = { name: "Investor1" };
    (apiClient.post as jest.Mock).mockResolvedValue({ status: 200, data });
    const response = await InvestorController.addInvestor(data);
    expect(response.data).toEqual(data);
  });

  it("should get an investor", async () => {
    const data = { name: "Investor1" };
    (apiClient.get as jest.Mock).mockResolvedValue({ status: 200, data });
    const response = await InvestorController.getInvestor(data);
    expect(response.data).toEqual(data);
  });

  it("should update an investor", async () => {
    const data = { name: "Investor1" };
    (apiClient.patch as jest.Mock).mockResolvedValue({ status: 200, data });
    const response = await InvestorController.updateInvestor(data);
    expect(response.data).toEqual(data);
  });
});
