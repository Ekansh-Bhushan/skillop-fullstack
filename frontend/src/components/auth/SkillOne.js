import React from "react";
import Nav from "./Nav";
import doodle1 from "../../components/images/doodle-6 1.png";
import doodle2 from "../../components/images/doodle-7 1.png";
import Saly from "../../components/images/Saly-26.png";

const SkillOne = () => {
  return (
    <div>
      <Nav />

      <div className="flex items-start flex-col ml-[35vh] z-50">
        <h1 className="text-[40px] mb-5 mt-[8vh] font-bold">
          Complete Your Profile
        </h1>
        <div className="flex items-center gap-[10vh]">
          <div className="flex items-start justify-center flex-col text-xl gap-8 mt-3 font-normal relative">
            <img
              src={doodle1}
              className="absolute z-10 top-[30vh] left-[12vw]"
            />
            <img
              src={doodle2}
              className="absolute z-10 top-[30vh] left-[50vw]"
            />
            <img src={Saly} className="absolute z-10 top-[-15vh] left-[56vw]" />
            <span>Personal Information</span>
            <span>Contact Information</span>
            <span>Skills/Interests</span>
            <span>Professional Information</span>
            <span>Cover & Profile Photos</span>
            <span>Additional Information</span>
          </div>
          <div className="flex flex-col border-[1px] px-10 py-8 w-[40vw] rounded-3xl z-40 bg-white bg-opacity-50 backdrop-blur-[20px] ">
            <label className="mb-2 text-lg font-bold">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4 "
            />

            <label className="mb-2 text-lg font-bold">Date of Birth</label>
            <input
              type="date"
              placeholder="Date of Birth"
              className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4 "
            />

            <label className="mb-2 text-lg font-bold">Select Gender</label>
            <select
              className="border border-gray-300 rounded-md py-2 px-4 block mb-4"
              defaultValue=""
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <div className="flex justify-end">
              {" "}
              <button className="font-bold py-2 px-4 rounded-3xl border-[2px] border-black">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillOne;
