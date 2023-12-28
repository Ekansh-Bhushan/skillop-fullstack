import React, { useEffect, useState } from "react";
import "./ConfirmBooking.css";
import userIcon from "../../images/user.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMentorData } from "../../../api/mentorRequest";
import toast from "react-hot-toast";
import convertToNormalTime from "../../../utils/timeConversion";
import calculateTimeGap from "../../../utils/timeGap";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import MyCustomGoogleButton from "./MyCustomGoogleButton";
import axios from "axios";
import Mobilecommonhead from "../../Mobilecommonhead";

const ConfirmBooking = ({ setProgress, Mentor, isFetched, notifyList }) => {
  const mentorid = window.location.pathname.split("/")[2];
  const [data, setData] = useState({});
  const search = useLocation().search;
  const day = new URLSearchParams(search).get("day");
  const s = new URLSearchParams(search).get("s");
  const e = new URLSearchParams(search).get("e");
  const userid = new URLSearchParams(search).get("userid");
  const charge = new URLSearchParams(search).get("charge");

  const navigate = useNavigate();

  const fetchUser = async () => {
    let user;
    try {
      user = await getMentorData(mentorid);
      if (user.data.result) {
        setData(user.data.result);
      } else {
        toast.error(user.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const onClickProceed = () => {
    navigate(
      `/payment/${mentorid}?day=${day}&s=${s}&e=${e}&userid=${userid}&charge=${charge}`
    );
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    // console.log(credentialResponse);
    const decodedToken = await jwt_decode(idToken);
    // console.log(decodedToken);
  };

  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div style={{}}>
      {/* <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      /> */}
      <Mobilecommonhead />

      <div className="confirm-container">
        <div className="h-[100vh] flex items-center justify-center flex-col px-[10vw]">
          {isSignedIn ? (
            <h2 className="text-3xl font-semibold w-full mb-5 mt-[-5vh]">
              Confirm Your Slot
            </h2>
          ) : (
            <h2 className="mb-[20vh] text-2xl font-semibold mt-[-15vh]">
              Authorize SKILLOP MEETS
            </h2>
          )}

          {isSignedIn ? (
            <>
              <div className="cnf-video">
                <span className="call-details">
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img src="/video.png" width={30} alt="" />
                      <span>Mode</span>
                    </div>
                    <div>Video</div>
                  </div>
                  <div>
                    <div>Duration</div>
                    <div>{calculateTimeGap(e, s)}</div>
                  </div>
                </span>
                <span className="call-date">
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img src="/calendar.png" width={30} alt="" />
                      <span>Date</span>
                    </div>
                    <div>{new Date(day).toString().slice(0, 15)}</div>
                  </div>
                  <div>
                    <div>Time</div>
                    <div>{convertToNormalTime(s)}</div>
                  </div>
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  width: "100%",
                }}
              >
                <input
                  type="text"
                  className="coupon-text"
                  placeholder="Have a Coupon Code?"
                />
                <img
                  src="/go.png"
                  alt=""
                  style={{
                    cursor: "pointer",
                    width: "40px",
                    paddingLeft: "10px",
                  }}
                  onClick={() => {
                    // check if input is empty
                    toast.error("Invalid Coupon Code");
                  }}
                />
              </div>
              <div className="pay-details">
                <h3 className="text-2xl font-semibold mb-6">Payment details</h3>
                <div className="session">
                  <p className="text-xl font-semibold ">Session Fee</p>
                  <p className="text-xl font-semibold mb-5">Rs. {charge}</p>
                </div>
                <div className="final-amt">
                  <p className="text-xl font-semibold ">Total amount</p>
                  <p className="text-xl font-semibold ">Rs. {charge}</p>
                </div>
                <button
                  className="mt-5 py-2 rounded-lg text-white bg-[#108CFF] text-lg"
                  onClick={() => onClickProceed()}
                >
                  Proceed
                </button>
                <span className="mt-[5vh]">
                  Note: The meetings will be scheduled in your Google <br />
                  Calendar along with Google Meet Link.
                </span>
              </div>
            </>
          ) : (
            <>
              <GoogleOAuthProvider clientId="154719299730-irqnpdj9jo8n2pa475b0gbpmoi78orha.apps.googleusercontent.com">
                <MyCustomGoogleButton setIsSignedIn={setIsSignedIn} />
              </GoogleOAuthProvider>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;

{
  /* <div className="left-content">
{data && (
  <div className="cnf-user">
    {/* <img className="cnf-prof-pic" src={data.profilePicUrl ? data.profilePicUrl : userIcon} alt="profile pic" /> */
}
//     <img className="cnf-prof-pic" src={userIcon} alt="profile pic" />
//     <h3>
//       {data.firstname} {data.lastname}
//     </h3>
//     <p>{data.jobTitle}</p>
//   </div>
// )}

// <div className="cnf-line"></div>

// <span>
//   <div id="cnf-circle"></div>
//   <h3>Confirmation</h3>
// </span>
// <div className="cnf-line2"></div>
// <span>
//   <div id="cnf-round"></div>
//   <h3>Payment</h3>
// </span>
// </div>  */}
