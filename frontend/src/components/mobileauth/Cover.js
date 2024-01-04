// import React from "react";
// import coolimg from "../../components/images/logo.png";
// import vector from "../../components/images/Vector.png";
// import mdi from "../../components/images/mdi_user.png";

// const Cover = () => {
//   return (
//     <div>
//       <div className="flex items-center justify-center gap-3 mt-10">
//         {" "}
//         <img src={coolimg} className="h-[40px]" />
//         <h1 className="font-bold text-xl">SKILLOP</h1>
//       </div>
//       <div className="flex items-start flex-col mt-[12vh] mx-[5vh]">
//         <h1 className="text-start text-2xl font-semibold mb-2">
//           Complete your
//         </h1>
//         <span className="text-4xl font-bold">Profile</span>
//         <h1 className="text-lg font-semibold mt-5">Cover And Profile Photo</h1>
//         <div className="flex flex-col items-start justify-center">
//           <div>
//             <span className="text-lg font-normal mb-2">Cover Photo</span>
//             <div className="w-[80vw] bg-[#D9D9D96E] h-[18vh] rounded-lg relative flex items-center justify-center">
//               <img src={vector} className="absolute " />
//               <span className="absolute text-lg font-medium ">UPLOAD</span>
//             </div>
//             <span className="text-[#5F5F5F]">Recommended Size: </span>
//           </div>
//           <div className="mt-2">
//             <span className="text-lg font-normal mb-4 ">Profile Photo</span>
//             <div className=" bg-[#D9D9D96E] h-[14vh] w-[14vh] rounded-full relative flex items-center justify-center">
//               {" "}
//               <img src={mdi} className="absolute bottom-[3vh] w-[80%]" />
//               <span className="absolute text-lg font-medium ">UPLOAD</span>
//             </div>
//             <span className="text-[#5F5F5F]">Recommended Size: </span>
//           </div>
//           <div className="flex items-center justify-between w-[80%] absolute bottom-10 ">
//             <button className="border-[1px] border-black py-2 px-3 rounded-2xl">
//               Prev
//             </button>
//             <button className="border-[1px] border-black py-2 px-3 rounded-2xl">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cover;

import React, { useState } from "react";
import coolimg from "../../components/images/logo.png";
import vector from "../../components/images/Vector.png";
import mdi from "../../components/images/mdi_user.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import MProgressBar from "./MProgressBar";

const API = axios.create({ baseURL: "https://skillop.in" });

const Cover = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const [coverPhotoURL, setCoverPhotoURL] = useState("");

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

    try {
      if (profilePhoto) {
        const profilePhotoResponse = await uploadprofilepic(formData1);
        if (profilePhotoResponse.data.result) {
          toast.success("Profile picture uploaded successfully");
          setProfilePhotoURL(profilePhotoResponse.data.result.profilePicUrl);
        } else {
          toast.error("Unable to upload profile picture now! Try again later");
        }
      }
      if (coverPhoto) {
        const coverPhotoResponse = await uploadBGpic(formData2);
        if (coverPhotoResponse.data.result) {
          toast.success("Cover picture uploaded successfully");
          setCoverPhotoURL(coverPhotoResponse.data.result.bgPicUrl);
        } else {
          toast.error("Unable to upload cover picture now! Try again later");
        }
      }

      navigate("/msocial");
    } catch (err) {
      toast.error("Unable to upload picture now! Try again later");
    }
  };

  const handleCoverUpload = (event) => {
    const selectedFile = event.target.files[0];
    setCoverPhoto(selectedFile);
  };

  const handleProfileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setProfilePhoto(selectedFile);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mt-10">
        <img src={coolimg} className="h-[40px]" alt="Cool Logo" />
        <h1 className="font-bold text-xl">SKILLOP</h1>
      </div>
      <div className="flex items-start flex-col mt-[12vh] mx-[5vh]">
        <h1 className="text-start text-2xl font-semibold mb-2">
          Complete your
        </h1>
        <span className="text-4xl font-bold">Profile</span>
        <MProgressBar progress={75} />
        <h1 className="text-lg font-semibold mt-7">Cover And Profile Photo</h1>
        <div className="flex flex-col items-start justify-center">
          <div>
            <span className="text-lg font-normal mb-2">Cover Photo</span>
            <div
              className="w-[80vw] bg-[#D9D9D96E] h-[18vh] rounded-lg relative flex items-center justify-center"
              onClick={() => document.getElementById("coverPhoto").click()}
            >
              <img src={vector} className="absolute " alt="Vector" />
              <label
                htmlFor="coverPhoto"
                className="absolute text-lg font-medium cursor-pointer"
              >
                UPLOAD
                <input
                  id="coverPhoto"
                  type="file"
                  style={{
                    visibility: "hidden",
                    height: 0,
                    width: 0,
                  }}
                  onChange={handleCoverUpload}
                />
              </label>
            </div>
            <span className="text-[#5F5F5F]">Recommended Size: </span>
          </div>
          <div className="mt-2">
            <span className="text-lg font-normal mb-4 ">Profile Photo</span>
            <div
              className=" bg-[#D9D9D96E] h-[14vh] w-[14vh] rounded-full relative flex items-center justify-center"
              onClick={() => document.getElementById("profilePhoto").click()}
            >
              <img
                src={mdi}
                className="absolute bottom-[3vh] w-[80%]"
                alt="Profile"
              />
              <label
                htmlFor="profilePhoto"
                className="absolute text-lg font-medium cursor-pointer ml-4"
              >
                UPLOAD
                <input
                  id="profilePhoto"
                  type="file"
                  style={{
                    visibility: "hidden",
                    height: 0,
                    width: 0,
                  }}
                  onChange={handleProfileUpload}
                />
              </label>
            </div>
            <span className="text-[#5F5F5F]">Recommended Size: </span>
          </div>
          <div className="flex items-center justify-between w-[100%] mt-10 ">
            <button
              className="border-[1px] border-black py-2 px-3 rounded-2xl"
              onClick={() => navigate("/mstudinfo")}
            >
              Prev
            </button>
            <button
              className="border-[1px] border-black py-2 px-3 rounded-2xl"
              onClick={handleUpload}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
