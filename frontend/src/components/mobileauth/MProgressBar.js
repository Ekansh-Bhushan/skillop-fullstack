import React from "react";

const MProgressBar = ({ progress }) => {
  const dynamicWidth = `${progress}%`;
  return (
    <div className="relative flex items-center justify-center w-full mt-3 mb-5 text-[#5F5F5F]">
      <div className="bg-[#D9D9D9ED] h-[5px] w-full absolute left-0 bottom-0 top-2"></div>
      <div
        className="h-[5px] top-2 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 absolute left-0 bottom-0"
        style={{ width: dynamicWidth }}
      ></div>
      <h1 className="text-center w-full mb-2 absolute top-4 text-base">
        You are <span className="text-md font-bold">{progress}% </span>there
      </h1>
    </div>
  );
};

export default MProgressBar;
