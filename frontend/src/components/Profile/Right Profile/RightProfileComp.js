import React from 'react';
import { getUser } from '../../../api/userRequest';
import linkedin from '../../images/linkedin.png';
// import { userChats } from "../../../api/chatRequest";
import userPic from '../../images/user.png';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RightProfileComp.css';
import post2 from '../../images/post2.png';
import defaultBGPic from '../../images/bg.png';
import Followers from './Followers';
import Following from './Following';
import IntroVideo from './IntroVideo';
import toast from 'react-hot-toast';

export default function RightProfileComp({ about }) {
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
        localStorage.removeItem('skilloptoken');
        navigate('/');
        console.log('here is ', err.response.data.result);
        toast.error('Session expired, Login again!');
      }
      console.log('Unable to fetch user details', err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [about]);

  return (
    <>
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
          <img
            onClick={() => navigate('/editpic')}
            id="edit-prof-pic"
            width={28}
            src="/edit.png"
            alt="edit"
          />
          <div className="common-prof-info1">
            {userDetails && (
              <img
                onClick={() => setShowIntroVideo(true)}
                onMouseEnter={() => {
                  !userDetails.introVideo &&
                    toast.success('Click on profile picture to add my story!');
                }}
                src={
                  userDetails.profilePicUrl
                    ? userDetails.profilePicUrl
                    : userPic
                }
                style={
                  userDetails.introVideo && {
                    border: '5px solid rgba(37, 206, 209, 1)',
                  }
                }
                className="prof-image-common1"
                alt="user"
              />
            )}
            <div
              className="name-cont"
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div>
                {userDetails && (
                  <div
                    className="user-name1"
                    style={{
                      fontSize: 'x-large',
                    }}
                  >
                    {userDetails.firstname + ' ' + userDetails.lastname}
                    {userDetails.isMentor && (
                      <div className="verified-logo">
                        <img src="/verified.png" width={23} alt="" />
                      </div>
                    )}
                  </div>
                )}
                {userDetails && (
                  <p style={{ marginLeft: '7px' }}>{userDetails.jobTitle}</p>
                )}
              </div>
              {userDetails && (
                <a
                  href={
                    userDetails.linkedinId.toString().includes('linkedin.com')
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
                (userDetails.about.length > 200
                  ? `${userDetails.about.slice(0, 200)}...`
                  : userDetails.about)}
            </p>
            {/* {userDetails && <div className="view-my-prof1" onClick={() => navigate('/Profile')}>View Profile</div>} */}
            {userDetails && (
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  fontSize: '1.1rem',
                  marginTop: '20px',
                }}
                className="follow"
              >
                <span
                  className="follow-fetch-btn"
                  onClick={() => setShowFollowers(!showFollowers)}
                  style={{
                    borderRadius: '20px',
                  }}
                >
                  Followers :{' '}
                  {userDetails.followers && userDetails.followers.length}
                </span>
                <span
                  className="follow-fetch-btn"
                  style={{
                    borderRadius: '20px',
                  }}
                  onClick={() => setShowFollowings(!showFollowings)}
                >
                  Followings :{' '}
                  {userDetails.followings && userDetails.followings.length}
                </span>
              </div>
            )}
            <div
              id="mypost"
              onClick={() => navigate(`/userposts/${userDetails._id}`)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                alignItems: 'center',
                marginTop: '33px',
              }}
            >
              <img src={post2} height={32} width={32} alt="mypost" />
              <p>My Posts</p>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
}
