import React from 'react';
import Profileandevents from '../../Landing/Profileandevents';

const AuthorizeZoomMeet = ({ setProgress }) => {
  const meetDetailsArr = window.location.href.split('/');
  // console.log(`redirect_uri=https://skillop.in/confirm-booking/${path}`);
  console.log(meetDetailsArr);
  let path = '';
  for (let i = 4; i < meetDetailsArr.length; i++) {
    path += '/' + meetDetailsArr[i];
  }
  console.log("magic",path)

  return (
    <div>
      <Profileandevents />
      <div className='mx-80 mt-32'>
        <h2 className='mb-8'>SKILLOP MEETS</h2>
        <a
          href={`https://zoom.us/oauth/authorize?client_id=cgIfjFSTqun5EWSFSamcA&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000%2Fconfirm-booking${path}`}
        >
          <button className='flex items-center gap-2 text-md font-bold border-2 rounded-full border-black px-5 py-1 hover:bg-gray-100'>
            Authorize SKILLOP to create Zoom Meet!{' '}
            <img src='/zoom.jpg' width={70} alt='' />
          </button>
        </a>
      </div>
    </div>
  );
};

export default AuthorizeZoomMeet;
