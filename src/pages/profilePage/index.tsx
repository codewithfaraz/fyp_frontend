import { useParams } from "react-router-dom";
import { apiClient } from "../../../api/api.config";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import UserProfilePageSkeleton from "../../components/shared/skeleton/UserProfilePageSkeleton";
// import { User } from "../types/user";
//function to fetch user data from the server
const fetchReviews = async function (username: string) {
  const response = await apiClient.get("/reviews/get-reviews", {
    params: { username },
  });
  console.log(response.data.data.reviews);
  return response.data.data.reviews;
};
async function fetchUser(
  username: string | undefined,
  userType: string | undefined
) {
  if (userType === "innovator") {
    const response = await apiClient.get(`/innovator/get-innovator`, {
      params: { username },
    });
    return response.data.data.innovator;
  } else if (userType === "expert") {
    const response = await apiClient.get(`/expert/get-expert`, {
      params: { username },
    });
    return response.data.data.expert;
  } else {
    const response = await apiClient.get(`/investor/get-investor`, {
      params: { username },
    });
    return response.data.data.investor;
  }
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { username, usertype } = useParams();
  const { data: reviews, isLoading: reviewsIsLoading } = useQuery({
    queryKey: ["reviews", username],
    queryFn: () => fetchReviews(username),
  });
  if (reviews) {
    console.log(reviews);
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", username, usertype],
    queryFn: () => fetchUser(username, usertype),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
  if (data) {
    console.log(data);
  }

  if (isLoading) {
    return <UserProfilePageSkeleton />;
  }
  return (
    <div>
      <div className="min-h-screen bg-gray-50 pt-6">
        <div className="max-w-6xl mx-auto px-4">
          {/* Profile Header with Message Button */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-start space-x-6">
              <img
                src={data.imageUrl}
                alt={`${data.firstName} ${data.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-4">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                          {data.firstName} {data.lastName}
                        </h1>
                        <p className="text-gray-600">@{data.username}</p>
                        {usertype === "investor" && data.organizationName && (
                          <p className="text-gray-800 font-medium mt-1">
                            {data.organizationName}
                          </p>
                        )}
                      </div>
                      <span
                        className={`${
                          usertype === "expert"
                            ? "bg-blue-600"
                            : usertype === "innovator"
                            ? "bg-green-600"
                            : "bg-purple-600"
                        } px-3 py-1 rounded-full text-sm font-medium (
                        user.type
                      )}`}
                      >
                        {usertype &&
                          usertype.charAt(0).toUpperCase() + usertype.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button
                    // here do somthing
                    onClick={() => {
                      console.log(usertype);
                      console.log(data.username);
                      const navigateTo = `/profile/${usertype?.toLowerCase()}/${
                        data.username
                      }`;
                      console.log(navigateTo);
                      return navigate(`/messages/${data.username}`);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors duration-200 ${
                      usertype === "investor"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : usertype === "expert"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    {/* here we have to do something */}
                    <span>Message</span>
                  </button>
                </div>

                {/* Very Short Bio - 20 chars */}
                {data.shortBio && (
                  <p className="text-gray-900 mt-2 font-medium">
                    {data.shortBio}
                  </p>
                )}

                {(data.city || data.country) && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    {[data.city, data.country].filter(Boolean).join(", ")}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - About, Expertise & Skills */}
            <div className="md:col-span-2 space-y-6">
              {/* About Section with 200-char bio */}
              <section className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">About</h2>
                <div
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: data.profileDescription }}
                />
              </section>

              {/* Expertise */}
              {data.experties && data.experties.length > 0 && (
                <section className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.experties.map((exp) => (
                      <span
                        key={exp}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {(exp.charAt(0).toUpperCase() + exp.slice(1)).replace(
                          /_/g,
                          " "
                        )}
                      </span>
                    ))}
                  </div>
                </section>
              )}
              {usertype === "expert" && (
                <section className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Reviews
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {!reviewsIsLoading &&
                      reviews.map((review) => (
                        <div className="bg-white rounded-lg shadow-md p-6 w-full">
                          {/* Review Text */}
                          <p className="text-gray-700 text-base font-medium">
                            {review.reviewText}
                          </p>

                          {/* Reviewer Name and Date */}
                          <div className="flex flex-col mt-2 text-sm text-gray-500">
                            <span>{review.givenBy}</span>
                            <span>
                              {
                                new Date(review.date)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              )}
              {/* Skills */}
              {data.skills && data.skills.length > 0 && (
                <section className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.skills &&
                      data.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                        >
                          {(
                            skill.charAt(0).toUpperCase() + skill.slice(1)
                          ).replace(/_/g, " ")}
                        </span>
                      ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Details */}
            <div>
              <section className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Details
                </h2>
                <div className="space-y-4">
                  {data.dateOfBirth && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Age</h3>
                      <p className="text-gray-900">
                        {new Date().getFullYear() -
                          new Date(data.dateOfBirth).getFullYear()}{" "}
                        years
                      </p>
                    </div>
                  )}
                  {data.yearsOfExperience && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Experience
                      </h3>
                      <p className="text-gray-900">{data.yearsOfExperience}</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
