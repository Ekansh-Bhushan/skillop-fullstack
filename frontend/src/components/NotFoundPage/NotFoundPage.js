import React from 'react';
import { Link } from 'react-router-dom'; 
import './NotFoundPage.css'; 
import Mobilecommonhead from '../Mobilecommonhead';
// Import the background image
import backgroundImage from './backgroungimage.png';

const NotFoundPage = () => {
  return (
    <>
    <Mobilecommonhead/>
    <div className='outer'>
      <div className='not-found-container' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <p id='oops' className='not-found-title'>OOPS!</p>
        <p className='not-found-title'>404</p>
        <p className='subtitle'>PAGE NOT FOUND</p>
        <p className='not-found-message'>The page you are looking for does not exist.</p>
      
        {/* Add the Link component for the button */}
        <Link to="/homepage" className="home-button">Go to Home</Link>
      </div>
    </div>
    </>
  );
};

export default NotFoundPage;
