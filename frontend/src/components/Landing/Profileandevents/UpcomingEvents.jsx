import React from 'react';
import './UpcomingEvents.css';

const UpcomingEvents = () => {
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
        <div className="event-list2">
          <div className="event-1"></div>
          <div className="event-1"></div>
          <div className="event-1"></div>
          <div className="event-1"></div>
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
