import React, { useState, useEffect, useContext } from 'react';
import logo from '../images/logo.png';
import { PiBellRingingLight } from 'react-icons/pi';
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { IoIosAddCircle } from 'react-icons/io';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import PostPopUp from '../Landing/Post/PostPopUp';
import { getUser } from '../../api/userRequest';
import book from '../../components/images/book.png';
import search from '../../components/images/iconamoon_search-light.png';
import { getNotifications } from '../../api/getNotifications';
import { MainContext } from '../../context/MainContextProvider';

const MobileAdminSideNav = ({ setProgress, setReloadPost, reloadPost }) => {
  const [Mentor, setMentor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSocietyMember, setIsSocietyMember] = useState(false);

  // const redirectIfNotAuthorize = () => {
  //   localStorage.removeItem('skilloptoken');
  //   if (pagesToNotRedirect.includes(window.location.pathname)) {
  //     return;
  //   }
  //   toast.error('Please Login/Signup to continue');

  //   if (window.innerWidth > 500) {
  //     navigate(`/login?redirect=${window.location.pathname}`);
  //   } else {
  //     navigate(`/mlogin?redirect=${window.location.pathname}`);
  //   }
  // };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUser();
        if (data.result) {
          // setUserData(data.result);
          setMentor(data.result.isMentor);
          setIsAdmin(data.result.isAdmin);
          setIsSocietyMember(data.result.isSocietyMember);
          // setIsFetched(true);
          // setNotifyList(data.result.notifications);
        } else {
          toast.error('Unauthorize : redirecting...');
          // redirectIfNotAuthorize();
        }
      } catch (err) {
        if (!err.response.data.result) {
          toast.error(err.response.data.result);
          // redirectIfNotAuthorize();
        }
        toast.error('Unable to fetch user', err);
      }
    };
    if (localStorage.getItem('skilloptoken')) {
      fetchUser();
    } else {
      toast.error('token not found redirecting to login/signup');
    }
  }, []);

  const [showPostPopUp, setShowPostPopUp] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      localStorage.removeItem('skilloptoken');
    } catch (error) {
      toast.error(error);
    }
    navigate('/');
    toast.success('Logged out');
  };

  const onClose = () => {
    setShowPostPopUp(!showPostPopUp);
  };

  const handlePostPopUp = () => {
    setShowPostPopUp(!showPostPopUp);
  };
  const [refresh, setRefresh] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false); // Added state for more options panel visibility

  const toggleMoreOptions = () => {
    // Toggle the visibility of more options panel
    setMoreOptionsVisible(!moreOptionsVisible);
  };
  const { currentUser, setCurrentUser } = useContext(MainContext);
  const fetchUserDetails = async () => {
    try {
      if (!currentUser) {
        const userData = await getUser();
        setUserDetails(userData.data.result);
               
        setCurrentUser(userData.data.result);
      } else {
        setUserDetails(currentUser);
      }
    } catch (err) {
      if (!err.response.data.result) {
        navigate('/');
      }
      toast.error('Unable to fetch user details', err);
    }
  };

  const [notifyList, setNotifyList] = useState([]);
  const fetchNotifications = async () => {
    try {
      const NotiData = await getNotifications();
      setNotifyList(NotiData.data.result);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchNotifications();
  }, []);

  const navigateToProfile = () => {
    navigate('/Profile');
  };

  return (
    <>
      {showPostPopUp && (
        <PostPopUp
          onClose={onClose}
          setProgress={setProgress}
          setRefresh={setRefresh}
          setReloadPost={setReloadPost}
          reloadPost={reloadPost}
        />
      )}
      <div className='mobile-admin-head'>
        <div className='back-n-logo'>
          <div className='back-btn'>
            {/* <IoIosArrowBack style={{ fontSize: "40px" }} /> */}
            <img
              src={userDetails?.profilePicUrl ? userDetails.profilePicUrl : '/user.png'}
              alt='user pic'
              className='rounded-full w-[45px] h-[45px] ml-3'
              onClick={toggleMoreOptions}
            />
          </div>
          <div
            className='logo-mobile'
            onClick={() => {
              navigate('/homepage');
            }}
          >
            <img src={logo} width='25' />
            <div className='font-semibold'>SKILLOP</div>
          </div>
          <div className='notification-n-chat'>
            <PiBellRingingLight
              onClick={() => {
                navigate('/notifications');
              }}
            />

            <HiOutlineChatBubbleLeftEllipsis
              onClick={() => {
                navigate('/chat');
              }}
            />
            {notifyList.filter((item) => item.read === false).length > 0 && (
              <div>
                <div className='text-md p-2 h-6 w-6 flex items-center justify-center text-center rounded-full bg-red-500 text-white shadow-xl absolute top-3 right-14 notification-number'style={{fontSize: "14px"}}>
                  {notifyList.filter((item) => item.read === false).length}
                </div>{' '}
                
              </div>
            )}
          </div>
        </div>
      </div>

      {window.location.pathname === '/chat' ? (
        <div></div>
      ) : (
        <div className='mobile-panel'>
          <div className='inside-panel'>
            <div className='mobile-panel-options'>
              <AiFillHome
                style={{
                  fontSize: '37px',
                  marginTop: '-5px',
                }}
                onClick={() => {
                  navigate('/homepage');
                }}
                className={`${
                  window.location.pathname === '/homepage'
                    ? 'color'
                    : 'notColor'
                }`}
              />
            </div>
            <div className='mobile-panel-options'>
              <BsSearch
                onClick={() => {
                  navigate('/searchbar');
                }}
                className={`${
                  window.location.pathname === '/searchbar'
                    ? 'color'
                    : 'notColor'
                }`}
                src={search}
              />
            </div>
            {window.location.pathname === '/homepage' && (
              <div
                className='absolute right-[-2vh] bottom-2'
                style={{
                  fontSize: '64px',
                  transform: 'translateY(-90%)',
                  color: '#108CFF',
                }}
              >
                {
                  <IoIosAddCircle
                    onClick={handlePostPopUp}
                    className='w-[7vh]'
                  />
                }
              </div>
            )}

            <div className='mobile-panel-options'>
              <img
                onClick={() => {
                  navigate('/requestedMeets');
                }}
                className={`${
                  window.location.pathname === '/Profile' ? 'color' : 'notColor'
                }`}
                src={book}
                alt='meet'
                style={{ width: '30px', marginBottom: '5px' }}
              />
            </div>
            <div className='mobile-panel-options'>
              <FaUserAlt
                onClick={() => {
                  navigate('/Profile');
                }}
                className={`${
                  window.location.pathname === '/Profile'
                    ? 'color'
                    : 'notColor text-[#00000033]'
                }`}
              />
            </div>
          </div>

          <div
            className='more-vertical-options'
            onClick={toggleMoreOptions}
            style={{ display: moreOptionsVisible ? 'flex' : 'none' }} // Set display based on moreOptionsVisible state
          >
            <div className='more-vertical-options-new'>
              <div className='flex items-center justify-center flex-col gap-[10px]'>
                <div>
                  {' '}
                  <img
                    src={userDetails?.profilePicUrl ? userDetails.profilePicUrl : '/user.png'}
                    alt='user pic'
                    className='rounded-full w-[100px] h-[100px] ml-3'
                    onClick={navigateToProfile}
                  />
                </div>
                <div>
                  {' '}
                  <h1 className='text-lg'>
                    {' '}
                    {userDetails &&
                      userDetails.firstname + ' ' + userDetails.lastname}
                  </h1>
                </div>
                <div className='flex items-center justify-between w-[55vw] text-base'>
                  {' '}
                  <div className=''>
                    <b className='text-black'>
                      {' '}
                      {userDetails &&
                        userDetails.followers &&
                        userDetails.followers.length}
                    </b>{' '}
                    Followers
                  </div>
                  <div className=''>
                    <b className='text-black'>
                      {' '}
                      {userDetails &&
                        userDetails.followings &&
                        userDetails.followings.length}
                    </b>{' '}
                    Followings
                  </div>
                </div>
              </div>


              <div
                onClick={() => navigate('/Admin_Dashboard')}
                className='font-semibold text-lg'
              >
                Dashboard
              </div>
              <div
                onClick={() => navigate('/Admin_Users')}
                className='font-semibold text-lg'
              >
                Users 
              </div>
              <div
                onClick={() => {
                  navigate('/Admin_Events');
                }}
                className='font-semibold text-lg'
              >
                Create Event
              </div>
              <div className='mx-6 text-red-500 rounded-lg hover:bg-red-100 p-8'
                onClick={() => {
                    // setProgress(40);
                    navigate('/homepage');
                    // setTimeout(() => setProgress(100), 300);
                }}>
                <span
                    className={`${
                    window.location.pathname === '/homepage' ? 'active2' : ''
                    } hover-effect-bottom`}
                >
                    Return To Homepage
                </span>
              </div>
                
              {/* <div
                onClick={() => navigate('/requestedMeets')}
                className='font-semibold text-lg'
              >
                Meet
              </div>
              {!Mentor && (<div
                onClick={() => navigate('/mentorbano')}
                className='font-semibold text-lg'
              >
                
                Become a Mentor
              </div>)}
              {isAdmin && (<div
                onClick={() => navigate('/Admin_Dashboard')}
                className='font-semibold text-lg'
              >
                
                Admin Panel
              </div>)}
              {isSocietyMember && (<div
                onClick={() => navigate('/dashboard')}
                className='font-semibold text-lg'
              >
                
                Skillop Dashboard
              </div>)}
              <div
                onClick={() => navigate('/myaccount')}
                className='font-semibold text-lg'
              >
                Account
              </div>
              <div
                onClick={() => navigate('/platformfeedback')}
                className='font-semibold text-lg'
              >
                Feedback
              </div> */}
              <div
                style={{
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  border: '1.5px solid #108CFF',
                  width: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '25px',
                  padding: '20px 50px',
                }}
                onClick={logout}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileAdminSideNav;
