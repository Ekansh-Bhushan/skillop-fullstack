import React from "react";
import { getUser } from "../../../api/userRequest";
import linkedin from "../../images/linkedin.png";
import { userChats } from "../../../api/chatRequest";
import userPic from "../../images/user.png";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultBGPic from "../../images/Robo.png";
export default function Profileandevents({ userData, isHome, useUserData }) {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
          const fetchUserDetails = async () => {
              try {
                  const userData1 = await getUser();
                  setUserDetails(userData1.data.result);
              } catch (err) {
                  console.log("Unable to fetch user details", err);
              } finally {
                  if (useUserData) {
                      setUserDetails(userData);
                      console.log("xxxxx", userData);
                  }
              }
          };
        fetchUserDetails();
    }, [setUserDetails, useUserData, userData]);

    return (
        <>
            <div
                className={
                    isHome ? "prof-and-events ishome" : "prof-and-events"
                }
            >
                <div
                    className="common-prof"
                    style={{
                        backgroundImage:
                            userDetails &&
                            (userDetails.bgPicUrl
                                ? `url(${userDetails.bgPicUrl})`
                                : `url(${defaultBGPic})`),
                    }}
                >
                    <div className="common-prof-info">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}
                        >
                            {userDetails && (
                                <img
                                    src={
                                        userDetails.profilePicUrl
                                            ? userDetails.profilePicUrl
                                            : userPic
                                    }
                                    className="prof-image-common"
                                    alt="user"
                                />
                            )}

                            <div>
                              {userDetails && userDetails.firstname && (
                                <div className="user-name">
                                  {userDetails.firstname + " " + userDetails.lastname}
                                </div>
                              )}
                              {userDetails && <p style={{ margin: "10px" }}>{userDetails.jobTitle}</p>}
                            </div>


                            {userDetails && (
                                <a
                                    href={
                                        userDetails.linkedinId
                                            ? userDetails.linkedinId
                                                  .toString()
                                                  .includes("linkedin.com")
                                                ? userDetails.linkedinId
                                                : `https://linkedin.com/in/${userDetails.linkedinId}`
                                            : ""
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img src={linkedin} alt="linkedin" />
                                </a>
                            )}
                        </div>
                        {userDetails && (
                            <div
                                className="view-my-prof"
                                onClick={() => navigate("/Profile")}
                            >
                                View Profile
                            </div>
                        )}
                    </div>
                </div>

                <div className="event-upcoming">
                    <div className="header-events">
                        <div
                            style={{
                                fontSize: "1.15rem",
                                fontWeight: "500",
                                paddingTop: "10px",
                                paddingLeft: "16px",
                            }}
                        >
                            Scheduled Events
                        </div>
                    </div>
                    <div className="event-list">
                        <div className="event-1"></div>
                        <div className="event-1"></div>
                        <div className="event-1"></div>
                    </div>
                    <div className="join-premium">
                        <a
                            href="https://forms.gle/5eHDU3aAdWstuFs39"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Join SKILLOP Premium
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
