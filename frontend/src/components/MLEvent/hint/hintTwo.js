import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './hint.css';
const CrypticHunt = () => {

  return (
    <div className="cryptic-hunt">
      <div className="header">
        <img src="/skillop-logo.png" alt="Skillop" className="logo" />
        <h1>Cryptic Hunt On ML</h1>
      </div>

      <div className="content">
        <div className="challenge-section">
            <h1>Your Hint for Question Two</h1>
          <h2>Learn ML on me but find what I need it first <span className="points">10 Pts</span> <span className="difficulty">Easy</span></h2>
          
          
        </div>
      </div>
    </div>
  );
};



export default CrypticHunt;
