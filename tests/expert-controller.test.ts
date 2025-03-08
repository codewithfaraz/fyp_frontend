import ExpertController from "../api/expert-controller";
import { apiClient } from "../api/api.config";

jest.mock("../api/api.config");

describe("ExpertController", () => {
  it("should add an expert", async () => {
    const data = { name: "Expert1" };
    (apiClient.post as jest.Mock).mockResolvedValue({ status: 200, data });
    const response = await ExpertController.addExpert(data);
    expect(response.data).toEqual(data);
  });

  it("should get an expert", async () => {
    const data = { name: "Expert1" };
    (apiClient.get as jest.Mock).mockResolvedValue({ status: 200, data });
    const response = await ExpertController.getExpert(data);
    expect(response.data).toEqual(data);
  });

  it("should update an expert", async () => {
    const data = { name: "Expert1" };
    (apiClient.patch as jest.Mock).mockResolvedValue({ status: 200, data });
    const response = await ExpertController.updateExpert(data);
    expect(response.data).toEqual(data);
  });
});
