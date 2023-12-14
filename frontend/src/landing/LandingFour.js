import React from "react";
import plus from "../components/images/plus (2).png";
import Saly from "../components/images/Saly-1.png";
import line from "../components/images/Line.png";

const LandingFour = () => {
  return (
    <div className="flex justify-evenly items-start mt-[15vh]">
      <div className="flex justify-center flex-col items-center ">
        <div>
          {" "}
          <h1 className="text-5xl font-semibold mb-3">Frequently Asked </h1>
          <span className="text-5xl font-semibold">
            Questions
            <img src={line} className="my-3" />
          </span>
        </div>
        <p className="text-xl text-[#848484] w-[82%]">
          Still got questions? You might find the answer here
        </p>
        <img src={Saly} className="h-[55vh]" />
      </div>
      <div className="flex flex-col justify-start items-start gap-5">
        <div className="flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh]">
          <p>Is becoming Mentor paid or free?</p>
          <img src={plus} />
        </div>
        <div className="flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh]">
          <p>Is becoming Mentor paid or free?</p>
          <img src={plus} />
        </div>
        <div className="flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh]">
          <p>Is becoming Mentor paid or free?</p>
          <img src={plus} />
        </div>
        <div className="flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh]">
          <p>Is becoming Mentor paid or free?</p>
          <img src={plus} />
        </div>
        <div className="flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh]">
          <p>Is becoming Mentor paid or free?</p>
          <img src={plus} />
        </div>
        <div className="flex justify-between items-center shadow-xl border-[1px] p-7 rounded-xl gap-[20vh]">
          <p>Is becoming Mentor paid or free?</p>
          <img src={plus} />
        </div>
      </div>
    </div>
  );
};

export default LandingFour;