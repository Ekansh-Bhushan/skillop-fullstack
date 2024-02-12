import React from 'react';
import Profileandevents from '../../Landing/Profileandevents';
import { useLocation } from 'react-router-dom';

const AuthorizeZoomMeet = ({ setProgress }) => {
  const path = window.location.href.split('/')[4];
  console.log(`redirect_uri=https://skillop.in/confirm-booking/${path}`);
  console.log(`PATH - ${path}`);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mentorid = path.toString().slice(0, 24)
  const userid = queryParams.get('userid')
  const s = queryParams.get('s')
  const e = queryParams.get('e')
  const day = queryParams.get('day')
  const charge = queryParams.get('charge')

  return (
    <div>
      <Profileandevents />
      <div className='mx-80 mt-32'>
        <h2 className='mb-8'>SKILLOP MEETS</h2>
        <a
          href={`https://zoom.us/oauth/authorize?client_id=a73k7xO4TAq7ffF6ixtGrA&response_type=code&redirect_uri=https://skillop.in/confirm-booking/${path}`}
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
