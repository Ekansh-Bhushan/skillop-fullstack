import React, { useEffect, useState } from 'react';
import doodle1 from '../../components/images/doodle-6 1.png';
import doodle2 from '../../components/images/doodle-7 1.png';
import Saly from '../../components/images/Saly-26.png';
import vector from '../../components/images/Vector.png';
import mdi from '../../components/images/mdi_user.png';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { getUser } from '../../api/userRequest';

const API = axios.create({ baseURL: 'https://skillop.in' });

const SkillSix = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [profilePhotoURL, setProfilePhotoURL] = useState(''); // These two state are getting value aver the image is set in backend
  const [coverPhotoURL, setCoverPhotoURL] = useState(''); // Display them to user

  const handleUpload = async () => {
    const formData1 = new FormData();
    const formData2 = new FormData();
    formData1.append('profilePic', profilePhoto);
    formData2.append('profileBackgroundPic', coverPhoto);
    console.log(formData1, formData2);

    const uploadprofilepic = (data) => {
      const token = localStorage.getItem('skilloptoken');
      const config = {
        headers: {
          Authorization: token,
        },
        withCredentials: true,
      };
      return API.put(`/api/user/update/profile`, data, config);
    };

    const uploadBGpic = (data) => {
      const token = localStorage.getItem('skilloptoken');
      const config = {
        headers: {
          Authorization: token,
        },
        withCredentials: true,
      };
      return API.post(`/api/user/add/boackgroundPic`, data, config);
    };
    let done1 = true;
    let done2 = true;
    try {
      setUploading(true);
      if (profilePhoto) {
        done1 = false;
        setUploading(true);
        const profilePhotoResponse = await uploadprofilepic(formData1);
        if (profilePhotoResponse.data.result) {
          toast.success('Profile picture uploaded successfully');
          done1 = true;
          setProfilePhotoURL(profilePhotoResponse.data.result.profilePicUrl);
        } else
          toast.error('Unable to upload profile picture now! Try again later');
      }
      if (coverPhoto) {
        done2 = false;
        setUploading(true);
        const coverPhotoResponse = await uploadBGpic(formData2);
        if (coverPhotoResponse.data.result) {
          toast.success('Cover picture uploaded successfully');
          done2 = true;
          setCoverPhotoURL(coverPhotoResponse.data.result.bgPicUrl);
        } else
          toast.error('Unable to upload cover picture now! Try again later');
      }
      // if (done1 && done2) {
      //   navigate("/skill7");
      // }
      console.log(done1, done2);
    } catch (err) {
      toast.error('Unable to upload picture now! Try again later');
    }
    setUploading(false);
  };
  const nextClicked = () => {
    navigate('/skill7');
  };
  const prevClicked = () => {
    navigate('/skill4');
  };

  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getPhotos = async () => {
      const res = await getUser();
      setCoverPic(res.data.result.bgPicUrl);
      setProfilePic(res.data.result.profilePicUrl);
    };
    getPhotos();
  }, [coverPhoto, profilePhoto, setCoverPhoto, setProfilePhotoURL]);

  return (
    <div>
      {/* <Nav /> */}
      <div className='z-100' style={{ position: 'relative', zIndex: 10 }}>
        <ProgressBar progress={75} />
      </div>

      <img src={doodle1} className='absolute top-[66vh] left-[29vw] z-10' />
      <img src={doodle2} className='absolute right-[19vw] top-[62vh] z-10' />
      <img src={Saly} className='absolute right-[16vw] z-10 top-[18vh]' />
      <div className='flex items-start flex-col ml-[35vh] z-50'>
        <h1 className='text-[40px] mb-5 mt-[8vh] font-bold'>
          Complete Your Profile
        </h1>
        <div className='flex items-start gap-[10vh] mb-[10vh]'>
          <div className='flex items-start justify-center flex-col text-xl gap-8 mt-3 font-normal'>
            {/* <span>Personal Information</span>
            <span>Contact Information</span> */}
            {window.location.pathname === '/skill3' ? (
              <span className='font-semibold'>Skills/Interests</span>
            ) : (
              <span>Skills/Interests</span>
            )}
            {window.location.pathname === '/skill4' ? (
              <span className='font-semibold'>Professional Information</span>
            ) : (
              <span>Professional Information</span>
            )}
            {window.location.pathname === '/skill6' ? (
              <span className='font-semibold'>Cover & Profile Photos</span>
            ) : (
              <span>Cover & Profile Photos</span>
            )}
            {window.location.pathname === '/skill7' ? (
              <span className='font-semibold'>Additional Information</span>
            ) : (
              <span>Additional Information</span>
            )}

            {/* <span>Professional Information</span>
            <span>Cover & Profile Photos</span>
            <span>Additional Information</span> */}
          </div>

          <div
            className='flex flex-col justify-center border-[1px] px-10 py-8 w-[40vw] rounded-3xl bg-white bg-opacity-50 backdrop-blur-[20px]'
            style={{ position: 'relative', zIndex: 40 }}
          >
            <input
              id='coverPhoto'
              type='file'
              style={{
                visibility: 'hidden',
                height: 0,
                width: 0,
              }}
              onChange={(e) => {
                // check if input file is image
                if (e.target.files[0].type.split('/')[0] !== 'image') {
                  toast.error('Please select an image file');
                  return;
                }
                setCoverPhoto(e.target.files[0]);
              }}
            />
            <div>
              <span className='text-lg font-normal'>Cover Photo</span>
              <div
                className='w-full bg-[#D9D9D96E] h-[30vh] rounded-lg relative top-6 flex items-center justify-center'
                onClick={() => document.getElementById('coverPhoto').click()}
              >
                <img
                  src={coverPic || vector}
                  className='absolute rounded-lg cursor-pointer hover:opacity-80 '
                  alt=''
                />
                {!profilePic ? (
                  <span className='absolute text-lg font-medium'>
                    Choose Photo
                  </span>
                ) : (
                  ''
                )}
              </div>
            </div>
            <input
              id='profilePhoto'
              type='file'
              style={{
                visibility: 'hidden',
                height: 0,
                width: 0,
              }}
              onChange={(e) => {
                // check if input file is image
                if (e.target.files[0].type.split('/')[0] !== 'image') {
                  toast.error('Please select an image file');
                  return;
                }
                setProfilePhoto(e.target.files[0]);
              }}
            />
            <div className='mt-5 pt-10 pb-2'>
              <span className='text-lg font-normal mb-4'>Profile Photo</span>
              <div
                className=' h-[22vh] w-[22vh] rounded-full relative top-8 flex 
items-center justify-center'
                onClick={() => document.getElementById('profilePhoto').click()}
              >
                {' '}
                <img
                  src={profilePic || mdi}
                  className='absolute bottom-[5vh] rounded-full w-full h-full cursor-pointer hover:opacity-80'
                  alt=''
                />
                {!profilePic ? (
                  <span className='absolute text-lg font-medium'>
                    Choose Photo
                  </span>
                ) : (
                  ''
                )}
              </div>
              {profilePic ? (
                <p className='py-2 font-bold'>
                  * Click profile or cover photo to edit and upload photo!
                </p>
              ) : (
                ''
              )}
              {uploading && (
                <img src='/spinner.gif' className='w-20' alt='loading' />
              )}
            </div>

            <div className='flex justify-between w-full items-center'>
              <button
                className='rounded-full border-[2px] border-black h-9 w-9 flex 
items-center justify-center hover:bg-[#8484841A]'
                onClick={prevClicked}
              >
                <FaArrowLeft />
              </button>
              <button
                className={`${
                  profilePhoto || coverPhoto
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-green-300'
                } text-white px-3 py-2 rounded-full text-lg cursor-pointer`}
                onClick={handleUpload}
                disabled={!profilePhoto || !coverPhoto}
              >
                Upload Photo
              </button>
              <div
                onClick={nextClicked}
                className='flex rounded-3xl border-[2px] border-black items-center justify-center px-1.5 py-1.5 gap-2 hover:bg-[#8484841A]'
              >
                <button className='font-bold '>NEXT</button>
                <span className='rounded-full border-[2px] border-black py-1 px-1'>
                  <FaArrowRight />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSix;
