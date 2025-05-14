import { Dropdown, Modal } from "rizzui";
import { Link } from "react-router-dom";
import { HiOutlineBell } from "react-icons/hi";
import { useSelector } from "react-redux";
import { apiClient } from "../../../api/api.config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
const fetchRequests = async function (username: string) {
  const response = await apiClient.get("/request/get-requests", {
    params: { username, userType: "innovator" },
  });
  console.log(response);
  return response.data.data.requests;
};
const acceptRequest = async function (requestId: string) {
  console.log(requestId);
  const response = await apiClient.patch("/request/accept-request", {
    requestId,
  });
  return response;
};
export default function NotificationsDropDown() {
  const user = useSelector((state: any) => state.user.user);
  const [isModal, setIsModal] = useState(false);
  // Sample empty state - you can replace this with your actual data check
  const notifications = [];
  const isEmpty = notifications.length === 0;
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () => fetchRequests(user.username),
    queryKey: ["requests", user.username],
  });
  if (data) {
    console.log("sdfjk", data);
  }
  const sendMutationRequestForIdeaAccept = useMutation({
    mutationFn: (ideaId: string) => acceptRequest(ideaId),
    onSuccess: (res) => {
      console.log("sendRequestMutationr", res);
      toast.success("Request sent successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to send request");
    },
  });
  const handleIdeaAccept = function (id: string) {
    console.log(id);
    sendMutationRequestForIdeaAccept.mutate(id);
    setIsModal(false);
  };
  return (
    <Dropdown placement="bottom-end">
      <Dropdown.Trigger>
        <div className="border rounded-full p-2 hover:bg-gray-100 cursor-pointer">
          <HiOutlineBell className="text-2xl" />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Menu className="w-80 min-h-[200px] !bg-white p-4 shadow-lg rounded-lg">
        <div className="flex items-center justify-between border-b border-b-[#ccc] pb-3 mb-2">
          <h3 className="font-medium">Notifications</h3>
          {!isEmpty && (
            <button className="text-xs text-blue-500 hover:underline">
              Mark all as read
            </button>
          )}
        </div>

        {!isLoading && (
          <>
            {data.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <HiOutlineBell className="text-3xl mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              data.map((request: any) => {
                return (
                  <div
                    key={request._id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">
                          {request.requesterUserName}
                        </span>{" "}
                        has requested to review your idea
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(request.dateOfRequest)
                          .toString()
                          .slice(0, 15)}
                      </p>
                    </div>
                    <button
                      className="text-xs text-blue-500 hover:underline"
                      onClick={() => setIsModal(true)}
                    >
                      View
                    </button>
                    <DropDown
                      request={request}
                      isModalOpen={isModal}
                      setIsModalOpen={setIsModal}
                      handleAccept={handleIdeaAccept}
                    />
                  </div>
                );
              })
            )}
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

const DropDown = ({ isModalOpen, setIsModalOpen, request, handleAccept }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="p-4">
        <h2 className="font-semibold text-lg">Request Details</h2>
        <div className="">
          <div className="flex space-x-3">
            <h1>From</h1>
            <Link to={""} className="text-green-900 underline">
              {request.requesterUserName}
            </Link>
          </div>
          <p className="text-sm text-gray-800">{request.requestMessage}</p>
          <p className="text-xs text-gray-500">
            {new Date(request.dateOfRequest).toString().slice(0, 15)}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => handleAccept(request._id)}
          >
            Accept
          </button>
        </div>
      </div>
    </Modal>
  );
};
