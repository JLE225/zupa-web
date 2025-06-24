import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { Chat, ChannelList } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import ChatLoader from "../components/ChatLoader";
import ChannelPreview from "../components/ChannelPreview";
import BackgroundParent from "../components/BackgroundParent";
import { dummyChannels } from "../lib/utils";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatList = () => {
  const useDumny = false;
  const { authUser } = useAuthUser();
  const [chatClient, setChatClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: selectedId } = useParams();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initClient = async () => {
      if (!tokenData?.token || !authUser) return;

      const client = StreamChat.getInstance(STREAM_API_KEY);

      await client.connectUser(
        {
          id: authUser._id,
          name: authUser.username,
          image: authUser.profilePicture,
        },
        tokenData.token
      );

      setChatClient(client);
      setLoading(false);
    };

    initClient();
  }, [tokenData, authUser]);

  if (loading || !chatClient) return <ChatLoader />;

  return (
    <Chat client={chatClient}>
      <div className="h-screen flex">
        {/* Sidebar */}
        <div className="w-full max-w-xs border-r border-base-300 flex flex-col">
          <h3 className="text-lg font-semibold text-white px-6 py-4 border-b border-base-300">
            Chats
          </h3>

          {/* Scrollable list */}
          {!useDumny ? (
            <ChannelList
              filters={{ members: { $in: [authUser._id] } }}
              sort={{ last_message_at: -1 }}
              options={{ state: true, presence: true }}
              Preview={(props) => (
                <ChannelPreview {...props} selectedId={selectedId} />
              )}
            />
          ) : (
            <div className="flex-1 overflow-y-auto">
              {dummyChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="w-full px-6 py-4 cursor-pointer hover:bg-base-300 transition-all duration-150"
                  onClick={() => navigate(`/messages/${channel.targetUser.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full">
                        <img
                          src={channel.targetUser.image}
                          alt={channel.targetUser.name}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">
                        {channel.targetUser.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-[200px]">
                        {channel.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content area */}
        <div className="flex-1 relative">
          <BackgroundParent className="h-full">
            <Outlet />
          </BackgroundParent>
        </div>
      </div>
    </Chat>
  );
};

export default ChatList;
