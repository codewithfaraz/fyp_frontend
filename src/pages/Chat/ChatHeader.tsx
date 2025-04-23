interface User {
  id: number;
  username: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface ChatHeaderProps {
  user: User;
  isMobile?: boolean;
  onBackClick?: () => void;
  username: string;
  hostUsername: string;
}

export default function ChatHeader({
  user,
  isMobile = false,
  onBackClick,
  username,
  hostUsername,
}: ChatHeaderProps) {
  console.log(user);
  return (
    <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        {isMobile && (
          <button onClick={onBackClick} className="mr-2 text-gray-600">
            ←
          </button>
        )}
        <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">
          {user.lastMessage.senderUserName === hostUsername ? (
            <div>{user.lastMessage.receiverUserName.charAt(0)}</div>
          ) : (
            <div>{user.lastMessage.senderUserName.charAt(0)}</div>
          )}
          {/* {user.lastMessage.senderUserName.charAt(0)} */}
        </div>
        <h2 className="ml-3 text-xl font-semibold">
          {user.lastMessage.senderUserName === hostUsername ? (
            <div>{user.lastMessage.receiverUserName}</div>
          ) : (
            <div>{user.lastMessage.senderUserName}</div>
          )}
          {/* {user.lastMessage.senderUserName} */}
        </h2>
      </div>
    </div>
  );
}
