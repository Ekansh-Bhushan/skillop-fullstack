import React, { useEffect, useState } from 'react';
import './SideNav.css';
import home1 from '../images/home1.png';
import home2 from '../images/home2.png';
import search1 from '../images/search1.png';
import search2 from '../images/search2.png';
import chat1 from '../images/chat1.png';
import chat2 from '../images/chat2.png';
import notification1 from '../images/notification1.png';
import notification2 from '../images/notification2.png';
import slots1 from '../images/slots1.png';
import slots2 from '../images/slots2.png';
import bookings1 from '../images/booking1.png';
import bookings2 from '../images/booking2.png';
import earnings1 from '../images/earning1.png';
import earnings2 from '../images/earning2.png';
import account1 from '../images/user1.png';
import account2 from '../images/user2.png';
import myprofile1 from '../images/account1.png';
import myprofile2 from '../images/account2.png';
import { useNavigate } from 'react-router-dom';
import { BsGearFill } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { getNotifications } from '../../api/getNotifications';
import { userChats } from '../../api/chatRequest';
import { getMessages } from '../../api/messageRequest';

const SideNav = ({ setProgress, Mentor, isAdmin, isSocietyMember, isFetched}) => {
  const navigate = useNavigate();
  const [showChatNotification, setShowChatNotification] = useState(false);

  const logout = async () => {
    try {
      setProgress(30);
      localStorage.removeItem('skilloptoken');
      
    } catch (error) {
      console.log(error);
    }
    toast.success('Logged out');
    navigate('/login');
    setProgress(100);
  };

  const handleSlots = () => {
    if (isFetched) {
      setProgress(40);
      if (Mentor) {
        navigate('/mySlots');
      } else {
        navigate('/homepage');
        toast.error('Slots page is 🔒 locked\nBecome a MENTOR 😎 to unlock!');
      }
      setTimeout(() => setProgress(100), 300);
    }
  };

  const handleBookings = () => {
    if (isFetched) {
      setProgress(40);
      if (Mentor) {
        navigate('/mybookings');
      } else {
        navigate('/homepage');
        toast.error('Booking page is 🔒 locked\nBecome a MENTOR 😎 to unlock!');
      }
      setTimeout(() => setProgress(100), 300);
    }
  };

  const handleEarnings = () => {
    console.log('is fetched ', isFetched);
    console.log('is mentor ', Mentor);

    if (isFetched) {
      setProgress(40);
      if (Mentor) {
        navigate('/myearnings');
      } else {
        navigate('/homepage');
        toast.error('Earning page is 🔒 locked\nBecome a MENTOR 😎 to unlock!');
      }
     
    }
  };

  const displayxtra = () => {
    document.querySelector('.xtra-opt').style.display = 'flex';
  };

  const hidextra = () => {
    document.querySelector('.xtra-opt').style.display = 'none';
  };

  const [notifyList, setNotifyList] = useState([]);

  const fetchNotifications = async () => {
    try {
      const NotiData = await getNotifications();
      setNotifyList(NotiData.data.result);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log('Unable to fetch notifications', err);
    }
  };

  const checkChatNotification = async () => {
    try {
      const CurrUsrId = localStorage.getItem('current-user-id');
      const { data } = await userChats(CurrUsrId);
      data.forEach(async (chat) => {
        const data2 = await getMessages(chat._id);
        data2.data.forEach((msg) => {
          console.log('looping through chats...');
          if (!msg.seen && msg.senderId !== CurrUsrId) {
            console.log('This msg cause notification', msg);
            setShowChatNotification(true);
            return;
          }
        });
      });
    } catch (err) {}
  };

  useEffect(() => {
    fetchNotifications();
    checkChatNotification();
  }, []);

  return (
    <>
      <ul className='side-nav-container'>
        <li
          onClick={() => {
            setProgress(40);
            navigate('/homepage');
            setTimeout(() => setProgress(100), 300);
          }}
        >
          {window.location.pathname === '/homepage' ? (
            <img src={home2} alt='Home' />
          ) : (
            <img src={home1} alt='Home'  />
          )}
          <span
            className={`${
              window.location.pathname === '/homepage' ? 'active2' : ''
            } hover-effect-bottom`}
          >
            Home
          </span>
        </li>
        <li
          onClick={() => {
            setProgress(40);
            navigate('/searchbar');
            setTimeout(() => setProgress(100), 300);
          }}
        >
          {window.location.pathname === '/searchbar' ? (
            <img src={search2} alt='Home'   />
          ) : (
            <img src={search1} alt='Home'   />
          )}
          <span
            className={`${
              window.location.pathname === '/searchbar' ? 'active2' : ''
            } hover-effect-bottom`}
          >
            Search
          </span>
        </li>
        <li
          onClick={() => {
            setProgress(40);
            navigate('/chat');
            setTimeout(() => setProgress(100), 300);
          }}
        >
          {window.location.pathname === '/chat' ? (
            <img src={chat2} alt='Home'   />
          ) : (
            <img src={chat1} alt='Home'   />
          )}
          <span
            className={`${
              window.location.pathname === '/chat' ? 'active2' : ''
            } hover-effect-bottom`}
          >
            Chat
          </span>
          {showChatNotification && (
            <div>
              <div className='chat-notify-num-icon'>*</div>{' '}
            </div>
          )}
        </li>
        <li
          onClick={() => {
            setProgress(40);
            navigate('/notifications');
            setTimeout(() => setProgress(100), 300);
          }}
        >
          {window.location.pathname === '/notifications' ? (
            <img src={notification2} alt='Home'/>
          ) : (
            <img src={notification1} alt='Home'/>
          )}
          <span
            className={`${
              window.location.pathname === '/notifications' ? 'active2' : ''
            } hover-effect-bottom`}
          >
            Notifications
          </span>
          {notifyList.filter((item) => item.read === false).length > 0 && (
            <div>
              <div className='notify-num-icon'>
                {notifyList.filter((item) => item.read === false).length}
              </div>{' '}
            </div>
          )}
        </li>
        <li
          onClick={() => {
            setProgress(40);
            navigate('/requestedMeets');
            setTimeout(() => setProgress(100), 300);
          }}
        >
          {window.location.pathname === '/requestedMeets' ? (
            <img src='/meet2.png' alt='Home'   />
          ) : (
            <img src='/meet.png' alt='Home'   />
          )}
          <span
            className={`${
              window.location.pathname === '/requestedMeets' ? 'active2' : ''
            } hover-effect-bottom`}
          >
            Meets
          </span>
        </li>
        <li onClick={handleSlots}>
          {window.location.pathname === '/mySlots' ? (
            <img src={slots2} alt='Home'   />
          ) : (
            <img src={slots1} alt='Home'   />
          )}
          <span
            className={`${
              window.location.pathname === '/mySlots' ? 'active2' : ''
            } hover-effect-bottom`}
          >
            Slots
          </span>
          {!Mentor && <img id='notify-lock' src='/lock1.png' alt='lock' />}
        </li>
        <li onClick={handleBookings}>
          {window.location.pathname === '/mybookings' ? (
            <img src={bookings2} alt='Home'   />
          ) : (
            <img src={bookings1} alt='Home'   />
          )}
          <span
            className={`${
              window.location.pathname === '/mybookings' ? 'active2' : ''
            } hover-effect-bottom`}
          >
            Booking
          </span>
          {!Mentor && <img id='notify-lock' src='/lock1.png' alt='lock' />}
        </li>
        <li onClick={handleEarnings}>
          {window.location.pathname === '/myearnings' ? (
            <img src={earnings2} alt='Home'   />
          ) : (
            <img src={earnings1} alt='Home'   />
          )}
          <span
            className={`${
              window.location.pathname === '/myearnings' ? 'active2' : ''
            } hover-effect-bottom`}
          >
            Earning
          </span>
          {!Mentor && <img id='notify-lock' src='/lock1.png' alt='lock' />}
        </li>
        <li
          onClick={() => {
            setProgress(40);
            navigate('/myaccount');
            setTimeout(() => setProgress(100), 300);
          }}
        >
          {window.location.pathname === '/myaccount' ? (
            <img src={myprofile2} alt='Home'   />
          ) : (
            <img src={myprofile1} alt='Home'   />
          )}
          <span
            className={`${
              window.location.pathname === '/myaccount' ? 'active2' : ''
            } hover-effect-bottom`}
          >
            Account
          </span>
        </li>
        <li
          onClick={() => {
            setProgress(40);
            navigate('/Profile');
            setTimeout(() => setProgress(100), 300);
          }}
        >
          {window.location.pathname === '/Profile' ? (
            <img src={account2} alt='Home'   />
          ) : (
            <img src={account1} alt='Home'   />
          )}
          <span
            className={`${
              window.location.pathname === '/Profile' ? 'active2' : ''
            } hover-effect-bottom`}
          >
            My profile
          </span>
        </li>
        <li id='setting' className='settings-opt' onMouseOver={displayxtra}>
          <BsGearFill style={{ fontSize: '27px', marginRight: '13px' }} />
          <span className={`hover-effect-bottom`}>Settings</span>
          <div
            className='xtra-opt'
            style={{
              position: 'absolute',
              top: '-150px',
              right: '-120px',
              minHeight: '130px',
              width: '180px',
              backgroundColor: 'gray',
              borderRadius: '15px',
              backgroundColor: 'white',
              boxShadow: '0px 0px 20px rgb(215,215,215)',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '20px',
              fontSize: '15px',
              display: 'none',
            }}
            onMouseLeave={hidextra}
          >
            {!Mentor && (
              <div
                style={{
                  color: '#108CFF',
                  // padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
                onClick={() => navigate('/mentorBano')}
              >
                <img src='/verified.png' />
                Become Mentor
              </div>
            )}
            {isAdmin && (
              <div
                style={{
                  color: '#108CFF',
                  // padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
                onClick={() => navigate('/Admin_Dashboard')}
              >
                <img src='/verified.png' />
                Admin Panel
              </div>
            )}
            {isSocietyMember && (
              <div
                style={{
                  color: '#108CFF',
                  // padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
                onClick={() => navigate('/dashboard')}
              >
                <img src='/verified.png' />
                Skillop Dashboard
              </div>
            )}
            {
              <div
                style={{
                  color: '#108CFF',
                  // padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
                onClick={() => navigate('/platformfeedback')}
              >
                <img src='/feedback.png' />
                FeedBack
              </div>
            }
            <div
              style={{
                color: '#FF4141',
                // padding: '5px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
              onClick={logout}
            >
              <img src='/logout.png' width={30} />
              Logout
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default SideNav;
