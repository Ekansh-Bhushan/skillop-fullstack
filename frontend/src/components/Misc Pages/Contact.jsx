import React from 'react';
import MiscNavBar from './MiscNavBar';

const Contact = () => {
  return (
    <>
      <MiscNavBar />
      <div className="pp-container">
        <h1>
          <center>Contact</center>
        </h1>
        <br />
        <br />
        <br />
        <br />
        <center className="border-2 mb-10 py-10 rounded-lg bg-slate-100">
          <h2 className="mb-7">Contact Information</h2>
          <p>
            <b>Phone: </b>9818807886
          </p>
          <p>
            <b>Email ID: </b>
            <a href="mailto:skillop.skill@gmail.com">skillop.skill@gmail.com</a>
          </p>
        </center>
      </div>
    </>
  );
};

export default Contact;
