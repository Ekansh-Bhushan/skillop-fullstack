import React from "react";
import Nav from "./Nav";
import doodle1 from "../../components/images/doodle-6 1.png";
import doodle2 from "../../components/images/doodle-7 1.png";
import Saly from "../../components/images/Saly-26.png";

const SkillFour = () => {
  return (
    <div>
      <Nav />
      <img src={doodle1} className="absolute top-[80vh] left-[29vw] z-10" />
      <img src={doodle2} className="absolute right-[19vw] top-[80vh] z-10" />
      <img src={Saly} className="absolute right-[14vw] z-10 top-[18vh]" />
      <div className="flex items-start flex-col ml-[35vh] z-50">
        <h1 className="text-[40px] mb-5 mt-[8vh] font-bold">
          Complete Your Profile
        </h1>
        <div className="flex items-center gap-[10vh]">
          <div className="flex items-start justify-center flex-col text-xl gap-8 mt-3 font-normal">
            <span>Personal Information</span>
            <span>Contact Information</span>
            <span>Skills/Interests</span>
            <span>Professional Information</span>
            <span>Cover & Profile Photos</span>
            <span>Additional Information</span>
          </div>
          <div className="flex flex-col border-[1px] px-10 py-8 w-[40vw] rounded-3xl z-40 bg-white bg-opacity-50 backdrop-blur-[20px]">
            <label className="mb-2 text-lg font-bold">College</label>
            <input
              type="text"
              placeholder="College"
              className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
            />
            <label className="mb-2 text-lg font-bold">Degree</label>
            <input
              type="text"
              placeholder="Degree"
              className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
            />
            <label className="mb-2 text-lg font-bold">
              Field Of Study/Branch
            </label>
            <input
              type="text"
              placeholder="Field Of Study"
              className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
            />

            <div className="flex justify-between w-[118%]">
              <div className="flex-1">
                <label className="mb-2 text-lg font-bold">Start Year</label>
                <input
                  type="text"
                  placeholder="Start Year"
                  className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                />
              </div>
              <div className="flex-1">
                <label className="mb-2 text-lg font-bold">End Year</label>
                <input
                  type="text"
                  placeholder="End Year"
                  className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                />
              </div>
            </div>

            <div className="flex justify-end">
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

export default SkillFour;
