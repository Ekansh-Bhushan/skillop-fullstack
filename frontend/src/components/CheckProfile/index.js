import React, { useEffect, useState, useRef } from "react";
import Header1 from "../Header";
// import index from "./index.css";
// import logo from "../images/logo.png";
import user from "../images/user.png";
// import meet from "../images/meet.jpeg";
import index from "./index.css";
import { useNavigate } from "react-router-dom";
import Common from "../Landing/common";

function CheckProfile({setProgress}) {
    const [slot, setslot] = useState({});
    useEffect(() => {
        function getslot() {
            let date = new Date();
            // const day = days[date.getDay()];
            for (let k = 1; k <= 7; k++) {
                // d = date.toISOString().split("T")[0];
                // date.setDate(date.getDate() + 1); // Increase the day by 1
            }
        }
    });

    const targetRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                targetRef.current &&
                !targetRef.current.contains(event.target)
            ) {
                // This condition checks if the clicked element is not within the target div
                // Place your function code here

                document
                    .querySelector(".filtered-results")
                    .classList.add("hidethis");
                document.querySelector(".search-bar-landing").value = "";
                document.querySelector(".search-bar-landing").style.width =
                    "200px";
                document.querySelector(
                    ".search-bar-landing"
                ).style.borderRadius = "20px";
                document.querySelector(".search-bar-landing").style.background =
                    "rgb(225,225,225)";
                document.querySelector(".search-bar-landing").style.width =
                    "200px";
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const removeqr = () => {
        document.querySelector(".qr").style.display = "none";
    };

    // Function to handle input changes

    return (
        <>
            {/* <div
                style={{
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    backdropFilter: "blur(10px)",
                    position: "absolute",
                    zIndex: "25",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "10px",
                }}
                onClick={removeqr}
                className="qr"
            >
                <img src={user} />
                <button
                    style={{
                        cursor: "pointer",
                        padding: "10px",
                        border: "none",
                        borderRadius: "10px",
                        background: "greenyellow",
                    }}
                >
                    Click Here After Payment
                </button>
            </div> */}
            {/* <Common setProgress={setProgress} /> */}
            <div className="user-main-content-landing">
                <div className="user-profile">
                    <div className="profile-bg-user">
                        <div className="user-info">
                            <img src={user} className="user-prof-img" />
                            <div>
                                <div
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                    }}
                                    className="details-user"
                                >
                                    User 1234
                                </div>
                                <br></br>
                                <button className="connect-user">
                                    Connect
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="about-this-user">
                        <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                            About:
                        </span>
                        <span style={{ padding: "20px" }}>
                            This is the info about the user whose profile you
                            have visited{" "}
                        </span>
                    </div>
                </div>
                <div className="Slot-list">
                    <div className="filter-slots"></div>
                    <div className="slot-1-other">
                        <div className="slot-details-user">
                            <span
                                className="day-slot"
                                style={{ fontWeight: "bold" }}
                            >
                                Monday
                            </span>
                            <span className="date-slot">21/08/23</span>
                            <div></div>
                            <span className="amount-slot">
                                <b>Amount : </b> 500/-
                            </span>
                            {/* <button className="booking-this-slot">Book</button> */}
                        </div>
                        <div className="slot-timings">
                            <ul>
                                <li>
                                    7:00-12:00 <button> Book this Slot</button>
                                </li>
                                <li>
                                    7:00-12:00 <button> Book this Slot</button>
                                </li>
                                <li>
                                    7:00-12:00 <button> Book this Slot</button>
                                </li>
                                <li>
                                    7:00-12:00 <button> Book this Slot</button>
                                </li>
                                <li>
                                    7:00-12:00 <button> Book this Slot</button>
                                </li>
                                <li>
                                    7:00-12:00 <button> Book this Slot</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="slot-2-other">
                        <div className="slot-details-user">
                            <span className="day-slot">Monday</span>
                            <span className="date-slot">21/08/23</span>
                            <span className="amount-slot">500/-</span>
                            <button className="booking-this-slot">Book</button>
                        </div>
                    </div>
                    <div className="slot-3-other">
                        <div className="slot-details-user">
                            <span className="day-slot">Monday</span>
                            <span className="date-slot">21/08/23</span>
                            <span className="amount-slot">500/-</span>
                            <button className="booking-this-slot">Book</button>
                        </div>
                    </div>
                    <div className="slot-4-other">
                        <div className="slot-details-user">
                            <span className="day-slot">Monday</span>
                            <span className="date-slot">21/08/23</span>
                            <span className="amount-slot">500/-</span>
                            <button className="booking-this-slot">Book</button>
                        </div>
                    </div>
                    <div className="slot-5-other">
                        <div className="slot-details-user">
                            <span className="day-slot">Monday</span>
                            <span className="date-slot">21/08/23</span>
                            <span className="amount-slot">500/-</span>
                            <button className="booking-this-slot">Book</button>
                        </div>
                    </div>
                    <div className="slot-6-other">
                        <div className="slot-details-user">
                            <span className="day-slot">Monday</span>
                            <span className="date-slot">21/08/23</span>
                            <span className="amount-slot">500/-</span>
                            <button className="booking-this-slot">Book</button>
                        </div>
                    </div>
                    <div className="slot-7-other">
                        <div className="slot-details-user">
                            <span className="day-slot">Monday</span>
                            <span className="date-slot">21/08/23</span>
                            <span className="amount-slot">500/-</span>
                            <button className="booking-this-slot">Book</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CheckProfile;
