const IdeaCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
      {/* Image skeleton */}
      <div className="relative h-48 w-full bg-gray-200"></div>

      <div className="p-4">
        {/* Title and category skeleton */}
        <div className="flex justify-between items-start mb-2">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>

        {/* Progress bar skeleton */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full w-full"></div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-gray-200 rounded w-16"></div>
          ))}
        </div>

        {/* Blurred content skeleton */}
        <div className="mt-4 py-3 px-4 bg-gray-100 rounded-md border border-gray-200">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>

        {/* Button skeleton */}
        <div className="mt-4">
          <div className="w-full h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCardSkeleton;
