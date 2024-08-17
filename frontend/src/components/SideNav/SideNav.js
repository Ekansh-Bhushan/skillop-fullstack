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

const SideNav = ({ setProgress, Mentor, isAdmin, isSocietyMember, isFetched }) => {
  const navigate = useNavigate();
  const [showChatNotification, setShowChatNotification] = useState(false);

  const logout = async () => {
    try {
      setProgress(30);
      localStorage.removeItem('skilloptoken');
    } catch (error) {
      toast.error(error.message);
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
        navigate('/book');  // Change back to /mybookings in future
      } else {
        navigate('/homepage');
        toast.error('Booking page is 🔒 locked\nBecome a MENTOR 😎 to unlock!');
      }
      setTimeout(() => setProgress(100), 300);
    }
  };

  const handleEarnings = () => {
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
    }
  };

  const checkChatNotification = async () => {
    try {
      const CurrUsrId = localStorage.getItem('current-user-id');
      const { data } = await userChats(CurrUsrId);
      data.forEach(async (chat) => {
        const data2 = await getMessages(chat._id);
        data2.data.forEach((msg) => {
          if (!msg.seen && msg.senderId !== CurrUsrId) {
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
            <img src={home2} alt='Home active' />
          ) : (
            <img src={home1} alt='Home inactive' />
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
            <img src={search2} alt='Search active' />
          ) : (
            <img src={search1} alt='Search inactive' />
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
            <img src={chat2} alt='Chat active' />
          ) : (
            <img src={chat1} alt='Chat inactive' />
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
              <div className='chat-notify-num-icon'>*</div>
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
            <img src={notification2} alt='Notifications active' />
          ) : (
            <img src={notification1} alt='Notifications inactive' />
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
              </div>
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
            <img src='/meet2.png' alt='Meets active' />
          ) : (
            <img src='/meet.png' alt='Meets inactive' />
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
            <img src={slots2} alt='Slots active' />
          ) : (
            <img src={slots1} alt='Slots inactive' />
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
            <img src={bookings2} alt='Bookings active' />
          ) : (
            <img src={bookings1} alt='Bookings inactive' />
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
            <img src={earnings2} alt='Earnings active' />
          ) : (
            <img src={earnings1} alt='Earnings inactive' />
          )}
          <span
            className={`${
              window.location.pathname === '/myearnings' ? 'active2' : ''
            } hover-effect-bottom`}
          >
            Earnings
          </span>
          {!Mentor && <img id='notify-lock' src='/lock1.png' alt='lock' />}
        </li>
        <li onClick={() => navigate('/myprofile')}>
          {window.location.pathname === '/myprofile' ? (
            <img src={myprofile2} alt='Profile active' />
          ) : (
            <img src={myprofile1} alt='Profile inactive' />
          )}
          <span
            className={`${
              window.location.pathname === '/myprofile' ? 'active2' : ''
            } hover-effect-bottom`}
          >
            Profile
          </span>
        </li>
        <li onClick={logout}>
          <img src={account1} alt='Account' />
          <span className='hover-effect-bottom'>Logout</span>
        </li>
        {isAdmin && (
          <>
            <li
              onClick={() => {
                setProgress(40);
                navigate('/admin');
                setTimeout(() => setProgress(100), 300);
              }}
            >
              <img src='/admin.png' alt='Admin' />
              <span className='hover-effect-bottom'>Admin</span>
            </li>
            <li
              onClick={() => {
                setProgress(40);
                navigate('/admin/users');
                setTimeout(() => setProgress(100), 300);
              }}
            >
              <img src='/users.png' alt='Users' />
              <span className='hover-effect-bottom'>Users</span>
            </li>
            <li
              onClick={() => {
                setProgress(40);
                navigate('/admin/mentor');
                setTimeout(() => setProgress(100), 300);
              }}
            >
              <img src='/mentor.png' alt='Mentors' />
              <span className='hover-effect-bottom'>Mentors</span>
            </li>
          </>
        )}
        {isSocietyMember && (
          <>
            <li
              onClick={() => {
                setProgress(40);
                navigate('/society/homepage');
                setTimeout(() => setProgress(100), 300);
              }}
            >
              <img src='/society.png' alt='Society' />
              <span className='hover-effect-bottom'>Society</span>
            </li>
            <li
              onClick={() => {
                setProgress(40);
                navigate('/society/events');
                setTimeout(() => setProgress(100), 300);
              }}
            >
              <img src='/events.png' alt='Events' />
              <span className='hover-effect-bottom'>Events</span>
            </li>
          </>
        )}
        <li>
          <div className='hover-effect-bottom' onMouseEnter={displayxtra} onMouseLeave={hidextra}>
            <span>
              <BsGearFill className='icon' />
              Settings
            </span>
            <div className='xtra-opt'>
              <div onClick={() => navigate('/settings')}>
                <span>Settings</span>
              </div>
              <div onClick={() => navigate('/settings/account')}>
                <span>Account</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default SideNav;
