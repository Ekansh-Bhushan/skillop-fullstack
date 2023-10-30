import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './starRating.css';

function StarRating() {
  const [rating, setRating] = useState(0); // Initialize with 0
  const [hover, setHover] = useState(0); // Initialize with 0

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
              size={50}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
      <p>rating: {rating}</p>
    </div>
  );
}

export default StarRating;
