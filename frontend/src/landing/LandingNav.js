import React from "react";
import coolimg from "../components/images/logo.png";

const LandingNav = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-[20vh] border-b-2 py-3 md:px-5">
        <div className="flex items-center justify-center gap-3">
          {" "}
          <img src={coolimg} width="25" />
          <h1 className="font-bold text-lg md:text-md">SKILLOP</h1>
        </div>
        <div className="flex gap-5">
          <button className="py-2 px-9 rounded-xl text-sm font-bold shadow-md bg-[#FFB800] md:px-3">
            <a href="/msignup">Sign up</a>
          </button>
          <button className="border-2 border-black py-2 px-9 rounded-xl text-sm font-bold md:px-3">
            <a href="/mlogin">Login</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingNav;
