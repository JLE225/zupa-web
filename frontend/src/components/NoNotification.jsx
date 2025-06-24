import { BellIcon } from "lucide-react";
import React from "react";

const NoNotification = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      {/* Outer space circle */}
      <div className="size-20 rounded-full bg-gradient-to-br from-indigo-900 to-indigo-700 shadow-lg flex items-center justify-center mb-6 relative">
        {/* Decorative stars */}
        <span className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse" />
        <span className="absolute bottom-1 right-2 w-1.5 h-1.5 bg-white rounded-full opacity-30 animate-ping" />
        <BellIcon className="size-9 text-white opacity-60" />
      </div>

      {/* Headline */}
      <h3 className="text-xl font-semibold text-white tracking-wide mb-1">
        All Clear, Commander! 🚀
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-white/60 max-w-sm">
        You have no notifications right now. The galaxy is quiet for now —
        check back later for new friend signals!
      </p>
    </div>
  );
};

export default NoNotification;
