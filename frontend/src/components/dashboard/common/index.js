import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import Common from "../../Landing/common";
import user from "../../images/user.png";

function Commondash({ userData }) {
    return (
        <>
            <div className="userdash">
                <div className="dashbg">
                    <div className="rounded-img">
                        <img
                            style={{ height: "200px", width: "200px;" }}
                            src={user}
                        />
                    </div>
                </div>

                <div className="info-user">
                    <div
                        className="about-user"
                        style={{
                            fontWeight: "bold",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        Skills:
                    </div>
                    <div
                        className="para-about"
                        style={{ marginLeft: "auto", marginRight: "auto" }}
                    >
                        {userData.skills.join(" || ")}
                    </div>
                </div>
                <div className="contact-details">
                    <div className="email-d">
                        <span style={{ fontWeight: "bold" }}>Email:</span>
                        {userData.email}
                    </div>
                    <div className="phone-d">
                        <span style={{ fontWeight: "bold" }}>Phone:</span>
                        {userData.whatsappNumber}
                    </div>
                    <div className="upi-d">
                        <span style={{ fontWeight: "bold" }}>UPI:</span>
                        {userData.upiId}
                    </div>
                </div>
                {/* <div className="Editor-dashboard">
            <button className="edit-d">Edit Profile</button>
          </div> */}
            </div>
        </>
    );
}

export default Commondash;
