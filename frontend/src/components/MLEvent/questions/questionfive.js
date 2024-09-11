import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import "./question.css";

const QuestionFive = () => {
  const [hint, setHint] = useState("He who taught it checkers.");
  const [flag, setFlag] = useState("");
  const [timer, setTimer] = useState(35 * 60 + 41);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const nextQuestion = () => {
    // Remove leading and trailing spaces
    const trimmedFlag = flag.trim();
    
    // Check if the trimmedFlag is a valid number
    if (!isNaN(trimmedFlag) && trimmedFlag !== "") {
      // Allow numeric input and navigate to the next question
      navigate("/question/safefdsdc");
    } else {
      // Display error message for invalid input
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
            Q5.{" "}
            <p>
              I know you have a graph, I need the error be it square or absolute, just put it here.
            </p>{" "}
            <span className="points">10 Pts</span>{" "}
            <span className="difficulty">Easy</span>
          </h2>

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

export default QuestionFive;
