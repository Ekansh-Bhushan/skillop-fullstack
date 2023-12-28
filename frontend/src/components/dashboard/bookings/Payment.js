import React, { useEffect, useState } from "react";
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

  const createMeetEvent = async () => {
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
    try {
      const res = await axios.post(
        "https://app.skillop.in/api/mentor/meet/create-meet-event",
        data,
        config
      );
      console.log("success");
      console.log(res.data);
      meetLink = res.data.hangoutLink;
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  };

  const onClickDone = async () => {
    // send meet request to backend
    if (!paymentConformationPic) {
      toast.error("Please upload the payment proof");
      return;
    }
    try {
      setLoading(true);
      await createMeetEvent();
      const formData = new FormData();
      formData.append("payment-proof", paymentConformationPic);
      formData.append("date", day);
      formData.append("s", s);
      formData.append("e", e);
      formData.append("meetLink", meetLink);
      console.log("meetLink", meetLink);
      const response = await sendMeetRequest(
        mentorid,
        day,
        s,
        e,
        userid,
        formData
      );
      if (response.data.result) {
        console.log("sendmeetreq: ", response.data.result);
        navigate("/requestedMeets");
        toast.success("Meet scheduled!");
        toast.success("Check your Google calendar!");
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
      {/* <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      /> */}
      <Mobilecommonhead />

      <div className="relative left-[20vw] pt-[15vh] w-[100%]">
        <div className="h-[100vh] flex items-center justify-center flex-col pt-5 ml-10 w-[50%] px-5">
          <h2 className="text-3xl font-semibold w-full ">Payment</h2>
          <div className="pay-details ">
            <h3 className="text-2xl font-semibold ">Payment details</h3>
            <div className="session text-xl font-semibold my-5">
              <p>Price for 1 session</p>
              <p>Rs. {charge}</p>
            </div>
            <div className="final-amt text-xl font-semibold">
              <p>Final amount</p>
              <p>Rs. {charge}</p>
            </div>
          </div>

          <div className="qr-container">
            {/* <h3
              style={{
                color: "red",
                textAlign: "center",
                margin: "2vw",
              }}
            >
              Scan QR Code to pay
            </h3> */}
            <p className="text-xl font-semibold my-5 text-center">
              Mentor’s UPI : {data.upiId}
            </p>
            <div
              className="qr-code"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              {/* <img width={200} src="/qr.png" alt="" /> */}
              {/* <div style={{ height: "auto", width: "100%" }}> */}
              {data.upiId && (
                <QRCode
                  size={200}
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
                className="qr-content"
              >
                {/* <p>
                  NAME : {data.firstname} {data.lastname}
                </p> */}
                <p className="text-lg font-medium">
                  Make the payment and upload the proof here
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
          <button
            className="mt-5 py-2 rounded-lg text-white bg-[#108CFF] text-lg w-[47%]"
            onClick={() => onClickDone()}
          >
            Book Slot
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
