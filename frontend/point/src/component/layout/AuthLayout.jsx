import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-1/2 px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Polling App</h2>
        {children}
      </div>
      <div className="hidden md:block -1/2 h-screen bg-sky-50 bg-cover bg-center overflow-hidden relative">
        <div className="flex gap-1 items-center h-screen w-[650px] ">
          <img
            src="https://cdn.dribbble.com/userupload/41530982/file/original-45cd708e2e79d4f9f8a7f70c81687e8f.gif"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
