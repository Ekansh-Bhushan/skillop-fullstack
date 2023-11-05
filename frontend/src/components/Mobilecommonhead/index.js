import React, { useState } from "react";
import logo from "../images/logo.png";
import { IoIosArrowBack } from "react-icons/io";
import { PiBellRingingLight } from "react-icons/pi";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import "./index.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { SiGooglechat } from "react-icons/si";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import post from "../images/post.png";
import { RxCross2 } from "react-icons/rx";
import { logoutUser } from "../../api/logoutRequest";
import { toast } from "react-hot-toast";
import PostPopUp from "../Landing/Post/PostPopUp";

const Mobilecommonhead = () => {
  const [showPostPopUp, setShowPostPopUp] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      // setProgress(30);
      localStorage.removeItem("skilloptoken");
      // const { data } = await logoutUser();
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
    toast.success("Logged out");
    // setProgress(100);
  };

  const onClose = () => {
    setShowPostPopUp(!showPostPopUp);
  };

  const handlePostPopUp = () => {
    setShowPostPopUp(!showPostPopUp);
  };
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      {showPostPopUp && (
        <PostPopUp
          onClose={onClose}
          // setProgress={setProgress}
          setRefresh={setRefresh}
        />
      )}
      <div className="mobile-head">
        <div className="back-n-logo">
          {/* <div className="back-btn">
            <IoIosArrowBack style={{ fontSize: "40px" }} />
          </div> */}
          <div
            className="logo-mobile"
            onClick={() => {
              navigate("/homepage");
            }}
          >
            <img src={logo} />
            <div className="skillop-text">SKILLOP</div>
          </div>
        </div>
        <div className="notification-n-chat">
          <PiBellRingingLight
            onClick={() => {
              navigate("/notifications");
            }}
          />

          <HiOutlineChatBubbleLeftEllipsis
            onClick={() => {
              navigate("/chat");
            }}
          />
        </div>
      </div>

      <div className="mobile-panel">
        <div className="inside-panel">
          <div className="mobile-panel-options">
            <AiFillHome
              style={{
                fontSize: "37px",
                marginTop: "-5px",
              }}
              onClick={() => {
                navigate("/homepage");
              }}
              className={`${
                window.location.pathname === "/homepage" ? "color" : "notColor"
              }`}
            />
          </div>
          <div className="mobile-panel-options">
            <BsSearch
              onClick={() => {
                navigate("/searchbar");
              }}
              className={`${
                window.location.pathname === "/searchbar" ? "color" : "notColor"
              }`}
            />
          </div>
          <div
            className="mobile-panel-options"
            style={{
              fontSize: "64px",
              transform: "translateY(-90%)",
              color: "rgb(27, 155, 155)",
            }}
          >
            {<IoIosAddCircle onClick={handlePostPopUp} />}
          </div>
          {/* <div className="mobile-panel-options">
            <SiGooglechat />
          </div> */}
          <div className="mobile-panel-options">
            <FaUserAlt
              onClick={() => {
                navigate("/Profile");
              }}
              className={`${
                window.location.pathname === "/Profile" ? "color" : "notColor"
              }`}
            />
          </div>
          <div className="mobile-panel-options">
            <FiMoreVertical
              onClick={() => {
                document.querySelector(".more-vertical-options").style.display =
                  "flex";
              }}
            />
          </div>
        </div>
        <div className="more-vertical-options">
          <RxCross2
            onClick={() => {
              document.querySelector(".more-vertical-options").style.display =
                "none";
            }}
            style={{
              position: "absolute",
              top: "40px",
              right: "40px",
              fontSize: "34px",
            }}
            className="cross"
          />
          <div onClick={() => navigate("/mySlots")}>Slots</div>
          <div onClick={() => navigate("/mybookings")}>Bookings</div>
          <div
            onClick={() => {
              navigate("/myearnings");
            }}
          >
            Earnings
          </div>
          <div>Become a Mentor</div>
          <div onClick={() => navigate("/myaccount")}>Account</div>
          <div onClick={() => navigate("/requestedMeets")}>Meet</div>
          <div
            style={{
              fontWeight: "bold",
              borderRadius: "30px",
              border: "1.5px solid rgb(55, 194, 218)",
              width: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "25px",
              padding: "10px 20px",
            }}
            onClick={logout}
          >
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Mobilecommonhead;
