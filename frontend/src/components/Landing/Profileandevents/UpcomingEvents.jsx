import React, { useEffect, useState } from 'react';
import './UpcomingEvents.css';
import { fetchUpcomingEvents } from '../../../api/adminPanel';
import convertToNormalTime from '../../../utils/timeConversion';

const UpcomingEvents = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await fetchUpcomingEvents();
      setEventData(events.data.result);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="event-upcoming2">
        <div className="header-events">
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
    </div>
  );
};

export default UpcomingEvents;
