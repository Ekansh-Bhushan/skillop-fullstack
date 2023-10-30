// Popup.js
import React, { useEffect } from "react";
import "./Popup.css";
import { getLikers } from "../../../../api/postRequest";
import { useState } from "react";
import spinner from "../../../images/spinner.gif";
import { useNavigate } from "react-router-dom";
import userPic from "../../../images/user.png";

const Popup = ({ onClose, postId, setProgress, likesCount }) => {
  const [likersList, setLikersList] = useState([]);
  const [fetchingLikers, setFetchingLikers] = useState(false);
  const navigate = useNavigate();

  const fetchLikers = async () => {
    setFetchingLikers(true);
    try {
      setProgress(35);
      const data = await getLikers(postId);
      const likersData = data.data.result;
      setLikersList(likersData);
      setProgress(100);
    } catch (err) {
      console.log("Unable to fetch likers ", err);
    }
    setFetchingLikers(false);
  };

  useEffect(() => {
    fetchLikers();
  }, []);

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Likes ({likesCount})</h2>
        <p>
          {fetchingLikers === false && likersList.length === 0
            ? "No likes"
            : ""}
        </p>
        {fetchingLikers && (
          <img
            src={spinner}
            style={{ height: "72px", width: "72px" }}
            alt="loading"
            className="spinner"
          />
        )}
        {likersList.map((item) => {
          return (
            <div
              onClick={() => navigate(`/public-profile/${item._id}`)}
              key={item._id}
            >
              <img src={userPic} height={32} width={32} alt="user" />
              <b>{item.firstname + " " + item.lastname}</b>
            </div>
          );
        })}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
