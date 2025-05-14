import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "rizzui";
import IdeaCard from "../../Cards/IdeaCard";
import { apiClient } from "../../../../api/api.config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import UserProfileCardSkeleton from "../../shared/skeleton/UserProfileCardSkeleton";
import { UserCard } from "../../shared/Users/userProfileCard";
import IdeaCardSkeleton from "../../shared/skeleton/IdeaCardSkeleton";
import toast from "react-hot-toast";
import GetAToast from "../../shared/get-a-toast";
//fetch new experts
async function addReview(givenBy: string, givenTo: string, text: string) {
  const response = await apiClient.post("/reviews/add-review", {
    reviewText: text,
    givenTo,
    givenBy,
  });

  return response.status;
}
async function fetchExperts() {
  const response = await apiClient.get("/expert/new");
  return response.data.data.experts; // Adjust based on your API response structure
}
async function fetchIdeas(username: string) {
  const response = await apiClient.get(`/innovator/get-ideas`, {
    params: { username: username },
  });
  return response.data.data.ideas;
}
async function fetchExpertsWorkingOnIdeas(username: string) {
  const response = await apiClient.get("/innovator/get-refiningExperts", {
    params: { username: username },
  });
  // console.log(response.data);
  return response.data.data.experts;
}

export default function InnovatorPage() {
  const sendRequestMutation = useMutation({
    mutationFn: ({
      givenBy,
      givenTo,
      reviewText,
    }: {
      reviewText: string;
      givenBy: string;
      givenTo: string;
    }) => addReview(givenBy, givenTo, reviewText),
    onSuccess: (res) => {
      console.log("sendRequestMutationr", res);
      if (res === 201) {
        toast.error("U have already give review to this expert");
      } else if (res === 200) {
        toast.success("Request sent successfully");
      }
    },
    onError: () => {
      toast.error("Failed to send request");
    },
  });
  const [isReviewClick, setIsReviewClick] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewGivenTo, setReviewGivenTo] = useState("");
  const user = useSelector((state: any) => state.user.user);
  const { data, isLoading, error } = useQuery({
    queryKey: ["experts"], // Unique query key
    queryFn: fetchExperts, // Your API call function
    staleTime: 5 * 60 * 1000,
  });
  const {
    data: fetchUserIdeas,
    isLoading: fetchIdeasIsLoading,
    error: fetchIdeasError,
  } = useQuery({
    queryKey: ["ideas", user.username], // Unique query key
    queryFn: () => fetchIdeas(user.username), // Your API call function
    staleTime: 5 * 60 * 1000,
  });
  const {
    data: workingExperts,
    isLoading: workinExpertsIsLoading,
    error: workingExpertsError,
  } = useQuery({
    queryKey: ["workingExperts", user.username],
    queryFn: () => fetchExpertsWorkingOnIdeas(user.username), // Your API call function
    staleTime: 5 * 60 * 1000,
  });

  if (workingExperts) {
    console.log(workingExperts);
  }
  const handleReviewButtonClick = (username: string) => {
    setReviewGivenTo(username);
    setIsReviewClick(true);
    console.log("Review button clicked");
  };
  const submitReview = () => {
    console.log(reviewText, reviewGivenTo, user.username);
    sendRequestMutation.mutate({
      givenBy: user.username,
      reviewText,
      givenTo: reviewGivenTo,
    });
    setIsReviewClick(false);
    setReviewText("");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Banner */}
      <GetAToast />
      <Modal isOpen={isReviewClick} onClose={() => setIsReviewClick(false)}>
        <div className="p-6">
          <div className="mb-4">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Review
            </label>
            <textarea
              id="review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Share your experience..."
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsReviewClick(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={submitReview}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200"
            >
              Submit Review
            </button>
          </div>
        </div>
      </Modal>
      <div className="bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, @{user.username}</h1>
          <p className="text-green-100">
            Transform your innovative ideas into reality
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/innovator/start-a-project"
              className="flex items-center justify-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-green-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-800">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Submit New Idea</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Share your innovation with the world
                </p>
              </div>
            </Link>
            <Link
              to="/find-expert"
              className="flex items-center justify-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-700">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Find an Expert</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Get professional guidance
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* My Ideas Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Ideas</h2>
            <Link
              to="/innovator/start-a-project"
              className="text-green-900 hover:text-green-700 text-sm font-medium"
            >
              + Submit New Idea
            </Link>
          </div>
          {fetchIdeasIsLoading ? (
            [1, 2, 3].map((i) => {
              return <IdeaCardSkeleton key={i} />;
            })
          ) : fetchUserIdeas.length > 0 ? (
            <div className="space-y-4">
              {fetchUserIdeas.map((idea) => (
                <IdeaCard idea={idea} />
              ))}
            </div>
          ) : (
            "No ideas found"
          )}
        </div>

        {/* Recommended Experts */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Experts Working on Your Ideas
          </h2>
          <div className="flex flex-wrap gap-4">
            {workinExpertsIsLoading ? (
              <div className="flex flex-wrap gap-4">
                {[1, 2, 3].map((i) => {
                  return <UserProfileCardSkeleton key={i} />;
                })}
              </div>
            ) : workingExpertsError ? (
              <div>
                <h1 className="text-red-500">
                  {error instanceof Error
                    ? workingExpertsError.message
                    : "An error occurred"}
                </h1>
              </div> // Handle error state
            ) : workingExperts.length > 0 ? (
              workingExperts.map((user: any) => (
                <UserCard
                  user={user}
                  key={user.id}
                  userType="Expert"
                  onReviewClick={handleReviewButtonClick}
                  isReviewButtonVisible={true}
                />
              ))
            ) : (
              <div>
                <h1 className="text-[#727077]">No Innovator found</h1>
              </div> // Handle empty state
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
