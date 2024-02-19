import React from "react";
import coolimg from "../../components/images/logo.png";
// import { FaLinkedin, FaGoogle } from "react-icons/fa";
import MProgressBar from "./MProgressBar";
const MPersonal = () => {
  return (
    <div>
      <div className='flex items-center justify-center gap-3 mt-10'>
        {' '}
        <img src={coolimg} className='h-[40px]' />
        <h1 className='font-bold text-xl'>SKILLOP</h1>
      </div>
      <div className='flex items-start flex-col mt-[12vh] mx-[5vh]'>
        <h1 className='text-start text-2xl font-semibold mb-2'>
          Complete your
        </h1>
        <span className='text-4xl font-bold'>Profile</span>
        <MProgressBar />
        <h1 className='text-lg font-semibold mt-5'>Personal Information</h1>
        <div className='flex flex-col items-center justify-center'>
          <div class='relative my-6'>
            <label class='absolute top-0 left-2 -mt-2 bg-white px-1'>
              Name
            </label>
            <input class='border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]' />
          </div>
          <div class='relative'>
            <label class='absolute top-0 left-2 -mt-2 bg-white px-1'>DOB</label>
            <input class='border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]' />
          </div>
          <label className='mr-auto mt-4 mb-2'>Gender</label>
          <div className='flex items-center justify-center gap-3 text-xs'>
            <div className='border-[1px] border-black rounded-lg px-5 py-1'>
              Male
            </div>
            <div className='border-[1px] border-black rounded-lg px-5 py-1'>
              Female
            </div>
            <div className='border-[1px] border-black rounded-lg px-5 py-1'>
              Rather Not Say
            </div>
          </div>

          <div className='flex items-center justify-between w-[80%] absolute bottom-10 '>
            <button className='border-[1px] border-black py-2 px-3 rounded-2xl hover:bg-gray-200'>
              Previous
            </button>
            <button className='border-[1px] border-black py-2 px-3 rounded-2xl hover:bg-gray-200'>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MPersonal;
