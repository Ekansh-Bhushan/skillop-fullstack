import React, { useEffect, useState } from 'react';
import coolimg from '../../components/images/logo.png';
import vector from '../../components/images/Vector.png';
import mdi from '../../components/images/mdi_user.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import MProgressBar from './MProgressBar';
import { getUser } from '../../api/userRequest';

const API = axios.create({ baseURL: 'https://skillop.in' });

const Cover = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhotoURL, setProfilePhotoURL] = useState('');
  const [coverPhotoURL, setCoverPhotoURL] = useState('');
  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const formData1 = new FormData();
    const formData2 = new FormData();
    formData1.append('profilePic', profilePhoto);
    formData2.append('profileBackgroundPic', coverPhoto);

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

    try {
      setUploading(true);
      if (profilePhoto) {
        const profilePhotoResponse = await uploadprofilepic(formData1);
        if (profilePhotoResponse.data.result) {
          toast.success('Profile photo uploaded!');
          // setProfilePhotoURL(profilePhotoResponse.data.result.profilePicUrl);
        } else {
          toast.error('Unable to upload profile photo now! Try again later');
        }
      }
      if (coverPhoto) {
        const coverPhotoResponse = await uploadBGpic(formData2);
        if (coverPhotoResponse.data.result) {
          toast.success('Cover photo uploaded!');
          // setCoverPhotoURL(coverPhotoResponse.data.result.bgPicUrl);
        } else {
          toast.error('Unable to upload cover photo now! Try again later');
        }
      }
      navigate('/msocial');
    } catch (err) {
      toast.error('Unable to upload picture now! Try again later');
    }
    setUploading(false);
  };

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    setCoverPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPhotoURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhotoURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
      <div className='flex items-center justify-center gap-3 mt-10'>
        <img src={coolimg} className='h-[40px]' alt='Cool Logo' />
        <h1 className='font-bold text-xl'>SKILLOP</h1>
      </div>
      <div className='flex items-start flex-col mt-[12vh] mx-[5vh]'>
        <h1 className='text-start text-2xl font-semibold mb-2'>
          Complete your
        </h1>
        <span className='text-4xl font-bold'>Profile</span>
        <MProgressBar progress={75} />
        <h1 className='text-lg font-semibold mt-7'>Cover And Profile Photo</h1>
        <div className='flex flex-col items-start justify-center'>
          <div>
            <span className='text-lg font-normal mb-2'>Cover Photo</span>
            <div
              className='w-[80vw] bg-[#D9D9D96E] h-[18vh] overflow-hidden rounded-lg relative flex items-center justify-center'
              onClick={() => document.getElementById('coverPhoto').click()}
            >
              <img
                src={coverPhotoURL || coverPic || vector}
                className='absolute '
                alt='Vector'
              />
              <label
                htmlFor='coverPhoto'
                className='absolute text-lg font-medium cursor-pointer'
              >
                {!coverPic && 'Choose Photo'}
                <input
                  id='coverPhoto'
                  accept='image/*'
                  type='file'
                  style={{
                    visibility: 'hidden',
                    height: 0,
                    width: 0,
                  }}
                  onChange={handleCoverUpload}
                />
              </label>
            </div>
          </div>
          <div className='mt-2'>
            <span className='text-lg font-normal mb-4 '>Profile Photo</span>
            <div
              className='overflow-hidden bg-[#D9D9D96E] h-[14vh] w-[14vh] rounded-full relative flex items-center justify-center'
              onClick={() => document.getElementById('profilePhoto').click()}
            >
              <img
                src={profilePhotoURL || profilePic || mdi}
                className='absolute bottom-[0vh] w-full'
                alt='Profile'
              />
              <label
                htmlFor='profilePhoto'
                className='absolute text-lg font-medium cursor-pointer ml-4'
              >
                {!profilePic && 'Choose Photo'}
                <input
                  id='profilePhoto'
                  accept='image/*'
                  type='file'
                  style={{
                    visibility: 'hidden',
                    height: 0,
                    width: 0,
                  }}
                  onChange={handleProfileUpload}
                />
              </label>
            </div>
            {uploading && (
              <div>
                <img
                  src='/spinner.gif'
                  className='w-20 mx-auto'
                  alt='loading'
                />
              </div>
            )}
            {profilePic ? (
              <p className='py-2 font-bold'>
                * Click profile or cover photo to edit.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='flex items-center justify-between w-[100%] mt-10 '>
            <button
              className='border-[1px] border-black py-2 px-3 rounded-2xl hover:bg-gray-200'
              onClick={() => navigate('/mstudinfo')}
            >
              Previous
            </button>
            <button
              className='border-[1px] border-black py-2 px-3 rounded-2xl hover:bg-gray-200'
              onClick={handleUpload}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
