import React from "react";
import "./index.css";
import Header1 from "../Header";
import { useNavigate } from "react-router-dom";
import { updateIsMentor } from "../../api/userRequest";
import { useState } from "react";
import Pageloader from "../Pagesbar";
import { toast } from "react-hot-toast";
function Auth4Component({ setProgress }) {
  const navigate = useNavigate();
  const [jobtitles, setJobtitles] = useState("");

  const handleBack = () => {
    setProgress(35);
    setTimeout(() => {
      setProgress(100);
    }, 300);
    navigate("/skills");
  };

  const redirectToPage5 = async () => {
    // console.log("nt running");
    if (!jobtitles.length) {
      toast.error("Enter Job Title and JD or select student!");
      return;
    }
    setProgress(40);
    try {
      const request = {
        jobTitle: jobtitles,
      };
      const { data } = await updateIsMentor(request);
      setProgress(70);

      // console.log(data);
      if (data.result) navigate("/skills");
    } catch (error) {
      console.log(error);
    }
    navigate("/collegedetails");
    setProgress(100);
  };
  return (
    <>
      <Header1 />
      <Pageloader
        givecolor1={false}
        givecolor2={false}
        givecolor3={true}
        givecolor4={true}
        givecolor5={true}
        givecolor6={true}
        isactive3={true}
      />
      <div className="">
        <div className="head-3">
          <h2>Your Profile Helps You Get Discovered</h2>
        </div>
        <div className="job-input">
          <h3 style={{ fontSize: "20px", marginBottom: "1vw" }}>
            Your Job Title
          </h3>
          <input
            type="text"
            value={jobtitles}
            onChange={(e) => setJobtitles(e.target.value)}
            className="job-txt-inp"
          />
        </div>

        <div className="jobtitles">
          <h3>Job Description</h3>
          <textarea
            className="textarea2"
            placeholder="Tell us more about your job?"
          ></textarea>
        </div>
        <div className="main-4-btnCont">
          <button onClick={handleBack} className="back">
            Back
          </button>
          <button
            className="studbt"
            onClick={() => {
              setProgress(40);
              setTimeout(() => {
                setProgress(100);
              }, 300);
              navigate("/collegedetails");
            }}
          >
            I'm a Student
          </button>
          <button
            className="next2"
            type="button"
            form="myform2"
            onClick={redirectToPage5}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Auth4Component;
