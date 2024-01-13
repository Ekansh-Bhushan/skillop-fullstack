import React, { useState, useEffect } from "react";
import landingelement from "../components/images/landingelement.png";
import line from "../components/images/Line.png";
import arrow from "../components/images/arrow.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LandingOne = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };
    // Set initial state and listen for window resize
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);  // Cleanup the event listener on component unmount
  }, []);

  const signupClicked = () => {
    window.innerWidth < 500 ? navigate("/msignup") : navigate("/signup");
  };
  const LearnMoreClicked = () => {
    window.innerWidth < 500 ? navigate("/about") : navigate("/about");
  };

  return (
    <div className="flex justify-evenly items-center ml-[20vh] mt-[10vh] max-h-[90vh] md:mx-5 md:mb-[8vh] md:mt-0 ">
      <div className="flex flex-col ">
        <h1 class="text-[50px] font-medium md:text-[40px] my-5">
          Shuru se{" "}
          <span class="font-black relative">
            Shuruwat <img src={line} className="" />
          </span>{" "}
          karte hain!
        </h1>
        <p className="text-md ">
          Skillop serves as a dynamic tech society cluster, dedicated to
          empowering students through the strategic development of a robust and
          interconnected ecosystem tailored to foster their growth and success
          in the field of technology.
        </p>
        <div className="flex gap-5 mt-5 relative">
          <button
            className="relative bg-gradient-to-l from-blue-300 via-green-500 to-yellow-500 rounded-lg p-[4px] overflow-hidden hover:shadow-2xl"
            onClick={signupClicked}
          >
            <span className=" flex justify-around items-center w-full bg-white rounded-lg px-6 py-2 font-semibold gap-5">
              Get Started
              <img src={arrow} width={20} />
            </span>
          </button>
          <button onClick={LearnMoreClicked} className="border-black border-2 px-10 py-3 rounded-lg font-semibold md:px-5 hover:bg-[#8484841A]">
            Learn More
          </button>
        </div>

        <div className="text-[45px] text-[#5F5F5F] flex gap-5 mt-20 md:text-[30px] md:mt-10">
          <div className="flex flex-col items-center justify-center pr-5 border-r-2 border-[#00000080]">
            50+ <span className="font-semi-bold text-[18px]  ">Mentors</span>
          </div>
          <div className="flex flex-col items-center justify-center border-r-2 border-[#00000080] pr-5">
            1000+ <span className="font-semi-bold text-[18px]">Users</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            100+{" "}
            <span className="font-semi-bold text-[18px]">
              Session Conducted
            </span>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 md:hidden">
        <img src={landingelement} className="block h-auto mt-4" />
      </div>
    </div>
  );
};

export default LandingOne;
