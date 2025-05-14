import { useNavigate } from "react-router-dom";
export const UserCard = ({
  user,
  userType,
  onReviewClick,
  isReviewButtonVisible,
}: {
  user: any;
  onReviewClick?: (username: string) => void;
  isReviewButtonVisible?: boolean;
  userType: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${userType.toLowerCase()}/${user.username}`);
  };
  const handleReviewClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // This prevents the parent onClick from firing
    if (onReviewClick) {
      onReviewClick(user.username);
    }
  };
  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="p-6">
        {/* Header with Image and Name */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              src={user.imageUrl}
              alt={`faraz maqsood`}
              className="w-16 h-16 rounded-full object-cover border-2 border-green-900"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-500">{user.username}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm font-medium text-green-900 bg-green-100 px-2 py-1 rounded-full">
                {userType}
              </span>
              {userType === "Investor" && user.organizationName && (
                <span className="text-sm text-gray-600">
                  {user.organizationName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        {user.shortBio && (
          <p className="mt-4 text-gray-600 text-sm">{user.shortBio}</p>
        )}

        {/* Location */}
        {(user.city || user.country) && (
          <div className="mt-4 flex items-center text-sm text-gray-500">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {[user.city, user.country].filter(Boolean).join(", ")}
          </div>
        )}

        {/* Expertise/Skills */}
        {user.experties && user.experties.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {user.experties.slice(0, 3).map((exp) => (
              <span
                key={exp}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {exp.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        )}
      </div>
      {isReviewButtonVisible && (
        <div className="mt-4 flex justify-end">
          <button
            className="flex items-center text-sm font-medium text-green-700 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-md transition-colors duration-200"
            onClick={handleReviewClick}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            Add Review
          </button>
        </div>
      )}
    </div>
  );
};
