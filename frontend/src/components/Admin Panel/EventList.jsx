import React, { useEffect, useState } from 'react';
import { delEvents, fetchUpcomingEvents } from '../../api/adminPanel';
import toast from 'react-hot-toast';

const EventList = () => {
  const [eventData, setEventData] = useState([]);

  const fetchEvents = async () => {
    const events = await fetchUpcomingEvents();
    setEventData(events.data.result);
    console.log(events);
  };

  const handleEventDel = async (eventID) => {
    try {
      await delEvents(eventID);
      await fetchEvents();
      toast.success('Event Deleted');
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="w-[30%] border border-black">
        <div className="header-events">
          <h2
            style={{
              fontWeight: '500',
              paddingTop: '10px',
              paddingLeft: '16px',
            }}
          >
            Currently Listed Events (ALL)
          </h2>
        </div>
        <div className="event-list2 overflow-y-auto max-h-[500px]">
          {eventData.map((item) => {
            return (
              <div key={item._id} className="event-1">
                <b>{item.title}</b>
                <p>{item.description}</p>
                <p>
                  {new Date(item.startTime).toString().slice(0, 15)}
                  {' - '}
                  {new Date(item.endTime).toString().slice(0, 15)}
                </p>
                <p>
                  <img
                    src="/delete.png"
                    alt="del event"
                    className="cursor-pointer w-9 m-auto"
                    onClick={() => handleEventDel(item._id)}
                  />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventList;
