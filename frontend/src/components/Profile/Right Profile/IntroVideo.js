import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import "./IntroVideo.css";
import spinner from "../../images/spinner.gif";

const API = axios.create({ baseURL: "https://app.skillop.in" });

export const IntroVideoUploadApi = (data) => {
    // get token  from local storage
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.post(`/api/user/introVideo/upload`, data, config);
};

export const IntroVideoDelApi = () => {
    // get token  from local storage
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.delete(`/api/user/introVideo/delete`, config);
};

const IntroVideo = ({ introVideoUrl, onClose, publicView }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isEditClick, setIsEditClick] = useState(false);
    const [VideoUrl, setVideoUrl] = useState(null);

    const formData = new FormData();
    formData.append("introVideo", selectedVideo);

    const uploadIntroVideo = async () => {
        setIsUploading(true);
        try {
            await IntroVideoUploadApi(formData);
            toast.success("Intro video uploaded!");
        } catch (err) {
            console.log(err);
            // toast.error(err.data.response.data.message);
        }
        setIsUploading(false);
        window.location.reload();
    };

    const delIntroVideo = async () => {
        try {
            await IntroVideoDelApi();
            toast.success("Intro video deleted!");
        } catch (err) {
            console.log(err);
            toast.error(err.data.response.data.message);
        }
        window.location.reload();
    };

    const handleSelectVideo = (e) => {
        setSelectedVideo(e.target.files[0]);
        setVideoUrl(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="intro-video-bg">
            <div className="intro-video-container">
                <div className="iv-header">
                    <h2>My story</h2>
                    <img
                        style={{ cursor: "pointer" }}
                        src="/close.png"
                        width={24}
                        onClick={onClose}
                        alt=""
                    />
                </div>
                <div>
                    {introVideoUrl ? (
                        <iframe
                            className="iv-player"
                            src={introVideoUrl}
                            frameborder="0"
                        ></iframe>
                    ) : (
                        <div className="iv-preview">
                            {" "}
                            <h4 style={{ marginBottom: "0.7vw" }}>
                                Add your my story video
                            </h4>{" "}
                            {selectedVideo && (
                                <video loop autoPlay src={VideoUrl} />
                            )}
                        </div>
                    )}
                    {isUploading && (
                        <div style={{ textAlign: "center" }}>
                            <img src={spinner} width={60} alt="spinner-iv" />
                        </div>
                    )}
                    {isEditClick && (
                        <input
                            className="iv-input"
                            accept="video/*"
                            onChange={(e) => handleSelectVideo(e)}
                            type="file"
                            name="intro-video"
                            id="intro-video-input"
                        />
                    )}
                    {!publicView &&
                        (introVideoUrl ? (
                            <div className="iv-btns">
                                <button
                                    className="up-btn-video"
                                    onClick={
                                        isEditClick
                                            ? uploadIntroVideo
                                            : () => {
                                                setIsEditClick(true);
                                            }
                                    }
                                >
                                    {isEditClick ? "Upload" : "Edit"}
                                </button>
                                <img
                                    src="/delete.png"
                                    onClick={delIntroVideo}
                                    width={40}
                                    alt="del-video"
                                />
                            </div>
                        ) : (
                            <div className="iv-btns">
                                <button
                                    className="up-btn-video"
                                    onClick={
                                        isEditClick
                                            ? uploadIntroVideo
                                            : () => {
                                                setIsEditClick(true);
                                            }
                                    }
                                >
                                    {isEditClick ? "Upload" : "Add"}
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default IntroVideo;
