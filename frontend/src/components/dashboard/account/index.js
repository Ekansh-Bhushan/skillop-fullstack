import React, { useEffect, useState } from 'react';
import './index.css';
import { updateIsMentor } from '../../../api/userRequest';
import Profileandevents from '../../Landing/Profileandevents';
import { toast } from 'react-hot-toast';
import Mobilecommonhead from '../../Mobilecommonhead';
import { useNavigate } from 'react-router-dom';

function Account({ userData, setProgress, Mentor, isFetched, notifyList }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(userData.email);
  const [whats, setWhats] = useState(userData.whatsappNumber);
  const [upi, setUpi] = useState(userData.upiId);
  const [linkedindata, setlinkedindata] = useState(userData.linkedinId);
  const [name, setName] = useState(
    userData.firstname + ' ' + userData.lastname
  );
  const [username, setUsername] = useState(userData.username);

  useEffect(() => {
    // This function will run when the DOM content is loaded.
    console.log(email, whats, upi, linkedindata);
    var inp1 = document.querySelectorAll('.editable-input');
    for (var i = 0; i <= 3; i++) {
      inp1[i].disabled = true;
    }
  }, []);

  const enabledisableinput = async () => {
    var inp = document.querySelectorAll('.editable-input');
    if (inp[0].disabled) {
      for (var i = 0; i <= 3; i++) {
        inp[i].disabled = false;
      }
      document.querySelector('.edit-input').style.backgroundColor = '#108CFF';
      // document.querySelector(".edit-input").style.color = "black";
      document.querySelector('.edit-input').textContent = 'Save';
      for (let item of document.querySelectorAll('.editable-input')) {
        item.style.border = '2px solid black';
        item.style.borderRadius = '10px';
      }
    } else {
      try {
        setProgress(20);
        const request = {
          firstname: name.split(' ')[0],
          lastname: name.split(' ')[1],
          username: username,
          whatsappNumber: whats,
          linkedinId: linkedindata,
          upiId: upi,
        };
        await updateIsMentor(request);
        setProgress(100);
        toast.success('Account info updated!');
        // console.log(data);
      } catch (error) {
        setEmail(userData.email);
        setWhats(userData.whatsappNumber);
        setUpi(userData.upiId);
        setlinkedindata(userData.linkedin);
        console.log(error);
        toast.error(error.response.data.error);
        setProgress(100);
      }
      // window.location.reload();
      for (var i = 0; i <= 3; i++) {
        inp[i].disabled = true;
      }

      for (let item of document.querySelectorAll('.editable-input')) {
        item.style.border = 'none';
      }

      // document.querySelector(".edit-input").style.backgroundColor = "black";
      document.querySelector('.edit-input').style.color = 'white';
      document.querySelector('.edit-input').textContent = 'Edit';
    }
  };

  return (
    <>
      <Mobilecommonhead />

      <div className='dash-main'>
        {/* <Commondash userData={ userData} /> */}

        <div className='dash-right dash-right-2'>
          {/* <Topbar setProgress={setProgress}/> */}
          <div className='pt-[10vh] h-[100vh] border-r-2 md:border-0 md:pt-[6vh]' style={{ marginLeft: '-110px' }}>
            <h1 className='font-semibold text-2xl mb-5'>
              Edit Account Information
            </h1>
            <div className='flex items-start justify-center flex-col gap-4'>
              <div className=' gap-[5px] flex flex-col items-start'>
                <label
                  htmlFor='linkedin'
                  className='font-semibold text-[#000000BA]'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='linkedin'
                  placeholder={name}
                  className='editable-input rounded-xl border p-2 w-[40vw] py-4 md:w-[90vw]'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className=' gap-[5px] flex flex-col items-start'>
                <label
                  htmlFor='linkedin'
                  className='font-semibold text-[#000000BA]'
                >
                  Username
                </label>
                <input
                  type='text'
                  id='linkedin'
                  placeholder={username}
                  className='editable-input rounded-xl border p-2 w-[40vw] py-4 md:w-[90vw]'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className=' gap-[5px] flex flex-col items-start'>
                <label
                  htmlFor='email'
                  className='font-semibold text-[#000000BA]'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  placeholder={email}
                  value={email}
                  readOnly
                  onClick={() => toast.error("Email can't be edited!")}
                  className='editable-input rounded-xl border p-2 w-[40vw] py-4 md:w-[90vw]'
                />
              </div>
              <div className=' gap-[5px] flex flex-col items-start'>
                <label
                  htmlFor='phone'
                  className='font-semibold text-[#000000BA]'
                >
                  Phone
                </label>
                <input
                  type='number'
                  id='phone'
                  placeholder={whats}
                  value={whats}
                  className='editable-input rounded-xl border p-2 w-[40vw] py-4 md:w-[90vw]'
                  onChange={(e) => setWhats(e.target.value)}
                />
              </div>
              <div className=' gap-[5px] flex flex-col items-start'>
                <label
                  htmlFor='linkedin'
                  className='font-semibold text-[#000000BA]'
                >
                  LinkedIn
                </label>
                <input
                  type='text'
                  id='linkedin'
                  placeholder={linkedindata}
                  className='editable-input rounded-xl border p-2 w-[40vw] py-4 md:w-[90vw]'
                  value={linkedindata}
                  onChange={(e) => setlinkedindata(e.target.value)}
                />
              </div>
              <div className=' gap-[5px] flex flex-col items-start'>
                <label htmlFor='upi' className='font-semibold text-[#000000BA]'>
                  UPI ID
                </label>
                <input
                  type='text'
                  id='upi'
                  placeholder={upi}
                  value={upi}
                  className='editable-input rounded-xl border p-2 w-[40vw] py-4 md:w-[90vw]'
                  onChange={(e) => setUpi(e.target.value)}
                />
              </div>
            </div>
            <div className='editor-ids'>
              <button
                className='edit-pass'
                onClick={() => navigate('/changePassword')}
              >
                Change Password
              </button>
              <button className='edit-input' onClick={enabledisableinput}>
                Edit
              </button>
            </div>
          </div>
        </div>
        <Profileandevents />
      </div>
    </>
  );
}

export default Account;
