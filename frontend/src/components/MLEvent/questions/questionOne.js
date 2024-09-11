import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { addPoints, deductPoints, getScore } from "../utlis/score"; // Assuming deductPoints is also implemented in "../score"
import "./question.css";

const CrypticHunt = () => {
  const [hint, setHint] = useState("He who taught it checkers.");
  const [flag, setFlag] = useState("");
  const [timer, setTimer] = useState(35 * 60 + 41);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [hintUsed, setHintUsed] = useState(false); // State to track if hint is used
  
  const navigate = useNavigate();

  // Use effect to prevent going back to the previous page
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1); // Prevents user from navigating back
    };
  }, []);

  // Function to handle submitting the answer
  const nextQuestion = () => {
    if (flag.trim() === "Arthur Samuel") {
      addPoints(10); // Add 10 points to the current user's team
      navigate("/question/platform");
    } else {
      setErrorMessage("Wrong answer! Please try again."); // Set error message
      toast.error("Wrong answer! Please try again."); // Display error toast
    }
  };

  // Function to show hint and deduct points (if not already used)
  const showHint = () => {
    if (!hintUsed) {
      toast.info(hint, {
        position: "top-right", // Valid position
        autoClose: false, // Toast will stay until user closes it
        closeButton: true, // Include close button
        theme: "colored", // Optional: Include theme
      });
      deductPoints(2); // Deduct 2 points for using the hint
      setHintUsed(true); // Disable hint button after use
    } else {
      toast.warning("Hint already used!");
    }
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
        <div></div>
      </div>

      <div className="content">
        <div className="challenge-section">
          <h2>Q1.</h2>
          <div className="question-content">
            <p>
              I taught me one game,<br />
              the world took it to fame.<br />
              I got learning in me,<br />
              who coined my name.
            </p>
            <div className="right-side-content">
              <span className="points">10 Pts</span>
              <span className="difficulty">Easy</span>
              <button
                className="hint-button"
                onClick={showHint}
                disabled={hintUsed} // Disable button after using hint
              >
                {hintUsed ? "Hint Used" : "Hint"}
              </button>
            </div>
          </div>
  
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

export default CrypticHunt;
