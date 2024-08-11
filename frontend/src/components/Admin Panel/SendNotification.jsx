import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { sendNotification } from '../../api/adminPanel';

const SendNotification = () => {
  const [message, setMessage] = useState('');
  const [sendTo, setSendTo] = useState('all');

  const handleNotification = async () => {
    const data = {
      message: message,
      to: sendTo,
      dateTime: Date(),
    };
    try {
      await sendNotification(data);
      toast.success('Notification sent!');
      setMessage("");
    } catch(err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col mt-28 h-[400px] items-center justify-center gap-4 border border-black p-2 w-[25%]">
      <h2>Send Notification</h2>
      <textarea
        className="border-[2px] border-black p-2 text-lg"
        name="notification"
        cols="30"
        rows="6"
        placeholder="Write message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div className="flex gap-2">
        <label htmlFor="receiver">To : </label>
        <select
          value={sendTo}
          onChange={(e) => setSendTo(e.target.value)}
          className="border-[2px] border-black"
          name="receiver"
        >
          <option value="all">All</option>
          <option value="mentors">Mentors</option>
          <option value="users">Users</option>
        </select>
      </div>
      <button
        onClick={handleNotification}
        className="bg-green-600 px-4 py-2 rounded-xl text-lg text-white hover:bg-green-500"
      >
        Send
      </button>
    </div>
  );
};

export default SendNotification;
