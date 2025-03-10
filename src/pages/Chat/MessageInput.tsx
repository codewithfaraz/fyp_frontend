import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isMobile?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isMobile = false,
}) => {
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;
    onSendMessage(messageInput);
    setMessageInput("");
  };

  return (
    <div
      className={`p-4 border-t border-gray-200 bg-white ${
        isMobile ? "fixed bottom-0 left-0 right-0 w-full" : ""
      }`}
    >
      <div className="flex items-center">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent"
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-900 text-white px-4 py-2 rounded-r-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center min-w-[80px] shadow-sm"
          aria-label="Send message"
        >
          <FiSend className="mr-2" /> Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
