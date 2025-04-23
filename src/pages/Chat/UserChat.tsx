import React from "react";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";
import { useQuery, useMutation } from "@tanstack/react-query";
import { chatApiClient } from "../../../api/chatApi.config";
import socket from "./Soceket";
const fetchMessages = async function (
  receiverUsername: string,
  senderUsername: string
) {
  const response = await chatApiClient.get("/get-messages", {
    params: {
      receiverUsername,
      senderUsername,
    },
  });
  return response.data.data.messages;
};
const sendMessage = async function (
  //investor as receiver and innovator as sender
  messageText: string,
  receiverUserName: string,
  senderUserName: string
) {
  const response = await chatApiClient.post("/add-message", {
    messageText,
    receiverUserName,
    senderUserName,
  });
  return response;
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
  user: any;
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
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["messages", user.participants[0], user.participants[1]],
    queryFn: () => fetchMessages(user.participants[0], user.participants[1]),
  });

  const sendMutationRequest = useMutation({
    mutationFn: ({
      messageText,
      receiverUserName,
      hostUserName,
    }: {
      messageText: string;
      receiverUserName: string;
      hostUserName: string;
    }) => sendMessage(messageText, receiverUserName, hostUserName),
    onSuccess: (res) => {
      console.log("sendMutationRequest", res);
      console.log(
        "@ndjk",
        res.data.data.receiverUserName || user.participants[0] === hostUsername
          ? user.participants[1]
          : user.participants[0]
      );
      socket.emit(
        "send-message",
        {
          receiverUsername:
            res.data.data.receiverUserName ||
            user.participants[0] === hostUsername
              ? user.participants[1]
              : user.participants[0],
          senderUsername: hostUsername,
          message: "hjkh",
        },
        () => {
          console.log("message sent");
          refetch();
        }
      );
    },
    onError: () => {
      console.log("Failed to send message");
    },
  });

  console.log(hostUsername, user.lastMessage.senderUserName);
  //this is the place where we have to send message to backend and then refetch it
  const handleMessage = async function (messageText: string) {
    if (!username) {
      const receiver =
        user.participants[0] === hostUsername
          ? user.participants[1]
          : user.participants[0];
      sendMutationRequest.mutate({
        messageText: messageText,
        receiverUserName: receiver,
        hostUserName: hostUsername,
      });
    } else {
      sendMutationRequest.mutate({
        messageText: messageText,
        receiverUserName: username,
        hostUserName: hostUsername,
      });
    }
  };
  if (data) {
    console.log(data);
  }
  useEffect(() => {
    socket.emit("register-user", hostUsername);
    socket.off("receive-message", () => console.log("hellow"));
    socket.on("receive-message", (data) => {
      console.log(data);
      refetch();
    });
  }, []);
  return (
    <div
      className={`${isMobile ? "flex md:hidden" : "hidden md:flex"} flex-col ${
        isMobile ? "w-full h-screen fixed top-0 left-0 z-10" : "w-2/3 lg:w-3/4"
      } bg-white h-full overflow-hidden`}
    >
      <ChatHeader
        user={user}
        isMobile={isMobile}
        onBackClick={onBackClick}
        username={username}
        hostUsername={hostUsername}
      />
      <MessageArea messages={data} isMobile={isMobile} />
      <MessageInput onSendMessage={handleMessage} isMobile={isMobile} />
    </div>
  );
};

export default UserChat;
