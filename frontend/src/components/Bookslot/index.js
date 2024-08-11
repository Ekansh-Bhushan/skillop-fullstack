import React, { useEffect, useState } from 'react';
import './index.css';
import Profileandevents from '../Landing/Profileandevents';
import { getMentorAvaibility, getMentorData } from '../../api/mentorRequest';
import Mobilecommonhead from '../Mobilecommonhead';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import convertToNormalTime from '../../utils/timeConversion';

function Bookslot({ userData, setProgress }) {
  const navigate = useNavigate();
  const mentorId = window.location.pathname.split('/')[2];

  // function that yield next date start from today
  const [slots, setSlots] = useState({});
  const [mentorData, setMentorData] = useState({});
  useEffect(() => {
    const getMentorDataa = async () => {
      try {
        const response = await getMentorData(mentorId);
        setMentorData(response.data.result);
      } catch (error) {
        toast('Something went wrong');
      }
    };
    getMentorDataa();
  }, []);

  const getNextDate = (date) => {
    const today = new Date(date);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const onClickingBook = (day, mentorid, s, e, userid, charge) => {
    navigate(
      '/authorize-zoom-meet' +
        '/' +
        mentorid +
        '/' +
        day +
        '/' +
        s +
        '/' +
        e +
        '/' +
        userid +
        '/' +
        charge
    );
    
  };

  // use effect to load the slots on site loads
  useEffect(() => {
    const getSlot = async () => {
      let ct = 0;
      let day = getNextDate(new Date()).toISOString().split('T')[0];
      while (ct < 7) {
        try {
          setProgress((ct / 7) * 100);
          const response = await getMentorAvaibility({ date: day }, mentorId);
          if (response.data.result && response.data.result.length) {
            
            const x = slots;
            x[day] = response.data.result;
            setSlots(x);
           
            ct += response.data.result.length;
          } else if (!response.data.result) {
            toast(response.data.message);
            break;
          }
        } catch (error) {
          toast('Something went wrong');
          break;
        }
       
        day = getNextDate(day).toISOString().split('T')[0];
      }
      setProgress(100);
    };
    getSlot();
  }, [mentorId, slots, setProgress]);

  return (
    <>
      <Mobilecommonhead />
      

      <div className='flex items-center justify-center h-full sm:w-[100%] xl:w-[70%] xl:ml-[7vw] sm:ml-[0vw] main-container'>
        <div className='w-[70%] h-screen flex justify-center ' style={{paddingTop: "84px"}}>
          <div className='w-[90%] h-full flex flex-col border-r-2 md:border-0 md:w-[100%] sm:w-[100%]'>
            <div className='text-2xl font-semibold pl-10 sm:text-lg sm:pl-0'>
              Book a Slot for
            </div>
            <div className='text-3xl font-semibold pl-10 sm:text-2xl sm:pl-0'>
              {' '}
              1:1 Session
            </div>
            
            <div className='slot-complete-list'>
              <div className='headers-slot'>
                <div>Day</div>
                <div>Time</div>
                <div>Amount</div>
              </div>
              <div className='flex items-center justify-center flex-col slots-container'>
                {Object.keys(slots).length > 0 ? (
                  Object.keys(slots).map((day) => {
                    return (
                      <div className='slot-1-book'>
                        {slots[day].map((slot) => {
                          return (
                            <>
                              <div className='list-1'>
                                <div className='day-name'>
                                  {new Date(day).toString().slice(0, 15)}
                                </div>
                                <div className='slot-scheduled-time'>
                                  {convertToNormalTime(slot.s)} -{' '}
                                  {convertToNormalTime(slot.e)}
                                </div>
                                <div className='amount-slot'>
                                  ₹{Math.round(slot.charge)}
                                </div>
                                <button
                                  onClick={() =>
                                    onClickingBook(
                                      day,
                                      mentorId,
                                      slot.s,
                                      slot.e,
                                      userData._id,
                                      slot.charge
                                    )
                                  }
                                >
                                  Book{' '}
                                </button>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    );
                  })
                ) : (
                  <h3 style={{ textAlign: 'center', margin: '5vw' }}>
                    No slot added by user
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>

        <Profileandevents userData={mentorData} useUserData={true} />
      </div>
    </>
  );
}

export default Bookslot;
