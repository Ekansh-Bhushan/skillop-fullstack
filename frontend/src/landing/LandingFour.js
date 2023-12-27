import React, { useState } from "react";
import plus from "../components/images/plus (2).png";
import Saly from "../components/images/Saly-1.png";
import line from "../components/images/Line.png";

const LandingFour = () => {
  const [dropdowns, setDropdowns] = useState({
    isMentorPaid: false,
    isPlatformsIntegrated: false,
    isReceiveEarnings: false,
    isConvertToMentor: false,
    isHostEvents: false,
    isBuildCommunity: false,
  });

  const handleToggleDropdown = (dropdownName) => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [dropdownName]: !prevDropdowns[dropdownName],
    }));
  };
  return (
    <div className="flex justify-evenly items-start mt-[15vh] md:flex-col md:items-center md:mt-[8vh] mb-5">
      <div className="flex justify-center flex-col items-center ">
        <div>
          {" "}
          <h1 className="text-5xl font-semibold mb-3 md:text-4xl ">
            Frequently Asked{" "}
          </h1>
          <div className="text-5xl font-semibold md:text-4xl md:text-center md:mb-3">
            Questions
            <img src={line} className="my-3 md:hidden" />
          </div>
        </div>
        <p className="text-xl text-[#848484] w-[82%] md:hidden">
          Still got questions? You might find the answer here
        </p>
        <img src={Saly} className="h-[55vh] md:hidden" />
      </div>
      <div className="flex flex-col justify-start items-start gap-5 md:mx-4 md:mb-10">
        <div className="relative w-[100%]">
          <div className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh]">
            <p>Is becoming Mentor paid or free?</p>
            <img
              src={plus}
              onClick={() => handleToggleDropdown("isMentorPaid")}
              className="cursor-pointer"
              alt="Plus"
            />
          </div>
          {dropdowns.isMentorPaid && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              Context for "Is becoming Mentor paid or free?"
            </div>
          )}
        </div>
        <div className="relative w-[100%]">
          <div className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh]">
            <p>What all are the integrated platforms inside SKILLOP?</p>
            <img
              src={plus}
              onClick={() => handleToggleDropdown("isPlatformsIntegrated")}
              className="cursor-pointer"
              alt="Plus"
            />
          </div>
          {dropdowns.isPlatformsIntegrated && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              Context for "Is becoming Mentor paid or free?"
            </div>
          )}
        </div>
        <div className="relative w-[100%]">
          <div className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh]">
            <p>How will I receive my earnings?</p>
            <img
              src={plus}
              onClick={() => handleToggleDropdown("isReceiveEarnings")}
              className="cursor-pointer"
              alt="Plus"
            />
          </div>
          {dropdowns.isReceiveEarnings && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              Context for "Is becoming Mentor paid or free?"
            </div>
          )}
        </div>
        <div className="relative w-[100%]">
          <div className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh]">
            <p>How can I convert from Mentee to a mentor?</p>
            <img
              src={plus}
              onClick={() => handleToggleDropdown("isConvertToMentor")}
              className="cursor-pointer"
              alt="Plus"
            />
          </div>
          {dropdowns.isConvertToMentor && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              Context for "Is becoming Mentor paid or free?"
            </div>
          )}
        </div>
        <div className="relative w-[100%]">
          <div className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh]">
            <p>how to host events and hackathons?</p>
            <img
              src={plus}
              onClick={() => handleToggleDropdown("isHostEvents")}
              className="cursor-pointer"
              alt="Plus"
            />
          </div>
          {dropdowns.isHostEvents && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              Context for "Is becoming Mentor paid or free?"
            </div>
          )}
        </div>
        <div className="relative w-[100%]">
          <div className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh]">
            <p>How can I build my own community?</p>
            <img
              src={plus}
              onClick={() => handleToggleDropdown("isBuildCommunity")}
              className="cursor-pointer"
              alt="Plus"
            />
          </div>
          {dropdowns.isBuildCommunity && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              Context for "Is becoming Mentor paid or free?"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingFour;
