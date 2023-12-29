// import React, { useState, useEffect } from "react";
import line from "../components/images/Line.png";
import Saly35 from "../components/images/Saly-35.png";
import Saly13 from "../components/images/Saly-13.png";
import right from "../components/images/right.png";
import { useEffect, useState } from "react";

const LandingThree = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    // Set initial state and listen for window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
            <span>Start your own community</span>
          </div>
          <div className="flex items-center justify-start space-x-2 mt-4">
            <img src={right} className="h-6" alt="right" />
            <span>Host sessions and events</span>
          </div>
          <div className="flex items-center justify-start space-x-2 mt-4">
            <img src={right} className="h-6" alt="right" />
            <span>Earn money by guiding multiple mentees</span>
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
            <span>Participate in events and win big</span>
          </div>
          <div className="flex items-center justify-start space-x-2 mt-4">
            <img src={right} className="h-6" alt="right" />
            <span>Chat and make connections with people</span>
          </div>
          <div className="flex items-center justify-start space-x-2 mt-4">
            <img src={right} className="h-6" alt="right" />
            <span>Improve your skills and enhance your CV</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5">
        <button className="border-black border-2 px-10 py-2 rounded-lg font-semibold md:mt-5 md:px-5">
          <a href={isMobile ? '/msignup' : '/signup'}> Be a Mentor or Mentee</a>
        </button>
      </div>
    </div>
  );
};

export default LandingThree;
