import React from "react";
import line from "../components/images/Line.png";
import Saly35 from "../components/images/Saly-35.png";
import Saly13 from "../components/images/Saly-13.png";
import right from "../components/images/right.png";

const LandingThree = () => {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-center text-[35px] font-semibold md:text-[30px] md:mt-5">
          Perks of Mentors and Mentees
        </h1>
        <img src={line} className="w-[10%] h-1.5 mb-5" />
        <p className="text-center w-[33%] text-[#848484] md:w-[80%]">
          Discover the Advantages of Mentorship within the Supportive Community
          of SKILLOP: Unlocking Benefits for Mentors and Mentees Alike
        </p>
      </div>
      <div className="flex justify-center items-center gap-[10vh] mt-5 md:flex-col md:gap-[5vh] md:mx-5">
        <div className="shadow-lg rounded-xl border-2 p-6">
          <div className="flex items-center justify-center space-x-2">
            <img src={Saly13} className="h-[30vh] md:h-[20vh]" alt="Saly13" />
            <div>
              <h1 className="text-xl font-bold">Be a</h1>
              <span className="font-semibold text-3xl md:text-2xl">MENTOR</span>
            </div>
          </div>
          <div className="flex items-center justify-start space-x-2 mt-4">
            <img src={right} className="h-6" alt="right" />
            <span>Provides personalized guidance</span>
          </div>
          <div className="flex items-center justify-start space-x-2 mt-4">
            <img src={right} className="h-6" alt="right" />
            <span>Provides personalized guidance</span>
          </div>
          <div className="flex items-center justify-start space-x-2 mt-4">
            <img src={right} className="h-6" alt="right" />
            <span>Provides personalized guidance</span>
          </div>
          <div className="flex items-center justify-start space-x-2 mt-4">
            <img src={right} className="h-6" alt="right" />
            <span>Provides personalized guidance</span>
          </div>
        </div>

        <div className="shadow-lg rounded-xl border-2 p-6">
          <div className="flex items-center justify-center space-x-2">
            <img src={Saly35} className="h-[30vh] md:h-[20vh]" alt="Saly13" />
            <div>
              <h1 className="text-xl font-bold">Be a</h1>
              <span className="font-semibold text-3xl md:text-2xl">MENTOR</span>
            </div>
          </div>
          <div className="flex items-center justify-start space-x-2 mt-4">
            <img src={right} className="h-6" alt="right" />
            <span>Provides personalized guidance</span>
          </div>
          <div className="flex items-center justify-start space-x-2 mt-4">
            <img src={right} className="h-6" alt="right" />
            <span>Provides personalized guidance</span>
          </div>
          <div className="flex items-center justify-start space-x-2 mt-4">
            <img src={right} className="h-6" alt="right" />
            <span>Provides personalized guidance</span>
          </div>
          <div className="flex items-center justify-start space-x-2 mt-4">
            <img src={right} className="h-6" alt="right" />
            <span>Provides personalized guidance</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5">
        <button className="border-black border-2 px-10 py-2 rounded-lg font-semibold md:mt-5 md:px-5">
          Be a Mentor or Mentee
        </button>
      </div>
    </div>
  );
};

export default LandingThree;
