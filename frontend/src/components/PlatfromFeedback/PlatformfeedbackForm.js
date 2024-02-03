import React, { useState } from 'react';
import StarRating from './starRating';
import './feedbackForm.css';
import { toast } from 'react-hot-toast';
import Mobilecommonhead from '../Mobilecommonhead';
import Profileandevents from '../Landing/Profileandevents';
import { sendPlatformFeedback } from '../../api/feedback';

function PlatformfeedbackForm({setProgress}) {
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [rating, setRating] = useState(0);
  const sendFeedBack = async () => {
    try {
      await sendPlatformFeedback({message:feedbackMsg, rating});
      toast.success('FeedBack Submitted !');
      setRating(0);
      setFeedbackMsg("");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Mobilecommonhead />
      <Profileandevents />
      <div className='form'>
        <div className='form-top-area'>
          <h1 className='text-[#9D9D9D]'>SKillop Feedback</h1>
          <div className='flex items-center justify-center'>
            <h2 className='text-3xl font-normal my-5 mt-10 w-[80%] text-center md:text-2xl md:mt-5 md:w-[100%]'>
              How Was Your Exprience With the Platform?
            </h2>
          </div>
        </div>
        <div className='form-star-area'>
          <StarRating setRating={setRating} rating={rating} />
        </div>

        <div className='myoptions'></div>
        <div className='form-area'>
          <textarea
            value={feedbackMsg}
            placeholder='Write your feedback here...'
            onChange={(e) => {
              setFeedbackMsg(e.target.value);
            }}
            className='w-full bg-gray-100 rounded-xl text-xl p-2 border border-gray-600'
            rows={5}
          />
          <button
            className='btn-submit'
            onClick={sendFeedBack}
            style={{
              backgroundColor: '#108CFF',
              color: 'white',
              fontSize: '16px',
              fontWeight: '500',
              border: 'none',
              outline: 'none',
              padding: '10px 15px',
              borderRadius: '15px',
              cursor: 'pointer',
              marginLeft: '10px',
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default PlatformfeedbackForm;
