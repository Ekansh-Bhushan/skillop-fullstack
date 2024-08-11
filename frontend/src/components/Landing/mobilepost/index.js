import React from "react";
import Mobilecommonhead from "../../Mobilecommonhead";
import { RxCross2 } from "react-icons/rx";
import vid from "../../images/video.jpeg";
import photo from "../../images/image.png";
import attach from "../../images/attatchment.png";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const API = axios.create({ baseURL: "https://skillop.in" });

const Mobilepost = () => {
  const [image, setImage] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setSelectedFile(event.target.files);
  };
  const creatingPost = async () => {
    try {
      const formData = new FormData();
      if (selectedFile)
        for (let i = 0; i < selectedFile.length; i++) {
          formData.append('postImages', selectedFile[i]);
        }
      formData.append('title', inputValue);
      // console.log(formData);
      const createPost = (data) => {
        const token = localStorage.getItem('skilloptoken');

        const config = {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        };
        return API.post(`/api/post/create`, data, config);
      };
      // setProgress(30);
      const data = await createPost(formData);
      window.location.reload();
    } catch (error) {
      toast.error(error)
    }
  };

  return (
    <>
      <Mobilecommonhead />
      <div className='section-post-mobile'>
        <div className='cut'>
          <RxCross2
            onClick={() => {
              navigate('/homepage');
            }}
          />
        </div>
        <div className='post-mobile-button'>
          <button disabled={inputValue < 1} onClick={creatingPost}>
            Post
          </button>
        </div>
        <div className='post-mobile-content'>
          <textarea
            placeholder="What's on your Mind ?...."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            style={{
              resize: 'none',
              width: '70%',
              height: '10vh',
              position: 'relative',
              left: 'calc(15% - 15px)',
              right: 'calc(15% - 15px)',
              top: '80px',
              fontFamily: 'arial',
              fontSize: '16px',
              background: 'none',
              borderRadius: '10px',
              padding: '15px',
            }}
          />
        </div>
        <div className='more-options'>
          <div
            onClick={() => {
              document.querySelector('.photo-popup-mobile').style.display =
                'flex';
            }}
            className='options-mobile-user-post'
          >
            <img src={photo} className='posticons' />
            <div>Photo</div>
          </div>
          <div className='options-mobile-user-post'>
            <img src={vid} className='video-mobile-posting' />
            <div>Video</div>
          </div>
          <div className='options-mobile-user-post'>
            <img src={attach} className='posticons' />
            <div>Attachment</div>
          </div>
        </div>
        <div className='photo-popup-mobile' style={{ display: 'none' }}>
          <div
            style={{
              position: 'absolute',
              right: '10px',
              top: '10px',
            }}
            onClick={() => {
              setImage(null);
              document.querySelector('.photo-popup-mobile').style.display =
                'none';
            }}
          >
            Cancel
          </div>
          {image && (
            <img
              src={image}
              alt='Uploaded Image'
              style={{ height: '70%', width: '90%' }}
            />
          )}
          <div>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
            />
          </div>
          {image && (
            <button
              onClick={(event) => {
                document.querySelector('.photo-popup-mobile').style.display =
                  'none';
              }}
              className='photo-popup-btn'
            >
              Proceed
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Mobilepost;
