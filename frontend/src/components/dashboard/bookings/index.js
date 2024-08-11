import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profileandevents from '../../Landing/Profileandevents';
import {
  acceptMeet,
  getCompletedMeet,
  getPendingMeet,
  getUpcommingBookings,
  getscheduledbookings,
} from '../../../api/mentorRequest';
import toast from 'react-hot-toast';
import BookViewPopUp from './BookViewPopUp';
import Mobilecommonhead from '../../Mobilecommonhead';
import convertToNormalTime from '../../../utils/timeConversion';
import { updateMeetCharge } from '../../../api/slotsRequest';

const MEET_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
};

function Bookings({ userData, setProgress, Mentor }) {
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  const [upcomming, setUpcomming] = useState([]);
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [displaying, setDisplaying] = useState('upcomming');
  const [ShowBookPopUp, setShowBookPopUp] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [initialRequest, setInitialRequest] = useState(false);
  const [charge, setCharge] = useState('');

  const onClose = () => {
    setShowBookPopUp(false);
  };

  const showstatus = (e) => {
    document.querySelector('.upcoming').classList.remove('up');
    document.querySelector('.completed').classList.remove('up');
    document.querySelector('.pending').classList.remove('up');
    e.target.classList.add('up');
    if (e.target.classList.contains('upcoming')) {
      // setBook(upcomming);
      setDisplaying('upcomming');
    } else if (e.target.classList.contains('pending')) {
      // setBook(pending);
      setDisplaying('pending');
    } else if (e.target.classList.contains('completed')) {
      // setBook(completed);
      setDisplaying('completed');
    }
  };

  const handleUpdateCharge = async () => {
    try {
      const res = await updateMeetCharge(charge);
      setCharge(res.data.result.chargePerHour);
      toast.success('Charge per hour updated');
    } catch (err) {
      toast.error(err.response.data.message);
    }
    window.location.reload();
  };

  useEffect(() => {
    const getUpMeet = async () => {
      try {
        const { data } = await getUpcommingBookings();
        if (!data.result) toast.error(data.message);
        setUpcomming(data.result);
      } catch (error) {
        if (error.response) toast.error(error.response.data.message);
      }
    };

    getUpMeet();

    const getPendMeet = async () => {
      try {
        const { data } = await getPendingMeet();
        if (!data.result) toast.error(data.message);
        setPending(data.result);
      } catch (error) {
        if (error.response) toast.error(error.response.data.message);
      }
    };
    getPendMeet();

    const getCompMeet = async () => {
      try {
        const { data } = await getCompletedMeet();
        if (!data.result) toast.error(data.message);
        setCompleted(data.result);
      } catch (error) {
        if (error.response) toast.error(error.response.data.message);
      }
    };
    getCompMeet();
    if (displaying === 'upcomming') setBook(upcomming);
    else if (displaying === 'pending') setBook(pending);
    else if (displaying === 'completed') setBook(completed);
  }, [displaying]);


  useEffect(() => {
    const getUpMeet = async () => {
      try {
        const { data } = await getUpcommingBookings();
        if (!data.result) toast.error(data.message);
        setUpcomming(data.result);
        setBook(data.result);
        setInitialRequest(true);
      } catch (error) {
        if (error.response) toast.error(error.response.data.message);
      }
    };

    getUpMeet();
  }, []);

  if (!Mentor) {
    navigate('/homepage');
    toast.error('Bookings page is 🔒 locked\nBecome a MENTOR 😎 to unlock!');
    return null;
  }

  return (
    <>
      <Mobilecommonhead />

      <div className='ml-[20vw] md:ml-0'>
        {/* <Commondash userData={userData} /> */}

        <div className='dash-right'>
          <Profileandevents />

          {/* <Topbar setProgress={setProgress}/> */}
          <div className='session-dash-info ml-5'>
            <h2 className='meets-head text-2xl'>Booking</h2>
            <div className='heading-session-status'>
              <div
                className='upcoming up'
                onClick={showstatus}
                style={{ cursor: 'pointer' }}
              >
                Upcoming
              </div>
              <div
                className='pending'
                onClick={showstatus}
                style={{ cursor: 'pointer' }}
              >
                Pending
              </div>
              <div
                className='completed'
                onClick={showstatus}
                style={{ cursor: 'pointer' }}
              >
                Completed
              </div>
            </div>

            {/* <div className="partition-session"></div> */}

            {ShowBookPopUp && (
              <BookViewPopUp
                type='Mentee'
                bookingData={bookingData}
                onClose={onClose}
              />
            )}

            {Object.entries(book).length === 0 ? (
              <div className='no-session flex flex-col h-[100%] pl-[20px] border-b-2 md:pl-0'>
                {initialRequest && (
                  <h3 className='md:text-center md:mt-5'>No Sessions</h3>
                )}
              </div>
            ) : (
              <div className='session-list-dash'>
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
                          setShowBookPopUp(true);
                        }}
                        className='individual-session'
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'justify-between',
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
            <div className='text-center flex justify-cente my-5 ' style={{marginLeft: '100px'}}>
              <div className='meet-rate'>
                <div>
                Current charge per hour : {userData.mentor.chargePerHour ? `${userData.mentor.chargePerHour} Rs` : 'N/A'}
                </div>
                <div style={{ display: 'flex', gap: '2vw' }}>
                  <input
                    type='number'
                    value={charge}
                    onChange={(e) => setCharge(e.target.value)}
                    className='meet-rate-input border-black border-[1px]'
                    placeholder='Enter new rate'
                  />
                  <button
                    className='update-meet-rate-btn'
                    onClick={handleUpdateCharge}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookings;
