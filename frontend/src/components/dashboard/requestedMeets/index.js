import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../SideNav/SideNav';
import Profileandevents from '../../Landing/Profileandevents';

import toast from 'react-hot-toast';
import BookViewPopUp from './BookViewPopUp';
import Mobilecommonhead from '../../Mobilecommonhead';
import {
  getAcceptedBookings,
  getCompletedMeet,
  getPendingMeet,
} from '../../../api/menteeRequest';
import convertToNormalTime from '../../../utils/timeConversion';

const MEET_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
};

function RequestedMeets({
  userData,
  setProgress,
  Mentor,
  isFetched,
  notifyList,
}) {
  const navigate = useNavigate();

  const displaynavmob = () => {
    var x = document.querySelector('.side-nav-mob');
    if (x.classList[1]) {
      x.classList.remove('display');
    } else {
      x.classList.add('display');
    }
  };
  const [book, setBook] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [displaying, setDisplaying] = useState('upcomming');
  const [ShowBookPopUp, setShowBookPopUp] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [initialRequest, setInitialRequest] = useState(false);

  const onClose = () => {
    setShowBookPopUp(false);
  };

  const showstatus = (e) => {
    document.querySelector('.accepted').classList.remove('up');
    document.querySelector('.completed').classList.remove('up');
    document.querySelector('.pending').classList.remove('up');
    e.target.classList.add('up');
    if (e.target.classList.contains('accepted')) {
      // setBook(upcomming);
      setDisplaying('accepted');
    } else if (e.target.classList.contains('pending')) {
      // setBook(pending);
      setDisplaying('pending');
    } else if (e.target.classList.contains('completed')) {
      // setBook(completed);
      setDisplaying('completed');
    }
  };

  useEffect(() => {
    // setDisplaying("upcomming");
    // const getbookings = async () => {
    //     try {
    //         const { data } = await getscheduledbookings();
    //         console.log(data.result);
    //         setBook(data.result);
    //     } catch (error) {
    //         toast.error(error.response.data.message);
    //     }
    // };
    // getbookings();

    const getUpMeet = async () => {
      try {
        const { data } = await getAcceptedBookings();
        if (!data.result) toast.error(data.message);
        // console.log(data.result);
        setAccepted(data.result);
      } catch (error) {
        if (error.response) console.log(error.response.data.message);
      }
    };

    getUpMeet();

    const getPendMeet = async () => {
      try {
        const { data } = await getPendingMeet();
        if (!data.result) toast.error(data.message);
        // console.log(data.result);
        setPending(data.result);
      } catch (error) {
        if (error.response) console.log(error.response.data.message);
      }
    };
    getPendMeet();

    const getCompMeet = async () => {
      try {
        const { data } = await getCompletedMeet();
        if (!data.result) toast.error(data.message);
        // console.log(data.result);
        setCompleted(data.result);
      } catch (error) {
        if (error.response) console.log(error.response.data.message);
      }
    };
    getCompMeet();
    if (displaying === 'accepted') setBook(accepted);
    else if (displaying === 'pending') setBook(pending);
    else if (displaying === 'completed') setBook(completed);
  }, [displaying]);
  useEffect(() => {
    console.log('useEffect');
    // setDisplaying("upcomming");
    // const getbookings = async () => {
    //     try {
    //         const { data } = await getscheduledbookings();
    //         console.log(data.result);
    //         setBook(data.result);
    //     } catch (error) {
    //         toast.error(error.response.data.message);
    //     }
    // };
    // getbookings();

    const getUpMeet = async () => {
      try {
        const { data } = await getAcceptedBookings();
        if (!data.result) toast.error(data.message);
        // console.log(data.result);
        setAccepted(data.result);
        setBook(data.result);
        setInitialRequest(true);
      } catch (error) {
        if (error.response) console.log(error.response.data.message);
      }
    };

    getUpMeet();

    // const getPendMeet = async () => {
    //     try {
    //         const { data } = await getPendingMeet();
    //         if (!data.result) toast.error(data.message);
    //         // console.log(data.result);
    //         setPending(data.result);
    //     } catch (error) {
    //         if (error.response) console.log(error.response.data.message);
    //     }
    // };
    // getPendMeet();

    // const getCompMeet = async () => {
    //     try {
    //         const { data } = await getCompletedMeet();
    //         if (!data.result) toast.error(data.message);
    //         // console.log(data.result);
    //         setCompleted(data.result);
    //     } catch (error) {
    //         if (error.response) console.log(error.response.data.message);
    //     }
    // };
    // getCompMeet();
    // if (displaying === "upcomming") {
    //     console.log("upcomming");
    //       setBook(upcomming);
    //   } else if (displaying === "pending") setBook(pending);
    //   else if (displaying === "completed") setBook(completed);
  }, []);

  return (
    <>
      {/* <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      /> */}
      <Mobilecommonhead />
      <div className="dash-main">
        {/* <Commondash userData={userData} /> */}

        <div className="dash-right">
          <Profileandevents />

          {/* <Topbar setProgress={setProgress}/> */}
          <div className="session-dash-info">
            <h2 className="meets-head">Meets</h2>
            <div className="heading-session-status">
              <div
                className="accepted up"
                onClick={showstatus}
                style={{ cursor: 'pointer' }}
              >
                Accepted
              </div>
              <div
                className="pending"
                onClick={showstatus}
                style={{ cursor: 'pointer' }}
              >
                Pending
              </div>
              <div
                className="completed"
                onClick={showstatus}
                style={{ cursor: 'pointer' }}
              >
                Completed
              </div>
            </div>

            <div className="partition-session"></div>

            {ShowBookPopUp && (
              <BookViewPopUp
                type="Mentor"
                bookingData={bookingData}
                onClose={onClose}
              />
            )}

            {Object.entries(book).length === 0 ? (
              <div
                className="no-session"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  paddingLeft: '20px',
                }}
              >
                {initialRequest && <h3>No Sessions</h3>}
              </div>
            ) : (
              <div className="session-list-dash">
                {Object.entries(book).map(([date, items]) => (
                  <div>
                    <ul>
                      <li>Date: {new Date(date).toString().slice(0, 15)}</li>
                    </ul>
                    {Object.entries(items).map((item) => (
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setBookingData(item);
                          console.log(item);
                          setShowBookPopUp(true);
                        }}
                        className="individual-session"
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {/* <img src={logo} /> */}

                          <span>
                            Timing:&nbsp;{convertToNormalTime(item[1].s)} -{' '}
                            {convertToNormalTime(item[1].e)}{' '}
                          </span>
                        </div>
                        <span>Number of Bookings :1</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestedMeets;
