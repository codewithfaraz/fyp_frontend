import UserControllers from "../api/user-controller";
import { apiClient } from "../api/api.config";

jest.mock("../api/api.config");

describe("UserControllers", () => {
  it("should get user roles", async () => {
    const data = { username: "testuser" };
    (apiClient.get as jest.Mock).mockResolvedValue({ status: 200, data });
    const response = await UserControllers.getUserRoles(data);
    expect(response.data).toEqual(data);
  });

  it("should get a user", async () => {
    const data = { username: "testuser" };
    (apiClient.get as jest.Mock).mockResolvedValue({ status: 200, data });
    const response = await UserControllers.getUser(data);
    expect(response.data).toEqual(data);
  });
});
