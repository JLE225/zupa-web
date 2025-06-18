import React from "react";

const BackgroundParent = ({ children, className="" }) => {
  return (
    <div className={`relative h-screen w-full overflow-hidden ${className}`}>
      <div className="absolute bottom-0 left-[5%] right-0 top-[-10%] h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="absolute bottom-0 right-[-10%] top-[-10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(23,52,182,.15),rgba(255,255,255,0))]"></div>

      {children}
    </div>
  );
};

export default BackgroundParent;
