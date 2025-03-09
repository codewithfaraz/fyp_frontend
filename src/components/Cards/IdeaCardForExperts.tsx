import { Link } from "react-router-dom";
import GetAToast from "../shared/get-a-toast";
import toast from "react-hot-toast";
const RequestModal = function () {
  toast.success("Request Sent");
};
export default function IdeaCardForExperts({ idea }: { idea: any }) {
  return (
    <div
      key={idea._id}
      className="border rounded-lg p-4 hover:border-green-500 transition-colors"
    >
      <GetAToast />
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
          <button
            onClick={RequestModal}
            className="text-green-900 hover:text-green-700 font-medium appearance-none bg-transparent border-none cursor-pointer"
          >
            Request Access{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
