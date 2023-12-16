import React from "react";
import coolimg from "../../components/images/logo.png";
import vector from "../../components/images/Vector.png";
import mdi from "../../components/images/mdi_user.png";

const Cover = () => {
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
        <h1 className="text-lg font-semibold mt-5">Cover And Profile Photo</h1>
        <div className="flex flex-col items-start justify-center">
          <div>
            <span className="text-lg font-normal mb-2">Cover Photo</span>
            <div className="w-[80vw] bg-[#D9D9D96E] h-[18vh] rounded-lg relative flex items-center justify-center">
              <img src={vector} className="absolute " />
              <span className="absolute text-lg font-medium ">UPLOAD</span>
            </div>
            <span className="text-[#5F5F5F]">Recommended Size: </span>
          </div>
          <div className="mt-2">
            <span className="text-lg font-normal mb-4 ">Profile Photo</span>
            <div className=" bg-[#D9D9D96E] h-[14vh] w-[14vh] rounded-full relative flex items-center justify-center">
              {" "}
              <img src={mdi} className="absolute bottom-[3vh] w-[80%]" />
              <span className="absolute text-lg font-medium ">UPLOAD</span>
            </div>
            <span className="text-[#5F5F5F]">Recommended Size: </span>
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

export default Cover;
