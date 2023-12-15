import React from "react";
import Nav from "./Nav";
import doodle1 from "../../components/images/doodle-6 1.png";
import doodle2 from "../../components/images/doodle-7 1.png";
import Saly from "../../components/images/Saly-26.png";

const SkillThree = () => {
  return (
    <div>
      <Nav />
      <img src={doodle1} className="absolute top-[66vh] left-[29vw] z-10" />
      <img src={doodle2} className="absolute right-[19vw] top-[62vh] z-10" />
      <img src={Saly} className="absolute right-[16vw] z-10 top-[18vh]" />
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

          <div className="flex flex-wrap justify-center gap-4 border-[1px] px-10 py-8 w-[40vw] rounded-3xl z-40 bg-white bg-opacity-50 backdrop-blur-[20px]">
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
                <span>Web Development</span>
              </div>
              <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
                <span>UI/UX</span>
              </div>
              <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
                <span>Data Structures & Algorithm</span>
              </div>
              <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
                <span>Technology</span>
              </div>

              {/* Add more items as needed */}

              <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
                <span>Web Development</span>
              </div>
              <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
                <span>UI/UX</span>
              </div>
              <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
                <span>Data Structures & Algorithm</span>
              </div>
              <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
                <span>Technology</span>
              </div>

              {/* Add more sets of four items */}
            </div>
            <div className="flex justify-end w-full">
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

export default SkillThree;