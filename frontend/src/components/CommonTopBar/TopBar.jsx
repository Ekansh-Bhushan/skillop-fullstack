import React, { useContext } from 'react';
import './TopBar.css';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../context/MainContextProvider';

const TopBar = () => {
  const { setShowPostPopUp } = useContext(MainContext);
  const navigate = useNavigate();
  const createPost = () => {
    setShowPostPopUp(true);
  };

  const loginClicked = () => {
    navigate('/login');
  };
  const signupClicked = () => {
    navigate('/signup');
  };

  return (
    <div className='tb-container '>
      <div>
        <img src='/skillop-logo.png' alt='logo' className='w-10  hover:transform hover:scale-105 transition duration-300' />
        <h2 className='hover:transform hover:scale-105 transition duration-300 '>SKILLOP</h2>
      </div>
      {window.location.pathname === '/homepage' && (
        <button id='create-post' onClick={createPost}>
          + Create Post
        </button>
      )}
      {window.location.pathname === '/' && (
        <div className='flex gap-5'>
          <button
            className='py-2 px-9 rounded-xl text-sm font-bold shadow-md bg-[#FFB800] md:px-3 hover:transform hover:scale-105 hover:shadow-md transition duration-300'
            onClick={signupClicked}
          >
            Sign up
          </button>
          <button
            className='border-2 border-black py-2 px-9 rounded-xl text-sm font-bold md:px-3  hover:transform hover:scale-105 hover:shadow-md transition duration-300'
            onClick={loginClicked}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
