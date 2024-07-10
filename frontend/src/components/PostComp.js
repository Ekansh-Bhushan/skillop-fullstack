import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Popup from './Landing/Post/LikeBox/LikePopUp';
import PostImgPrevw from './Landing/Post/PostImagePrev/PostImgPrevw';
import userPic from './images/user.png';
import next from './images/next.png';
import back from './images/back.png';
import { followUnfollowUser } from '../api/follow-unfollow';
import TaggingManager from '../utils/tagManager';
import toast from 'react-hot-toast';
import { getUserFromUsername } from '../api/userRequest';
import { linkIdentifier } from '../utils/linkIdentifier';
import { getAllPost,getSpecificPost, likeOrDislikePost, getLikers, getCommentsForPost, deletePost} from '../api/postRequest';
import allTag from './images/allTag.png';
import societytag from './images/member.png';
import mentortag from './images/mentor tag.png'
import './postcomp.css';

const socket = socketIOClient('https://skillop.in/api/');
const PostComp = ({
  userData,
  author,
  imageUrls,
  title,
  likes,  
  _id,
  user,
  __created,
  followings,
  setProgress,
}) => {
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState();
  const [commentList, setCommentList] = useState([]);
  const [fetchingComments, setFetchingComments] = useState(false);
  const [showPostImgPrew, setShowPostImgPrew] = useState(false);
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openPost = () => {
    navigate(`/postsection/${_id}`);
  };

  const likethispost = async (event) => {
    try {
      setLiked(!liked);
      await likeOrDislikePost(_id);
      await fetchLikers();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    setFetchingComments(true);
    try {
      const data = await getCommentsForPost(_id);
      const commData = data.data.result;
      setCommentList(commData);
      setFetchingComments(false);

    } catch (err) {
      console.log('Unable to get comments ', err);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
  
      if (confirmed){
        await deletePost(_id)
        toast.success("Deleted successfully!");
      }else {
        console.log("Deletion cancelled by the user");
      }
    } catch (err) {
      console.log("Error deleting Post", err);
      toast.error(err.response.data.err);
    }
  };


  const [likersList, setLikersList] = useState([]);
  const [fetchingLikers, setFetchingLikers] = useState(true);
  const [FollowBtn, setFollowBtn] = useState('Loading...');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await getAllPost();
      setPosts(response.data); // Assuming your API returns an array of posts
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };
  useEffect(() => {
   
    fetchPosts();

    // Listen for new post events
    socket.on('newPost', () => {
      // Trigger a re-fetch of posts when a new post is received
      fetchPosts();
    });

    return () => {
      // Disconnect the socket on component unmount
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userData && userData.followings) {
      setFollowBtn(
        userData.followings.includes(author._id) ? '✔ Following' : 'Follow'
      );
    } else if (!userData) {

      setFollowBtn('Loading user data...');
    } else {

      setFollowBtn('Error: followings data not available');
    }
  }, [userData, author._id]);

  const fetchLikers = async () => {
    try {
      setFetchingLikers(true);
      const data = await getLikers(_id);
      const likersData = data.data.result;
      setLikersList(likersData);
      setFetchingLikers(false);

    } catch (err) {
      console.log('Unable to fetch likers ', err);
    }
  };

  const openPublicProfile = () => {
    navigate(`/public-profile/${author._id}`);
  };

  useEffect(() => {
    fetchComments();
    fetchLikers();
  }, []);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await getSpecificPost(_id);

        setPost(data.result);
        setLiked(data.result.likes.includes(userData._id));
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [liked, _id]);

  useEffect(() => {
    // Establish a connection to the socket on component mount
    socket.on('newPost', (newPost) => {
      // Handle the new post, you might want to update the post list or do other actions
      console.log('New post received:', newPost);
      // For simplicity, you can trigger a full post refresh here, but in a real-world app, you would handle this more efficiently
      fetchComments();
      fetchLikers();
    });

    return () => {
      // Disconnect the socket on component unmount
      socket.disconnect();
    };
  }, []);

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const onClose = () => {
    setShowPostImgPrew(!showPostImgPrew);
  };

  const previewImage = () => {
    setShowPostImgPrew(!showPostImgPrew);
  };

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const handleNextMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );

  };

  const handlePreviousMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );

  };



  function formatTimeDifference() {
    const currentTime = new Date();
    const createdTime = new Date(__created);

    const timeDifferenceInSeconds = Math.floor(
      (currentTime - createdTime) / 1000
    );
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds}s`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes}m`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours}h`;
    } else if (timeDifferenceInSeconds < 604800) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days}d`;
    } else if (timeDifferenceInSeconds < 2419200) {
      const weeks = Math.floor(timeDifferenceInSeconds / 604800);
      return `${weeks}w`;
    } else if (timeDifferenceInSeconds < 29030400) {
      const months = Math.floor(timeDifferenceInSeconds / 2419200);
      return `${months}mo`;
    } else {
      const years = Math.floor(timeDifferenceInSeconds / 29030400);
      return `${years}y`;
    }
  }

  const isImage = (url) => {
    return (
      url.toLowerCase().includes('.jpg') ||
      url.toLowerCase().includes('.jpeg') ||
      url.toLowerCase().includes('.png')
    );
  };

  const mediaIdentifier = (file) => {
    file = file.toLowerCase();
    if (
      file.includes('.jpg') ||
      file.includes('.jpeg') ||
      file.includes('.png') ||
      file.includes('.PNG')
    ) {
      return true;
    }

    else {
      return false;
    }
  };
  const taggingManager = new TaggingManager(
    setProgress,
    navigate,
    getUserFromUsername,
    toast
  );

  const shareClicked = (id) => {
    function copy(text) {
      var input = document.createElement('textarea');
      input.innerHTML = text;
      document.body.appendChild(input);
      input.select();
      var result = document.execCommand('copy');
      document.body.removeChild(input);
      return result;
    }
    const postLink = `https://skillop.in/postsection/${id}`;
    copy(postLink);
    toast.success('Post link copied to clipboard!');
  };

  return (
   
    <div className='post-1'>
       
      <div>
        {author ? (
          <div id='post-user-follow-head'>
            <div style={{ cursor: 'pointer' }} className='post-postedby'>
              <img
                src={author.profilePicUrl ? author.profilePicUrl : userPic}
                alt='user-pic'
                onClick={openPublicProfile}
              />
              <div onClick={openPublicProfile}>
                <span style={{ fontWeight: 'bold' }} className='posted-by-name'>
                  <span>
                    {author.firstname} {author.lastname}
                  </span>
                  {author.isMentor && author.isSocietyMember &&(
                    <img
                      id='verified-badge'
                      src={allTag}
                      // src='/verified.png'
                      width={10}
                      height={10}
                      alt='verified badge'
                    />
                  )}
                  {!author.isMentor && author.isSocietyMember &&(
                    <img
                      id='verified-badge'
                      src={societytag}
                      // src='/verified.png'
                      width={10}
                      height={10}
                      alt='verified badge'
                    />
                  )}
                  {author.isMentor && !author.isSocietyMember &&(
                    <img
                      id='verified-badge'
                      src={mentortag}
                      // src='/verified.png'
                      width={10}
                      height={10}
                      alt='verified badge'
                    />
                  )}
                </span>
                <span style={{ fontSize: '12px' }} className='posted-by-brief'>
                  {author.experence.length
                    ? author.experence[0].title +
                    ' @ ' +
                    author.experence[0].company
                    : author.education.length && author.education[0].institution
                      ? 'Student @ ' +
                      author.education[0].institution.slice(0, 50)
                      : 'Student'}
                </span>
                <div style={{ fontSize: '12px' }} className='post-time'>
                  {formatTimeDifference()}
                </div>
              </div>
              {userData._id === author._id && (
                <div className='delete-post-btn' style={{ marginRight: 'auto' }}>
                  <button onClick={handleDelete} className='delete-btn'>
                  <span role="img" aria-label="delete-icon"></span>Delete</button>
                </div>
                
              )}
            </div>

            {userData._id !== author._id && (
              <div className='post-followbtn'>
                <button
                  style={{
                    color: '#108cff',
                    
                    fontSize: '1.1rem',
                  }}
                  onClick={async () => {
                    await followUnfollowUser(author._id);
                    FollowBtn === 'Follow'
                      ? setFollowBtn('✔ Following')
                      : setFollowBtn('Follow');
                  }}
                >
                  {FollowBtn}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ cursor: 'pointer' }} className='post-postedby'>
            <img src={userPic} alt='user-pic' />
            <div>
              <span style={{ fontWeight: 'bold' }} className='posted-by-name'>
                Uknown Person
              </span>
              <span style={{ fontSize: '12px' }} className='posted-by-brief'>
                Unknown status
              </span>
            </div>
          </div>
        )}

        <div style={{ height: '10px' }}></div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '10px',
        }}
      >
        <pre
          className={`user-content-post ${expanded ? 'expanded' : ''}`}
          style={{
            position: 'relative',
            top: '10px',
            marginBottom: '10px',
            fontFamily: 'Ubuntu',
          }}
          onClick={() => {
            navigate(`/postsection/${_id}`);
          }}
        >
          {taggingManager.convert(title)}
        </pre>
        {title.length > 500 || (title.match(/\n/g) || []).length >= 5 ? (
          <button onClick={toggleExpand} className='read-more'>
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        ) : (
          ''
        )}
      </div>

      {imageUrls.length ? (

        isImage(imageUrls[currentMediaIndex]) ? (

          <div
            className='posted-img-container'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            {imageUrls.length > 1 && currentMediaIndex > 0 && (
              <span onClick={handlePreviousMedia}>
                <img
                  className='back-post-arr'
                  height={32}
                  width={32}
                  src={back}
                  alt='back'
                />
              </span>
            )}
            <img
              onClick={previewImage}
              src={imageUrls[currentMediaIndex]}
              className='img-posted'
              alt='prevw'
            />
            {imageUrls.length > 1 &&
              currentMediaIndex < imageUrls.length - 1 && (
                <span onClick={handleNextMedia}>
                  <img
                    className='next-post-arr'
                    height={28}
                    width={28}
                    src={next}
                    alt='next'
                  />
                </span>
              )}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            {imageUrls.length > 1 && currentMediaIndex > 0 && (
              <span onClick={handlePreviousMedia}>
                <img
                  style={{ cursor: 'pointer' }}
                  className='back-post-arr'
                  height={32}
                  width={32}
                  src={back}
                  alt='back'
                />
              </span>
            )}
            <iframe
              id='iframe-post'
              onClick={previewImage}
              src={imageUrls[currentMediaIndex]}
              width='100%'
              height={400}
              title='Media Preview'
              scrolling='no'
              frameBorder='0'
            ></iframe>
            {imageUrls.length > 1 &&
              currentMediaIndex < imageUrls.length - 1 && (
                <span style={{ cursor: 'pointer' }} onClick={handleNextMedia}>
                  <img
                    className='next-post-arr'
                    height={28}
                    width={28}
                    src={next}
                    alt='next'
                  />
                </span>
              )}
          </div>
        )
      ) : (
        ''
      )}

      {showPostImgPrew && imageUrls.length && (
        <div className='absolute'>
          <PostImgPrevw
            onClose={onClose}
            name={author.firstname + ' ' + author.lastname}
            src={imageUrls[currentMediaIndex]}
          />
        </div>
      )}

      {(likersList.length > 0 || commentList.length > 0) && (
        <>
          <hr id='like-line' />
          <div className='like-cmts-count'>
            <div style={{ cursor: 'pointer' }} className='like-counts'>
              {likersList.length <= 1 && (
                <>
                  <span onClick={openPopup}>{likersList.length} Like</span>
                </>
              )}
              {likersList.length > 1 && (
                <>

                  <span className='likes-name'>
                    <b>
                      {likersList[likersList.length - 1].firstname +
                        ' ' +
                        likersList[likersList.length - 1].lastname}
                    </b>{' '}
                    and{' '}
                    <span id='others' onClick={openPopup}>
                      {likersList.length - 1} others
                    </span>{' '}
                  </span>

                </>
              )}
            </div>
            <div
              style={{ cursor: 'pointer',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap', }}
              onClick={() => {
                navigate(`/postsection/${_id}`);
              }}
              className='cmts-count'
              
            >
              {commentList.length + ' '}Comments
            </div>
          </div>
        </>
      )}
      <hr id='like-line' />
      <div className='reactions-div'>
        <div
          className='reactions'
          style={{ position: 'absolute', left: '0px', top: '-10px' }}
        >
          <div className='like-count'>
            <i
              style={{
                marginRight: '4px',
                fontSize: '22px',
                color: liked ? 'rgb(16, 39, 111)' : '#666565',
                cursor: 'pointer',
              }}
              className='fa fa-thumbs-up'
              onClick={likethispost}
            ></i>
            Like
          </div>
          {isPopupOpen && (
            <Popup
              onClose={closePopup}
              setProgress={setProgress}
              postId={_id}
              likesCount={post.likes.length}
            />
          )}
          <div
            className='comments'
            onClick={() => {
              navigate(`/postsection/${_id}`);
            }}
          >

            <img style={{ marginRight: '4px' }} src='/comment.png' />
            Comments
          </div>

          <div className='share' onClick={() => shareClicked(post._id)}>
            <img src='/share.png' width={21} height={21} alt='share' />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComp;