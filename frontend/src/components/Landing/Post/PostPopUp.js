import React, { useEffect, useRef, useState } from "react";
import "./PostPopUp.css";
import photoIcon from "../../images/image.png";
import videoIcon from "../../images/video.jpeg";
import attatchmentIcon from "../../images/attatchment.png";
import crossIcon from "../../images/cross.png";
import addMoreIcon from "../../images/addMore.png";
import doneIcon from "../../images/done.png";
import userIcon from "../../images/user.png";
import postIcon from "../../images/post.png";
import next from "../../images/next.png";
import back from "../../images/back.png";
import axios from "axios";
import { toast } from "react-hot-toast";
import { queryUserFromUsername } from "../../../api/userRequest";

const PostPopUp = ({ onClose, setProgress, setRefresh, refresh }) => {
    // ------------- @ sign query
    const [signQuery, setSignQuery] = useState([]);
    // --------------------------
    const API = axios.create({ baseURL: "https://app.skillop.in" });
    const [inputValue, setInputValue] = useState("");
    let [selectedFile, setSelectedFile] = useState([]);

    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    let [selectedMedia, setSelectedMedia] = useState([]);

    const handleNextMedia = () => {
        setCurrentMediaIndex((prevIndex) =>
            prevIndex === selectedMedia.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePreviousMedia = () => {
        setCurrentMediaIndex((prevIndex) =>
            prevIndex === 0 ? selectedMedia.length - 1 : prevIndex - 1
        );
    };

    const handleInputChange = async (event) => {
        const newValue = event.target.value;
        const lastword = newValue.split(" ").pop();
        if (lastword.startsWith("@")) {
            try {
                const { data } = await queryUserFromUsername(lastword.slice(1));
                if (data.result) {
                    setSignQuery(data.result);
                }
                console.log(data.result);
            } catch (err) {
                console.log(err);
            }
        }
        setInputValue(newValue);
    };

    const closePopUp = () => {
        onClose();
    };

    const creatingPost = async () => {
        try {
            const formData = new FormData();
            if (inputValue.length === 0) {
                toast.error("Enter something to post");
                return;
            }
            // console.log("hi",selectedFile, selectedMedia);
            // selectedFile = selectedMedia;
            if (selectedFile.length > 0) {
                for (let i = 0; i < selectedFile.length; i++) {
                    formData.append("postImages", selectedFile[i]);
                }
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
            await createPost(formData);
            setProgress(100);
            setRefresh(!refresh);
            onClose();
            toast.success("Post created successfully!");
        } catch (error) {
            console.log("Unable to add post", error);
            toast.error(error.response.data.message);
        }
    };

    const handleUpload = () => {
        document.querySelector(".photo-popup").style.display = "flex";
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const newSelectedFiles = [...selectedFile]; // Maintain an array of selected files
            const newMedia = [...selectedMedia];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                reader.onload = (event) => {
                    const dataUrl = event.target.result;
                    newMedia.push({ dataUrl, type: file.type });
                    newSelectedFiles.push(file); // Add the selected file to the array
                    setSelectedMedia(newMedia);
                    setSelectedFile(newSelectedFiles); // Update the selectedFile state
                };

                reader.readAsDataURL(file);
            }
        }
    };

    function getFileType(mimeType) {
        console.log(selectedMedia[currentMediaIndex].type);
        if (mimeType.startsWith("image/")) {
            return "image";
        } else if (mimeType.startsWith("video/")) {
            return "video";
        } else if (mimeType.startsWith("audio/")) {
            return "audio";
        } else {
            return "unknown";
        }
    }

    const hideImgPopup = () => {
        document.querySelector(".photo-popup").style.display = "none";
    };

    const handlePostThroughEnterKey = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            creatingPost();
        }
    };

    return (
        <div className="postpopup-container">
            <div className="popup-container">
                <div className="photo-popup image-crop-container">
                    <input
                        type="file"
                        accept="image/*, video/*, .doc, .docx, .pdf, .txt, audio/*"
                        name="postImages"
                        multiple
                        // onClick={() => {setPhoto(!photo); setVideo(!video);}}
                        onChange={(e) => {
                            setSelectedFile(e.target.files);
                            handleImageChange(e);
                        }}
                    />
                    <button onClick={hideImgPopup} className="proceed">
                        Proceed
                    </button>
                </div>

                <div className="uploadMedia">
                    <img
                        height={50}
                        width={50}
                        src={userIcon}
                        alt="user"
                        className="img"
                    />
                    <span
                        onClick={() => {
                            handleUpload();
                        }}
                        className="upload"
                    >
                        <img height={20} width={20} src={photoIcon} alt="pic" />
                        <label className="labels">Photo</label>
                    </span>
                    <span
                        onClick={() => {
                            handleUpload();
                        }}
                        className="upload"
                    >
                        <img
                            height={20}
                            width={26}
                            src={videoIcon}
                            alt="video"
                        />
                        <label className="labels">Video</label>
                    </span>
                    <span
                        onClick={() => {
                            handleUpload();
                        }}
                        className="upload"
                    >
                        <img
                            height={20}
                            width={20}
                            src={attatchmentIcon}
                            alt="attatchment"
                        />
                        <label className="labels">Documents</label>
                    </span>
                    <img
                        role="button"
                        onClick={creatingPost}
                        height={50}
                        width={50}
                        src={postIcon}
                        alt="user"
                        className="post"
                    />
                </div>
                {/* <p>Select multiple photos/videos at once you wann'a post.</p> */}

                <div
                    onClick={() => {
                        handleUpload();
                    }}
                    className="mediaPreview image-preview"
                >
                    {selectedMedia.length > 0 && (
                        <div>
                            {getFileType(
                                selectedMedia[currentMediaIndex].type
                            ) === "image" ? (
                                <img
                                    src={
                                        selectedMedia[currentMediaIndex].dataUrl
                                    }
                                    alt="selected-img"
                                    className="cropped-image"
                                />
                            ) : getFileType(
                                  selectedMedia[currentMediaIndex].type
                              ) === "video" ? (
                                <video
                                    muted
                                    loop
                                    autoPlay
                                    className="cropped-image"
                                    src={
                                        selectedMedia[currentMediaIndex].dataUrl
                                    }
                                    alt="selected-video"
                                />
                            ) : getFileType(
                                  selectedMedia[currentMediaIndex].type
                              ) === "unknown" ? (
                                <iframe
                                    src={
                                        selectedMedia[currentMediaIndex].dataUrl
                                    }
                                    title="Document Preview"
                                    width="100%"
                                    height={270}
                                    frameBorder="0"
                                ></iframe>
                            ) : getFileType(
                                  selectedMedia[currentMediaIndex].type
                              ) === "audio" ? (
                                <div
                                    style={{
                                        display: "flex",
                                        height: "270px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <audio controls>
                                        {" "}
                                        <source
                                            src={
                                                selectedMedia[currentMediaIndex]
                                                    .dataUrl
                                            }
                                            title="Document Preview"
                                            width="100%"
                                            height={270}
                                            frameBorder="0"
                                        />
                                    </audio>
                                </div>
                            ) : (
                                <p>Unable to display preview...😵</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="additionalOpt">
                    {selectedMedia.length > 1 && (
                        <span onClick={handlePreviousMedia}>
                            <img height={32} width={32} src={back} alt="back" />
                            <label>Previous</label>
                        </span>
                    )}
                    <span onClick={closePopUp}>
                        <img
                            height={30}
                            width={30}
                            src={crossIcon}
                            alt="Cancel"
                        />
                        <label>Cancel</label>
                    </span>
                    {selectedMedia.length >= 1 && (
                        <span
                            onClick={() => {
                                handleUpload();
                            }}
                        >
                            <img
                                height={22}
                                width={22}
                                src={addMoreIcon}
                                alt="Add more"
                            />
                            <label>Add more</label>
                        </span>
                    )}
                    {selectedMedia.length > 1 && (
                        <span onClick={handleNextMedia}>
                            <img height={32} width={32} src={next} alt="back" />
                            <label>Next</label>
                        </span>
                    )}
                </div>
                <div className="writeSection">
                    <textarea
                        value={inputValue}
                        onKeyDown={handlePostThroughEnterKey}
                        onChange={handleInputChange}
                        type="text"
                        className="writePost"
                        rows={6}
                        placeholder="What are you Thinking...?"
                    />
                </div>
            </div>
            <div id="usernameList"></div>
        </div>
    );
};

export default PostPopUp;
