import React from "react";
import coolimg from "../../components/images/logo.png";

const Nav = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-[20vh] border-b-2 py-4 bg-blur-10 bg-white">
        <div className="flex items-center justify-center gap-3">
          {" "}
          <img src={coolimg} width={25} />
          <h1 className="font-bold text-xl">SKILLOP</h1>
        </div>
        <div className=" gap-5 hidden">
          <button className="py-2 px-9 rounded-xl text-sm font-bold shadow-md bg-[#FFB800]">
            <a href="/login">Login</a>
          </button>
          <button className="border-2 border-black py-2 px-9 rounded-xl text-md font-bold">
            <a href="/signup">Sign up</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
