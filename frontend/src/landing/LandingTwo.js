import React from "react";
import line from "../components/images/Line.png";

const LandingTwo = () => {
  return (
    <div className="min-h-[100vh] mt-10">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-center text-[35px] font-semibold">
          Why choose SKILLOP?
        </h1>
        <img src={line} className="w-[10%] h-1.5 mb-5" />
        <p className="text-center w-[33%] text-[#848484]">
          Establish your Skillop profile swiftly to discover mentors, mentees,
          internship prospects, and gain exclusive early access to upcoming
          platforms.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-[10vh] mx-[20vh] mt-10">
        <div className="bg-gray-200 rounded-2xl p-4 flex items-center justify-start flex-col">
          <h1 className="text-2xl font-semibold mb-3">Be a Mentor or Mentee</h1>
          <p className="text-sm w-[60%]">
            Embark on a transformative journey as a Mentor or Mentee, shaping
            futures and fostering growth through meaningful connections and
            shared knowledge.
          </p>
        </div>
        <div className="bg-gray-200 rounded-2xl p-4 flex items-center justify-start flex-col">
          <h1 className="text-2xl font-semibold mb-3">Events and Updates</h1>
          <p className="text-sm w-[60%]">
            {" "}
            Stay informed and engaged with the latest happenings through 'Events
            and Updates' – your gateway to the most current and exciting
            developments in your community.
          </p>
        </div>
        <div className="bg-gray-200 rounded-2xl p-4 flex items-center justify-start flex-col">
          <h1 className="text-2xl font-semibold mb-3">
            Build your Own Community
          </h1>
          <p className="text-sm w-[60%]">
            Foster a thriving mentor-mentee ecosystem as you shape and build
            your own community. Connect, learn, and grow together on your terms.
          </p>
        </div>
        <div className="bg-gray-200 rounded-2xl p-4 flex items-center justify-start flex-col">
          <h1 className="text-2xl font-semibold mb-3">Beneficial Platforms</h1>
          <p className="text-sm w-[60%]">
            Explore our integrated platforms within SKILLOP — a dynamic suite
            designed to accelerate your growth journey. Unleash your potential
            with tools tailored for success.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5">
        <button className="border-black border-2 px-10 py-2 rounded-lg font-semibold ">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingTwo;