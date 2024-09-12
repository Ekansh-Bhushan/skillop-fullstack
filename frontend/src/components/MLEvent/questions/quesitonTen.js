import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'; // Import axios for API requests
import "./question.css";

const QuestionFive = () => {
  const [hint, setHint] = useState("He who taught it checkers.");
  const [flag, setFlag] = useState("");
  const [timer, setTimer] = useState(35 * 60 + 41);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [hintUsed, setHintUsed] = useState(false); // State to track if hint was used
  const navigate = useNavigate();
  const location = useLocation(); // Use location hook to get the current URL

  useEffect(() => {
    // Prevent going back to the previous page
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };

    // Redirect if the page is accessed directly or via back navigation
    if (location.pathname === "/leaderboard" && window.history.state) {
      navigate("/youDidIt"); // Redirect to another page if coming from leaderboard
    }

    // Timer functionality
    const timerInterval = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          toast.error("Time's up!"); // Toast for time up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup timer on component unmount
  }, [navigate, location.pathname]);

  const nextQuestion = async () => {
    const trimmedFlag = flag.trim();

    // Check if the trimmedFlag is a valid number
    if (!isNaN(trimmedFlag) && trimmedFlag !== "") {
      try {
        // Add points (if needed)
        await axios.post('https://skillop.in/api/mlevent/points/add', {
          points: 10,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token in headers
          }
        });

        toast.success("Points added successfully!"); // Toast for success
        navigate("/youDidIt");
      } catch (error) {
        console.error("Error adding points:", error);
        toast.error("Error adding points. Please try again."); // Toast for error
      }
    } else {
      setErrorMessage("Wrong answer! Please try again."); // Set error message
      toast.error("Wrong answer! Please try again."); // Display error toast
    }
  };

  const showHint = async () => {
    if (!hintUsed) {
      try {
        // Deduct points
        await axios.post('https://skillop.in/api/mlevent/points/deduct', {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token in headers
          }
        });

        setHintUsed(true);
        toast.info(`Hint used! ${hint} - 2 points deducted.`, {
          position: "top-right",
          autoClose: false,
          closeButton: true,
          theme: "colored",
        }); // Toast for hint and points deduction
      } catch (error) {
        console.error("Error using hint:", error);
        toast.error("Error using hint. Please try again."); // Toast for error
      }
    } else {
      toast.warning("Hint already used."); // Toast for already used hint
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
        <div >
        </div>
      </div>

      <div className="content">
        <div className="challenge-section">
          <h2>Q10.</h2>
          <div className="question-content">
            <p>
              I made it this far, I must be proud, lets see if the result is out.<br />
              Enter the accuracy for it may decide, your fate today may it be bright.
            </p>
            <div className="right-side-content">
              <span className="points">10 Pts</span>
              <span className="difficulty">Easy</span>
              <button className="hint-button" onClick={showHint}>
                Hint
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
