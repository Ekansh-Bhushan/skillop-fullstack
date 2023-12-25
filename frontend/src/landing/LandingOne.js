import React, { useState, useEffect } from "react";
import landingelement from "../components/images/landingelement.png";
import line from "../components/images/Line.png";

const LandingOne = () => {
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
    <div className="flex justify-evenly items-center ml-[20vh] mt-[10vh] max-h-[90vh] md:mx-5 md:mb-[8vh] md:mt-0">
      <div className="flex flex-col ">
        <h1 class="text-[55px] font-medium md:text-[40px] my-5">
          Shuru se{" "}
          <span class="font-black relative">
            Shuruwat <img src={line} className="h-2 " />
          </span>{" "}
          krte hain!
        </h1>
        <p className="text-md ">
          Skillop serves as a dynamic tech society cluster, dedicated to
          empowering students through the strategic development of a robust and
          interconnected ecosystem tailored to foster their growth and success
          in the field of technology.
        </p>
        <div className="flex gap-5 mt-5 ">
          <button className="border-black border-2 px-10 py-2 rounded-lg font-semibold md:px-5">
            <a href={isMobile ? "/msignup" : "/signup"}>Get Started</a>
          </button>
          <button className="border-black border-2 px-10 py-2 rounded-lg font-semibold md:px-5">
            Learn More
          </button>
        </div>

        <div className="text-[45px] text-[#5F5F5F] flex gap-5 mt-20 md:text-[30px] md:mt-10">
          <div className="flex flex-col items-center justify-center">
            50+ <span className="font-semi-bold text-[18px]">Mentors</span>
          </div>
          <div className="flex flex-col items-center justify-center">
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
        <img src={landingelement} className="block  h-auto" />
      </div>
    </div>
  );
};

export default LandingOne;
