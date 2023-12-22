import React from "react";
import "./TopBar.css";

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
    </div>
  );
};

export default TopBar;
