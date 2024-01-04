import React, { useState } from "react";
import Header1 from "../Header";
import index from "./index.css";
import user from "../images/user.png";
import coverBg from "../images/b.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pageloader from "../Pagesbar";
import Spinner from "../images/spinner.gif";
import { getUser } from "../../api/userRequest";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
const API = axios.create({ baseURL: "https://skillop.in" });

function Uploadpic({ userData, setProgress }) {
    const [uploading, setUploading] = useState(false);

    const handleBack = () => {
        setProgress(35);
        setTimeout(() => {
            setProgress(100);
        }, 300);
        navigate("/collegedetails");
    };

    const [dpURL, setdpURL] = useState("");
    const [dpBGURL, setdpBGURL] = useState("");

    const fetchUser = async () => {
        try {
            const usrData = await getUser();
            setdpURL(usrData.data.result.profilePicUrl);
            setdpBGURL(usrData.data.result.bgPicUrl);
        } catch (err) {
            console.log("Unable to fetch user", err);
        }
    };

    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBGImage, setSelectedBGImage] = useState(null);
    const selectimage = (e) => {
        setSelectedImage(e.target.files[0]);
        document.querySelector(".upload-button").innerHTML = "Upload Now";
    };
    const selectBGimage = (e) => {
        setSelectedBGImage(e.target.files[0]);
        document.querySelector(".upload-button").innerHTML = "Upload Now";
    };
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);
    };
    // const handleImageChange2 = (event) => {
    //   const imageFile = event.target.files[0];
    //   setSelectedcImage(imageFile);
    // };
    const navigatewithout = () => {
        setProgress(40);
        setTimeout(() => {
            setProgress(100);
        }, 300);
        navigate("/laststep");
    };
    const handleUpload = async () => {
        if (selectedImage) {
            setUploading(true);
            document.querySelector(".upload-button").style.backgroundColor =
                "green";
            document.querySelector(".upload-button").style.color = "white";
            // Here you can implement the code to upload the image to your server or cloud storage
            // For example, you can use the Fetch API or a library like axios.
            // Don't forget to handle errors and success states accordingly.
            console.log("Uploading image:", selectedImage.name);
            const formData1 = new FormData();
            const formData2 = new FormData();
            formData1.append("profilePic", selectedImage);
            formData2.append("profileBackgroundPic", selectedBGImage);

            // console.log(selectedImage);
            // console.log(formData);

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
            try {
                await uploadprofilepic(formData1);
                if (selectedBGImage) await uploadBGpic(formData2);
                setUploading(false);
            } catch (err) {
                toast.error("Error uploading cover picture");
            }
            document.querySelector(".upload-button").textContent =
                "Upload Successfully";
            window.location.reload();
            // console.log(data);
        } else {
            toast.error("Choose a profile picture");
        }
    };
    const redirecttolast = () => {
        setProgress(40);
        navigate("/laststep");
        setProgress(100);
    };
    // const handleUpload2 = () => {
    //   if (selectedcImage) {
    //     // Here you can implement the code to upload the image to your server or cloud storage
    //     // For example, you can use the Fetch API or a library like axios.
    //     // Don't forget to handle errors and success states accordingly.
    //     console.log('Uploading image:', selectedcImage.name);
    //   }
    // };
    const showupload = () => {
        document.querySelector(".pop-img-u").style.display = "flex";
    };
    const hideupload = () => {
        document.querySelector(".pop-img-u").style.display = "none";
    };

    useEffect(() => {
        fetchUser();
    }, [dpURL, dpBGURL]);

    return (
        <>
            <Header1 />
            <Pageloader
                givecolor1={false}
                givecolor2={false}
                givecolor3={false}
                givecolor4={false}
                givecolor5={true}
                givecolor6={true}
                isactive5={true}
            />
            <div
                className="pop-img-u"
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    position: "absolute",
                    zIndex: "4",
                    backdropFilter: "blur(5px)",
                    display: "none",
                }}
            >
                <div className="img-uploadpopup">
                    <div
                        onClick={hideupload}
                        className="fa fa-close"
                        style={{
                            fontSize: "25px",
                            position: "absolute",
                            top: "0",
                            right: "0",
                            cursor: "pointer",
                        }}
                    ></div>
                    {/* <h3>Cover Photo</h3> */}
                    {/* <input
        type="file"
        accept="image/*"
       
        className="file-input"
        onChange={handleImageChange2}
      />
      <button className="upload-button" onClick={handleUpload2}>
        Upload Image
      </button> */}
                    <h3>Profile Photo</h3>
                    <div style={{ height: "20px" }}></div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "20px",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <span>
                            Profile Picture :{" "}
                            <input
                                type="file"
                                accept="image/*"
                                name="profilePic"
                                className="file-input"
                                onChange={(e) => {
                                    selectimage(e);
                                }}
                            />
                        </span>
                        <span>
                            Cover Picture :{" "}
                            <input
                                type="file"
                                accept="image/*"
                                name="profilePicBG"
                                className="file-input"
                                onChange={(e) => {
                                    selectBGimage(e);
                                }}
                            />
                        </span>
                        <button
                            className="upload-button"
                            onClick={handleUpload}
                        >
                            Upload Image
                        </button>
                    </div>
                    <div style={{ textAlign: "center", margin: "30px" }}>
                        {uploading && (
                            <img
                                height={75}
                                width={75}
                                src={Spinner}
                                alt="Loading..."
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="header-8">Add your Cover and Profile picture</div>
            <div className="upload-img">
                <div
                    style={{
                        backgroundImage: dpBGURL
                            ? `url(${dpBGURL})`
                            : `url(${coverBg})`,
                        backgroundPosition: "center",
                    }}
                    className="cover"
                />

                <div className="main-photo">
                    <img
                        src={dpURL ?? user}
                        style={{ display: "block" }}
                        alt="user"
                    />
                    <button className="uploadbtn" onClick={showupload}>
                        Upload
                    </button>
                </div>
            </div>
            <div className="btnCont">
                <button onClick={handleBack} className="back">
                    Back
                </button>
                <button
                    className="next2"
                    type="button"
                    form="myform2"
                    onClick={redirecttolast}
                >
                    Next
                </button>
            </div>
            <div className="skip">
                <div onClick={navigatewithout}>Skip For Now</div>
            </div>
        </>
    );
}

export default Uploadpic;
