import React, { useEffect, useState, useRef } from "react";
import logo from "../../images/logo.png";
import user from "../../images/user.png";
import searchIcon from "../../images/search.png";
import chatIcon from "../../images/chat.png";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getfilteredUser } from "../../../api/userRequest";
import { useLocation } from "react-router-dom";

function Common( {setProgress }) {
    const location = useLocation();
    const targetRef = useRef(null);
    const [InputValue, setInputValue] = useState("");

    const [postData, setPostData] = useState("");
    const handleInputChange2 = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    };
    const [setUsers, setUsersData] = useState([]);
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
    const navigate = useNavigate();
    const redirecttomyposts = () => {
        setProgress(40);
        navigate("/myposts");
        setTimeout(() => {
            setProgress(100);
        }, 200);
        setProgress(70);
    };
    const redirecttomydash = () => {
        setProgress(40);
        navigate("/myaccount");
        setTimeout(() => {
            setProgress(100);
        }, 200);
        setProgress(70);
    };

    const redirecttochats = () => {
        setProgress(40);
        navigate("/chat");
        setTimeout(() => {
            setProgress(100);
        }, 200);
        setProgress(70);
    };
    const redirecttohome = () => {
        setProgress(40);
        navigate("/homepage");
        setTimeout(() => {
            setProgress(100);
        }, 200);
        setProgress(70);
    };
    const blurbg = () => {
        document.querySelector(".search-field").classList.add("backblur");
        document.querySelector(".search-bar-landing").style.width = "300px";
        document.querySelector(".search-bar-landing").classList.add("backblur");

        document.querySelector(".search-bar-landing").style.background = "none";
        document.querySelector(".search-bar-landing").style.borderBottom =
            "1px solid gray";
        document.querySelector(".search-bar-landing").style.borderRadius = "0";
    };
    const showhideresults = (event) => {
        var z = document.querySelector(".filtered-results");
        var t = document.querySelector(".search-bar-landing");
        if (t.value.length) {
            z.classList.remove("hidethis");
        }

        const onChange = async () => {
            const req = {
                searchTerm: event.target.value,
            };

            try {
                const { data } = await getfilteredUser(req);

                // console.log(data.result);
                setUsersData(data.result);
            } catch (error) {
                console.log(error);
            }
        };
        onChange();
    };

    const shownavlanding = () => {
        var displaystatus = document.querySelector(".nav-landing-mob");
        var a = document.querySelector(".l1");
        var b = document.querySelector(".l2");
        var c = document.querySelector(".l3");
        if (displaystatus.classList[1]) {
            displaystatus.classList.remove("translatenav");
            a.classList.add("func1");
            b.classList.add("func2");
            c.classList.add("func3");
        } else {
            displaystatus.classList.add("translatenav");
            a.classList.remove("func1");
            b.classList.remove("func2");
            c.classList.remove("func3");
        }
    };

    const redirecttoprof = (id) => {
        navigate(`/profile/${id}`);
        window.location.reload();
    };
    const navigateNotification = () => {
        navigate('/notifications')
    }
    

    return (
        <>
            <div className="nav-landing">
                <div className="header-landing" styel={{cursor:'pointer'}} onClick={redirecttohome}>
                    <img src={logo} alt="SKILLOP Logo" />
                    <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                        SKILLOP
                    </span>
                </div>
                <div className="search-field" ref={targetRef}>
                    <input
                        className="search-bar-landing"
                        placeholder="Search Here"
                        onClick={blurbg}
                        onChange={showhideresults}
                    />
                    <button className="search-icon"><img src={searchIcon} height={23} width={23} alt="search-icon" /></button>
                    <div className="filtered-results hidethis">
                        
                        {setUsers.map((val, i) => (
                            <div key={i}>
                                <div>
                                    <img src={logo} />
                                    <span
                                        className="searched-details"
                                        onClick={() => {
                                            redirecttoprof(val._id);
                                        }}
                                    >
                                        {val.firstname}{" "}
                                    </span>
                                </div>
                                <div className="searched-results-partition"></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="right-options">
                   
                    <div className={`home ${location.pathname === '/homepage' ? "active" : ""}`} onClick={redirecttohome}>
                        <i
                            style={{ fontSize: "20px" }}
                            className="fa fa-home"
                        ></i>
                        <span style={{ fontSize: "16px" }}>
                            HOME
                        </span>
                    </div>
                    <div className={`${location.pathname === '/notifications' ? "notif-active" : ""} notifications`} onClick={navigateNotification}>
                        <i style={{ color: "gray" }} className="fa fa-bell fa-lg"></i>
                    </div>
                    <div className={`${location.pathname === '/chat' ? "active" : ""} messages`}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent:"center" }} className="chat-icon" onClick={redirecttochats}>
                            <img src={chatIcon} height={20} width={20} alt="chat-icon" />
                            <span
                                className="chat chat-icon"
                                onClick={redirecttochats}
                                >
                                Chats
                            </span>
                        </div>

                    </div>
                    <div className={`${location.pathname === '/myaccount' ? "active" : ""} profile-icon`}>
                        <img
                            className="user-profile"
                            src={user}
                            onClick={redirecttomydash}
                        />
                    </div>
                </div>
                <div className="hamburg-landing" onClick={shownavlanding}>
                    <div className="l1"></div>
                    <div className="l2"></div>
                    <div className="l3"></div>
                </div>
            </div>
            <div className="search-field-mob">
                <input
                    className="search-bar-landing-mob"
                    placeholder="Search Here"
                    onClick={blurbg}
                    onChange={handleInputChange2}
                    value={InputValue}
                />
            </div>
            {InputValue.length >= 1 ? (
                <div className="filtered-results-mob">
                    <div className="searched-results-mob">
                        <span className="searched-results">
                            <img src={user} />
                            <div>Lakshay</div>
                        </span>
                        <div className="partition-mob"></div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="nav-landing-mob translatenav">
                {/* <span onClick={redirecttomyposts}>My Posts</span> */}
                <span onClick={redirecttohome}>Home</span>
                <span onClick={navigateNotification}>Notifications</span>
                <span onClick={redirecttochats}>Chat</span>
                <span onClick={redirecttomydash}>Profile</span>
            </div>
        </>
    );
}

export default Common;
