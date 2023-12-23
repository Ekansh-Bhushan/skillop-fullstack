import React from "react";

const ProgressBar = ({ progress }) => {
  const dynamicWidth = `${progress}%`;

  return (
    <div className="fixed left-0 bottom-0 z-100">
      <h1 className="text-center w-[100vw] mb-2 ">
        You are <span className="text-lg font-bold">{progress}% </span>there
      </h1>
      <div
        className="h-[7px] bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 absolute left-0 bottom-0 "
        style={{ width: dynamicWidth }}
      ></div>
    </div>
  );
};

export default ProgressBar;
