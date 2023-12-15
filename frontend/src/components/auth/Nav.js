import React from "react";
import coolimg from "../../components/images/logo.png";

const Nav = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-[20vh] border-b-2 py-3">
        <div className="flex items-center justify-center gap-3">
          {" "}
          <img src={coolimg} />
          <h1 className="font-bold text-2xl">SKILLOP</h1>
        </div>
        <div className=" gap-5 hidden">
          <button className="py-2 px-9 rounded-xl text-sm font-bold shadow-md bg-[#FFB800]">
            Sign Up
          </button>
          <button className="border-2 border-black py-2 px-9 rounded-xl text-md font-bold">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
