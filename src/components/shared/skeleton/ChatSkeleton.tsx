import React from "react";

interface ChatSkeletonProps {
  showMessageArea?: boolean;
}

const ChatSkeleton: React.FC<ChatSkeletonProps> = ({
  showMessageArea = true,
}) => {
  // Create an array of 6 items for the chat list skeleton
  const chatListItems = Array(6).fill(null);

  // Create an array of 4 items for the message skeleton
  const messageItems = Array(4).fill(null);

  return (
    <div className="max-w-[1280px] flex h-full w-full overflow-hidden my-0 mx-auto">
      {/* Chat List Skeleton */}
      <div
        className={`${
          showMessageArea ? "hidden md:flex" : "flex"
        } flex-col w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 h-full`}
      >
        {/* Header Skeleton */}
        <div className="p-4 border-b border-gray-200 bg-green-900">
          <div className="h-6 w-24 bg-green-700 rounded animate-pulse"></div>
        </div>

        {/* Chat List Items Skeleton */}
        <div className="divide-y divide-gray-200 overflow-y-auto">
          {chatListItems.map((_, index) => (
            <div key={index} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {/* Avatar Skeleton */}
                  <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
                  <div className="ml-3">
                    {/* Username Skeleton */}
                    <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                    {/* Message Preview Skeleton */}
                    <div className="h-3 w-32 bg-gray-200 rounded mt-2 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {/* Timestamp Skeleton */}
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                  {/* Unread Badge Skeleton - only show for some items */}
                  {index < 2 && (
                    <div className="mt-1 w-5 h-5 rounded-full bg-gray-300 animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Area Skeleton - only shown if showMessageArea is true */}
      {showMessageArea && (
        <div className="hidden md:flex flex-col w-2/3 lg:w-3/4 h-full">
          {/* Chat Header Skeleton */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center">
              {/* Avatar Skeleton */}
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
              <div className="ml-3">
                {/* Username Skeleton */}
                <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Message Area Skeleton */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messageItems.map((_, index) => {
                const isSelf = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`flex ${
                      isSelf ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        isSelf
                          ? "bg-gray-300 rounded-br-none"
                          : "bg-gray-200 rounded-bl-none"
                      } animate-pulse`}
                    >
                      {/* Message Content Skeleton */}
                      <div
                        className={`h-4 w-${isSelf ? "32" : "48"} bg-gray-${
                          isSelf ? "400" : "300"
                        } rounded mb-2`}
                      ></div>
                      <div
                        className={`h-4 w-${isSelf ? "48" : "32"} bg-gray-${
                          isSelf ? "400" : "300"
                        } rounded mb-2`}
                      ></div>
                      {index % 3 === 0 && (
                        <div
                          className={`h-4 w-24 bg-gray-${
                            isSelf ? "400" : "300"
                          } rounded mb-2`}
                        ></div>
                      )}

                      {/* Timestamp Skeleton */}
                      <div
                        className={`h-3 w-16 bg-gray-${
                          isSelf ? "400" : "300"
                        } rounded mt-1`}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Message Input Skeleton */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <div className="flex-1 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="ml-2 w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSkeleton;
