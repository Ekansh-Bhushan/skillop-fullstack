import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import axios from "axios";
import { logoutUser } from "../../../api/logoutRequest";

function Topbar({setProgress}) {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            setProgress(30);
            const { data } = await logoutUser();
            // console.log(data);
            setProgress(100);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
        localStorage.removeItem("skilloptoken");
        navigate("/");
        setProgress(100);
    };
    useEffect(() => {
        // This code will run when the component mounts (DOM content is loaded)
        document.querySelector(".side-nav-mob").classList.add("display");

        // You can put your specific JavaScript code here
        // For example, you can interact with the DOM or fetch data
    }, []);
    const displaynavmob = () => {
        var x = document.querySelector(".side-nav-mob");
        if (x.classList[1]) {
            x.classList.remove("display");
        } else {
            x.classList.add("display");
        }
    };
    const redirecttomyslots = () => {
        setProgress(30);
        setTimeout(() => {
            setProgress(100);
        }, 200);
        navigate("/mySlots");
        setProgress(60);
    };
    const redirecttomyearnings = () => {
        setProgress(30);
        setTimeout(() => {
            setProgress(100);
        }, 200);
        navigate("/myearnings");
        setProgress(60);
    };
    const redirecttomybookings = () => {
        setProgress(30);
        setTimeout(() => {
            setProgress(100);
        }, 200);
        navigate("/mybookings");
        setProgress(60);
    };
    const redirecttomyaccount = () => {
        setProgress(30);
        setTimeout(() => {
            setProgress(100);
        }, 200);
        navigate("/myaccount");
        setProgress(60);
    };
    const redirectbacktohome = () => {
        setProgress(30);
        setTimeout(() => {
            setProgress(100);
        }, 200);
        navigate("/homepage");
        setProgress(60);
    };
    return (
        <>
            <div className="dash-nav">
                <div style={{ display: "flex", alignItems: "center" }} onClick={redirectbacktohome}>
                    <img src={logo} alt="SKILLOP Logo" />
                    <div>SKILLOP</div>
                </div>
                <div className="hide-on-mob" onClick={redirectbacktohome}>
                    Home
                </div>
                <div className="hide-on-mob" onClick={redirecttomyslots}>
                    Slots
                </div>
                <div className="hide-on-mob" onClick={redirecttomybookings}>
                    Bookings
                </div>
                <div className="hide-on-mob" onClick={redirecttomyearnings}>
                    Earnings
                </div>
                <div className="hide-on-mob " onClick={redirecttomyaccount}>
                    Account
                </div>
                <div className="view-on-mob">My Profile</div>
                <div className="login-out hide-on-mob" onClick={logout}>
                    Log Out
                </div>
                <div className="hamburg-dash" onClick={displaynavmob}>
                    <div className="line1-dash"></div>
                    <div className="line2-dash"></div>
                    <div className="line3-dash"></div>
                </div>
            </div>
            <div className="side-nav-mob">
                <div onClick={redirectbacktohome}>Home</div>
                <div onClick={redirecttomyslots}>Slots</div>
                <div onClick={redirecttomybookings}>Bookings</div>
                <div onClick={redirecttomyearnings}>Earnings</div>
                <div onClick={redirecttomyaccount}>Account</div>
                <div>My Profile</div>
                <div onClick={logout}>Logout</div>
            </div>
            <div className="partition-d"></div>
        </>
    );
}

export default Topbar;
