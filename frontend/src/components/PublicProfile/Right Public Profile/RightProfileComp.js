import React, { useState, useEffect } from "react";
import { findUser, getUser } from "../../../api/userRequest";
import linkedin from "../../images/linkedin.png";
import userPic from "../../images/user.png";
import { useNavigate } from "react-router-dom";
import "./RightProfileComp.css";
import { createChat, userChats } from "../../../api/chatRequest";
import { followUnfollowUser } from "../../../api/follow-unfollow";
import chat3 from "../../images/chat3.png";
import post2 from "../../images/post2.png";
import { toast } from "react-hot-toast";
import defaultBGPic from "../../images/Robo.png";
import Followers from "../../Profile/Right Profile/Followers";
import Following from "../../Profile/Right Profile/Following";
import IntroVideo from "../../Profile/Right Profile/IntroVideo";

export default function RightProfileComp({ userDatamain }) {
  const userId = window.location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [followings, setFollowings] = useState([]);
  const [showFollowBtn, setShowFollowBtn] = useState(false);
  const [updateDOM, setUpdateDOM] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const [chat_id, setChatId] = useState("");

  const onClose = () => {
    setShowIntroVideo(false);
  };

  const creatingChat = async () => {
    try {
      const req = {
        senderId: userDatamain._id,
        receiverId: userId,
      };
      const { data } = await createChat(req);
      setChatId(data._id);
    } catch (error) {
      console.log(error);
      toast.error("chat already exists");
    }
  };
  const fetchUserDetails = async () => {
    try {
      const userData = await findUser(userId);
      setUserDetails(userData.data.result);
    } catch (err) {
      console.log("Unable to fetch user details", err);
    }
  };

  const handleFollowUnfollow = async () => {
    try {
      await followUnfollowUser(userId);
      setUpdateDOM(!updateDOM);
      toast.success("You followed");
      creatingChat();
    } catch (err) {
      toast.error(err.response.data.message);
      console.log("Unable to follow/unfollow user at the moment", err);
    }
  };

  const fetchFollowings = async () => {
    try {
      const userData = await getUser();
      const userFollowings = userData.data.result.followings;
      setFollowings(userFollowings);
      setShowFollowBtn(!userFollowings.includes(userId));
    } catch (err) {
      console.log("Unable to fetch followings", err);
    }
  };

  const getChats = async () => {
    try {
      const usrdt = await getUser();
      const { data } = await userChats(usrdt.data.result._id);
      const id = data.filter((item) => item.members[0] === userId)[0]._id;
      setChatId(id);
      }
       catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchFollowings();
    fetchUserDetails();
    getChats();
  }, [userId]);

  useEffect(() => {
    fetchFollowings();
  }, [updateDOM]);


  return (
    <div className="prof-and-events1">
      <div
        className="common-prof1"
        style={{
          backgroundImage:
            userDetails &&
            (userDetails.bgPicUrl
              ? `url(${userDetails.bgPicUrl})`
              : `url(${defaultBGPic})`),
        }}
      >
        <div className="common-prof-info1">
          {userDetails && (
            <img
              onMouseEnter={() => {
                userDetails.introVideo && toast.success("Click profile picture to view intro video!")
              }}
              onClick={() => setShowIntroVideo(true)}
              src={
                userDetails.profilePicUrl ? userDetails.profilePicUrl : userPic
              }
              className="prof-image-common1"
              alt="user"
              style={userDetails.introVideo && {
                border: "5px solid rgba(37, 206, 209, 1)"
              }}
            />
          )}
          <div
            className="name-cont"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              {userDetails && (
                <div
                  className="user-name1"
                  style={{
                    fontSize: "x-large",
                  }}
                >
                  {userDetails.firstname + " " + userDetails.lastname}
                  {userDetails.isMentor && (
                    <div className="verified-logo">
                      <img src="/verified.png" width={23} alt="" />
                    </div>
                  )}
                </div>
              )}
              {userDetails && (
                <p style={{ marginLeft: "7px" }}>{userDetails.jobTitle}</p>
              )}
            </div>
            {userDetails && (
              <a
                href={
                  userDetails.linkedinId.toString().includes("linkedin.com")
                    ? userDetails.linkedinId
                    : `https://linkedin.com/in/${userDetails.linkedinId}`
                }
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedin} alt="linkedin" />
              </a>
            )}
          </div>
          <p className="about">
            <div className="about-title">
              {userDetails &&
                userDetails.about &&
                userDetails.about.length > 0 && <h3>About</h3>}
            </div>
            {userDetails &&
              (userDetails.about.length > 70
                ? `${userDetails.about.slice(0, 70)}...`
                : userDetails.about)}
          </p>
          {userDetails && (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "60px",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "13px",
                }}
                className="follow"
              >
                {showFollowBtn && (
                  <button id="follow" onClick={handleFollowUnfollow}>
                    Follow
                  </button>
                )}
                {!showFollowBtn && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      id="chatpub"
                      onClick={() => navigate(`/chat?chat-id=${chat_id}`)}
                      style={{
                        background: "white",
                        color: "black",
                        fontSize: "1.1rem",
                      }}
                    >
                      <img height={30} width={34} src={chat3} alt="chat" />
                      <p>Chat</p>
                    </span>
                    <span
                      id="postpub"
                      onClick={() => navigate(`/userposts/${userId}`)}
                      style={{
                        background: "white",
                        color: "black",
                        fontSize: "1.1rem",
                        border: "none",
                      }}
                    >
                      <img height={30} width={34} src={post2} alt="post" />
                      <p>Post</p>
                    </span>
                  </div>
                )}
                {userDetails.isMentor && (
                  <button
                    id="bookSlot"
                    onClick={() => {
                      navigate(`/bookslot/${userDetails.mentor._id}`);
                    }}
                  >
                    Book Slot
                  </button>
                )}
              </div>
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  gap: "20px",
                  fontSize: "1.1rem",
                  marginTop: "7px",
                }}
                className="follow"
              >
                <span
                  className="follow-fetch-btn"
                  onClick={() => setShowFollowers(!showFollowers)}
                >
                  Followers :{" "}
                  {userDetails.followers && userDetails.followers.length}
                </span>
                <span
                  className="follow-fetch-btn"
                  onClick={() => setShowFollowings(!showFollowings)}
                >
                  Followings :{" "}
                  {userDetails.followings && userDetails.followings.length}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {showIntroVideo && (
        <IntroVideo
          onClose={onClose}
          introVideoUrl={userDetails.introVideo}
          publicView={true}
        />
      )}

      {showFollowers && userDetails && (
        <Followers
          userid={userDetails._id}
          onClose={() => {
            setShowFollowers(!showFollowers);
          }}
        />
      )}
      {showFollowings && userDetails && (
        <Following
          userid={userDetails._id}
          onClose={() => {
            setShowFollowings(!showFollowings);
          }}
        />
      )}
    </div>
  );
}
