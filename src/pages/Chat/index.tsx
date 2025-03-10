import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { chatApiClient } from "../../../api/chatApi.config";
import { useQuery } from "@tanstack/react-query";
import ChatList from "./ChatList";
import UserChat from "./UserChat";
import ChatSidebar from "./NoChatsFoundError";
import ChatSkeleton from "../../components/shared/skeleton/ChatSkeleton";
// Mock data for users and chats

const fetchConversations = async function (username: string) {
  const response = await chatApiClient.get("/get-conversations", {
    params: {
      username,
    },
  });
  return response.data.data.conversations;
};

const mockUsers = [
  {
    id: 1,
    username: "JohnDoe",
    lastMessage: "Hey, how are you?",
    timestamp: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    username: "JaneSmith",
    lastMessage: "Can we meet tomorrow?",
    timestamp: "9:15 AM",
    unread: 0,
  },
  {
    id: 3,
    username: "MikeJohnson",
    lastMessage: "The project looks great!",
    timestamp: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    username: "SarahWilliams",
    lastMessage: "Thanks for your help!",
    timestamp: "Yesterday",
    unread: 1,
  },
  {
    id: 5,
    username: "DavidBrown",
    lastMessage: "Let me check and get back to you",
    timestamp: "Monday",
    unread: 0,
  },
  {
    id: 6,
    username: "DavidBrown",
    lastMessage: "Let me check and get back to you",
    timestamp: "Monday",
    unread: 0,
  },
  {
    id: 7,
    username: "DavidBrown",
    lastMessage: "Let me check and get back to you",
    timestamp: "Monday",
    unread: 0,
  },
  {
    id: 8,
    username: "DavidBrown",
    lastMessage: "Let me check and get back to you",
    timestamp: "Monday",
    unread: 0,
  },
  {
    id: 9,
    username: "DavidBrown",
    lastMessage: "Let me check and get back to you",
    timestamp: "Monday",
    unread: 0,
  },
  {
    id: 10,
    username: "DavidBrown",
    lastMessage: "Let me check and get back to you",
    timestamp: "Monday",
    unread: 0,
  },
];

const mockMessages = {
  1: [
    {
      id: 1,
      sender: "JohnDoe",
      content: "Hey, how are you?",
      timestamp: "10:30 AM",
      isSelf: false,
    },
    {
      id: 2,
      sender: "You",
      content: "I'm good, thanks! How about you?",
      timestamp: "10:32 AM",
      isSelf: true,
    },
    {
      id: 3,
      sender: "JohnDoe",
      content: "Doing well. Working on that new project.",
      timestamp: "10:33 AM",
      isSelf: false,
    },
    {
      id: 4,
      sender: "You",
      content: "That sounds interesting! Tell me more about it.",
      timestamp: "10:35 AM",
      isSelf: true,
    },
  ],
  2: [
    {
      id: 1,
      sender: "JaneSmith",
      content: "Hi there!",
      timestamp: "9:10 AM",
      isSelf: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Hello Jane!",
      timestamp: "9:12 AM",
      isSelf: true,
    },
    {
      id: 3,
      sender: "JaneSmith",
      content: "Can we meet tomorrow?",
      timestamp: "9:15 AM",
      isSelf: false,
    },
  ],
};
export default function ChatPage() {
  const { username } = useParams();
  const user = useSelector((state: any) => state.user.user);
  const {
    data: fetchedConversations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["conversations", user.username],
    queryFn: () => fetchConversations(user.username),
  });
  const [selectedUser, setSelectedUser] = useState(
    fetchedConversations.length > 0 ? fetchedConversations[0] : null
  );

  useEffect(() => {
    if (fetchConversations.length > 0) {
      setSelectedUser(fetchedConversations[0]);
    }
  }, [fetchedConversations]);
  // Removed unused state variable 'messageInput'
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = (message: string) => {
    if (message.trim() === "") return;

    const newMessage = {
      id: messages[selectedUser.id as keyof typeof messages]?.length + 1 || 1,
      sender: "You",
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSelf: true,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id as keyof typeof messages]: [
        ...(prev[selectedUser.id as keyof typeof messages] || []),
        newMessage,
      ],
    }));
  };
  if (fetchConversations.length > 0) {
    console.log(fetchConversations);
  }
  if (isLoading) {
    return <ChatSkeleton />;
  } else
    return (
      <div className="max-w-[1280px] flex h-screen overflow-hidden bg-gray-100 my-0 mx-auto">
        {/* Left sidebar - User list */}
        {fetchedConversations.length > 0 ? (
          <ChatList
            username={user.username}
            users={fetchedConversations}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
        ) : (
          <ChatSidebar />
        )}

        {/* Desktop chat view */}
        {selectedUser && (
          <UserChat
            username={username}
            hostUsername={username}
            user={selectedUser}
            messages={messages[selectedUser.id as keyof typeof messages] || []}
            onSendMessage={handleSendMessage}
          />
        )}

        {/* Mobile chat view */}
        {selectedUser && (
          <UserChat
            user={selectedUser}
            messages={messages[selectedUser.id as keyof typeof messages] || []}
            onSendMessage={handleSendMessage}
            onBackClick={() => setSelectedUser(mockUsers[0])}
            isMobile={true}
          />
        )}
      </div>
    );
}
