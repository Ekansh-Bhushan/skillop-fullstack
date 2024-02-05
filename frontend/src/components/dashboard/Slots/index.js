import React, { useEffect, useRef } from 'react';
import './index.css';
import { toast } from 'react-hot-toast';
import {
  delIndividualSlot,
  getActualAvail,
  postSlot,
} from '../../../api/slotsRequest';
import { useState } from 'react';
import Header1 from '../../Header';
import Pageloader from '../../Pagesbar';
import { useNavigate } from 'react-router-dom';
import Profileandevents from '../../Landing/Profileandevents';
import Mobilecommonhead from '../../Mobilecommonhead';

function Dashboard({ userData, setProgress, shouldbevisible, Mentor }) {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const targetref = useRef(null);

  const [avail, setAvail] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  useEffect(() => {
    const getSlots = async () => {
      try {
        const { data } = await getActualAvail();
        setAvail(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getSlots();
  }, [refresh]);

  useEffect(() => {
    function handleClickOutside2(event) {
      if (targetref.current && !targetref.current.contains(event.target)) {
        document.querySelector('.slot-pop').classList.add('hideelem');
      }
    }
    document.addEventListener('click', handleClickOutside2);
    return () => {
      document.removeEventListener('click', handleClickOutside2);
    };
  }, []);

  useEffect(() => {
    if (window.location.pathname.toString().includes('authskill')) {
      document.querySelector('.schedules-dash').style.width = '75%';
      document.querySelector('.schedules-dash').style.margin = 'auto';
      document.querySelector('.header-dash').style.marginLeft = '40vh';
    }
  }, []);

  if (!Mentor) {
    navigate('/homepage');
    toast.error('Slots page is 🔒 locked\nBecome a MENTOR 😎 to unlock!');
    return null;
  }

  const showslotlist = () => {
    document.querySelector('.slot-pop').classList.remove('hideelem');
    document.querySelector('.slot-pop').style.backdropFilter =
      'brightness(30%)';
  };

  const AddSlot = async (data) => {
    try {
      await postSlot(data);
      // if (Object.keys(data.actualAvailability).length > 0)
      toast.success('Slot added!');
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error); // toast it  error.response.data.message
    }
  };
  // AddSlot();
  const closeit = () => {
    document.querySelector('.slot-pop').classList.add('hideelem');
  };

  const saveSlots = async (day) => {
    setRefresh(!refresh);
    const stAR = document
      .getElementById(day + '-start')
      .value.toString()
      .split(':');
    const edAR = document
      .getElementById(day + '-end')
      .value.toString()
      .split(':');
    const st = stAR[0] + stAR[1];
    const ed = edAR[0] + edAR[1];
    const resBody = {
      actualAvailability: {
        ...avail,
        [day]: [
          {
            s: Number.parseInt(st),
            e: Number.parseInt(ed),
          },
        ].concat(avail[day]),
      },
    };

    try {
      setRefresh(!refresh);
      await AddSlot(resBody);
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };

  const clearAllSlots = async () => {
    setRefresh(!refresh);
    const resBody = {
      actualAvailability: {},
    };

    try {
      toast.success('All slots deleted!');
      setRefresh(!refresh);
      await AddSlot(JSON.stringify(resBody));
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };

  const handleIndividualSlotDel = async (day, slot) => {
    try {
      const res = await delIndividualSlot(day, slot);
      console.log('del slor resp ', res);
      setRefresh(!refresh);
      toast.success('Slot deleted');
    } catch (err) {
      console.log('Error deleting slot', err);
      toast.error(err?.response?.data?.message);
      toast.error(err?.response?.data?.err);
    }
  };

  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  return (
    <>
      <Mobilecommonhead />
      {!shouldbevisible && <Header1 />}
      {!shouldbevisible && (
        <Pageloader
          givecolor2={false}
          givecolor3={false}
          givecolor4={false}
          givecolor5={false}
          givecolor6={false}
          givecolor7={true}
          givecolor8={true}
          isactive7={true}
        />
      )}
      <div className='slot-pop hideelem'>
        <div className='popup-of-slots'>
          <div className='cross' onClick={closeit}>
            <div className='line31'></div>
            <div className='line32'></div>
          </div>
          <div className='all-slots'>
            <h1 style={{ textAlign: 'center' }}>
              <u>Your saved slots</u>
            </h1>
            {days.map((day) => (
              <>
                <div className={day}>
                  <h2>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
                  <br></br>
                  {avail[day] && avail[day].length !== 0 ? (
                    avail[day].map((slot, index) => {
                      return (
                        <div className='flex items-center gap-5 m-1 text-lg'>
                          <div key={slot._id}>
                            {JSON.stringify(slot.s).length === 3
                              ? JSON.stringify(slot.s).slice(0, 1) +
                                ':' +
                                JSON.stringify(slot.s).slice(1, 3)
                              : JSON.stringify(slot.s).slice(0, 2) +
                                ':' +
                                JSON.stringify(slot.s).slice(2, 4)}
                            {' - '}
                            {JSON.stringify(slot.e).length === 3
                              ? JSON.stringify(slot.e).slice(0, 1) +
                                ':' +
                                JSON.stringify(slot.e).slice(1, 3)
                              : JSON.stringify(slot.e).slice(0, 2) +
                                ':' +
                                JSON.stringify(slot.e).slice(2, 4)}
                          </div>
                          <img
                            onClick={() => handleIndividualSlotDel(day, slot)}
                            className='cursor-pointer hover:opacity-80'
                            src='/delete.png'
                            width={30}
                            alt=''
                          />
                        </div>
                      );
                    })
                  ) : (
                    <p>No slots added</p>
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      {/* {shouldbevisible && userData._id && (
        <SideNav
          setProgress={setProgress}
          Mentor={Mentor}
          isFetched={isFetched}
          notifyList={notifyList}
          CurrUserId={userData._id}
        />
      )} */}

      <div className='flex mt-[35px] ml-[40vh] md:ml-[10vh]'>
        {/* <Commondash userData={userData} /> */}

        <div
          className={
            shouldbevisible
              ? 'flex flex-col border-r-2 w-[65%] md:border-r-0'
              : 'flex flex-col border-r-2 w-[80%]'
          }
        >
          {/* <Topbar setProgress={setProgress}/> */}
          {shouldbevisible && <Profileandevents />}
          <div className='ml-12 mt-10 text-2xl font-semibold md:mt-14'>
            Edit your Availability
          </div>
          <div className='schedules-dash'>
            {shouldbevisible && (
              <div className='buttons-dash'>
                {/* <button className="today">Today</button> */}
                <button className='show-slot-list' onClick={showslotlist}>
                  View All Slots
                </button>
                {/* <div className="btns-dash">
                  <button>On Date </button>
                  <button>Month</button>
                  <button>23</button>
                </div> */}
              </div>
            )}

            <div className='slot-dash'>
              <div className='days-dash'>
                <div className='days'>
                  <h3>DAYS</h3>
                </div>
                <div className='days'>
                  <label htmlFor='MONDAY'>MONDAY</label>
                </div>
                <div className='days-partition'></div>
                <div className='days'>
                  <label htmlFor='TUESDAY'>TUESDAY</label>
                </div>
                <div className='days-partition'></div>
                <div className='days'>
                  <label htmlFor='WEDNESDAY'>WEDNESDAY</label>
                </div>
                <div className='days-partition'></div>
                <div className='days'>
                  <label htmlFor='THURSDAY'>THURSDAY</label>
                </div>
                <div className='days-partition'></div>
                <div className='days'>
                  <label htmlFor='FRIDAY'>FRIDAY</label>
                </div>
                <div className='days-partition'></div>
                <div className='days'>
                  <label htmlFor='SATURDAY'>SATURDAY</label>
                </div>
                <div className='days-partition'></div>
                <div className='days'>
                  <label htmlFor='SUNDAY'>SUNDAY</label>
                </div>
                <div className='days-partition'></div>
              </div>
              <div className='slots-dash'>
                <h3>TIME SLOTS</h3>

                <div className='slot-1'>
                  <select id='monday-start'>
                    <option value=''>Start</option>
                    <option value='8:00'>8:00</option>
                    <option value='8:30'>8:30</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                  </select>

                  <select id='monday-end'>
                    <option value=''>End</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                    <option value='24:00'>00:00</option>
                  </select>
                  <button
                    className='pushslot'
                    id='monday'
                    onClick={() => {
                      saveSlots('monday');
                      // Call the function to save the slot (you can pass any necessary parameters)
                      // AddSlot();
                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById('monday-start');
                      const endTimeSelect =
                        document.getElementById('monday-end');
                      startTimeSelect.value = '8:00';
                      endTimeSelect.value = '9:00';
                    }}
                  >
                    +
                  </button>
                </div>
                <div className='slot-2'>
                  <select id='tuesday-start'>
                    <option value=''>Start</option>
                    <option value='8:00'>8:00</option>
                    <option value='8:30'>8:30</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                  </select>
                  <select id='tuesday-end'>
                    <option value=''>End</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                    <option value='24:00'>00:00</option>
                  </select>
                  <button
                    className='pushslot'
                    id='tuesday'
                    onClick={() => {
                      saveSlots('tuesday');
                      // Call the function to save the slot (you can pass any necessary parameters)
                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById('tuesday-start');
                      const endTimeSelect =
                        document.getElementById('tuesday-end');
                      startTimeSelect.value = '8:00';
                      endTimeSelect.value = '9:00';
                    }}
                  >
                    +
                  </button>
                </div>
                <div className='slot-3'>
                  <select id='wednesday-start'>
                    <option value=''>Start</option>
                    <option value='8:00'>8:00</option>
                    <option value='8:30'>8:30</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                  </select>
                  <select id='wednesday-end'>
                    <option value=''>End</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                    <option value='24:00'>00:00</option>
                  </select>
                  <button
                    className='pushslot'
                    id='wednesday'
                    onClick={() => {
                      saveSlots('wednesday');
                      // Call the function to save the slot (you can pass any necessary parameters)

                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById('wednesday-start');
                      const endTimeSelect =
                        document.getElementById('wednesday-end');
                      startTimeSelect.value = '8:00';
                      endTimeSelect.value = '9:00';
                    }}
                  >
                    +
                  </button>
                </div>
                <div className='slot-4'>
                  <select id='thursday-start'>
                    <option value=''>Start</option>
                    <option value='8:00'>8:00</option>
                    <option value='8:30'>8:30</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                  </select>
                  <select id='thursday-end'>
                    <option value=''>End</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                    <option value='24:00'>00:00</option>
                  </select>
                  <button
                    className='pushslot'
                    id='thursday'
                    onClick={() => {
                      saveSlots('thursday');
                      // Call the function to save the slot (you can pass any necessary parameters)

                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById('thursday-start');
                      const endTimeSelect =
                        document.getElementById('thursday-end');
                      startTimeSelect.value = '8:00';
                      endTimeSelect.value = '9:00';
                    }}
                  >
                    +
                  </button>
                </div>
                <div className='slot-5'>
                  <select id='friday-start'>
                    <option value=''>Start</option>
                    <option value='8:00'>8:00</option>
                    <option value='8:30'>8:30</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                  </select>
                  <select id='friday-end'>
                    <option value=''>End</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                    <option value='24:00'>00:00</option>
                  </select>
                  <button
                    className='pushslot'
                    id='friday'
                    onClick={() => {
                      saveSlots('friday');
                      // Call the function to save the slot (you can pass any necessary parameters)

                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById('friday-start');
                      const endTimeSelect =
                        document.getElementById('friday-end');
                      startTimeSelect.value = '8:00';
                      endTimeSelect.value = '9:00';
                    }}
                  >
                    +
                  </button>
                </div>
                <div className='slot-6'>
                  <select id='saturday-start'>
                    <option value=''>Start</option>
                    <option value='8:00'>8:00</option>
                    <option value='8:30'>8:30</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                  </select>
                  <select id='saturday-end'>
                    <option value=''>End</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                    <option value='24:00'>00:00</option>
                  </select>
                  <button
                    className='pushslot'
                    id='saturday'
                    onClick={() => {
                      saveSlots('saturday');
                      // Call the function to save the slot (you can pass any necessary parameters)

                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById('saturday-start');
                      const endTimeSelect =
                        document.getElementById('saturday-end');
                      startTimeSelect.value = '8:00';
                      endTimeSelect.value = '9:00';
                    }}
                  >
                    +
                  </button>
                </div>
                <div className='slot-7'>
                  <select id='sunday-start'>
                    <option value=''>Start</option>
                    <option value='8:00'>8:00</option>
                    <option value='8:30'>8:30</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                  </select>
                  <select id='sunday-end'>
                    <option value=''>End</option>
                    <option value='9:00'>9:00</option>
                    <option value='9:30'>9:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
                    <option value='21:30'>21:30</option>
                    <option value='22:00'>22:00</option>
                    <option value='22:30'>22:30</option>
                    <option value='23:00'>23:00</option>
                    <option value='23:30'>23:30</option>
                    <option value='24:00'>00:00</option>
                  </select>
                  <button
                    className='pushslot'
                    id='sunday'
                    onClick={() => {
                      saveSlots('sunday');
                      // Call the function to save the slot (you can pass any necessary parameters)
                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById('sunday-start');
                      const endTimeSelect =
                        document.getElementById('sunday-end');
                      startTimeSelect.value = '8:00';
                      endTimeSelect.value = '9:00';
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '1vw' }} className='btnCont'>
              <button
                className='next2 md:mb-10'
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  width: '100px',
                  fontSize: '1.02rem',
                }}
                onClick={clearAllSlots}
              >
                Delete slots
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
