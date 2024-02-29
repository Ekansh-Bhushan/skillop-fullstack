import React from 'react';
import '../Post/index.css';
import userPic from '../../images/user.png';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  getSpecificPost,
  likeOrDislikePost,
  addCommentToPost,
  getCommentsForPost,
  deleteComment,
} from '../../../api/postRequest';
import { useNavigate } from 'react-router-dom';
import Popup from '../Post/LikeBox/LikePopUp';
import spinner from '../../images/spinner.gif';
import Profileandevents from '../Profileandevents';
import PostImgPrevw from '../Post/PostImagePrev/PostImgPrevw';
import next from '../../images/next.png';
import back from '../../images/back.png';
import toast from 'react-hot-toast';
import Mobilecommonhead from '../../Mobilecommonhead';
import {
  getUserFromUsername,
  queryUserFromUsername,
} from '../../../api/userRequest';
import TaggingManager from '../../../utils/tagManager';

function Otherpost({ userData, setProgress }) {
  const postId = window.location.pathname.split('/')[2];
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [fetchingComments, setFetchingComments] = useState(false);
  // const [userName, setUserName] = useState(null);
  const [showPostImgPrew, setShowPostImgPrew] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [signQuery, setSignQuery] = useState([]);

  const handleNextMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === post.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
    // console.log("next ",currentMediaIndex)
  };

  const debouncedInputChange = _.debounce(async (newValue) => {
    const lastword = newValue.split(' ').pop();
    if (lastword.startsWith('@')) {
      try {
        const { data } = await queryUserFromUsername(lastword.slice(1));
        console.log(data.result[0]);
        if (data.result) {
          setSignQuery(data.result);
          setShowSuggestions(true);
        }
        // console.log(data.result);
      } catch (err) {
        console.log(err);
      }
    } else {
      setShowSuggestions(false);
    }
  }, 10);

  const handlePreviousMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? post.imageUrls.length - 1 : prevIndex - 1
    );
    // console.log("prev ",currentMediaIndex)
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const previewImage = () => {
    setShowPostImgPrew(!showPostImgPrew);
  };

  const onClose = () => {
    setShowPostImgPrew(!showPostImgPrew);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [liked, setLiked] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const goToProfile = () => {
    setProgress(30);
    navigate(`/public-profile/${post.author._id}`);
    setProgress(100);
  };

  const likethispost = async (event) => {
    setLiked(!liked);
    try {
      const { data } = await likeOrDislikePost(postId);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComments = async () => {
    try {
      setProgress(35);
      await addCommentToPost(postId, comment);
      setComment('');
      await fetchComments();
      setProgress(100);
      // await storeNames();
      // console.log(commentList);
    } catch (err) {
      console.log('Unable to add comment', err);
      toast.error(err.response.data.message);
    }
  };

  const delComm = async (commentId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (confirmed) {
      try {
        setProgress(40);
        await deleteComment(commentId);
        setCommentList((prevCommentList) =>
          prevCommentList.filter((item) => item._id !== commentId)
        );
        setProgress(100);
      } catch (err) {
        console.log('unable to del comment ', err);
        toast.error(err.response.data.message);
      }
    }
  };

  const fetchComments = async () => {
    setFetchingComments(true);
    try {
      const data = await getCommentsForPost(postId);
      const commData = data.data.result;
      setCommentList(commData);
      setFetchingComments(false);
      // console.log(commData);
      // console.log(commentList);
    } catch (err) {
      console.log('Unable to get comments ', err);
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleComments();
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const onChange = (e) => {
    setComment(e.target.value);
    debouncedInputChange(e.target.value);
  };
  const isImage = (url) => {
    return (
      url.toLowerCase().includes('.jpg') ||
      url.toLowerCase().includes('.jpeg') ||
      url.toLowerCase().includes('.png')
    );
  };

  // define useState to get the post with this postId from backend
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await getSpecificPost(postId);
        // console.log(data.result);
        setPost(data.result);
        setLiked(data.result.likes.includes(userData._id));
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [postId, liked, userData._id]);
  // console.log(post);

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
    <>
      <Mobilecommonhead />
      <div className='main-content-landing'>
        {post && (
          <div className='posting-on-landing'>
            <div className='people-post'>
              <div className='post-1 '>
                {post.author && (
                  <div className='post-postedby' onClick={goToProfile}>
                    <img
                      src={
                        post.author.profilePicUrl
                          ? post.author.profilePicUrl
                          : userPic
                      }
                      alt={post.title}
                    />
                    <div>
                      <span
                        style={{ fontWeight: 'bold' }}
                        className='posted-by-name'
                      >
                        {post.author.firstname} {post.author.lastname}
                      </span>
                      <span
                        style={{ fontSize: '12px' }}
                        className='posted-by-brief'
                      >
                        {post.author.isMentor ? 'Mentor' : 'Mentee'}
                      </span>
                    </div>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    marginBottom: '10px',
                  }}
                >
                  <pre
                    className={`user-content-post${
                      expanded ? '.expanded' : ''
                    }`}
                    style={{
                      position: 'relative',
                      top: '10px',
                      marginBottom: '10px',
                      overflowWrap: 'break-word',
                      whiteSpace: 'pre-wrap',
                      maxWidth: '900px', 
                      width: '100%', 
                    }}
                  >
                    {taggingManager.convert(post.title)}
                  </pre>
                  {post.title.length > 500 ||
                  (post.title.match(/\n/g) || []).length > 4 ? (
                    <button onClick={toggleExpand} className='read-more'>
                      {expanded ? 'Read Less' : 'Read More'}
                    </button>
                  ) : (
                    ''
                  )}
                </div>

                {post.imageUrls.length ? (
                 
                  isImage(post.imageUrls[currentMediaIndex]) ? (
                    <div
                      className='posted-img-container'
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        
                      }}
                    >
                      {post.imageUrls.length > 1 && currentMediaIndex > 0 && (
                        <span onClick={handlePreviousMedia}>
                          <img height={32} width={32} src={back} alt='back' />
                        </span>
                      )}
                      <img
                        src={post.imageUrls[currentMediaIndex]}
                        className='img-posted'
                        onClick={previewImage}
                        alt='prevw'
                      />
                      {post.imageUrls.length > 1 &&
                        currentMediaIndex < post.imageUrls.length - 1 && (
                          <span onClick={handleNextMedia}>
                            <img height={28} width={28} src={next} alt='next' />
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
                      {post.imageUrls.length > 1 && currentMediaIndex > 0 && (
                        <span
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={handlePreviousMedia}
                        >
                          <img height={32} width={32} src={back} alt='back' />
                        </span>
                      )}
                      <iframe
                        onClick={previewImage}
                        src={post.imageUrls[currentMediaIndex]}
                        width='100%'
                        height={400}
                        title='Media Preview'
                        scrolling='no'
                        frameBorder='0'
                        style={{
                          borderRadius: '15px',
                          overflow: 'hidden',
                          border: 'none',
                          objectFit: 'contain',
                        }}
                      ></iframe>
                      {post.imageUrls.length > 1 &&
                        currentMediaIndex < post.imageUrls.length - 1 && (
                          <span
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={handleNextMedia}
                          >
                            <img height={28} width={28} src={next} alt='next' />
                          </span>
                        )}
                    </div>
                  )
                ) : (
                  ''
                )}

                {showPostImgPrew && post.imageUrls.length && (
                  <PostImgPrevw
                    onClose={onClose}
                    name={post.author.firstname + ' ' + post.author.lastname}
                    src={post.imageUrls[currentMediaIndex]}
                  />
                )}

                <div className='reactions'>
                  <div className='like-post'>
                    <i
                      style={{
                        fontSize: '25px',
                        color: liked ? 'rgb(16, 39, 111)' : 'rgb(0, 0, 0)',
                        cursor: 'pointer',
                      }}
                      className='fa fa-thumbs-up'
                      onClick={likethispost}
                    ></i>
                    <div onClick={openPopup} className='like-count'>
                      {post.likes.length} Likes
                    </div>
                  </div>
                  {isPopupOpen && (
                    <Popup
                      onClose={closePopup}
                      setProgress={setProgress}
                      postId={postId}
                      likesCount={post.likes.length}
                    />
                  )}

                  <div className='comments'>
                   
                    <img style={{ marginRight: '4px' }} src='/comment.png' />
                    {commentList.length + ' '}
                    Comments
                  </div>
                  <div className='share' onClick={() => shareClicked(post._id)}>
                    <img src='/share.png' width={25} height={25} alt='share' />
                    <span>Share</span>
                  </div>
                </div>
                {showSuggestions && (
                  <div
                    className='border-black border rounded-lg min-w-[15vw]'
                    id='usernameList'
                  >
                    {signQuery.slice(0, 7).map((user) => (
                      <div
                        className='user flex gap-2 border-b-2 hover:bg-gray-100 cursor-pointer py-1 px-2 rounded-lg'
                        key={user._id}
                        onClick={() => {
                          setComment(
                            comment.replace(/@\S+$/, `@${user.username} `)
                          );
                          setShowSuggestions(false);
                        }}
                      >
                        <img
                          src={user.profilePicUrl || '/user.png'}
                          alt='profile-pic'
                          height={30}
                          width={30}
                          className='rounded-full'
                        />
                        <p>{user.username}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className='displayComments'>
                  <input
                    type='text'
                    value={comment}
                    onKeyDown={handleEnter}
                    onChange={onChange}
                    placeholder='Comment here...'
                  />
                  <button
                    disabled={comment.length === 0}
                    onClick={handleComments}
                  >
                    Post
                  </button>
                </div>
                <div className='comments-container'>
                  <h3 style={{ marginBottom: '3px' }}>
                    Comments ({commentList.length})
                  </h3>
                  {fetchingComments && (
                    <img
                      src={spinner}
                      style={{
                        height: '55px',
                        width: '55px',
                      }}
                      alt='loading'
                    />
                  )}
                  {fetchingComments === false && commentList.length === 0
                    ? 'No comments yet'
                    : ''}
                  {commentList &&
                    commentList.map((item) => {
                      return (
                        <div id='comment-to-prof' key={item._id}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '80px',
                            }}
                          >
                            <span
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                              }}
                              onClick={() =>
                                navigate(`/public-profile/${item.user._id}`)
                              }
                            >
                              <img
                                height={32}
                                width={32}
                                src={userPic}
                                alt='user-pic'
                                style={{}}
                              />
                              <b>
                                {item.user.firstname + ' ' + item.user.lastname}
                              </b>
                            </span>
                            {userData._id === item.user._id && (
                              <i
                                onClick={() => delComm(item._id)}
                                className='fa fa-lg fa-solid fa-trash'
                              ></i>
                            )}
                          </div>
                          <p
                            style={{
                              marginLeft: '40px',
                              fontSize: '1.1rem',
                            }}
                          >
                            {taggingManager.convert(item.comment)}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <Profileandevents userData={userData} />
      </div>
    </>
  );
}

export default Otherpost;
