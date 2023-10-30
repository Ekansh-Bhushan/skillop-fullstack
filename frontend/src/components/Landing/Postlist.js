import React, { useEffect, useState, useRef } from "react";
import meet from "../images/meet.jpeg";
import Header1 from "../Header/index";
import index from "./Post/index.css";
import userImage from "../images/user.png";
import { IoMdSend } from "react-icons/io";
import photoIcon from "../images/image.png";
import videoIcon from "../images/video.jpeg";
import attatchment from "../images/attatchment.png";
import postIcon from "../images/post.png";
import "./Postlist.css";
import PostPopUp from "./Post/PostPopUp";
import {
    createPost,
    getAllPost,
    getPostFromSpecificUser,
} from "../../api/postRequest";
import PostComp from "../PostComp";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

function Postlist({ userData, displaycreatepost, user, setProgress }) {
    const [refresh, setRefresh] = useState(false);
    const userId = window.location.pathname.split("/")[2];

    const [selectedFile, setSelectedFile] = useState(null);

    const [showPostPopUp, setShowPostPopUp] = useState(false);

    const [isSticky, setIsSticky] = useState(false);

    const onClose = () => {
        setShowPostPopUp(!showPostPopUp);
    };

    const handlePostPopUp = () => {
        setShowPostPopUp(!showPostPopUp);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files);
        // console.log(selectedFile, "hello");
    };
    const hidepop = () => {
        document.querySelector(".photo-popup").style.display = "none";
    };

    const handleUpload = () => {
        document.querySelector(".photo-popup").style.display = "flex";
    };

    const [inputValue, setInputValue] = useState("");
    const [postData, setPostData] = useState("");
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    };

    const likethispost = (event) => {
        if (event.target.style.color !== "rgb(16, 39, 111)") {
            event.target.style.color = "rgb(16, 39, 111)";
        } else {
            event.target.style.color = "gray";
            document.querySelector(".like-count").value -= 1;
        }
    };

    const creatingPost = async () => {
        try {
            const formData = new FormData();
            if (selectedFile)
                for (let i = 0; i < selectedFile.length; i++) {
                    formData.append("postImages", selectedFile[i]);
                }
            formData.append("title", inputValue);
            // console.log(formData);
            const createPost = (data) => {
                const token = localStorage.getItem("skilloptoken");

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
            // console.log(data);
            setProgress(100);
        } catch (error) {
            console.log(error);
        }
    };

    const gettingAllPost = async () => {
        try {
            const { data } = await getAllPost();
            setPostData(data.result);
            // console.log(data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const getPostsFromUser = async () => {
        try {
            const { data } = await getPostFromSpecificUser(userId);
            setPostData(data.result);
            // console.log(data.result);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (userId) getPostsFromUser();
        else gettingAllPost();
    }, []);

    useEffect(() => {
        gettingAllPost();
    }, [refresh, setRefresh, creatingPost]);

    // STICK POST HEAD TO TOP WHILE SCROLLING DOWN EVENT TRIGGER
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {showPostPopUp && (
                <PostPopUp
                    onClose={onClose}
                    setProgress={setProgress}
                    setRefresh={setRefresh}
                />
            )}
            <div className="posting-on-landing">
                <div
                    style={{
                        position: "absolute",
                        top: "0",
                        zIndex: "20",
                        width: "90%",
                        height: "100px",
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px",
                        display: "none",
                        justifyContent: "center",
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
                            border: "none",
                            padding: "5px 10px 5px 10px",
                            background: "black",
                            color: "white",
                            borderRadius: "10px",
                            cursor: "pointer",
                        }}
                    >
                        Proceed
                    </button>
                </div>
                {displaycreatepost && (
                    <div
                        className={
                            isSticky ? "user-new-post2" : "user-new-post"
                        }
                    >
                        <div
                            className={
                                isSticky
                                    ? "user-post-head user-post-head2"
                                    : "user-post-head"
                            }
                            style={{ transform: "translateY(-100%)" }}
                        >
                            <img
                                id="post-user"
                                src={
                                    userData.profilePicUrl
                                        ? userData.profilePicUrl
                                        : userImage
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
                                    fontSize: "45px",
                                    color: "rgb(99,203,207)",
                                    cursor: "pointer",
                                    width: "50px",
                                }}
                            />
                        </div>
                        <div className="upload-section">
                            <div
                                style={{ display: "flex", gap: "5px" }}
                                className="photo-upload"
                                onClick={handlePostPopUp}
                            >
                                <img
                                    src={photoIcon}
                                    style={{
                                        height: "20px",
                                        width: "20px",
                                        borderRadius: "0px",
                                    }}
                                    alt="photos"
                                />
                                Photo
                            </div>

                            <div
                                style={{ display: "flex", gap: "5px" }}
                                className="video-upload"
                                onClick={handlePostPopUp}
                            >
                                <img
                                    src={videoIcon}
                                    style={{
                                        height: "20px",
                                        width: "25px",
                                        borderRadius: "0px",
                                    }}
                                    alt="Video"
                                />
                                Video
                            </div>

                            <div
                                style={{ display: "flex", gap: "5px" }}
                                className="create-new-post"
                                onClick={handlePostPopUp}
                            >
                                <img
                                    src={attatchment}
                                    style={{
                                        height: "20px",
                                        width: "20px",
                                        borderRadius: "0px",
                                    }}
                                    alt="docs"
                                />
                                Document
                            </div>
                        </div>
                    </div>
                )}
                <div className="people-post">
                    {postData &&
                        postData.map((val, i) => (
                            <PostComp
                                {...val}
                                userData={userData}
                                user={user}
                                key={i}
                                setProgress={setProgress}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}

export default Postlist;
