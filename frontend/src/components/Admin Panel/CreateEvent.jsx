import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createEvent } from '../../api/adminPanel';

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
      createdBy: 'amananjalitiwari2007',
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
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col max-h-[700px] items-center justify-center gap-4 border border-black p-2 w-[25%]">
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
  );
};

export default CreateEvent;
