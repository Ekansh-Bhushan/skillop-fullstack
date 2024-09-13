import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import axios from 'axios'; // Import axios for API requests
import "./question.css";

// Import the image if it's inside src folder
import questionImage from '../img/questionThreeImage.jpg'; // Update the path as needed

const QuestionThree = () => {
  const [hint, setHint] = useState("Picture is your answer, code is your life, better be quick or get a dancer.");
  const [flag, setFlag] = useState("");
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
      navigate("/question/dataset"); // Redirect to another page if coming from leaderboard
    }
  }, [navigate, location.pathname]);

  const nextQuestion = async () => {
    if (flag.trim() === "NumPy") {
      try {
        // Add points
        await axios.post('http://localhost:2004/api/mlevent/points/add', {
          points: 15,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token in headers
          }
        });

        toast.success("Points added successfully!"); // Toast for success
        navigate("/question/dataset");
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
        await axios.post('http://localhost:2004/api/mlevent/points/deduct', {}, {
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
        <div></div>
      </div>

      <div className="content">
        <div className="challenge-section">
          <h2>Q3.</h2>
          <div className="question-content">
            <p>
              i  <br />
              tapotil mtnyapir ds dpraplbposp<br />
              prupsnmopn s<br />
              mtmlt.ytal<br />
              om paai op t<br />
            </p>
            <div className="right-side-content">
              <span className="points">15 Pts</span>
              <span className="difficulty">Easy</span>
              <button className="hint-button" onClick={showHint}>Hint</button>
            </div>
          </div>
          {/* Add the image below the question */}
          <div className="image-container">
            <a href={questionImage} download="IamHero.jpg">
              <img src={questionImage} alt="Question Illustration" className="question-image" />
            </a>
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

export default QuestionThree;
