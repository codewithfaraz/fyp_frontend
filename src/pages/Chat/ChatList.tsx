import React from "react";

// interface User {
//   id: number;
//   username: string;
//   lastMessage: string;
//   timestamp: string;
//   unread: number;
// }

interface ChatListProps {
  users: any;
  selectedUser: any | null;
  onSelectUser: (user: any) => void;
  username: string;
}

const ChatList: React.FC<ChatListProps> = ({
  users,
  selectedUser,
  onSelectUser,
  username,
}) => {
  console.log(users);
  return (
    <div
      className={`${
        selectedUser ? "hidden md:block" : "block"
      } flex-col w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 overflow-y-auto h-full`}
    >
      <div className="p-4 border-b border-gray-200 bg-green-900 text-white">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {users.map((user) => (
          <div
            key={user._id}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              selectedUser?._id === user._id ? "bg-gray-100" : ""
            }`}
            onClick={() => onSelectUser(user)}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">
                  {username.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">
                    {user.lastMessage.senderUserName}
                  </h3>
                  <p className="text-sm text-gray-500 truncate max-w-[150px]">
                    {user.lastMessage.messageText}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">
                  {new Date(user.updatedAt).toISOString().split("T")[0]}
                </span>
                {/* {user.unread > 0 && (
                  <span className="mt-1 bg-green-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {user.unread}
                  </span>
                )} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
