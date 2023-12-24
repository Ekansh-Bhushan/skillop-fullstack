import React from "react";
import "../Post/index.css";
import userPic from "../../images/user.png";
import { useState, useEffect } from "react";
import {
    getSpecificPost,
    likeOrDislikePost,
    addCommentToPost,
    getCommentsForPost,
    deleteComment,
} from "../../../api/postRequest";
import { useNavigate } from "react-router-dom";
import Popup from "../Post/LikeBox/LikePopUp";
import spinner from "../../images/spinner.gif";
import SideNav from "../../SideNav/SideNav";
import Profileandevents from "../Profileandevents";
import PostImgPrevw from "../Post/PostImagePrev/PostImgPrevw";
import next from "../../images/next.png";
import back from "../../images/back.png";
import toast from "react-hot-toast";
import Mobilecommonhead from "../../Mobilecommonhead";
import { getUserFromUsername } from "../../../api/userRequest";

import TaggingManager from "../../../utils/tagManager";

function Otherpost({ userData, setProgress, Mentor, isFetched, notifyList }) {
    const postId = window.location.pathname.split("/")[2];
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [fetchingComments, setFetchingComments] = useState(false);
    // const [userName, setUserName] = useState(null);
    const [showPostImgPrew, setShowPostImgPrew] = useState(false);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [expanded, setExpanded] = useState(false);

    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const handleNextMedia = () => {
        setCurrentMediaIndex((prevIndex) =>
            prevIndex === post.imageUrls.length - 1 ? 0 : prevIndex + 1
        );
        // console.log("next ",currentMediaIndex)
    };

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
            setComment("");
            await fetchComments();
            setProgress(100);
            // await storeNames();
            // console.log(commentList);
        } catch (err) {
            console.log("Unable to add comment", err);
            toast.error(err.response.data.message);
        }
    };

    const delComm = async (commentId) => {
        try {
            setProgress(40);
            await deleteComment(commentId);
            setCommentList((prevCommentList) =>
                prevCommentList.filter((item) => item._id !== commentId)
            );
            setProgress(100);
        } catch (err) {
            console.log("unable to del comment ", err);
            toast.error(err.response.data.message);
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
            console.log("Unable to get comments ", err);
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
    };
    const isImage = (url) => {
        return (
            url.toLowerCase().includes(".jpg") ||
            url.toLowerCase().includes(".jpeg") ||
            url.toLowerCase().includes(".png")
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

    return (
        <>
            {/* <Common setProgress={setProgress} /> */}
            {/* <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      /> */}
            <div className="main-content-landing">
                {post && (
                    <div className="posting-on-landing">
                        <Mobilecommonhead />
                        <div className="people-post">
                            <div className="post-1">
                                {post.author && (
                                    <div
                                        className="post-postedby"
                                        onClick={goToProfile}
                                    >
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
                                                style={{ fontWeight: "bold" }}
                                                className="posted-by-name"
                                            >
                                                {post.author.firstname}{" "}
                                                {post.author.lastname}
                                            </span>
                                            <span
                                                style={{ fontSize: "12px" }}
                                                className="posted-by-brief"
                                            >
                                                {post.author.isMentor
                                                    ? "Mentor"
                                                    : "Mentee"}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "20px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <p
                                        className={`user-content-post${
                                            expanded ? "expanded" : ""
                                        }`}
                                        style={{
                                            position: "relative",
                                            top: "10px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {taggingManager.convert(post.title)}
                                    </p>
                                    {post.title.length > 500 ? (
                                        <button
                                            onClick={toggleExpand}
                                            className="read-more"
                                        >
                                            {expanded
                                                ? "Read Less"
                                                : "Read More"}
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                {post.imageUrls.length ? (
                                    // post.imageUrls[0].toLowerCase().includes(".jpg") ||
                                    //   post.imageUrls[0].toLowerCase().includes(".jpeg") ||
                                    //   post.imageUrls[0].toLowerCase().includes(".png")
                                    isImage(
                                        post.imageUrls[currentMediaIndex]
                                    ) ? (
                                        <div
                                            className="posted-img-container"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "5px",
                                            }}
                                        >
                                            {post.imageUrls.length > 1 &&
                                                currentMediaIndex > 0 && (
                                                    <span
                                                        onClick={
                                                            handlePreviousMedia
                                                        }
                                                    >
                                                        <img
                                                            height={32}
                                                            width={32}
                                                            src={back}
                                                            alt="back"
                                                        />
                                                    </span>
                                                )}
                                            <img
                                                src={
                                                    post.imageUrls[
                                                        currentMediaIndex
                                                    ]
                                                }
                                                className="img-posted"
                                                onClick={previewImage}
                                                alt="prevw"
                                            />
                                            {post.imageUrls.length > 1 &&
                                                currentMediaIndex <
                                                    post.imageUrls.length -
                                                        1 && (
                                                    <span
                                                        onClick={
                                                            handleNextMedia
                                                        }
                                                    >
                                                        <img
                                                            height={28}
                                                            width={28}
                                                            src={next}
                                                            alt="next"
                                                        />
                                                    </span>
                                                )}
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "5px",
                                            }}
                                        >
                                            {post.imageUrls.length > 1 &&
                                                currentMediaIndex > 0 && (
                                                    <span
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={
                                                            handlePreviousMedia
                                                        }
                                                    >
                                                        <img
                                                            height={32}
                                                            width={32}
                                                            src={back}
                                                            alt="back"
                                                        />
                                                    </span>
                                                )}
                                            <iframe
                                                onClick={previewImage}
                                                src={
                                                    post.imageUrls[
                                                        currentMediaIndex
                                                    ]
                                                }
                                                width="100%"
                                                height={400}
                                                title="Media Preview"
                                                scrolling="no"
                                                frameBorder="0"
                                                style={{
                                                    borderRadius: "15px",
                                                    overflow: "hidden",
                                                    border: "none",
                                                    objectFit: "contain",
                                                }}
                                            ></iframe>
                                            {post.imageUrls.length > 1 &&
                                                currentMediaIndex <
                                                    post.imageUrls.length -
                                                        1 && (
                                                    <span
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={
                                                            handleNextMedia
                                                        }
                                                    >
                                                        <img
                                                            height={28}
                                                            width={28}
                                                            src={next}
                                                            alt="next"
                                                        />
                                                    </span>
                                                )}
                                        </div>
                                    )
                                ) : (
                                    ""
                                )}

                                {showPostImgPrew && post.imageUrls.length && (
                                    <PostImgPrevw
                                        onClose={onClose}
                                        name={
                                            post.author.firstname +
                                            " " +
                                            post.author.lastname
                                        }
                                        src={post.imageUrls[currentMediaIndex]}
                                    />
                                )}

                                <div className="reactions">
                                    <div className="like-post">
                                        <i
                                            style={{
                                                fontSize: "25px",
                                                color: liked
                                                    ? "rgb(16, 39, 111)"
                                                    : "rgb(0, 0, 0)",
                                                cursor: "pointer",
                                            }}
                                            className="fa fa-thumbs-up"
                                            onClick={likethispost}
                                        ></i>
                                        <div
                                            onClick={openPopup}
                                            className="like-count"
                                        >
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

                                    <div className="comments">
                                        {/* <i
                      className="fa fa-lg fa-solid fa-comment"
                      style={{ marginRight: '4px' }}
                    ></i> */}
                                        <img
                                            style={{ marginRight: "4px" }}
                                            src="/comment.png"
                                        />
                                        {commentList.length + " "}
                                        Comments
                                    </div>
                                    <div className="share">
                                        <img
                                            src="/share.png"
                                            width={25}
                                            height={25}
                                            alt="share"
                                        />
                                        <span>Share</span>
                                    </div>
                                </div>
                                <div className="displayComments">
                                    <input
                                        type="text"
                                        value={comment}
                                        onKeyDown={handleEnter}
                                        onChange={onChange}
                                        placeholder="Comment here..."
                                    />
                                    <button
                                        disabled={comment.length === 0}
                                        onClick={handleComments}
                                    >
                                        Post
                                    </button>
                                </div>
                                <div className="comments-container">
                                    <h3 style={{ marginBottom: "3px" }}>
                                        Comments ({commentList.length})
                                    </h3>
                                    {fetchingComments && (
                                        <img
                                            src={spinner}
                                            style={{
                                                height: "55px",
                                                width: "55px",
                                            }}
                                            alt="loading"
                                        />
                                    )}
                                    {fetchingComments === false &&
                                    commentList.length === 0
                                        ? "No comments yet"
                                        : ""}
                                    {commentList &&
                                        commentList.map((item) => {
                                            return (
                                                <div
                                                    id="comment-to-prof"
                                                    key={item._id}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: "80px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: "8px",
                                                            }}
                                                            onClick={() =>
                                                                navigate(
                                                                    `/public-profile/${item.user._id}`
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                height={32}
                                                                width={32}
                                                                src={userPic}
                                                                alt="user-pic"
                                                                style={{}}
                                                            />
                                                            <b>
                                                                {item.user
                                                                    .firstname +
                                                                    " " +
                                                                    item.user
                                                                        .lastname}
                                                            </b>
                                                        </span>
                                                        {userData._id ===
                                                            item.user._id && (
                                                            <i
                                                                onClick={() =>
                                                                    delComm(
                                                                        item._id
                                                                    )
                                                                }
                                                                className="fa fa-lg fa-solid fa-trash"
                                                            ></i>
                                                        )}
                                                    </div>
                                                    <p
                                                        style={{
                                                            marginLeft: "40px",
                                                            fontSize: "1.1rem",
                                                        }}
                                                    >
                                                        {item.comment}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* {post && <MyProfile userData={post.author} myUser={userData} />} */}
                <Profileandevents userData={userData} />
            </div>
        </>
    );
}

export default Otherpost;
