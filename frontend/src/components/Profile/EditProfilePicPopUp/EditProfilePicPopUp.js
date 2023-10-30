import React, { useState } from "react";
import "./EditProfilePicPopUp.css";
import userPic from "../../images/user.png";
import del from "../../images/delete.png";
import edit from "../../images/edit.png";
import axios from "axios";
import Spinner from "../../images/spinner.gif";
import { updateProfile } from "../../../api/userRequest";

const API = axios.create({ baseURL: "http://localhost:4000" });

const EditProfilePicPopUp = ({ profPicUrl, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [Deleting, setDeleting] = useState(false);
    const [showChange, setShowChange] = useState(false);

    const selectimage = (e) => {
        setSelectedImage(e.target.files[0]);
        document.querySelector(".upload-button").innerHTML = "Upload Now";
    };

    const handleUpload = async () => {
        setUploading(true);
        if (selectedImage) {
            document.querySelector(".upload-button").style.backgroundColor =
                "green";
            document.querySelector(".upload-button").style.color = "white";
            console.log("Uploading image:", selectedImage.name, selectedImage);
            const formData = new FormData();
            formData.append("profilePic", selectedImage);
            console.log(formData);
            const uploadprofilepic = (data) => {
                const token = localStorage.getItem("skilloptoken");
                const config = {
                    headers: {
                        Authorization: token,
                    },
                    withCredentials: true,
                };
                return API.put(`/api/user/update/profile`, data, config);
            };
            await uploadprofilepic(formData);
            setUploading(false);
            document.querySelector(".upload-button").textContent =
                "Upload Successfully";
            window.location.reload();
        }
    };

    const delProfPic = async () => {
        try {
            setDeleting(true);
            await updateProfile({
                profilePicUrl:
                    "https://cdn-icons-png.flaticon.com/512/64/64572.png",
            });
            setDeleting(false);
            console.log("del success");
            window.location.reload();
        } catch (err) {
            console.log("Unable to del profile pic");
        }
    };

    return (
        <div className="bg-blur">
            <div className="edit-container">
                <div className="headerPic">
                    <div></div>
                    <h2>Edit your profile picture</h2>
                    <span
                        className="cross1"
                        style={{ fontSize: "2.2rem" }}
                        onClick={onClose}
                    >
                        X
                    </span>
                </div>
                <img
                    className="pp"
                    height={320}
                    width={320}
                    src={profPicUrl ? profPicUrl : userPic}
                    alt="userpic"
                />
                <div style={{ textAlign: "center", margin: "30px" }}>
                    {(uploading || Deleting) && (
                        <img
                            height={75}
                            width={75}
                            src={Spinner}
                            alt="Loading..."
                        />
                    )}
                </div>
                {showChange && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            gap: "20px",
                            marginTop: "20px",
                        }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            name="profilePic"
                            className="file-input"
                            onChange={(e) => {
                                selectimage(e);
                            }}
                        />
                        <button
                            className="upload-button"
                            onClick={handleUpload}
                        >
                            Upload Picture
                        </button>
                    </div>
                )}
                <div className="options">
                    <span
                        onClick={() => {
                            setShowChange(!showChange);
                        }}
                        className="change-pic"
                    >
                        <img height={40} width={40} src={edit} alt="" />
                        <p>Change</p>
                    </span>
                    <span onClick={delProfPic} className="delete-pic">
                        <img height={30} width={30} src={del} alt="del" />
                        <p>Delete</p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePicPopUp;
