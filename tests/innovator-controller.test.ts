import InnovatorController from "../api/innovator-controller";
import { apiClient } from "../api/api.config";

jest.mock("../api/api.config");

describe("InnovatorController", () => {
  it("should add an innovator", async () => {
    const data = { name: "Innovator1" };
    (apiClient.post as jest.Mock).mockResolvedValue({ status: 200, data });
    const response = await InnovatorController.addInnovator(data);
    expect(response.data).toEqual(data);
  });

  it("should get an innovator", async () => {
    const data = { name: "Innovator1" };
    (apiClient.get as jest.Mock).mockResolvedValue({ status: 200, data });
    const response = await InnovatorController.getInnovator(data);
    expect(response.data).toEqual(data);
  });

  it("should update an innovator", async () => {
    const data = { name: "Innovator1" };
    (apiClient.patch as jest.Mock).mockResolvedValue({ status: 200, data });
    const response = await InnovatorController.updateInnovator(data);
    expect(response.data).toEqual(data);
  });
});
