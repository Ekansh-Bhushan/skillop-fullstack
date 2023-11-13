import React, { useEffect, useState } from "react";
import SideNav from "../../SideNav/SideNav";
import "./ConfirmBooking.css";
import userIcon from "../../images/user.png";
import { getSpecificUser } from "../../../api/userRequest";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { getMentorData, sendMeetRequest } from "../../../api/mentorRequest";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import axios from "axios";
import convertToNormalTime from "../../../utils/timeConversion";
import spinner from "../../images/spinner.gif";
import Mobilecommonhead from "../../Mobilecommonhead";

const Payment = ({ setProgress, Mentor, isFetched, notifyList }) => {
  const mentorid = window.location.pathname.split("/")[2];
  const [data, setData] = useState({});
  const search = useLocation().search;
  const day = new URLSearchParams(search).get("day");
  const s = new URLSearchParams(search).get("s");
  const e = new URLSearchParams(search).get("e");
  const userid = new URLSearchParams(search).get("userid");
  const charge = new URLSearchParams(search).get("charge");
  // console.log(day, s, e, userid, charge, mentorid)

  const [loading, setLoading] = useState(false);

  const [paymentConformationPic, setPaymentConformationPic] = useState(null);

  const navigate = useNavigate();

  let meetLink;

  const fetchUser = async () => {
    try {
      const user = await getMentorData(mentorid);
      setData(user.data.result);
      if (!user.data.result) {
        toast.error(user.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const createMeetEvent = () => {
    const skilloptoken = localStorage.getItem("skilloptoken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: skilloptoken,
      },
      withCredentials: true,
    };
    const data = {
      summary: "SKILLOP MEET",
      description: "This meeting is purely for mentorship.",
      location: "Google Meet",
      startDateTime: day.toString() + " " + convertToNormalTime(s).toString(),
      endDateTime: day.toString() + " " + convertToNormalTime(e).toString(),
    };
    console.log("meet data : ", data);
    return axios
      .post("https://app.skillop.in/api/event/create-meet", data, config)
      .then((res) => {
        console.log("success");
        console.log(res.data);
        meetLink = res.data.hangoutLink;
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  const onClickDone = async () => {
    // send meet request to backend
    if (!paymentConformationPic) {
      toast.error("Please upload the payment proof");
      return;
    }
    try {
      setLoading(true);
      const res = await createMeetEvent();
      console.log("createmeetevent", res);
      const formData = new FormData();
      formData.append("payment-proof", paymentConformationPic);
      formData.append("date", day);
      formData.append("s", s);
      formData.append("e", e);
      formData.append("meetLink", meetLink);
      console.log("meetLink", meetLink);
      console.log("formdata", formData)
      const response = await sendMeetRequest(
        mentorid,
        day,
        s,
        e,
        userid,
        formData
      );
      if (response.data.result) {
        console.log("sendmeetreq: ",response.data.result);
        navigate("/requestedMeets");
        toast.success("Meet scheduled!");
        toast.success("Check your Google calendar!");
        // toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", gap: "100px" }}>
      <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      />
      <Mobilecommonhead />

      <div className="confirm-container">
        <div className="left-content">
          {data && (
            <div className="cnf-user">
              {/* <img className="cnf-prof-pic" src={data.profilePicUrl ? data.profilePicUrl : userIcon} alt="profile pic" /> */}
              <img className="cnf-prof-pic" src={userIcon} alt="profile pic" />
              <h3>
                {data.firstname} {data.lastname}
              </h3>
              <p>{data.jobTitle}</p>
            </div>
          )}
          <div className="cnf-line"></div>
          <span>
            <div id="cnf-circle"></div>
            <h3>Confirmation</h3>
          </span>
          <div style={{ background: "#25CED1" }} className="cnf-line2"></div>
          <span>
            <div style={{ background: "#25CED1" }} id="cnf-round"></div>
            <h3>Payment</h3>
          </span>
        </div>
        <div className="right-content">
          <h2 style={{ marginBottom: "10px" }}>Payment</h2>
          <div className="pay-details">
            <h3>Payment details</h3>
            <div className="session">
              <p>Price for 1 session</p>
              <p>Rs. {charge}</p>
            </div>
            <div className="final-amt">
              <p>Final amount</p>
              <p>Rs. {charge}</p>
            </div>
          </div>

          <div className="qr-container">
            <h3
              style={{
                color: "red",
                textAlign: "center",
                margin: "2vw",
              }}
            >
              Scan QR Code to pay
            </h3>
            <div
              className="qr-code"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* <img width={200} src="/qr.png" alt="" /> */}
              {/* <div style={{ height: "auto", width: "100%" }}> */}
              {data.upiId && (
                <QRCode
                  size={156}
                  // style={{
                  //   height: "auto",
                  //   maxWidth: "13vw",
                  //   width: "13vw",
                  // }}
                  value={`upi://pay?pa=${data.upiId}&am=${charge}&cu=INR`}
                  viewBox={`0 0 256 256`}
                />
              )}
              {/* </div> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1vw",
                }}
              >
                <p>UPI ID : {data.upiId}</p>
                <p>
                  NAME : {data.firstname} {data.lastname}
                </p>
                <label style={{ color: "#0076B2" }}>Upload the proof</label>
                <input
                  type="file"
                  accept="image/*"
                  name="payment-proof"
                  id="payment-proof"
                  onChange={(e) => {
                    setPaymentConformationPic(e.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>
          <button className="proceed-btn" onClick={() => onClickDone()}>
            Done
          </button>
          {loading && (
            <div style={{ textAlign: "center" }}>
              {" "}
              <img src={spinner} alt="loading" width={45} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Payment;
