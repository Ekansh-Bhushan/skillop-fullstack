import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./starRating.css";

function StarRating({rating, setRating}) {
  const [hover, setHover] = useState(0); // Initialize with 0

  const updateScreenSize = () => {
    // Use window.innerWidth to get the current screen width
    const isMediumScreen = window.innerWidth <= 768;
    setIsMediumScreen(isMediumScreen);
  };

  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth <= 768
  );

  // Add event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return (
    <div /*className="App"*/>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={currentRating}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <FaStar
              className="star"
              size={isMediumScreen ? 70 : 90}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
      {/* <p>rating: {rating}</p> */}
    </div>
  );
}

export default StarRating;
