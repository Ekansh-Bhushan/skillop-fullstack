import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import Commondash from "../common";
import Topbar from "../topbar";
import Profileandevents from "../../Landing/Profileandevents";
import "./earning.css";
import toast from "react-hot-toast";
import spinner from "../../../components/images/spinner.gif";
import { getEarnings } from "../../../api/mentorRequest";
import Mobilecommonhead from "../../Mobilecommonhead";
import UpcomingEvents from "../../Landing/Profileandevents/UpcomingEvents";

function Earning({ userData, setProgress, Mentor}) {
  const navigate = useNavigate();
  const [earnings, setEarnings] = useState({});

  useEffect(() => {
    console.log(userData.isMentor);

    const getEarn = async () => {
      try {
        setProgress(40);
        const { data } = await getEarnings();
        setEarnings(data.result);
        console.log(data.result);
        setProgress(100);
        if (!data.result) {
          toast.error("Error fetching earnings!");
        }
      } catch (error) {
        // toast.error("Error fetching earnings");
        console.log(error.response.data.error);
      }
    };
    getEarn();
  }, []);

  if (!Mentor) {
    console.log("hi ", userData.firstname, userData.isMentor);
    navigate("/homepage");
    toast.error("Earning page is 🔒 locked\nBecome a MENTOR 😎 to unlock!");
    return null;
  }

  return (
    <>
      <Profileandevents />
    
      <Mobilecommonhead />
      <div className="dash-main">
        {/* <Commondash userData={userData} /> */}

        <div className="earning-dash">
          {/* <Profileandevents /> */}
          {/* <Topbar setProgress={setProgress}/> */}
          <h1 className="text-2xl mt-14 font-semibold mb-2">
            Your Analytics 🤑
          </h1>
          <div className="earning-details">
            <div className="total-mentee relative">
              <h3 className="absolute top-[10%] text-center w-[80%] md:w-[100%]">
                TOTAL MENTEES
              </h3>
              <h1 className="absolute top-[40%] text-center w-[80%] text-3xl font-semibold md:text-xl ">
                {earnings.numberOfMentee}
              </h1>
            </div>
            <div className="earnings-dash relative">
              <h3 className="absolute  top-[10%] text-center w-[80%]">
                Total Earnings
              </h3>
              <h1 className="absolute top-[40%] text-center w-[80%] text-3xl font-semibold md:text-md md:w-[100%]">
                ₹ {Math.round(earnings.totalEarning)}/-
              </h1>
            </div>
          </div>

          {/* <div className="partition-d line-earning"></div> */}
          <h1 className="text-xl font-semibold mt-5 md:text-lg">Mentees</h1>
          {earnings ? (
            <div className="flex items-center justify-center flex-col">
              {earnings.earningRecord &&
                Object.keys(earnings.earningRecord).map((item, index) => (
                  <div
                    className="flex items-center justify-between border-b border-gray-300 py-2 w-full"
                    key={index}
                  >
                    <div style={{ width: "10%" }}>{index + 1}.</div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(
                          "/public-profile/" +
                            earnings.earningRecord[item].link.split("/")[2]
                        )
                      }
                      style={{ textAlign: "left", width: "30%" }}
                    >
                      {earnings.earningRecord[item].name}
                    </div>
                    <div style={{ width: "30%" }}>
                      ₹{Math.round(earnings.earningRecord[item].totalEarning)}
                    </div>
                    <div style={{ width: "30%" }}>Completed</div>
                  </div>
                ))}
            </div>
          ) : (
            <img src={spinner} className="absolute right-[50vw]" />
          )}
        </div>
      </div>
    </>
  );
}

export default Earning;
