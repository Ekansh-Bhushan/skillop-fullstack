import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import Commondash from "../common";
import Topbar from "../topbar";
import Profileandevents from "../../Landing/Profileandevents";
import "./earning.css";
import toast from "react-hot-toast";

import { getEarnings } from "../../../api/mentorRequest";
import Mobilecommonhead from "../../Mobilecommonhead";

function Earning({ userData, setProgress, Mentor, isFetched, notifyList }) {
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
      {/* <SideNav setProgress={setProgress} Mentor={Mentor} isFetched={isFetched} notifyList={notifyList} /> */}
      <Mobilecommonhead />
      <div className="dash-main">
        {/* <Commondash userData={userData} /> */}

        <div className="earning-dash">
          <Profileandevents />
          {/* <Topbar setProgress={setProgress}/> */}
          <div className="earning-details">
            <div className="total-mentee">
              <h1>{earnings.numberOfMentee}</h1>
              <h3>TOTAL MENTEES</h3>
            </div>
            <div className="earnings-dash">
              <h1>₹ {Math.round(earnings.totalEarning)}/-</h1>
              <h3>Total Earnings</h3>
            </div>
          </div>

          <div className="partition-d line-earning"></div>

          <div className="info-dash-table">
            <table>
              <thead>
                <tr>
                  <th className="table-head">S.no.</th>
                  <th className="table-head">Mentee Name</th>
                  <th className="table-head">Earning</th>
                  <th className="table-head">Status</th>
                </tr>
              </thead>
              {earnings.earningRecord &&
                Object.keys(earnings.earningRecord).map((item, index) => (
                  <tbody>
                    <tr>
                      <td style={{ width: "0.1vw" }}>{index + 1}.</td>
                      <td
                        style={{ textAlign: "left" }}
                        id="mentee_name"
                        onClick={() =>
                          navigate("/public-profile/"+earnings.earningRecord[item].link.split('/')[2])
                        }
                      >
                        {earnings.earningRecord[item].name}
                      </td>
                      <td>₹{Math.round(earnings.earningRecord[item].totalEarning)}</td>
                      <td>Completed</td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Earning;
