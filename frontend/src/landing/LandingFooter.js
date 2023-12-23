import React from "react";
import logo from "../components/images/logo.png";
import email from "../components/images/email.png";
import call from "../components/images/call.png";
import location from "../components/images/location.png";
import { Link } from "react-router-dom";

const LandingFooter = () => {
  return (
    <div className="bg-[#212121] text-white flex items-center justify-around py-10 md:flex-col md:gap-5 mb-[-10vh]">
      <div className="md:ml-[10vw] flex flex-col md:gap-5">
        <div className="flex items-center justify-start gap-5">
          <img src={logo} />
          <h1>SKILLOP</h1>
        </div>
        <div className="flex items-center justify-start gap-3">
          {" "}
          <img src={email} />
          <h3>skill.skillop@gmail.com</h3>
          <h3>enquiry.skillop@gmail.com</h3>
        </div>
        <div className="flex items-center justify-start gap-3">
          {" "}
          <img src={call} />
          <h3>+91 95992 72272</h3>
        </div>
        <div className="flex items-center justify-start gap-3">
          {" "}
          <img src={location} />
          <h3 className="w-[60%]">
            Delhi Technological University, Bawana Road, Shahbad Daulatpur
            Village, Rohini, Delhi 110042
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 md:flex-col md:items-start md:justify-start md:w-[70%] md:gap-5">
        <div className="flex flex-col gap-5">
          <Link to={'/about'}><span>ABOUT</span></Link>
          <Link to={'/contact'}><span>CONTACT</span></Link>
          <Link to={'/terms-of-service'}><span>TERMS OF SERVICE</span></Link>
          <Link to={'/privacy-policy'}><span>PRIVACY POLICY</span></Link>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
