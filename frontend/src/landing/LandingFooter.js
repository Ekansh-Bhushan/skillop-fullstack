import React from "react";
import logo from "../components/images/logo.png";
import email from "../components/images/email.png";
import call from "../components/images/call.png";
import location from "../components/images/location.png";

const LandingFooter = () => {
  return (
    <div className="bg-[#212121] text-white flex items-center justify-around py-10 md:flex-col md:gap-5">
      <div className="md:ml-[10vw] flex flex-col md:gap-5">
        <div className="flex items-center justify-start gap-5">
          <img src={logo} />
          <h1>SKILLOP</h1>
        </div>
        <div className="flex items-center justify-start gap-3">
          {" "}
          <img src={email} />
          <h1>enquiry.skillop@gmail.com</h1>
        </div>
        <div className="flex items-center justify-start gap-3">
          {" "}
          <img src={call} />
          <h1>+91 95992 72272</h1>
        </div>
        <div className="flex items-center justify-start gap-3">
          {" "}
          <img src={location} />
          <h1 className="w-[60%]">
            Delhi Technological University, Bawana Road, Shahbad Daulatpur
            Village, Rohini, Delhi 110042
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center md:flex-col md:items-start md:justify-start md:w-[70%] md:gap-5">
        <div className="flex flex-col gap-5">
          <span>ABOUT US</span>
          <span>CONTACT US</span>
          <span>TERMS OF SERVICE</span>
          <span>PRIVACY</span>
        </div>
        <div className="flex flex-col gap-5">
          <span>ABOUT US</span>
          <span>CONTACT US</span>
          <span>TERMS OF SERVICE</span>
          <span>PRIVACY</span>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
