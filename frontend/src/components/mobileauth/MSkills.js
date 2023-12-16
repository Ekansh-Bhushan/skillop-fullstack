import React from "react";
import coolimg from "../../components/images/logo.png";

const MSkills = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-3 mt-10">
        {" "}
        <img src={coolimg} className="h-[40px]" />
        <h1 className="font-bold text-xl">SKILLOP</h1>
      </div>
      <div className="flex items-start flex-col mt-[12vh] mx-[5vh]">
        <h1 className="text-start text-2xl font-semibold mb-2">
          Complete your
        </h1>
        <span className="text-4xl font-bold">Profile</span>
        <h1 className="text-lg font-semibold mt-5">Skills/ Interests</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-wrap justify-start gap-2 w-full mt-5 text-xs items-start">
            <div className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer ">
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

          <div className="flex items-center justify-between w-[80%] absolute bottom-10 ">
            <button className="border-[1px] border-black py-2 px-3 rounded-2xl">
              Prev
            </button>
            <button className="border-[1px] border-black py-2 px-3 rounded-2xl">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MSkills;
