import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { addPoints, getScore } from "../score";
import "./question.css";

// Import the image if it's inside src folder
import questionImage from '../img/questionThreeImage.jpg'; // Update the path as needed

const QuestionThree = () => {
  const [hint, setHint] = useState("Picture is your answer, code is your life, better be quick or get a dancer.");
  const [flag, setFlag] = useState("");
  const [timer, setTimer] = useState(35 * 60 + 41);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const nextQuestion = () => {
    // Trim and compare the flag in a case-insensitive manner
    if (flag.trim() === "NumPy") {
      addPoints(10); // Add 10 points
      console.log("Current Score:", getScore()); // Log current score
      navigate("/question/dataset");
    } else {
      setErrorMessage("Wrong answer! Please try again."); // Set error message
      toast.error("Wrong answer! Please try again."); // Display error toast
    }
  };

  const showHint = () => {
    toast.info(hint, {
      position: "top-right", // Changed to a valid position
      autoClose: false, // Toast will stay until user closes it
      closeButton: true, // Include close button
      theme: "colored", // Optional: Include theme
    });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="cryptic-hunt">
      <ToastContainer />

      <div className="header">
        <img src="/skillop-logo.png" alt="Skillop" className="logo" />
        <h1>Cryptic Hunt On ML</h1>
        <div className="timer">
          <span>{formatTime(timer)}</span>
        </div>
      </div>

      <div className="content">
        <div className="challenge-section">
          <h2>
            Q3.{" "}
            <p>
              i  <br />
              tapotil mtnyapir ds dpraplbposp<br />
              prupsnmopn s<br />
              mtmlt.ytal<br />
              om paai op t<br />
            </p>{" "}
            <span className="points">10 Pts</span>{" "}
            <span className="difficulty">Easy</span>
          </h2>

          {/* Add the image below the question */}
          <div className="image-container">
            <img src={questionImage} alt="Question Illustration" className="question-image" />
          </div>

          <button className="hint-button" onClick={showHint}>
            Hint
          </button>
          <input
            type="text"
            placeholder="Enter the flag"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            className="flag-input"
          />
          <button onClick={nextQuestion}>Submit</button>

          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
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

export default QuestionThree;