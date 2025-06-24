import React from "react";
import { useNavigate } from "react-router";
import { useChatContext } from "stream-chat-react";

const ChannelPreview = ({ channel, setActiveChannel, selectedId }) => {
  const { client } = useChatContext();
  const navigate = useNavigate();

  const members = Object.values(channel.state.members).filter(
    (member) => member.user.id !== client.userID
  );

  const targetUser = members[0]?.user;

  const isSelected =
    channel.id === [client.userID, targetUser.id].sort().join("-");

  const lastMessage =
    channel.state.messages?.length > 0
      ? channel.state.messages[channel.state.messages.length - 1]
      : null;

  const handleClick = () => {
    setActiveChannel(channel);
    navigate(`/messages/${targetUser.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full px-6 py-4 cursor-pointer transition-all duration-150 hover:bg-base-300 ${
        isSelected ? "bg-base-300" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full">
            <img
              src={targetUser.image || "/defaultAvatar.jpg"}
              alt={targetUser.name}
            />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-white font-medium">{targetUser.name}</p>
          <p className="text-xs text-gray-400 truncate max-w-[200px]">
            {lastMessage?.text || "No messages yet"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChannelPreview;
