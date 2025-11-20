import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center bg-white ">
      <div className="w-screen h-screen md:w-1/2 px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Voteds</h2>
        {children}
      </div>

      <div className="hidden border-[0.5px]  border-orange-200 translate-[-50px] translate-y-1  "></div>

      <div className="hidden md:block -1/2h-screen bg-cover bg-center relative">
        <div className="flex gap-1  h-screen  items-center  ">
          <img
            className="rounded-[200px] h-[550px] w-[350px] "
            src="/man voted2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
