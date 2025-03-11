import { Link } from "react-router-dom";
export default function IdeaCardForExpertWithPermission({
  idea,
}: {
  idea: any;
}) {
  return (
    <div
      key={idea.id}
      className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{idea.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{idea.shortDescription}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            idea.status === "in_progress"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {idea.status === "in_progress" ? "In Progress" : "Pending Review"}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Category: {idea.category}</span>
          <Link
            to={`/profile/${"innovator"}/${idea.username}`}
            className="text-green-900 hover:text-green-700 font-medium underline"
          >
            {idea.username}
          </Link>
        </div>
        <Link
          to={`/review-idea/${idea.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Start Review →
        </Link>
      </div>
    </div>
  );
}
