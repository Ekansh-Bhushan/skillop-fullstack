import React from 'react'

// Import the background image
import backgroundImage from './backgroungimage.png';
import { Link } from 'react-router-dom';
import './dashboard.css'
function dashboard() {
  return (
    <div className='outer'>
      <div className='not-found-container' style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* <p id='oops' className='not-found-title'>OOPS!</p> */}
        <p className='not-found-title'>SKillop </p>
        <p className='subtitle'>Welcome to Dashboard </p>
        <p className='not-found-message'>The feature is comming soon.</p>
      
        {/* Add the Link component for the button */}
        <Link to="/homepage" className="home-button">Go to Home</Link>
      </div>
    </div>
  )
}

export default dashboard
