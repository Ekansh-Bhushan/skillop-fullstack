import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import './question.css';

const CrypticHunt = () => {
  const [question, setQuestion] = useState({});
  const [hint, setHint] = useState('Learn ML on me but find what I need it first.');
  const [flag, setFlag] = useState('');
  const [timer, setTimer] = useState(35 * 60 + 41); 
  const handleSubmit = () => {
    alert(`You entered: ${flag}`);
  };

  const showHint = () => {
    toast.info(hint, {
      position: "top-center",
      autoClose: false, // Toast will stay until user closes it
      closeButton: true, // Include close button
      theme: 'colored', // Optional: Include theme
    });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="cryptic-hunt">
      <ToastContainer  />

      <div className="header">
        <img src="/skillop-logo.png" alt="Skillop" className="logo" />
        <h1>Cryptic Hunt On ML</h1>
        <div className="timer">
          <span>{formatTime(timer)}</span>
        </div>
      </div>

      <div className="content">
        <div className="challenge-section">
        <h2>Q2. <p>I taught me one game,<br></br>
the world took it to fame.<br></br>
I got learning in me,<br></br>
who coined my name.</p> <span className="points">10 Pts</span> <span className="difficulty">Easy</span></h2>
          
          <button className="hint-button" onClick={showHint}>Hint</button>
          <input
            type="text"
            placeholder="Enter the flag"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            className="flag-input"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>

        <div className="leaderboard-section">
          <Link to="/leaderboard" className="view-leaderboard-button">
            View Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CrypticHunt;