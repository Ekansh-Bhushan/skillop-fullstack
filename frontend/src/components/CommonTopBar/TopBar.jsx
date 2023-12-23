import React from "react";
import "./TopBar.css";
import { Link } from "react-router-dom";

const TopBar = ({ setShowPostPopUp }) => {
  const createPost = () => {
    setShowPostPopUp(true);
  };

  return (
    <div className="tb-container ">
      <div>
        <img src="/skillop-logo.png" alt="logo" className="w-10" />
        <h2>SKILLOP</h2>
      </div>
      {window.location.pathname === "/homepage" && (
        <button id="create-post" onClick={createPost}>
          + Create Post
        </button>
      )}
      {window.location.pathname === "/" && (
        <div className="flex gap-5">
          <button className="py-2 px-9 rounded-xl text-sm font-bold shadow-md bg-[#FFB800] md:px-3">
            <a href="/signup">Sign up</a>
          </button>
          <button className="border-2 border-black py-2 px-9 rounded-xl text-sm font-bold md:px-3">
            <a href="/login">Login</a>
          </button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
