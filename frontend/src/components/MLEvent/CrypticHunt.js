import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CrypticHunt.css';
import Leaderboard from './LeaderBoard';

const CrypticHunt = () => {
  const [question, setQuestion] = useState({});
  const [hint, setHint] = useState('');
  const [flag, setFlag] = useState('');
  const [timer, setTimer] = useState(35 * 60 + 41); // Example timer

  useEffect(() => {
    

    axios.get('http://localhost:2004/api/mlevent/hint')
      .then(response => {
        setHint(response.data.hint);
      })
      .catch(error => console.error('Error fetching hint:', error));

    const interval = setInterval(() => {
      setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    alert(`You entered: ${flag}`);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="cryptic-hunt">
      <div className="header">
        <img src="/skillop-logo.png" alt="Skillop" className="logo" />
        <h1>Cryptic Hunt On ML</h1>
        {/* <div className="timer">
          <span>{formatTime(timer)}</span>
        </div> */}
      </div>

      <div className="content">
        <div className="challenge-section">
          <h2>Q1. <p>I taught me one game,<br></br>
the world took it to fame.<br></br>
I got learning in me,<br></br>
who coined my name.</p> <span className="points">10 Pts</span> <span className="difficulty">Easy</span></h2>
          
          <button className="hint-button" onClick={() => alert(hint)}>Hint</button>
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
