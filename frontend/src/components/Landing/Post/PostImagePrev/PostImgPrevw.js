import React from "react";
import "./PostImgPrevw.css";
import userIcon from "../../../images/user.png";

const PostImgPrevw = ({ src, name, onClose }) => {
  return (
    <div className="blurbg1">
      <div className="container1">
        <div className="author ">
          {/* <div></div> */}
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img height={40} width={40} src={userIcon} alt="user" />
            <span>{name}</span>
          </span>
          <img
            src="/close.png"
            onClick={onClose}
            width={27}
            className="close"
          />
        </div>
        {/* <div className='head'>

                </div> */}
        <div className="img-prevw">
          <img src={src} alt="preview" />
        </div>
      </div>
    </div>
  );
};

export default PostImgPrevw;
