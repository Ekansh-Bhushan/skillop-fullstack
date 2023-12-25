import React, { useState } from "react";
import Nav from "./Nav";
import doodle1 from "../../components/images/doodle-6 1.png";
import doodle2 from "../../components/images/doodle-7 1.png";
import Saly from "../../components/images/Saly-26.png";
import vector from "../../components/images/Vector.png";
import mdi from "../../components/images/mdi_user.png";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const API = axios.create({ baseURL: "https://app.skillop.in" });

const SkillSix = () => {
    const navigate = useNavigate();
    const [profilePhoto, setProfilePhoto] = useState("");
    const [coverPhoto, setCoverPhoto] = useState("");
    const [profilePhotoURL, setProfilePhotoURL] = useState(""); // These two state are getting value aver the image is set in backend
    const [coverPhotoURL, setCoverPhotoURL] = useState(""); // Display them to user

    const handleUpload = async () => {
        const formData1 = new FormData();
        const formData2 = new FormData();
        formData1.append("profilePic", profilePhoto);
        formData2.append("profileBackgroundPic", coverPhoto);

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

        const uploadBGpic = (data) => {
            const token = localStorage.getItem("skilloptoken");
            const config = {
                headers: {
                    Authorization: token,
                },
                withCredentials: true,
            };
            return API.post(`/api/user/add/boackgroundPic`, data, config);
        };
        let done1 = true;
        let done2 = true;
        try {
            if (profilePhoto) {
                done1 = false;
                const profilePhotoResponse = await uploadprofilepic(formData1);
                if (profilePhotoResponse.data.result) {
                    toast.success("Profile picture uploaded successfully");
                    done1 = true;
                    setProfilePhotoURL(
                        profilePhotoResponse.data.result.profilePicUrl
                    );
                } else
                    toast.error(
                        "Unable to upload profile picture now! Try again later"
                    );
            }
            if (coverPhoto) {
                done2 = false;
                const coverPhotoResponse = await uploadBGpic(formData2);
                if (coverPhotoResponse.data.result) {
                    toast.success("Cover picture uploaded successfully");
                    done2 = true;
                    setCoverPhotoURL(coverPhotoResponse.data.result.bgPicUrl);
                } else
                    toast.error(
                        "Unable to upload cover picture now! Try again later"
                    );
            }
            if (done1 && done2) {
                navigate("/skill7");
            }
        } catch (err) {
            toast.error("Unable to upload picture now! Try again later");
        }
    };
    const nextClicked = () => {
        handleUpload();
    };
    return (
        <div>
            {/* <Nav /> */}
            <ProgressBar progress={75} />
            <img
                src={doodle1}
                className="absolute top-[66vh] left-[29vw] z-10"
            />
            <img
                src={doodle2}
                className="absolute right-[19vw] top-[62vh] z-10"
            />
            <img src={Saly} className="absolute right-[16vw] z-10 top-[18vh]" />
            <div className="flex items-start flex-col ml-[35vh] z-50">
                <h1 className="text-[40px] mb-5 mt-[8vh] font-bold">
                    Complete Your Profile
                </h1>
                <div className="flex items-start gap-[10vh] mb-[10vh]">
                    <div className="flex items-start justify-center flex-col text-xl gap-8 mt-3 font-normal">
                        <span>Personal Information</span>
                        <span>Contact Information</span>
                        <span>Skills/Interests</span>
                        <span>Professional Information</span>
                        <span>Cover & Profile Photos</span>
                        <span>Additional Information</span>
                    </div>

                    <div className="flex flex-col justify-center border-[1px] px-10 py-8 w-[40vw] rounded-3xl z-40 bg-white bg-opacity-50 backdrop-blur-[20px]">
                        <input
                            id="coverPhoto"
                            type="file"
                            style={{
                                visibility: "hidden",
                                height: 0,
                                width: 0,
                            }}
                            onChange={(e) => {
                                setCoverPhoto(e.target.files[0]);
                            }}
                        />
                        <div>
                            <span className="text-lg font-normal mb-2">
                                Cover Photo
                            </span>
                            <div
                                className="w-full bg-[#D9D9D96E] h-[30vh] rounded-lg relative flex items-center justify-center"
                                onClick={() =>
                                    document
                                        .getElementById("coverPhoto")
                                        .click()
                                }
                            >
                                <img
                                    src={vector}
                                    className="absolute "
                                    alt=""
                                />
                                <span className="absolute text-lg font-medium ">
                                    UPLOAD
                                </span>
                            </div>
                            <span className="text-[#5F5F5F]">
                                Recommended Size:{" "}
                            </span>
                        </div>
                        <input
                            id="profilePhoto"
                            type="file"
                            style={{
                                visibility: "hidden",
                                height: 0,
                                width: 0,
                            }}
                            onChange={(e) => {
                                setProfilePhoto(e.target.files[0]);
                            }}
                        />
                        <div className="mt-5">
                            <span className="text-lg font-normal mb-4 ">
                                Profile Photo
                            </span>
                            <div
                                className=" bg-[#D9D9D96E] h-[22vh] w-[22vh] rounded-full relative flex items-center justify-center"
                                onClick={() =>
                                    document
                                        .getElementById("profilePhoto")
                                        .click()
                                }
                            >
                                {" "}
                                <img
                                    src={mdi}
                                    className="absolute bottom-[5vh]"
                                    alt=""
                                />
                                <span className="absolute text-lg font-medium ">
                                    UPLOAD
                                </span>
                            </div>
                            <span className="text-[#5F5F5F]">
                                Recommended Size:{" "}
                            </span>
                        </div>

                        <div className="flex justify-between w-full items-center">
                            <button className="rounded-full border-[2px] border-black h-9 w-9 flex items-center justify-center">
                                <FaArrowLeft />
                            </button>
                            <div className="flex rounded-3xl border-[2px] border-black items-center justify-center px-1.5 py-1.5 gap-2">
                                <button
                                    className="font-bold "
                                    onClick={nextClicked}
                                >
                                    NEXT
                                </button>
                                <span className="rounded-full border-[2px] border-black py-1 px-1">
                                    <FaArrowRight />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillSix;
