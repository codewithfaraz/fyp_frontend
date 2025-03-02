import { Button } from "rizzui";

export default function UserProfileCardSkeleton() {
  return (
    <div className="border p-3 mr-3">
      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          {/* Avatar skeleton */}
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          <div>
            {/* Name skeleton */}
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            {/* User type skeleton */}
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mt-2"></div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {/* Description skeleton - multiple lines */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="mt-2 space-x-2">
        {/* Skills badges skeleton */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="inline-block h-6 w-16 bg-gray-200 rounded-full animate-pulse mr-2"
          ></div>
        ))}
      </div>
    </div>
  );
}
