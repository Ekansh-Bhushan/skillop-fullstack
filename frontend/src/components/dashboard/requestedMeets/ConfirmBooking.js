import React, { useEffect, useState } from "react";
import "./ConfirmBooking.css";
import userIcon from "../../images/user.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMentorData } from "../../../api/mentorRequest";
import toast from "react-hot-toast";
import convertToNormalTime from "../../../utils/timeConversion";
import calculateTimeGap from "../../../utils/timeGap";

const ConfirmBooking = ({ setProgress, Mentor, isFetched, notifyList }) => {
    const mentorid = window.location.pathname.split("/")[2];
    const [data, setData] = useState({});
    const search = useLocation().search;
    const day = new URLSearchParams(search).get("day");
    const s = new URLSearchParams(search).get("s");
    const e = new URLSearchParams(search).get("e");
    const userid = new URLSearchParams(search).get("userid");
    const charge = new URLSearchParams(search).get("charge");

    console.log(day, s, e, userid, charge, mentorid);

    const navigate = useNavigate();

    const fetchUser = async () => {
        let user;
        try {
            user = await getMentorData(mentorid);
            if (user.data.result) {
                setData(user.data.result);
                console.log(user.data.result);
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

    return (
        <div style={{}}>
          

            <div className="confirm-container">
                <div className="left-content">
                    {data && (
                        <div className="cnf-user">
                            
                            <img
                                className="cnf-prof-pic"
                                src={userIcon}
                                alt="profile pic"
                            />
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
                    <div className="cnf-line2"></div>
                    <span>
                        <div id="cnf-round"></div>
                        <h3>Payment</h3>
                    </span>
                </div>

                <div className="right-content">
                    <h2>Confirm Booking</h2>
                    <div className="cnf-video">
                        <span className="call-details">
                            <div>
                                <div>Video</div>
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
                            </div>
                            <div>
                                <div>{calculateTimeGap(e, s)}</div>
                                <div>Change</div>
                            </div>
                        </span>
                        <span className="call-date">
                            <div>
                                <div>{day}</div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <img
                                        src="/calendar.png"
                                        width={30}
                                        alt=""
                                    />
                                    <span>Date</span>
                                </div>
                            </div>
                            <div>
                                <div>{convertToNormalTime(s)}</div>
                                <div>Change</div>
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
                                
                            }}
                        />
                    </div>
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
                        <button
                            className="proceed-btn"
                            onClick={() => onClickProceed()}
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBooking;
