import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultBGPic from "../images/bg.png";
import IntroVideo from "../Profile/Right Profile/IntroVideo";
import Following from "../Profile/Right Profile/Following";
import Followers from "../Profile/Right Profile/Followers";
import toast from "react-hot-toast";
// import post2 from '../../images/post2.png';
import userPic from "../images/user.png";
import UpcomingEvents from "../Landing/Profileandevents/UpcomingEvents";

const PublicProfileHeader = ({ userDetails }) => {
  const navigate = useNavigate();
  //   const [userDetails, setUserDetails] = useState(null);
  const [showEditProfilePic, setShowEditProfilePic] = useState(false);
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  const onClose = () => {
    setShowIntroVideo(false);
  };

  return (
    <>
      <UpcomingEvents />
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
              src={userDetails ? userDetails.profilePicUrl : userPic}
              alt="user pic"
              style={{ borderRadius: "100%" }}
            />
          </div>
        ) : (
          <img
            className="ph-pic"
            onClick={() => setShowIntroVideo(true)}
            src={userDetails ? userDetails.profilePicUrl : "/user.png"}
            alt="user pic"
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
          <div className="ph-follow">
            <div
              className="ph-follwers"
              onClick={() => setShowFollowers(!showFollowers)}
            >
              <b>
                {" "}
                {userDetails &&
                  userDetails.followers &&
                  userDetails.followers.length}
              </b>{" "}
              Followers
            </div>
            <div
              className="ph-followings"
              onClick={() => setShowFollowings(!showFollowings)}
            >
              <b>
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
                  (userDetails.linkedinId &&
                  userDetails.linkedinId.toString().includes("linkedin.com")
                    ? userDetails.linkedinId
                    : `https://linkedin.com/in/${userDetails.linkedinId}`)
                }
                target="_blank"
                rel="noreferrer"
              >
                {userDetails &&
                  (userDetails.linkedinId &&
                  userDetails.linkedinId.toString().includes("linkedin.com")
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
                publicView={true}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicProfileHeader;
