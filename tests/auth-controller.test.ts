import { jest } from '@jest/globals';
import AuthController from "../api/AuthController";
import { apiClient } from "../api/api.config";

jest.mock("../api/api.config");

describe("AuthController", () => {
  it("should login a user", async () => {
    const data = { email: "test@example.com", password: "password123" };
    (apiClient.post as jest.MockedFunction<typeof apiClient.post>).mockResolvedValue({ status: 200, data });
    const response = await AuthController.userLogin(data);
    expect(response.data).toEqual(data);
  });

  it("should signup a user", async () => {
    const data = { username: "testuser", email: "test@example.com", password: "password123" };
    (apiClient.post as jest.MockedFunction<typeof apiClient.post>).mockResolvedValue({ status: 200, data });
    const response = await AuthController.userSignup(data);
    expect(response.data).toEqual(data);
  });

  it("should update user password", async () => {
    const data = { password: "newpassword123" };
    (apiClient.post as jest.MockedFunction<typeof apiClient.post>).mockResolvedValue({ status: 200, data });
    const response = await AuthController.updatePassword(data);
    expect(response.data).toEqual(data);
  });
});
