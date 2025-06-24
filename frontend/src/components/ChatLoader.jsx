import React from "react";
import { Sparkles, LoaderIcon } from "lucide-react"; // opsional: efek bintang

const ChatLoader = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-900 to-black text-white p-4 space-y-4">
      {/* Spinning signal icon */}
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
        <LoaderIcon className="absolute size-7 text-indigo-300 animate-pulse" />
        {/* Sparkle stars */}
        <Sparkles className="absolute -top-5 -left-5 size-4 text-white/30 animate-ping" />
        <Sparkles className="absolute bottom-0 right-0 size-3 text-white/40 animate-pulse" />
      </div>

      {/* Text: connection status */}
      <div className="text-center">
        <p className="text-lg font-medium tracking-wide">
          Establishing Connection...
        </p>
        <p className="text-sm text-white/60 mt-1">
          Searching for intelligent life in your chat space 🌌
        </p>
      </div>
    </div>
  );
};

export default ChatLoader;
