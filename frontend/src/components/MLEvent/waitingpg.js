import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const WaitingPage = () => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
   const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const startTime = new Date();
      startTime.setHours(1, 51, 0, 0); // 10:30 AM

      if (now >= startTime) {
        setIsButtonEnabled(true);
      } else {
        setIsButtonEnabled(false);
      }
    };

    // Check time initially
    checkTime();

    // Set an interval to check time every minute
    const intervalId = setInterval(checkTime, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

 
  const handleStartClick = () => {
    // Navigate to the quiz page when the button is clicked
    navigate('/question/54sdf5443'); 
  };

  return (
    <div className="waiting-page-container">
      <div className="navbar">
        <div className="guidelines-header">Guidelines</div>
      </div>
      <div className="waiting-page">
        <h1>Skillop Society Cryptic Hunt on Machine Learning</h1>
        <p>Welcome to the Skillop Society Cryptic Hunt on Machine Learning! Prepare to test your skills and knowledge as you navigate through a series of challenges. Remember—your goal is to successfully train a model. Let’s go over the rules and schedule:</p>
        <h2>Login Instructions:</h2>
        <p>All team leaders must log in to the Skillop website here before the event starts.</p>
        <h2>Event Start Time:</h2>
        <p>The cryptic hunt will begin at 10:30 AM sharp. Be ready!</p>
        <h2>Question Release Schedule:</h2>
        <ul>
          <li>10:30 AM: First question</li>
          <li>10:55 AM: Second question</li>
          <li>11:35 AM: Third question</li>
          <li>12:20 PM: Fourth question</li>
          <li>12:50 PM: Fifth question (requires a screenshot of your trained model)</li>
          <li>1:40 PM: Sixth question</li>
          <li>2:00 PM: Seventh question</li>
          <li>2:35 PM: Eighth question</li>
          <li>3:10 PM: Ninth question</li>
          <li>3:40 PM: Tenth question</li>
        </ul>
        <h2>Hints:</h2>
        <p>Hints for certain questions will be provided at times determined by the organizers. Use them wisely!</p>
        <h2>Judging Criteria:</h2>
        <p>Points will be awarded based on:</p>
        <ul>
          <li>Correct answers for each question.</li>
          <li>The speed of submitting correct answers—faster submissions earn more points.</li>
          <li>Consideration for close answers.</li>
        </ul>
        <h2>Leaderboard Updates:</h2>
        <p>The leaderboard will be updated regularly to display each team’s total points. Keep track of your position and strategize accordingly.</p>
        <h2>Event Conclusion:</h2>
        <p>The cryptic hunt will end when the top 5 teams have been identified on the leaderboard.</p>
        <div className="loader"></div>
        <button
          className="start-button"
          disabled={!isButtonEnabled}
          onClick={handleStartClick}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default WaitingPage;
