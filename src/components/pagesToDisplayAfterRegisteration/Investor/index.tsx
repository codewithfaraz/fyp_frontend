import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiClient } from "../../../../api/api.config";
import { useQuery } from "@tanstack/react-query";
import IdeaCardForInvestor from "../../Cards/IdeaCardForInvestor";
import IdeaCardSkeleton from "../../shared/skeleton/IdeaCardSkeleton";
async function fetchIdeas() {
  const response = await apiClient.get(`/innovator/get-refined-ideas`);
  return response.data.data.ideas;
}

const myInvestments = [
  {
    id: "1",
    ideaTitle: "Sustainable Urban Farming Solution",
    category: "Agriculture",
    innovatorName: "Mike Wilson",
    investmentDate: "2024-02-15",
    amount: 100000,
    status: "active" as const,
  },
  {
    id: "2",
    ideaTitle: "Renewable Energy Storage System",
    category: "Energy",
    innovatorName: "Sarah Brown",
    investmentDate: "2024-01-20",
    amount: 150000,
    status: "active" as const,
  },
];
export default function InvestorPage() {
  const user = useSelector((state: any) => state.user.user);

  //fetching ideas
  const { data, isLoading, error } = useQuery({
    queryKey: ["refinedIdeas"], // Unique query key
    queryFn: fetchIdeas, // Your API call function
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Banner */}
      <div className="bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, @{user.username}</h1>
          <p className="text-green-100">
            Discover and invest in promising innovations
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/browse-investments"
              className="flex items-center justify-center p-8 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-700">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Browse Opportunities
                </h3>
                <p className="text-gray-600 mt-2">
                  Discover expert-refined ideas ready for investment
                </p>
              </div>
            </Link>
            <Link
              to="/my-investments"
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  My Portfolio
                </h3>
                <p className="text-gray-600 mt-2">
                  Track your investments and returns
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Featured Investment Opportunities */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Featured Opportunities
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
                    <IdeaCardForInvestor
                      idea={idea}
                      username={user.username}
                      userType={user.role[0]}
                    />
                  );
                })
              : "No ideas found"}
          </div>
        </div>

        {/* Active Investments */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Active Investments
          </h2>
          <div className="space-y-4">
            {myInvestments.map((investment) => (
              <div
                key={investment.id}
                className="border rounded-lg p-4 hover:border-green-500 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {investment.ideaTitle}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Invested in {investment.innovatorName}'s idea
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Active
                    </span>
                    <p className="text-sm font-medium text-gray-900 mt-2">
                      ${investment.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500">
                      Category: {investment.category}
                    </span>
                    <span className="text-gray-500">
                      Since: {investment.investmentDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
