import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { addPoints, getScore } from "../score";
import "./question.css";

// Import the image if it's inside src folder
import questionImage from '../img/questionFourImage.jpg'; // Update the path as needed

const QuestionFour = () => {
  const [hint, setHint] = useState("He who taught it checkers.");
  const [flag, setFlag] = useState("");
  const [timer, setTimer] = useState(35 * 60 + 41);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  
  const navigate = useNavigate();

  const nextQuestion = () => {
    // Trim and compare the flag in a case-insensitive manner
    if (flag.trim() === "8") {
      addPoints(10); // Add 10 points
      console.log("Current Score:", getScore()); // Log current score
      navigate("/question/asdfr3456");
      navigate("/question/45j9dm8rd");
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
            Q4.{" "}
            <p>
              Find the clue and you shall feast,<br />
              with the first done, move on to the beast.<br />
              I need data, go through the door,<br />
              embed it in code to unlock its core.<br />
            </p>{" "}
            <span className="points">10 Pts</span>{" "}
            <span className="difficulty">Easy</span>
          </h2>

          {/* Add the image below the question with a download link */}
          <div className="image-container">
            <a href={questionImage} download="link.jpg">
              <img src={questionImage} alt="Question Illustration" className="question-image" />
            </a>
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

export default QuestionFour;
