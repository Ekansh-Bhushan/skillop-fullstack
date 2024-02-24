import React, { useEffect, useState } from "react";
import "./ConfirmBooking.css";
import userIcon from "../../images/user.png";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { getMentorData, sendMeetRequest } from "../../../api/mentorRequest";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const Payment = ({ setProgress, Mentor, isFetched, notifyList }) => {
  const mentorid = window.location.pathname.split("/")[2];
  const [data, setData] = useState({});
  const search = useLocation().search;
  const day = new URLSearchParams(search).get("day");
  const s = new URLSearchParams(search).get("s");
  const e = new URLSearchParams(search).get("e");
  const userid = new URLSearchParams(search).get("userid");
  const charge = new URLSearchParams(search).get("charge");
  console.log(day, s, e, userid, charge, mentorid);

  const [paymentConformationPic, setPaymentConformationPic] = useState(null);

  const navigate = useNavigate();

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

  const onClickDone = async () => {
    // send meet request to backend
    if (!paymentConformationPic) {
      toast.error("Please upload the payment proof");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("payment-proof", paymentConformationPic);
      formData.append("date", day);
      formData.append("s", s);
      formData.append("e", e);
      console.log("formdata", formData);

      const response = await sendMeetRequest(
        mentorid,
        day,
        s,
        e,
        userid,
        formData
      );
      if (response.data.result) {
        console.log(response.data.result);
        toast.success(response.data.message);
        navigate(`/mybookings`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", gap: "100px" }}>
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
          <h2>Payment</h2>
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
            <h3 style={{ color: "red", textAlign: "center", margin: "2vw" }}>
              Scan QR Code to pay
            </h3>
            <div
              className="qr-code"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              
              {data.upiId && (
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "13vw", width: "13vw" }}
                  value={`upi://pay?pa=${data.upiId}`}
                  viewBox={`0 0 256 256`}
                />
              )}
             
              <div
                style={{ display: "flex", flexDirection: "column", gap: "1vw" }}
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
        </div>
      </div>
    </div>
  );
};

export default Payment;
