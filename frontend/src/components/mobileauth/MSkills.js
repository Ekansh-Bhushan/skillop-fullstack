// import React from "react";
// import coolimg from "../../components/images/logo.png";

// const MSkills = () => {
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
//         <h1 className="text-lg font-semibold mt-5">Skills/ Interests</h1>
//         <div className="flex flex-col items-center justify-center">
//           <div className="flex flex-wrap justify-start gap-2 w-full mt-5 text-xs items-start">
//             <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer ">
//               <span>Web Development</span>
//             </div>
//             <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
//               <span>UI/UX</span>
//             </div>
//             <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
//               <span>Data Structures & Algorithm</span>
//             </div>
//             <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
//               <span>Technology</span>
//             </div>

//             {/* Add more items as needed */}

//             <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
//               <span>Web Development</span>
//             </div>
//             <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
//               <span>UI/UX</span>
//             </div>
//             <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
//               <span>Data Structures & Algorithm</span>
//             </div>
//             <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
//               <span>Technology</span>
//             </div>

//             {/* Add more sets of four items */}
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

// export default MSkills;

import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { updateIsMentor } from "../../api/userRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import coolimg from "../../components/images/logo.png";

const MSkills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([
    "Web Development",
    "UI/UX",
    "Data Structures & Algorithm",
    "Technology",
    // Add initial skills here
  ]);
  const [newSkill, setNewSkill] = useState("");

  const handleSkillAdd = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const nextClicked = async () => {
    try {
      const request = {
        skills: skills,
      };
      const { data } = await updateIsMentor(request);

      if (data.result) {
        toast.success(data.message);
        navigate("/mstudinfo");
      }
    } catch (error) {
      toast.error("Failed to update skills. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-xl p-8">
      <div className="flex items-center justify-center gap-3 mt-10">
        <img src={coolimg} className="h-[40px]" />
        <h1 className="font-bold text-xl">SKILLOP</h1>
      </div>
      <div className="flex items-start flex-col mt-[12vh] mx-[2vh]">
        <h1 className="text-start text-2xl font-semibold mb-2 ">
          Complete your
        </h1>
        <span className="text-4xl font-bold">Profile</span>
        <h1 className="text-xl font-bold my-4">Skills/Interests</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer"
            >
              <span>{skill}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill/interest"
              className="border rounded-md px-2 py-1"
            />
            <button
              onClick={handleSkillAdd}
              className="p-2 rounded-full border-black border hover:bg-gray-100 cursor-pointer"
            >
              <IoMdAdd className="text-lg" />
            </button>
          </div>
        </div>

        <div className="flex justify-end items-center w-full">
          <button
            className="flex items-center gap-1 px-3 py-1 rounded-2xl border border-black hover:bg-gray-100 cursor-pointer"
            onClick={nextClicked}
          >
            <span>Next</span>
            {/* <FaArrowRight /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MSkills;
