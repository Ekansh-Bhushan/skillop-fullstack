import React, { useContext, useState } from 'react';
import './EditPic.css';
import user from '../../images/user.png';
import coverBg from '../../images/b.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../images/spinner.gif';
import { getUser } from '../../../api/userRequest';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { MainContext } from '../../../context/MainContextProvider';

const API = axios.create({ baseURL: 'https://skillop.in' });

function EditPic({setProgress }) {
  const [uploading, setUploading] = useState(false);

  const handleBack = () => {
    setProgress(35);
    setTimeout(() => {
      setProgress(100);
    }, 300);
    navigate('/Profile');
  };

  const [dpURL, setdpURL] = useState('');
  const [dpBGURL, setdpBGURL] = useState('');
  const { currentUser, setCurrentUser } = useContext(MainContext);

  const fetchUser = async () => {
    try {
      if (!currentUser) {
        const usrData = await getUser();
        setdpURL(usrData.data.result.profilePicUrl);
        setdpBGURL(usrData.data.result.bgPicUrl);
        setCurrentUser(usrData.data.result);
      }
      else {
        setdpURL(currentUser.profilePicUrl);
        setdpBGURL(currentUser.bgPicUrl);
      }
    } catch (err) {
      console.log('Unable to fetch user', err);
    }
  };

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBGImage, setSelectedBGImage] = useState(null);
  const selectimage = (e) => {
    setSelectedImage(e.target.files[0]);
    document.querySelector('.upload-button').innerHTML = 'Upload Now';
  };
  const selectBGimage = (e) => {
    setSelectedBGImage(e.target.files[0]);
    document.querySelector('.upload-button').innerHTML = 'Upload Now';
  };
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const navigatewithout = () => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
    navigate('/laststep');
  };
  const handleUpload = async () => {
    if (selectedImage || selectedBGImage) {
      setUploading(true);
      document.querySelector('.upload-button').style.backgroundColor = 'green';
      document.querySelector('.upload-button').style.color = 'white';
      if (selectedImage) console.log('Uploading image:', selectedImage.name);
      const formData1 = new FormData();
      const formData2 = new FormData();
      formData1.append('profilePic', selectedImage);
      formData2.append('profileBackgroundPic', selectedBGImage);

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
        if (selectedImage) await uploadprofilepic(formData1);
        if (selectedBGImage) await uploadBGpic(formData2);
        setUploading(false);
      } catch (err) {
        toast.error('Error uploading cover picture');
      }
      document.querySelector('.upload-button').textContent =
        'Upload Successfully';
      window.location.reload();
      // console.log(data);
    } else {
      toast.error('Choose profile or cover picture to upload');
    }
  };
  const redirecttolast = () => {
    setProgress(40);
    navigate('/Profile');
    setProgress(100);
  };

  const showupload = () => {
    document.querySelector('.pop-img-u').style.display = 'flex';
  };
  const hideupload = () => {
    document.querySelector('.pop-img-u').style.display = 'none';
  };

  useEffect(() => {
    fetchUser();
  }, [dpURL, dpBGURL]);

  return (
    <div className='mt-[15vh]'>
      <div
        className='pop-img-u'
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: '4',
          backdropFilter: 'blur(5px)',
          marginTop: '30vh',
          display: 'none',
        }}
      >
        <div className='img-uploadpopup'>
          <div
            onClick={hideupload}
            className='fa fa-close'
            style={{
              fontSize: '25px',
              position: 'absolute',
              top: '0',
              right: '20px',
              cursor: 'pointer',
            }}
          ></div>
          <h3>Choose a new picture</h3>
          <div style={{ height: '20px' }}></div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              justifyContent: 'space-evenly',
            }}
          >
            <span style={{ marginLeft: '30px' }}>
              Profile Picture :{' '}
              <input
                type='file'
                accept='image/*'
                name='profilePic'
                className='file-input'
                onChange={(e) => {
                  selectimage(e);
                }}
              />
            </span>
            <span style={{ marginLeft: '30px' }}>
              Cover Picture :{' '}
              <input
                type='file'
                accept='image/*'
                name='profilePicBG'
                className='file-input'
                onChange={(e) => {
                  selectBGimage(e);
                }}
              />
            </span>
            <button
              className='upload-button bg-green-500 text-white p-2 hover:bg-green-600 rounded-lg'
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
          <div style={{ textAlign: 'center', margin: '30px' }}>
            {uploading && (
              <img height={75} width={75} src={Spinner} alt='Loading...' />
            )}
          </div>
        </div>
      </div>
      <div className='header-8'>Edit your Cover and Profile picture</div>
      <div className='upload-img'>
        <div
          style={{
            backgroundImage: dpBGURL ? `url(${dpBGURL})` : `url(${coverBg})`,
            backgroundPosition: 'center',
          }}
          className='cover'
        />

        <div className='main-photo'>
          <img src={dpURL ?? user} style={{ display: 'block' }} alt='user' />
          <button className='uploadbtn' onClick={showupload}>
            Edit
          </button>
        </div>
      </div>
      <div className='btnCont'>
        <button onClick={handleBack} className='back'>
          Profile
        </button>
        <button
          className='next2'
          type='button'
          form='myform2'
          onClick={redirecttolast}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default EditPic;
