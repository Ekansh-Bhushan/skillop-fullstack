import React, { useEffect, useState } from "react";
import linkedin from "../../images/linkedin.png";
import google from "../../images/google.png";
import Header1 from "../../Header";
import "./index.css";
import { Navigate, useNavigate } from "react-router-dom";
import Commondash from "../common";
import Topbar from "../topbar";
import { updateIsMentor } from "../../../api/userRequest";
import UPIicon from "../../images/UPI.png";
import SideNav from "../../SideNav/SideNav";
import Profileandevents from "../../Landing/Profileandevents";
import { toast } from "react-hot-toast";
import Mobilecommonhead from "../../Mobilecommonhead";

function Account({ userData, setProgress, Mentor, isFetched, notifyList }) {
  /*---------LINKING ROUTES---------*/

  /*--------------------------------*/

  const navigate = useNavigate();
  const [email, setEmail] = useState(userData.email);
  const [whats, setWhats] = useState(userData.whatsappNumber);
  const [upi, setUpi] = useState(userData.upiId);
  const [linkedindata, setlinkedindata] = useState(userData.linkedinId);

  useEffect(() => {
    // This function will run when the DOM content is loaded.
    console.log(email, whats, upi, linkedindata);
    var inp1 = document.querySelectorAll(".editable-input");
    for (var i = 0; i <= 3; i++) {
      inp1[i].disabled = true;
    }
  }, []);

  const enabledisableinput = async () => {
    var inp = document.querySelectorAll(".editable-input");
    if (inp[0].disabled) {
      for (var i = 0; i <= 3; i++) {
        inp[i].disabled = false;
      }
      document.querySelector(".edit-input").style.backgroundColor = "#83FF81";
      // document.querySelector(".edit-input").style.color = "black";
      document.querySelector(".edit-input").textContent = "Save";
      for (let item of document.querySelectorAll(".editable-input")) {
        item.style.border = "2px solid black";
        item.style.borderRadius = "10px";
      }
    } else {
      try {
        setProgress(20);
        const request = {
          email: email,
          whatsappNumber: whats,
          upiId: upi,
          linkedinId: linkedindata,
        };
        await updateIsMentor(JSON.stringify(request));
        // console.log(data);
        setProgress(100);
        toast.success("Account info updated!");
        // console.log(data);
      } catch (error) {
        setEmail(userData.email);
        setWhats(userData.whatsappNumber);
        setUpi(userData.upiId);
        setlinkedindata(userData.linkedin);
        console.log(error);
        toast.error(error.response.data.err);
        setProgress(100);
      }
      // window.location.reload();
      for (var i = 0; i <= 3; i++) {
        inp[i].disabled = true;
      }

      for (let item of document.querySelectorAll(".editable-input")) {
        item.style.border = "none";
      }

      document.querySelector(".edit-input").style.backgroundColor = "black";
      document.querySelector(".edit-input").style.color = "white";
      document.querySelector(".edit-input").textContent = "Edit";
    }
  };

  return (
    <>
      <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      />
      <Mobilecommonhead />

      <div className="dash-main">
        {/* <Commondash userData={ userData} /> */}

        <div className="dash-right dash-right-2">
          {/* <Topbar setProgress={setProgress}/> */}
          <div className="social-dash">
            <h1 style={{ fontWeight: "bolder", fontSize: "2.6rem" }}>
              Account
            </h1>
            <div className="social-details">
              <div className="linkedin-dash">
                <img src={linkedin} alt="linkedin" />
                <input
                  type="text"
                  placeholder={linkedindata}
                  className="editable-input"
                  value={linkedindata}
                  onChange={(e) => setlinkedindata(e.target.value)}
                />
              </div>
              <div className="gmail-dash">
                <img src={google} alt="google" />
                <input
                  type="email"
                  placeholder={email}
                  value={email}
                  className="editable-input"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="phone-dash">
                <i className="fa fa-phone" />
                <input
                  type="number"
                  placeholder={whats}
                  value={whats}
                  className="editable-input"
                  onChange={(e) => setWhats(e.target.value)}
                />
              </div>
              <div className="upi-id-dash">
                <img src={UPIicon} alt="UPI" />
                <input
                  type="text"
                  placeholder={upi}
                  value={upi}
                  className="editable-input"
                  onChange={(e) => setUpi(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="editor-ids">
            <button className="edit-pass">Change Password</button>
            <button className="edit-input" onClick={enabledisableinput}>
              Edit
            </button>
          </div>
        </div>
        <Profileandevents />
      </div>
    </>
  );
}

export default Account;
