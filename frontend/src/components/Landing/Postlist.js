import React, { useState, useEffect, useRef } from 'react';
import userImage from '../images/user.png';
import photoIcon from '../images/image.png';
import videoIcon from '../images/video.jpeg';
import attatchment from '../images/attatchment.png';
import postIcon from '../images/post.png';
import './Postlist.css';
import PostPopUp from './Post/PostPopUp';
import { getAllPost } from '../../api/postRequest';
import PostComp from '../PostComp';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import spinner from '../images/spinner.gif';

const API = axios.create({ baseURL: 'https://app.skillop.in' });

const Postlist = ({
  userData,
  displaycreatepost,
  user,
  setProgress,
  setUserData,
  showPostPopUp,
  setShowPostPopUp
}) => {
  const [refresh, setRefresh] = useState(false);
  const userId = window.location.pathname.split('/')[2];

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);

  const [isSticky, setIsSticky] = useState(false);

  const onClose = () => {
    setShowPostPopUp(!showPostPopUp);
  };

  const handlePostPopUp = () => {
    setShowPostPopUp(!showPostPopUp);
  };

  const hidepop = () => {
    document.querySelector('.photo-popup').style.display = 'none';
  };

  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [length, setLength] = useState(limit);
  const containerRef = useRef(null);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const creatingPost = async () => {
    try {
      if (inputValue.length === 0) {
        toast.error('Enter something to post');
        return;
      }
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
      setProgress(30);
      const data = await createPost(formData);
      window.location.reload();

      // Add this post to the posts state
      setPosts((prevPosts) => [data.result, ...prevPosts]);
      // console.log(data);
      setProgress(100);
    } catch (error) {
      console.log(error);
    }
  };

  // const gettingAllPost = async () => {
  //     try {
  //         const { data } = await getAllPost();
  //         setPostData(data.result);
  //         console.log("here is ", data.result);
  //         // console.log(data.result);
  //     } catch (error) {
  //         if (!error.response.data.result) {
  //             localStorage.removeItem("skilloptoken");
  //             console.log("here is ", error.response.data.result);
  //             navigate("/");
  //             toast.error("Session expired, Login again!");
  //         }
  //         console.log(error);
  //     }
  // };

  // useEffect(() => {
  //     getAllPost();
  // }, [refresh, setRefresh]);

  // STICK POST HEAD TO TOP WHILE SCROLLING DOWN EVENT TRIGGER
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const { data } = await getAllPost(limit, skip);
        setLength((prevLen) => data.length);
        setPosts((prevPosts) => [...prevPosts, ...data.result]);
        setSkip((prevSkip) => prevSkip + limit);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };
    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        if (target.intersectionRatio > 0) {
          // Load more posts
          if (limit === length) {
            setLoading(true);
            loadPosts();
          }
        }
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust as needed
    };

    const observer = new IntersectionObserver(handleObserver, observerOptions);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
        observer.disconnect(); // Disconnect the observer on cleanup
      }
    };
  }, [length, limit, skip, refresh, setRefresh]); // Adjust dependencies as needed

  return (
    <>
      {showPostPopUp && (
        <PostPopUp
          onClose={onClose}
          setProgress={setProgress}
          setRefresh={setRefresh}
          resfresh={refresh}
        />
      )}
      <div className="posting-on-landing">
        <div
          style={{
            position: 'absolute',
            top: '0',
            zIndex: '20',
            width: '90%',
            height: '100px',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            display: 'none',
            justifyContent: 'center',
          }}
          className="photo-popup"
        >
          <input
            type="file"
            name="postImages"
            multiple
            onChange={(e) => setSelectedFile(e.target.files)}
          />
          <button
            className="proceed"
            onClick={hidepop}
            style={{
              border: 'none',
              padding: '5px 10px 5px 10px',
              background: 'black',
              color: 'white',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            Proceed
          </button>
        </div>
        {displaycreatepost && (
          // <div className={isSticky ? 'user-new-post2' : 'user-new-post'}>
          <div className={'user-new-post'}>
            <div
              className={
                // isSticky ? 'user-post-head user-post-head2' : 'user-post-head'
                'user-post-head'
              }
              // style={{ transform: 'translateY(-50%)' }}
            >
              <img
                id="post-user"
                src={
                  userData.profilePicUrl ? userData.profilePicUrl : userImage
                }
                alt="user-img-post"
              />
              <input
                onClick={handlePostPopUp}
                className="content-user-post"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="What are you Thinking...?"
              />
              <img
                src={postIcon}
                onClick={creatingPost}
                alt="post"
                disabled={inputValue.length < 1}
                style={{
                  fontSize: '45px',
                  color: 'rgb(99,203,207)',
                  cursor: 'pointer',
                  width: '50px',
                }}
              />
            </div>
            <div className="upload-section">
              <div
                style={{ display: 'flex', gap: '5px' }}
                className="photo-upload"
                onClick={handlePostPopUp}
              >
                <img
                  src={photoIcon}
                  style={{
                    height: '20px',
                    width: '20px',
                    borderRadius: '0px',
                  }}
                  alt="photos"
                />
                Photo
              </div>

              <div
                style={{ display: 'flex', gap: '5px' }}
                className="video-upload"
                onClick={handlePostPopUp}
              >
                <img
                  src={videoIcon}
                  style={{
                    height: '20px',
                    width: '25px',
                    borderRadius: '0px',
                  }}
                  alt="Video"
                />
                Video
              </div>

              <div
                style={{ display: 'flex', gap: '5px' }}
                className="create-new-post"
                onClick={handlePostPopUp}
              >
                <img
                  src={attatchment}
                  style={{
                    height: '20px',
                    width: '20px',
                    borderRadius: '0px',
                  }}
                  alt="docs"
                />
                Document
              </div>
            </div>
          </div>
        )}
        <div className="people-post">
          {posts &&
            posts.map((val, i) => (
              <PostComp
                {...val}
                userData={userData}
                user={user}
                key={val._id}
                setProgress={setProgress}
              />
            ))}
          <div ref={containerRef} style={{ height: '200px'}}>
            {loading && <img src={spinner} alt="Loading..." width={60} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Postlist;
