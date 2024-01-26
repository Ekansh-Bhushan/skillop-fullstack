import React, { useEffect, useState } from 'react';
import './notification.css';
import Box from './notify box/box';
import Profileandevents from '../Profileandevents';
import './notification.css';
import spinner from '../../images/spinner.gif';
import {
  getNotifications,
  readNotifications,
} from '../../../api/getNotifications';
import Mobilecommonhead from '../../Mobilecommonhead';
import toast from 'react-hot-toast';

// function Notify({ userData }) {
const Notification = ({
  setProgress,
  userData,
  setUserData,
  Mentor,
  isFetched,
}) => {
  const [selectedButton, setSelectedButton] = useState('All'); // Initial selected button
  const [notifyList, setNotifyList] = useState([]);
  const [fetchingNotify, setFetchingNotify] = useState(false);
  const [notiType, setNotiType] = useState('all');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const fetchNotifications = async () => {
    try {
      setFetchingNotify(true);
      const NotiData = await getNotifications();
      setNotifyList(NotiData.data.result);
      setFetchingNotify(false);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log('Unable to fetch notifications', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markReadNotification = async (id) => {
    // console.log("markreadnotify")
    try {
      await readNotifications(id);
    } catch (err) {
      console.log('Unable to mark read notification', err);
    }
  };

  return (
    <>
      <Mobilecommonhead />
      <div className='mt-0 notifications-container'>
        <div>
          <Profileandevents userData={userData} />
        </div>

        <div className='d-flex items-center justify-center w-[50%] ml-[20vw] border-r-2 pt-[13vh] md:w-[125%] md:ml-0 md:pb-[8vh] min-h-[100vh]'>
          <div className='text-3xl font-semibold pl-5 border-b-2 pb-5'>
            <h2 className='text-2xl'>Notifications</h2>
          </div>

          {fetchingNotify && (
            <div className='flex items-center justify-center mt-10'>
              <img src={spinner} alt='loading' className='w-[60px]' />
            </div>
          )}
          {/* </div> */}
          {!fetchingNotify && notifyList.length === 0 && (
            <div className='flex items-center justify-center'>
              {' '}
              <h3 className='no-notify'>No Notifications</h3>
            </div>
          )}
          <div className=''>
            {notifyList.map((item) => {
              const shouldDisplay =
                notiType === 'all' ||
                (notiType === 'new' && !item.read) ||
                (notiType === 'read' && item.read);

              if (shouldDisplay) {
                return (
                  <div
                    onClick={() => markReadNotification(item._id)}
                    className={`border-b-2 ${
                      !item.read ? '' : 'bg-[#84848426]'
                    }`}
                  >
                    <Box
                      message={item.message}
                      time={item.__created}
                      url={item.link}
                      isread={item.read}
                      id={item._id}
                      category={item.type}
                      type={notiType}
                      img={item.fromUserProfileImg}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <div className='side-nav-notifications'></div>
    </>
  );
};

export default Notification;
