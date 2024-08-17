import React, { useState } from "react";
import Nav from "./Nav";
import doodle1 from "../../components/images/doodle-6 1.png";
import doodle2 from "../../components/images/doodle-7 1.png";
import Saly from "../../components/images/Saly-26.png";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import toast from "react-hot-toast";
import { updateIsMentor } from "../../api/userRequest";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const SkillSeven = ({setProgress}) => {
  const navigate = useNavigate();
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [linkedinId, setlinkedinId] = useState("");

  const finish = async () => {
    if (!whatsappNumber) {
      toast.error("Phone number is required!", {
        style: {
          marginTop: "60px", 
        },
      });
      return;
    }
    

    if (whatsappNumber.length !== 10) {
      toast.error("Phone number should contain 10 digits", {
        style: {
          marginTop: "60px", 
        },
      });
      return;
    }
    setProgress(40);
    try {
      const { data } = await updateIsMentor({
        whatsappNumber,
        upiId,
        linkedinId,
      });
      if (data.result) {
        navigate("/homepage");
        toast.success("User registered!");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setProgress(100);
  };
  const backClicked = () => {
    navigate("/skill6");
  };
  return (
    <div>
      <Nav />
      <ProgressBar progress={80} />
      <div className="flex items-start flex-col ml-[35vh] mt-5 z-50">
        <h1 className="text-[35px] mb-5 mt-[8vh] font-bold">
          Complete Your Profile
        </h1>
        <div className="flex items-start gap-[10vh] justify-start">
          <div className="flex items-start justify-center flex-col text-xl gap-8 mt-3 font-normal relative">
            <img
              src={doodle1}
              className="absolute z-10 top-[30vh] left-[12vw]"
              alt="Decorative doodle 1"
            />
            <img
              src={doodle2}
              className="absolute z-10 top-[30vh] left-[50vw]"
              alt="Decorative doodle 2"
            />
            <img src={Saly} className="absolute z-10 top-[-15vh] left-[56vw]" alt="Decorative Saly" />
            <div className="flex items-start justify-center flex-col text-xl gap-8 mt-3 font-normal">
              {window.location.pathname === "/skill3" ? (
                <span className="font-semibold">Skills/Interests</span>
              ) : (
                <span>Skills/Interests</span>
              )}
              {window.location.pathname === "/skill4" ? (
                <span className="font-semibold">Education Information</span>
              ) : (
                <span>Education Information</span>
              )}
              {window.location.pathname === "/skill6" ? (
                <span className="font-semibold">Cover & Profile Photos</span>
              ) : (
                <span>Cover & Profile Photos</span>
              )}
              {window.location.pathname === "/skill7" ? (
                <span className="font-semibold">Additional Information</span>
              ) : (
                <span>Additional Information</span>
              )}
            </div>
          </div>
          <div className="flex flex-col border-[1px] px-10 py-8 w-[40vw] rounded-3xl z-40 bg-white bg-opacity-50 backdrop-blur-[20px] ">
            <label className="mb-2 text-lg font-bold">Phone</label>
            <input
              type="text"
              placeholder="Phone number"
              className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4 "
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />{" "}
            <label className="mb-2 text-lg font-bold">LinkedIn Account</label>
            <input
              type="text"
              placeholder="linkedin account"
              className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4 "
              onChange={(e) => setlinkedinId(e.target.value)}
            />
            <label className="mb-2 text-lg font-bold">UPI ID</label>
            <input
              type="text"
              placeholder="upi id"
              className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4 "
              onChange={(e) => setUpiId(e.target.value)}
            />
            <div className="flex justify-between w-full items-center">
              <button
                className="rounded-full border-[2px] border-black h-9 w-9 flex items-center justify-center hover:bg-[#8484841A]"
                onClick={backClicked}
              >
                <FaArrowLeft />
              </button>
              <div className="flex rounded-3xl border-[2px] border-black items-center justify-center px-1.5 py-1.5 gap-2 hover:bg-[#8484841A]">
                <button className="font-bold " onClick={finish}>
                  FINISH
                </button>
                <span className="rounded-full border-[2px] border-black py-1 px-1">
                  <FaArrowRight />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSeven;
