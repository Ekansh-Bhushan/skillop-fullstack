import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import defaultBGPic from '../images/bg.png';
import IntroVideo from '../Profile/Right Profile/IntroVideo';
import Following from '../Profile/Right Profile/Following';
import Followers from '../Profile/Right Profile/Followers';
import toast from 'react-hot-toast';
// import post2 from '../../images/post2.png';
import userPic from '../images/user.png';
import UpcomingEvents from '../Landing/Profileandevents/UpcomingEvents';
import Chart3 from '../images/chat3.png';
import './PublicProfile.css';
import Slot1 from '../images/slots1.png';
import { followUnfollowUser } from '../../api/follow-unfollow';
import { createChat, userChats } from '../../api/chatRequest';
import { getFollowers, getUser } from '../../api/userRequest';

const PublicProfileHeader = ({ userDetails, userData }) => {
  const navigate = useNavigate();
  //   const [userDetails, setUserDetails] = useState(null);
  const [showEditProfilePic, setShowEditProfilePic] = useState(false);
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const [updateDOM, setUpdateDOM] = useState(false);
  const [showFollowBtn, setShowFollowBtn] = useState(true);
  const [chat_id, setChatId] = useState('');

  const onClose = () => {
    setShowIntroVideo(false);
  };
  const getChats = async () => {
    try {
      const { data } = await userChats(userDetails._id);
      const id = data.filter((item) => item.members[0] === userId)[0]._id;
      setChatId(id);
    } catch (error) {
      console.log(error);
    }
  };
  const creatingChat = async () => {
    try {
      const req = {
        senderId: userData._id,
        receiverId: userId,
      };
      const { data } = await createChat(req);
      console.log('chat data ', data);
      setChatId(data._id);
    } catch (error) {
      console.log(error);
      // toast.error('chat already exists');
    }
  };
  const userId = window.location.pathname.split('/')[2];
  const handleFollowBtn = async () => {
    try {
      await followUnfollowUser(userId);
      setUpdateDOM(!updateDOM);
      // toast.success('You followed');
      creatingChat();
    } catch (err) {
      toast.error(err.response.data.message);
      console.log('Unable to follow/unfollow user at the moment', err);
    }
  };

  useEffect(() => {
    const checkFollow = async () => {
      const res = await getFollowers(userId);
      res.data.result.forEach((item) => {
        if (item._id === userData._id) {
          setShowFollowBtn(false);
        } else {
          setShowFollowBtn(true);
        }
      });
    };
    checkFollow();
    getChats();
  }, [updateDOM]);

  return (
    <>
      <UpcomingEvents />
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
          <div className='ph-pic-pub'>
            <img
              onClick={() => setShowIntroVideo(true)}
              src={
                userDetails &&
                (userDetails.profilePicUrl
                  ? userDetails.profilePicUrl
                  : userPic)
              }
              alt='user pic'
              style={{ borderRadius: '100%' }}
            />
          </div>
        ) : (
          <img
            className='ph-pic-pub2'
            onClick={() => setShowIntroVideo(true)}
            src={
              userDetails &&
              (userDetails.profilePicUrl ? userDetails.profilePicUrl : userPic)
            }
            alt='user pic'
          />
        )}
        <div className='ph-details'>
          <div className='ph-name'>
            {userDetails && userDetails.firstname + ' ' + userDetails.lastname}
            {userDetails && userDetails.isMentor && (
              <div className='verified-logo'>
                <img src='/verified.png' width={23} alt='' />
              </div>
            )}
          </div>
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
              {'Student' + userDetails &&
                userDetails.experence &&
                userDetails.education.length > 0 &&
                ' @ ' + userDetails.education[0].institute}
            </p>
          )}
          <div className='ph-headline'>
            {userDetails.isMentor && (
              <button
                id='bookSlot'
                onClick={() => {
                  navigate(`/bookslot/${userDetails.mentor._id}`);
                }}
              >
                Book Slot
              </button>
            )}
            {showFollowBtn ? (
              <button
                onClick={handleFollowBtn}
                className='bg-blue-400 px-3 py-1 text-white rounded-full hover:bg-blue-500'
              >
                Follow
              </button>
            ) : (
              <div className='flex gap-5'>
                <button
                  onClick={handleFollowBtn}
                  className='bg-blue-400 px-3 py-1 text-white rounded-full hover:bg-blue-500'
                >
                  Unfollow
                </button>
                <Link to={'/chat'}>
                  <img
                    src='/chat3.png'
                    className='cursor-pointer hover:opacity-80'
                    width={35}
                    alt=''
                  />
                </Link>
                <Link to={'/post'}>
                  <img
                    src='/post2.png'
                    className='cursor-pointer hover:opacity-80'
                    width={35}
                    alt=''
                  />
                </Link>
              </div>
            )}
          </div>
          <div className='ph-follow'>
            <div
              className='ph-follwers'
              onClick={() => setShowFollowers(!showFollowers)}
            >
              <b>
                {' '}
                {userDetails &&
                  userDetails.followers &&
                  userDetails.followers.length}
              </b>{' '}
              Followers
            </div>
            <div
              className='ph-followings'
              onClick={() => setShowFollowings(!showFollowings)}
            >
              <b>
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
                  userDetails.linkedinId.toString().includes('linkedin.com')
                    ? userDetails.linkedinId
                    : `https://linkedin.com/in/${userDetails.linkedinId}`)
                }
                target='_blank'
                rel='noreferrer'
              >
                {userDetails &&
                  (userDetails.linkedinId &&
                  userDetails.linkedinId.toString().includes('linkedin.com')
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
          {/* <div className="chatAndBookSlot">
            <img src={Chart3} alt=""/>
            <img src={Slot1} alt=""/>
              <p>kaha book slot and chat option</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PublicProfileHeader;
