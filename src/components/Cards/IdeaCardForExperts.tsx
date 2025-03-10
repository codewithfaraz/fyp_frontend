import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "rizzui";
import GetAToast from "../shared/get-a-toast";
import toast from "react-hot-toast";
import { apiClient } from "../../../api/api.config";
import { useMutation, useQuery } from "@tanstack/react-query";

const sendRequest = async function (
  ideaId: string,
  requestMessage: string,
  username: string,
  userType: string,
  innovatorUsername: string
) {
  const response = await apiClient.post("/request/submit-request", {
    ideaId,
    requestMessage,
    username,
    userType,
    innovatorUsername,
  });
  console.log(response);
  return response.data;
};
const getRequests = async function (username: string) {
  const response = await apiClient.get("/request/get-requests", {
    params: { username, userType: "expert" },
  });

  return response.data.data.requests;
};
export default function IdeaCardForExperts({
  idea,
  username,
  userType,
}: {
  idea: any;
  username: string;
  userType: string;
}) {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () => getRequests(username),
    queryKey: ["requests", username],
  });

  const sendRequestMutation = useMutation({
    mutationFn: (messageText: string) =>
      sendRequest(idea._id, messageText, username, userType, idea.username),
    onSuccess: (res) => {
      console.log("sendRequestMutationr", res);
      toast.success("Request sent successfully");
      setIsRequestModalOpen(false);
      refetch();
    },
    onError: () => {
      toast.error("Failed to send request");
    },
  });
  const validateAndSendRequest = () => {
    if (!requestMessage.trim()) {
      setMessageError(true);
      return;
    }

    handleSendRequest();
  };

  const handleSendRequest = () => {
    console.log(idea._id, requestMessage, username, userType, idea.username);
    sendRequestMutation.mutate(requestMessage);
    setRequestMessage("");
    toast.success("Request sent successfully");
    setMessageError(false);
    setIsRequestModalOpen(false);
  };

  return (
    <div
      key={idea._id}
      className="border rounded-lg p-4 hover:border-green-500 transition-colors"
    >
      <GetAToast />
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      >
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-4">
            Send Request to{" "}
            <span className="text-blue-600">{idea.username}</span>
          </h1>

          <div className="mb-4">
            <label
              htmlFor="requestMessage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Message
            </label>
            <textarea
              id="requestMessage"
              rows={4}
              className={`w-full px-3 py-2 border ${
                messageError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Explain why you're interested in this idea..."
              value={requestMessage}
              onChange={(e) => {
                setRequestMessage(e.target.value);
                if (messageError) setMessageError(false);
              }}
            ></textarea>
            {messageError && (
              <p className="mt-1 text-sm text-red-600">
                Please enter your message
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => {
                setMessageError(false);
                setIsRequestModalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={validateAndSendRequest}
            >
              Send Request
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{idea.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{idea.shortDescription}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            idea.stage.value === "refined"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {idea.stage.value === "refined" ? "Refined" : "Needs Review"}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">
            Category:{" "}
            {idea.category.charAt(0).toUpperCase() + idea.category.slice(1)}
          </span>
          <span className="text-gray-500">
            Submitted: {new Date(idea.dateSubmitted).toString().slice(0, 15)}
          </span>
        </div>
        <div className="flex flex-col  items-center justify-center space-x-2">
          <span>
            by{" "}
            <Link
              to={`/profile/${"innovator"}/${idea.username}`}
              className="text-green-900 hover:text-green-700 font-medium underline"
            >
              {idea.username}
            </Link>
          </span>
          {isLoading ? (
            "loading...."
          ) : (
            <div>
              {data.some((request) => request.idea_id === idea._id) ? (
                "Pending Request"
              ) : (
                <button
                  onClick={() => setIsRequestModalOpen(true)}
                  className="text-green-900 hover:text-green-700 font-medium appearance-none bg-transparent border-none cursor-pointer"
                >
                  Request Access{" "}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
