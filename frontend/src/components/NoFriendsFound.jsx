import React from "react";
import { UsersIcon } from "lucide-react";

const NoFriendsFound = () => {
  return (
    <div className="card bg-base-200 border border-base-300 p-6 text-center shadow-md">
      <div className="flex flex-col items-center justify-center space-y-4">
        <UsersIcon className="size-10 text-primary" />
        <h3 className="text-lg font-bold text-white">
          No Astronaut Friends Yet
        </h3>
        <p className="text-sm text-white/70">
          Your zupa is a bit quiet... 🌠<br />
          Start sending signals and connect with fellow Zupans!
        </p>
      </div>
    </div>
  );
};

export default NoFriendsFound;
