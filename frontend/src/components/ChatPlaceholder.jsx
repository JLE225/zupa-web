import React from "react";
import { MessageCircle } from "lucide-react";

const ChatPlaceholder = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center p-10 text-white/50 bg-transparent">
      <MessageCircle className="w-10 h-10 mb-4 opacity-40" />
      <h2 className="text-lg font-semibold">Select a chat to start messaging</h2>
      <p className="text-sm mt-1">Your conversations will appear here.</p>
    </div>
  );
};

export default ChatPlaceholder;
