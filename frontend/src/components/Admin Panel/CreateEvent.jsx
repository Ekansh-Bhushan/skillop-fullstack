import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createEvent } from '../../api/adminPanel';
import AdminSideNav from './AdminSideNav/AdminSideNav';
import EventList from "./EventList.jsx";
import MobileAdminSideNav from '../MobileAdminSideNav/MobileAdminSideNav';
const CreateEvent = () => {
  const [Desc, setDesc] = useState('');
  const [Title, setTitle] = useState('');
  const [StartTime, setStartTime] = useState('');
  const [EndTime, setEndTime] = useState('');
  const [MeetLink, setMeetLink] = useState('');
  const [ImageLink, setImageLink] = useState('');

  const handleEvent = async () => {
    const data = {
      title: Title,
      description: Desc,
      startTime: StartTime,
      endTime: EndTime,
      link: MeetLink,
      image: ImageLink,
      createdBy: 'ekanshbhushan',
    };

    try {
      await createEvent(data);
      toast.success('Event Created!');
      setTitle('');
      setDesc('');
      setStartTime('');
      setEndTime('');
      setMeetLink('');
      setImageLink('');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
    <MobileAdminSideNav/>
        {/* {isMobile ? <MobileAdminSideNav/> : <AdminSideNav />} */}
    <AdminSideNav />
    <div className='flex flex-row sm:flex-col my-[70px] mx-[250px] gap-[200px] sm:gap-[50px] sm:mx-[50px] md:gap-[200px]'>
    <div className="flex flex-col items-center justify-center gap-4 border border-black p-2 h-[85vh] w-full max-w-[500px] mx-auto">
      <h2>Create Event</h2>
      <input
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Enter event title"
      />
      <textarea
        className="border-[2px] border-black p-2 text-lg"
        name="notification"
        cols="30"
        rows="6"
        placeholder="Enter event description"
        value={Desc}
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>
      <label htmlFor="starttime">Start Time : </label>
      <input
        value={StartTime}
        onChange={(e) => setStartTime(e.target.value)}
        type="datetime-local"
        name="starttime"
      />
      <label htmlFor="endtime">End Time : </label>
      <input
        value={EndTime}
        onChange={(e) => setEndTime(e.target.value)}
        type="datetime-local"
        name="endtime"
      />
      <input
        value={MeetLink}
        onChange={(e) => setMeetLink(e.target.value)}
        type="text"
        placeholder="Enter meet link"
      />
      <input
        value={ImageLink}
        onChange={(e) => setImageLink(e.target.value)}
        type="text"
        placeholder="Enter image link to be displayed"
      />
      <button
        onClick={handleEvent}
        className="bg-green-600 px-4 py-2 rounded-xl text-lg text-white hover:bg-green-500"
      >
        Create
      </button>
    </div>
    <EventList />
    </div>
    </>
  );
};

export default CreateEvent;
