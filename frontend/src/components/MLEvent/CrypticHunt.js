import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CrypticHunt.css'; // Import the CSS

const CrypticHunt = () => {
  const [question, setQuestion] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [flag, setFlag] = useState('');
  const [timer, setTimer] = useState(35 * 60 + 41); // Example timer, 35:41

  // Fetch question and leaderboard from backend
  useEffect(() => {
    axios.get('/api/question') // Adjust this endpoint according to your backend
      .then(response => {
        setQuestion(response.data);
      })
      .catch(error => console.error('Error fetching question:', error));

    axios.get('/api/leaderboard') // Adjust this endpoint according to your backend
      .then(response => {
        setLeaderboard(response.data);
      })
      .catch(error => console.error('Error fetching leaderboard:', error));

    const interval = setInterval(() => {
      setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    axios.post('/api/submit-flag', { flag }) // Post flag to backend
      .then(response => {
        if (response.data.correct) {
          alert('Correct Flag!');
        } else {
          alert('Incorrect Flag. Try Again.');
        }
      })
      .catch(error => console.error('Error submitting flag:', error));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="cryptic-hunt">
      <div className="header">
        <img src="/img/skillop.png" alt="Skillop" className="logo" />
        <h1>Cryptic Hunt On ML</h1>
      </div>
      <div className="content">
        <div className="challenge-section">
          <h2>{question.title} <span className="points">{question.points} Pts</span></h2>
          <p>{question.description}</p>
          <input
            type="text"
            placeholder="Enter the flag"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className="leaderboard-section">
          <h3>Leaderboard</h3>
          <ul>
            {leaderboard.map((user, index) => (
              <li key={index}>{`${index + 1}. ${user.name} - ${user.points} Pts`}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="timer">
        <span>{formatTime(timer)}</span>
      </div>
    </div>
  );
};

export default CrypticHunt;
