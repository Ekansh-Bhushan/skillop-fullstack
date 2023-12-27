import React, { useState, useEffect } from "react";
import line from "../components/images/Line.png";
import arrow from "../components/images/typcn_arrow-up-outline.png";
import { useNavigate } from "react-router-dom";

const LandingTwo = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
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

  const signupClicked = () => {
    window.innerWidth < 500 ? navigate("/msignup") : navigate("/signup");
  };
  return (
    <div className="min-h-[100vh] mt-10">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-center text-[35px] font-semibold md:text-[30px]">
          Why choose SKILLOP?
        </h1>
        <img src={line} className="w-[10%] h-1.5 mb-5" />
        <p className="text-center w-[33%] text-[#848484] md:w-[80%]">
          Establish your Skillop profile swiftly to discover mentors, mentees,
          internship prospects, and gain exclusive early access to upcoming
          platforms.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-[10vh] mx-[20vh] mt-10 md:mx-5 md:grid-cols-1 md:gap-5">
        <div className="bg-[#FF000066] rounded-2xl p-4 flex items-center justify-start flex-col">
          <h1 className="text-2xl font-semibold mb-3 md:text-xl">
            Be a Mentor or Mentee
          </h1>
          <p className="text-sm w-[60%] md:w-[80%]">
            Embark on a transformative journey as a Mentor or Mentee, shaping
            futures and fostering growth through meaningful connections and
            shared knowledge.
          </p>
        </div>
        <div className="bg-[#FFB80080] rounded-2xl p-4 flex items-center justify-start flex-col">
          <h1 className="text-2xl font-semibold mb-3 md:text-xl">
            Events and Updates
          </h1>
          <p className="text-sm w-[60%] md:w-[80%]">
            {" "}
            Stay informed and engaged with the latest happenings through 'Events
            and Updates' – your gateway to the most current and exciting
            developments in your community.
          </p>
        </div>
        <div className="bg-[#0EAB0080] rounded-2xl p-4 flex items-center justify-start flex-col">
          <h1 className="text-2xl font-semibold mb-3 md:text-xl">
            Build your Own Community
          </h1>
          <p className="text-sm w-[60%] md:w-[80%]">
            Foster a thriving mentor-mentee ecosystem as you shape and build
            your own community. Connect, learn, and grow together on your terms.
          </p>
        </div>
        <div className="bg-[#108CFF80] rounded-2xl p-4 flex items-center justify-start flex-col">
          <h1 className="text-2xl font-semibold mb-3 md:text-xl">
            Beneficial Platforms
          </h1>
          <p className="text-sm w-[60%] md:w-[80%]">
            Explore our integrated platforms within SKILLOP — a dynamic suite
            designed to accelerate your growth journey. Unleash your potential
            with tools tailored for success.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-8">
        {/* <button className="border-black border-2 px-10 py-2 rounded-lg font-semibold md:px-6">
          <a href={isMobile ? "/msignup" : "/signup"}>Get Started</a>
        </button> */}
        <button
          className="relative bg-gradient-to-l from-blue-300 via-green-500 to-yellow-500 rounded-lg p-[4px] overflow-hidden "
          onClick={signupClicked}
        >
          <span className=" flex justify-around items-center w-full bg-white rounded-lg px-6 py-2 font-semibold gap-5">
            Get Started
            <img src={arrow} width={30} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default LandingTwo;
