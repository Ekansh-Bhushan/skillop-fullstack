import React, { useEffect, useState } from "react";
import "./ProfileHeader.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../api/userRequest";
import userPic from "../../images/user.png";
import defaultBGPic from "../../images/bg.png";
import IntroVideo from "../Right Profile/IntroVideo";
import Following from "../Right Profile/Following";
import Followers from "../Right Profile/Followers";
import toast from "react-hot-toast";
import post2 from "../../images/post2.png";

const ProfileHeader = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [showEditProfilePic, setShowEditProfilePic] = useState(false);
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  const onClose = () => {
    setShowIntroVideo(false);
  };

  const fetchUserDetails = async () => {
    try {
      const userData = await getUser();
      setUserDetails(userData.data.result);
    } catch (err) {
      if (!err.response.data.result) {
        localStorage.removeItem("skilloptoken");
        navigate("/");
        console.log("here is ", err.response.data.result);
        // toast.error('Session expired, Login again!');
      }
      console.log("Unable to fetch user details", err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="ph-container">
      <div
        className="ph-bg"
        style={{
          // backgroundImage: "url('/bg.png')",
          backgroundImage:
            userDetails &&
            (userDetails.bgPicUrl
              ? `url(${userDetails.bgPicUrl})`
              : `url(${defaultBGPic})`),
          width: "100%",
          height: "30vh",
        }}
      >
        {/* <img src="/bg.png" alt="bg" /> */}
      </div>
      {userDetails && userDetails.introVideo ? (
        <div className="ph-pic">
          <img
            onClick={() => setShowIntroVideo(true)}
            src={userDetails && userDetails.profilePicUrl ? userDetails.profilePicUrl : userPic}
            alt="user pic"
            style={{ borderRadius: "100%" }}
          />
        </div>
      ) : (
        <img
          onClick={() => setShowIntroVideo(true)}
          src={userDetails && userDetails.profilePicUrl ? userDetails.profilePicUrl : userPic}
          alt="user pic"
          width={100}
          
        />
      )}
      <div className="ph-details">
        <div className="ph-name">
          {userDetails && userDetails.firstname + " " + userDetails.lastname}
          {userDetails && userDetails.isMentor && (
            <div className="verified-logo">
              <img src="/verified.png" width={23} alt="" />
            </div>
          )}
        </div>
        <div className="ph-headline">
          {userDetails && userDetails.jobTitle}
          <div
            id="ph-mypost"
            onClick={() => userDetails && navigate(`/userposts/${userDetails._id}`)}
          >
            My Posts
          </div>
        </div>
        <div className="ph-follow">
          <div
            className="ph-follwers text-[#5F5F5F]"
            onClick={() => setShowFollowers(!showFollowers)}
          >
            <b className="text-black">
              {" "}
              {userDetails &&
                userDetails.followers &&
                userDetails.followers.length}
            </b>{" "}
            Followers
          </div>
          <div
            className="ph-followings text-[#5F5F5F]"
            onClick={() => setShowFollowings(!showFollowings)}
          >
            <b className="text-black">
              {" "}
              {userDetails &&
                userDetails.followings &&
                userDetails.followings.length}
            </b>{" "}
            Followings
          </div>
        </div>
        <div className="ph-linkedin">
          <img src="/linkedin.png" alt="" />
          <p>
            {" "}
            <a
              href={
                userDetails &&
                (userDetails.linkedinId.toString().includes("linkedin.com")
                  ? userDetails.linkedinId
                  : `https://linkedin.com/in/${userDetails.linkedinId}`)
              }
              target="_blank"
              rel="noreferrer"
            >
              {userDetails &&
                (userDetails.linkedinId.toString().includes("linkedin.com")
                  ? userDetails.linkedinId
                  : `https://linkedin.com/in/${userDetails.linkedinId}`)}
            </a>
          </p>
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

          {showIntroVideo && (
            <IntroVideo
              onClose={onClose}
              introVideoUrl={userDetails.introVideo}
              publicView={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
