// import React from "react";
// import coolimg from "../../components/images/logo.png";

// const MStudentInfo = () => {
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
//         <h1 className="text-lg font-semibold mt-5">Student Information</h1>
//         <div className="flex flex-col items-center justify-center">
//           <div className="flex items-start justify-start flex-col w-full">
//             <span className="text-md font-semibold w-full">You are:</span>
//             <div className="flex mt-3 items-start justify-between w-full">
//               <button className="px-4 py-2 rounded-lg border border-gray-500 w-full mx-2">
//                 Student
//               </button>
//               <button className="px-4 py-2 rounded-lg border border-gray-500 w-full">
//                 Professional
//               </button>
//             </div>
//           </div>
//           <div class="relative my-6">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               College/ Institution{" "}
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div>
//           <div class="relative">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               Degree
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div>
//           <div class="relative mt-6">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               Field Of Study/ Branch
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div>
//           <div className="flex gap-5">
//             <div class="relative mt-6">
//               <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//                 Start-Year
//               </label>
//               <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[38vw]" />
//             </div>
//             <div class="relative mt-6">
//               <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//                 End-Year
//               </label>
//               <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[38vw]" />
//             </div>
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

// export default MStudentInfo;

import React, { useState } from "react";
import coolimg from "../../components/images/logo.png";
import { updateProfile } from "../../api/userRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MProgressBar from "./MProgressBar";

const MStudentInfo = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        country: "",
        state: "",
        city: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const nextClicked = async () => {
        try {
            let formdata = new FormData();
            formdata.append("education", JSON.stringify(data));

            const data1 = await updateProfile(formdata);

            if (data1.data.result) {
                toast.success("College Added!");
                navigate("/mcover");
            } else {
                toast.error(data1.data.message);
            }
        } catch (err) {
            console.log("Unable to update profile at the moment! ", err);
            toast.error("Unable to update profile at the moment! ");
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center gap-3 mt-10">
                <img src={coolimg} className="h-[40px]" alt="Logo" />
                <h1 className="font-bold text-xl">SKILLOP</h1>
            </div>
            <div className="flex items-start flex-col mt-[7vh] mx-[5vh] ">
                <h1 className="text-start text-2xl font-semibold mb-2">
                    Complete your
                </h1>
                <span className="text-4xl font-bold">Profile</span>
                <MProgressBar progress={40} />
                <h1 className="text-lg font-semibold mt-7">
                    Student Information
                </h1>
                <div className="flex flex-col items-center justify-center">
                    {/* <div className="flex items-start justify-start flex-col w-full">
            <span className="text-md font-semibold w-full">You are:</span>
            <div className="flex mt-3 items-start justify-between w-full">
              <button className="px-4 py-2 rounded-lg border border-gray-500 w-full mx-2">
                Student
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-500 w-full">
                Professional
              </button>
            </div>
          </div> */}
                    <div className="relative my-6">
                        <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
                            College/ Institution
                        </label>
                        <input
                            className="border-[1px] border-gray-500 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]"
                            name="institution"
                            type="text"
                            // placeholder="College/ Institution"
                            onChange={onChange}
                        />
                    </div>
                    <div className="relative">
                        <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
                            Degree
                        </label>
                        <input
                            className="border-[1px] border-gray-500 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]"
                            name="degree"
                            type="text"
                            // placeholder="Degree"
                            onChange={onChange}
                        />
                    </div>
                    <div className="relative mt-6">
                        <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
                            Field Of Study/ Branch
                        </label>
                        <input
                            className="border-[1px] border-gray-500 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]"
                            name="fieldOfStudy"
                            type="text"
                            // placeholder="Field Of Study/ Branch"
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex gap-5">
                        <div className="relative mt-6">
                            <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
                                Start-Year
                            </label>
                            <input
                                className="border-[1px] border-gray-500 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[38vw]"
                                name="startDate"
                                type="text"
                                // placeholder="Start-Year"
                                onChange={onChange}
                            />
                        </div>
                        <div className="relative mt-6">
                            <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
                                End-Year
                            </label>
                            <input
                                className="border-[1px] border-gray-500 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[38vw]"
                                name="endDate"
                                type="text"
                                // placeholder="End-Year"
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-[100%] mt-10">
                        <button
                            className="border-[1px] border-black py-2 px-3 rounded-2xl"
                            onClick={() => navigate("/mskill")}
                        >
                            Prev
                        </button>
                        <button
                            className="border-[1px] border-black py-2 px-3 rounded-2xl"
                            onClick={nextClicked}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MStudentInfo;
