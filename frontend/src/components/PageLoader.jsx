import React from "react";
import BackgroundParent from "./BackgroundParent";

const PageLoader = () => {
  return (
    <BackgroundParent className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-primary/30 z-0" />
        <div className="absolute inset-0 border-4 border-t-primary border-l-transparent border-b-transparent border-r-transparent rounded-full animate-spin-slow z-10" />
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-primary tracking-widest">
          Zupa
        </h1>
        <p className="text-sm text-white/70 animate-pulse">
          Connecting to the universe...
        </p>
      </div>
    </BackgroundParent>
  );
};

export default PageLoader;
