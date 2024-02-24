import React, { useContext, useEffect, useState } from 'react';
import './UpcomingEvents.css';
import { fetchUpcomingEvents } from '../../../api/adminPanel';
import { MainContext } from '../../../context/MainContextProvider';

const UpcomingEvents = () => {
  const { eventData, setEventData } = useContext(MainContext);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!eventData.length) {
        const events = await fetchUpcomingEvents('upcoming');
        setEventData(events.data.result);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <div className='event-upcoming2'>
        <div className='header-events'>
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
        <div className='event-list2 overflow-y-auto max-h-[500px]'>
          {eventData.map((item) => {
            return (
              <div key={item._id} className='event-1'>
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
        
      </div>
    </div>
  );
};

export default UpcomingEvents;
