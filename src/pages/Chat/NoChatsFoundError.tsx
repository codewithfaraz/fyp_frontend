import { useEffect, useState } from "react";

const ChatSidebar = () => {
  const [bounceAnimation, setBounceAnimation] = useState(false);

  // Simple animation effect that triggers every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBounceAnimation(true);
      setTimeout(() => setBounceAnimation(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-green-900 text-white">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>

      {/* Centered Content */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div
          className={
            bounceAnimation
              ? "transform -translate-y-2 transition-transform"
              : "transition-transform"
          }
        >
          <span className="text-5xl mb-4 block">💬</span>
        </div>
        <h1 className="text-gray-500 mt-4">No Chats found</h1>
        <p className="text-gray-400 text-sm mt-2">Start a new conversation</p>
      </div>
    </div>
  );
};

export default ChatSidebar;
