import React, { useState } from "react";
import plus from "../components/images/plus (2).png";
import Saly from "../components/images/Saly-1.png";
import line from "../components/images/Line.png";
import "./Landing.css";

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
            Questions for event
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
            <p>What is the Cryptic Hunt on Machine Learning?</p>
            <img src={plus} className="cursor-pointer" alt="Plus" />
          </div>
          {dropdowns.isMentorPaid && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4 ">
              The Cryptic Hunt on Machine Learning is an event that merges
              Machine Learning and cryptography. Participants solve cryptic
              puzzles and challenges related to these fields. The event is
              designed to enhance problem-solving skills and provide hands-on
              experience with Machine Learning concepts.
            </div>
          )}
        </div>
        <div className="relative w-[100%] lg:w-[90%] lg:h-[80%]">
          <div
            className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh] hover:transform hover:scale-105 transition duration-300"
            onClick={() => handleToggleDropdown("isPlatformsIntegrated")}
          >
            <p>Who can participate in this event?</p>
            <img src={plus} className="cursor-pointer" alt="Plus" />
          </div>
          {dropdowns.isPlatformsIntegrated && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              The event is open to all students, enthusiasts, and professionals
              with an interest in Machine Learning and cryptography. Whether you
              are a beginner or an experienced individual in these fields, you
              are welcome to participate.
            </div>
          )}
        </div>
        <div className="relative w-[100%] lg:w-[90%] lg:h-[80%]">
          <div
            className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh] hover:transform hover:scale-105 transition duration-300"
            onClick={() => handleToggleDropdown("isReceiveEarnings")}
          >
            <p>What are the stages of the event?</p>
            <img src={plus} className="cursor-pointer" alt="Plus" />
          </div>
          {dropdowns.isReceiveEarnings && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              The event consists of two main stages:
              <br />
              - Phase 1: Online Round (1st September 2024) – Participants tackle
              basic ciphers and fundamental Machine Learning concepts online.
              <br />- Phase 2: Cryptic Puzzle Solving (12th September 2024) – An
              offline round at DTU, Delhi, where teams solve advanced cryptic
              puzzles related to Machine Learning.
            </div>
          )}
        </div>
        <div className="relative w-[100%] lg:w-[90%] lg:h-[80%]">
          <div
            className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh] hover:transform hover:scale-105 transition duration-300"
            onClick={() => handleToggleDropdown("isConvertToMentor")}
          >
            <p>How do I register for the event?</p>
            <img src={plus} className="cursor-pointer" alt="Plus" />
          </div>
          {dropdowns.isConvertToMentor && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              Participants can register through the official event platform on
              Unstop. Teams should consist of 2-4 participants{" "}
              <a
                href="https://unstop.com/o/NEdkl0Z?lb=UiJQIGC9"
                className="text-blue-500 underline hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://unstop.com/o/NEdkl0Z?lb=UiJQIGC9
              </a>
            </div>
          )}
        </div>
        <div className="relative w-[100%] lg:w-[90%] lg:h-[80%]">
          <div
            className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh] hover:transform hover:scale-105 transition duration-300"
            onClick={() => handleToggleDropdown("isHostEvents")}
          >
            <p>Are there any pre-event resources or workshops?</p>
            <img src={plus} className="cursor-pointer" alt="Plus" />
          </div>
          {dropdowns.isHostEvents && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4 mx-auto">
              Yes, recommended reading materials and resources will be provided
              to registered participants. Additionally, optional workshops on
              basic Machine Learning concepts and cryptic puzzles may be
              conducted prior to the event. Join the group <></>
              <a
                href="https://chat.whatsapp.com/GHLazSvAt83D6J7Gwbqb2A"
                className="text-blue-500 underline hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                 https://chat.whatsapp.com/GHLazSvAt83D6J7Gwbqb2A
              </a>
            </div>
          )}
        </div>
        <div className="relative w-[100%] lg:w-[90%] lg:h-[80%]">
          <div
            className="w-[100%] flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh] md:gap-[10vh] hover:transform hover:scale-105 transition duration-300"
            onClick={() => handleToggleDropdown("isBuildCommunity")}
          >
            <p>What are the judging criteria for the offline round?</p>
            <img src={plus} className="cursor-pointer" alt="Plus" />
          </div>
          {dropdowns.isBuildCommunity && (
            <div className="mt-4 w-[100%] bg-white shadow-md rounded-xl border-[1px] p-4">
              Teams will be judged based on creativity, accuracy, and efficiency
              in solving the cryptic puzzles. Bonus points will be awarded for
              innovative approaches to problem-solving.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingFour;
