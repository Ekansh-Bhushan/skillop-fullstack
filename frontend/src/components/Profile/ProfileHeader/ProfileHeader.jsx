import React, { useContext, useEffect, useState } from 'react';
import './ProfileHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../../../api/userRequest';
import userPic from '../../images/user.png';
import defaultBGPic from '../../images/bg.png';
import IntroVideo from '../Right Profile/IntroVideo';
import Following from '../Right Profile/Following';
import Followers from '../Right Profile/Followers';
import { MainContext } from '../../../context/MainContextProvider';

const ProfileHeader = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  const onClose = () => {
    setShowIntroVideo(false);
  };

  const { currentUser, setCurrentUser } = useContext(MainContext);
  const fetchUserDetails = async () => {
    try {
      if (!currentUser) {
        const userData = await getUser();
        setCurrentUser(userData.data.result)
        setUserDetails(userData.data.result);
      }
      else {
        setUserDetails(currentUser);
      }
    } catch (err) {
      if (!err.response.data.result) {
        localStorage.removeItem('skilloptoken');
        navigate('/');
        console.log('here is ', err.response.data.result);
        // toast.error('Session expired, Login again!');
      }
      console.log('Unable to fetch user details', err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className='ph-container'>
      <div
        className='ph-bg'
        style={{
          // backgroundImage: "url('/bg.png')",
          backgroundImage:
            userDetails &&
            (userDetails.bgPicUrl
              ? `url(${userDetails.bgPicUrl})`
              : `url(${defaultBGPic})`),
          width: '100%',
          height: '30vh',
        }}
      >
        {/* <img src="/bg.png" alt="bg" /> */}
      </div>
      {userDetails && userDetails.introVideo ? (
        <div className='ph-pic'>
          <img
            onClick={() => setShowIntroVideo(true)}
            src={
              userDetails && userDetails.profilePicUrl
                ? userDetails.profilePicUrl
                : userPic
            }
            alt='user pic'
            className='rounded-full'
          />
        </div>
      ) : (
        <img
          onClick={() => setShowIntroVideo(true)}
          className='ph-pic2'
          src={
            userDetails && userDetails.profilePicUrl
              ? userDetails.profilePicUrl
              : userPic
          }
          alt='user pic'
          width={100}
        />
      )}
      <div className='ph-details'>
        <div className='ph-name'>
          {userDetails.firstname
            ? userDetails.firstname + ' ' + userDetails.lastname
            : 'Loading...'}
          {userDetails && userDetails.isMentor && (
            <div className='verified-logo'>
              <img src='/verified.png' width={23} alt='' />
            </div>
          )}
        </div>
        <div className='ph-headline2'>
          {userDetails &&
          userDetails.experence &&
          userDetails.experence.length > 0 ? (
            <p>
              {userDetails.experence[0].title +
                ' @ ' +
                userDetails.experence[0].company}
            </p>
          ) : (
            <p>
              {'Student' +
                (userDetails &&
                  userDetails.experence &&
                  userDetails.education.length > 0 &&
                  ' @ ' + userDetails.education[0].institution)}
            </p>
          )}
          <div className='flex gap-3 items-center'>
            <div
              id='ph-mypost'
              onClick={() =>
                userDetails && navigate(`/userposts/${userDetails._id}`)
              }
            >
              My Posts
            </div>
            <Link to='/editpic'>
              <img
                src='/editpic.png'
                className='w-14 rounded-full p-1 cursor-pointer hover:bg-gray-100'
                alt='edit pic'
              />
            </Link>
          </div>
        </div>
        <div className='ph-follow'>
          <div
            className='ph-follwers text-[#5F5F5F]'
            onClick={() => setShowFollowers(!showFollowers)}
          >
            <b className='text-black'>
              {' '}
              {userDetails &&
                userDetails.followers &&
                userDetails.followers.length}
            </b>{' '}
            Followers
          </div>
          <div
            className='ph-followings text-[#5F5F5F]'
            onClick={() => setShowFollowings(!showFollowings)}
          >
            <b className='text-black'>
              {' '}
              {userDetails &&
                userDetails.followings &&
                userDetails.followings.length}
            </b>{' '}
            Followings
          </div>
        </div>
        <div className='ph-linkedin'>
          <img src='/linkedin.png' alt='' />
          <p>
            {' '}
            <a
              href={
                userDetails &&
                (userDetails.linkedinId &&
                userDetails.linkedinId.includes('linkedin.com')
                  ? userDetails.linkedinId
                  : `https://linkedin.com/in/${userDetails.linkedinId}`)
              }
              target='_blank'
              rel='noreferrer'
            >
              {userDetails &&
                (userDetails.linkedinId &&
                userDetails.linkedinId.includes('linkedin.com')
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
