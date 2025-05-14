import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../../api/api.config";
import IdeaCardForExperts from "../../Cards/IdeaCardForExperts";
import IdeaCardSkeleton from "../../shared/skeleton/IdeaCardSkeleton";
import IdeaCardForExpertWithPermission from "../../Cards/IdeaCardForExpertWithPermissionToSeeIdea";
// Sample data - replace with API calls
async function fetchIdeas() {
  const response = await apiClient.get(`/innovator/get-refining-ideas`);
  return response.data.data.ideas;
}
const getAcceptedRequests = async function (username: string) {
  const response = await apiClient.get(
    "/innovator/get-accepted-request-ideas",
    {
      params: { username, userType: "expert" },
    }
  );
  console.log(response);
  return response;
};

const myReviews = [
  {
    id: "1",
    ideaTitle: "Sustainable Urban Farming Solution",
    category: "Agriculture",
    innovatorName: "Mike Wilson",
    dateReviewed: "2024-03-01",
    status: "completed" as const,
  },
  {
    id: "2",
    ideaTitle: "Renewable Energy Storage System",
    category: "Energy",
    innovatorName: "Sarah Brown",
    dateReviewed: "2024-02-28",
    status: "completed" as const,
  },
];
export default function ExpertPage() {
  const user = useSelector((state: any) => state.user.user);
  const { data, isLoading, error } = useQuery({
    queryKey: ["refiningIdeas"], // Unique query key
    queryFn: fetchIdeas, // Your API call function
    staleTime: 5 * 60 * 1000,
  });
  const {
    data: acceptedRequests,
    isLoading: acceptedRequestsIsLoading,
    error: acceptedRequestsError,
  } = useQuery({
    queryKey: ["acceptedRequests", user.username],
    queryFn: () => getAcceptedRequests(user.username),
  });
  //these are the ideas that we have to display under refinedment ideas
  if (acceptedRequests) {
    console.log(acceptedRequests);
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Banner */}
      <div className="bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Welcome @{user.username}!</h1>
          <p className="text-green-100">
            Help shape the future by reviewing innovative ideas
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/browse-ideas"
              className="flex items-center justify-center p-8 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Browse Ideas
                </h3>
                <p className="text-gray-600 mt-2">
                  Find ideas that match your expertise
                </p>
              </div>
            </Link>
            <Link
              to="/my-reviews"
              className="flex items-center justify-center p-8 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-800">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  My Reviews
                </h3>
                <p className="text-gray-600 mt-2">
                  Track your review history and progress
                </p>
              </div>
            </Link>
          </div>
        </div>
        {/* latest ideas */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Latest Ideas to work on
            </h2>
          </div>
          <div className="space-y-4">
            {isLoading
              ? [1, 2, 3].map((i) => {
                  return <IdeaCardSkeleton key={i} />;
                })
              : data.length > 0
              ? data.map((idea) => {
                  return (
                    <IdeaCardForExperts
                      idea={idea}
                      username={user.username}
                      userType={user.role[0]}
                    />
                  );
                })
              : "No ideas found"}
          </div>
        </div>
        {/* Ideas Pending Review */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Ideas Under Refinement
            </h2>
          </div>
          <div className="space-y-4">
            {acceptedRequestsIsLoading
              ? [1, 2, 3].map((i) => {
                  return <IdeaCardSkeleton key={i} />;
                })
              : acceptedRequests?.data.data.ideas.map((idea) => {
                  return <IdeaCardForExpertWithPermission idea={idea} />;
                })}
          </div>
        </div>
        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recent Refined Ideas
          </h2>
          <div className="space-y-4">
            {myReviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-lg p-4 hover:border-green-500 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {review.ideaTitle}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Reviewed for {review.innovatorName}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Completed
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500">
                      Category: {review.category}
                    </span>
                    <span className="text-gray-500">
                      Date: {review.dateReviewed}
                    </span>
                  </div>
                  <Link
                    to={`/review/${review.id}`}
                    className="text-green-900 hover:text-green-700 font-medium"
                  >
                    View Review →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
