export default function UserProfilePageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header Skeleton */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 animate-pulse">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="h-7 bg-gray-200 rounded w-48 mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded w-40 mt-1"></div>
                    </div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Short Bio Skeleton */}
              <div className="h-5 bg-gray-200 rounded w-3/4 mt-2"></div>

              {/* Location Skeleton */}
              <div className="mt-2 flex items-center">
                <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* About Section Skeleton */}
            <section className="bg-white rounded-lg shadow p-6">
              <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </section>

            {/* Expertise Section Skeleton */}
            <section className="bg-white rounded-lg shadow p-6">
              <div className="h-6 bg-gray-200 rounded w-28 mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded-full w-24"
                  ></div>
                ))}
              </div>
            </section>

            {/* Skills Section Skeleton */}
            <section className="bg-white rounded-lg shadow p-6">
              <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded-full w-20"
                  ></div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div>
            <section className="bg-white rounded-lg shadow p-6">
              <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="space-y-4">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-12 mb-1"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
