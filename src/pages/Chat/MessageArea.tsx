import { useSelector } from "react-redux";
interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isSelf: boolean;
}

interface MessageAreaProps {
  messages: Message[];
  isMobile?: boolean;
}

export default function MessageArea({
  messages,
  isMobile = false,
}: MessageAreaProps) {
  const user = useSelector((state: any) => state.user.user);
  return (
    <div
      className={`${isMobile ? "" : "flex-1"} p-4 overflow-y-auto bg-gray-50 ${
        isMobile ? 'style={{ height: "calc(100vh - 136px)" }}' : ""
      }`}
    >
      <div className="space-y-4">
        {messages?.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              user.username === message.senderUserName
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[${isMobile ? "80%" : "70%"}] p-3 rounded-lg ${
                user.username === message.senderUserName
                  ? "bg-green-900 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow"
              }`}
            >
              <p>{message.messageText}</p>
              <p
                className={`text-xs mt-1 ${
                  message.isSelf ? "text-green-100" : "text-gray-500"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
