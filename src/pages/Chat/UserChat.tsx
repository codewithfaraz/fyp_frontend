import React from "react";
import ChatHeader from "./ChatHeader";
import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";
import { useQuery } from "@tanstack/react-query";
import { chatApiClient } from "../../../api/chatApi.config";
const fetchMessages = async function (
  receiverUsername: string,
  senderUsername: string
) {
  console.log(receiverUsername, senderUsername);
};
interface User {
  id: number;
  username: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isSelf: boolean;
}

interface UserChatProps {
  user: User;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onBackClick?: () => void;
  isMobile?: boolean;
  username: string;
  hostUsername: string;
}

const UserChat: React.FC<UserChatProps> = ({
  user,
  hostUsername,
  username,
  messages,
  onSendMessage,
  onBackClick,
  isMobile = false,
}) => {
  console.log(hostUsername, username);
  const { data, isLoading, error } = useQuery({
    queryKey: ["message hostpry", hostUsername, username],
    queryFn: () => fetchMessages(hostUsername, username),
  });
  return (
    <div
      className={`${isMobile ? "flex md:hidden" : "hidden md:flex"} flex-col ${
        isMobile ? "w-full h-screen fixed top-0 left-0 z-10" : "w-2/3 lg:w-3/4"
      } bg-white h-full overflow-hidden`}
    >
      <ChatHeader user={user} isMobile={isMobile} onBackClick={onBackClick} />
      <MessageArea messages={messages} isMobile={isMobile} />
      <MessageInput onSendMessage={onSendMessage} isMobile={isMobile} />
    </div>
  );
};

export default UserChat;
