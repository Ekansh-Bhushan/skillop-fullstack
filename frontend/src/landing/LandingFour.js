import React, { useState } from "react";
import plus from "../components/images/plus (2).png";
import Saly from "../components/images/Saly-1.png";
import line from "../components/images/Line.png";
import "./Landing.css"

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
    <div className="flex justify-evenly items-start mt-[15vh] md:flex-col md:items-center md:mt-[8vh] mb-5 lg:flex-col lg:items-start lg:items-center lg:justify-center lg:h-scree">
      <div className="flex justify-center flex-col items-center  ">
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
        <img src={Saly} className="h-[55vh] md:hidden bounce lg:hidden" />
      </div>
      <div className="flex flex-col justify-start items-start w-[40%] md:w-[90%] gap-5 md:mx-4 md:mb-10 lg:w-[80%]">
        <div className="relative w-[100%] lg:w-[90%] lg:h-[80%] ">
          <div
            className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh] hover:transform hover:scale-105 transition duration-300  "
            onClick={() => handleToggleDropdown("isMentorPaid")}
          >
            <p >Is becoming Mentor paid or free?</p>
            <img src={plus} className="cursor-pointer" alt="Plus" />
          </div>
          {dropdowns.isMentorPaid && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4 ">
              Becoming a mentor on Skillop is free. Mentors may volunteer their
              time for free mentorship or charge for their services in
              specialized areas. We encourage mentors to create a structure that
              aligns with their goals and Skillop’s values.
            </div>
          )}
        </div>
        <div className="relative w-[100%] lg:w-[90%] lg:h-[80%]">
          <div
            className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh] hover:transform hover:scale-105 transition duration-300"
            onClick={() => handleToggleDropdown("isPlatformsIntegrated")}
          >
            <p>What all are the integrated platforms inside SKILLOP?</p>
            <img src={plus} className="cursor-pointer" alt="Plus" />
          </div>
          {dropdowns.isPlatformsIntegrated && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              Skillop integrates a variety of platforms to provide a
               comprehensive learning and networking experience, including Synergy
               for resume making, InstiD for job search enhancement, and ConnectOp 
               for building your network outside india. We continuously work on integrating 
               more tools and services to support our community’s growth.
            </div>
          )}
        </div>
        <div className="relative w-[100%] lg:w-[90%] lg:h-[80%]">
          <div
            className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh] hover:transform hover:scale-105 transition duration-300"
            onClick={() => handleToggleDropdown("isReceiveEarnings")}
          >
            <p>How will I receive my earnings?</p>
            <img src={plus} className="cursor-pointer" alt="Plus" />
          </div>
          {dropdowns.isReceiveEarnings && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              Earnings from mentorship sessions and any paid services on
               Skillop are disbursed through secure online transactions. You can
                receive your earnings via UPI shown your Skillop account settings. 
                Payout schedules can be customized in your account preferences.
            </div>
          )}
        </div>
        <div className="relative w-[100%] lg:w-[90%] lg:h-[80%]">
          <div
            className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh] hover:transform hover:scale-105 transition duration-300"
            onClick={() => handleToggleDropdown("isConvertToMentor")}
          >
            <p>How can I convert from Mentee to a mentor?</p>
            <img src={plus} className="cursor-pointer" alt="Plus" />
          </div>
          {dropdowns.isConvertToMentor && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              Transitioning from a mentee to a mentor on Skillop is 
              a seamless process. Once you feel ready to share your knowledge 
              and expertise with others, you can update your profile to 
              reflect your new role and apply to be a mentor option available in settings.
            </div>
          )}
        </div>
        <div className="relative w-[100%] lg:w-[90%] lg:h-[80%]">
          <div
            className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh] hover:transform hover:scale-105 transition duration-300"
            onClick={() => handleToggleDropdown("isHostEvents")}
          >
            <p>how to host events and hackathons?</p>
            <img src={plus} className="cursor-pointer" alt="Plus" />
          </div>
          {dropdowns.isHostEvents && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4 mx-auto">
              Skillop provides the tools and support you need to host events and 
              hackathons. To get started, submit an event proposal through your dashboard. 
              Our team will review it and assist you with planning, promotion, 
              and execution to ensure a successful event. [This feature is yet to be released].
            </div>
          )}
        </div>
        <div className="relative w-[100%] lg:w-[90%] lg:h-[80%]">
          <div
            className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh] hover:transform hover:scale-105 transition duration-300"
            onClick={() => handleToggleDropdown("isBuildCommunity")}
          >
            <p>How can I build my own community?</p>
            <img src={plus} className="cursor-pointer" alt="Plus" />
          </div>
          {dropdowns.isBuildCommunity && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              Building your own community on Skillop is straightforward. You can connect 
              with more people based on interests, fields of study, or professional paths. 
              We offer features to help you manage and 
              grow your community, event hosting, and content sharing capabilities. 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingFour;
