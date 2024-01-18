import React from 'react';
import { getUser } from '../../../api/userRequest';
import linkedin from '../../images/linkedin.png';
import userPic from '../../images/user.png';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultBGPic from '../../images/Robo.png';
import { fetchUpcomingEvents } from '../../../api/adminPanel';
export default function Profileandevents({ userData, isHome, useUserData }) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData1 = await getUser();
        setUserDetails(userData1.data.result);
      } catch (err) {
        console.log('Unable to fetch user details', err);
      } finally {
        if (useUserData) {
          setUserDetails(userData);
          console.log('xxxxx', userData);
        }
      }
    };
    fetchUserDetails();
  }, [setUserDetails, useUserData, userData]);

  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await fetchUpcomingEvents("upcoming");
      setEventData(events.data.result);
    };
    fetchEvents();
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  // Add a scroll event listener to check if the user has scrolled down enough to show the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={isHome ? 'prof-and-events ishome' : 'prof-and-events'}>
        <div
          className='common-prof'
          style={{
            backgroundImage:
              userDetails &&
              (userDetails.bgPicUrl
                ? `url(${userDetails.bgPicUrl})`
                : `url(${defaultBGPic})`),
          }}
        >
          <div className='common-prof-info'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '100%',
              }}
            >
              {userDetails && (
                <img
                  src={
                    userDetails.profilePicUrl
                      ? userDetails.profilePicUrl
                      : userPic
                  }
                  className='prof-image-common'
                  alt='user'
                />
              )}

              <div>
                {userDetails && userDetails.firstname && (
                  <div className='user-name'>
                    {userDetails.firstname + ' ' + userDetails.lastname}
                    {userDetails.isMentor && (
                      <img src='/verified.png' width={20} alt='' />
                    )}
                  </div>
                )}
                {userDetails && (
                  <p style={{ margin: '10px' }}>
                    {userDetails &&
                    userDetails.experence.length &&
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
                          userDetails.education &&
                          userDetails.education.length > 0
                            ? ' @ ' + userDetails.education[0].institution
                            : '')}
                      </p>
                    )}
                  </p>
                )}
              </div>

              {userDetails && (
                <a
                  href={
                    userDetails.linkedinId
                      ? userDetails.linkedinId
                          .toString()
                          .includes('linkedin.com')
                        ? userDetails.linkedinId
                        : `https://linkedin.com/in/${userDetails.linkedinId}`
                      : ''
                  }
                  target='_blank'
                  rel='noreferrer'
                >
                  <img src={linkedin} alt='linkedin' />
                </a>
              )}
            </div>
            {userDetails && (
              <div
                className='view-my-prof'
                onClick={() => navigate('/Profile')}
              >
                View Profile
              </div>
            )}
          </div>
        </div>

        <div className='event-upcoming'>
          <div className='header-events'>
            <h2
              style={{
                fontWeight: '500',
                paddingTop: '10px',
                paddingLeft: '16px',
              }}
            >
              Upcoming Events
            </h2>
          </div>
          <div className='event-list2 overflow-y-auto'>
            {eventData.map((item) => {
              return (
                <div key={item._id} className='event-1'>
                  <b>{item.title}</b>
                  <p>{item.description}</p>
                  <p>
                    {new Date(item.startTime).toString().slice(0, 15)}
                    {' - '}
                    {new Date(item.endTime).toString().slice(0, 15)}
                  </p>
                </div>
              );
            })}
          </div>
          {/* <div className="join-premium">
            <a
              href="https://forms.gle/5eHDU3aAdWstuFs39"
              target="_blank"
              rel="noreferrer"
            >
              Join SKILLOP Premium
            </a>
          </div> */}
        </div>

        <div>
          {isVisible && (
            <button className='scroll-to-top' onClick={scrollToTop}>
              <img src='/scrolltop.png' alt='scroll top button' />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
