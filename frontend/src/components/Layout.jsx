import React from "react";
import Sidebar from "./Sidebar";
import BackgroundParent from "./BackgroundParent";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar />

        <BackgroundParent className="flex-1">
          <main className="flex-1 overflow-y-auto w-full">{children}</main>
        </BackgroundParent>
      </div>
    </div>
  );
};

export default Layout;
