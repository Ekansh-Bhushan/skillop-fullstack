import React, { useEffect, useState } from "react";
import MyProfile from "../myprof";
import user from "../../images/user.png";
import "./notification.css";
import Box from "./notify box/box";
import Profileandevents from "../Profileandevents";
import SideNav from "../../SideNav/SideNav";
import "./notification.css";
import spinner from "../../images/spinner.gif";
import {
  getNotifications,
  readNotifications,
} from "../../../api/getNotifications";
import Mobilecommonhead from "../../Mobilecommonhead";
import toast from "react-hot-toast";

// function Notify({ userData }) {
const Notification = ({ setProgress, userData,setUserData, Mentor, isFetched }) => {
  const [selectedButton, setSelectedButton] = useState("All"); // Initial selected button
  const [notifyList, setNotifyList] = useState([]);
  const [fetchingNotify, setFetchingNotify] = useState(false);
  const [notiType, setNotiType] = useState("all");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const fetchNotifications = async () => {
    try {
      setFetchingNotify(true);
      const NotiData = await getNotifications();
      setNotifyList(NotiData.data.result);
      setFetchingNotify(false);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log("Unable to fetch notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markReadNotification = async (id) => {
    // console.log("markreadnotify")
    try {
      await readNotifications(id);
    } catch (err) {
      console.log("Unable to mark read notification", err);
    }
  };

  return (
    <>
      <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      />
      <Mobilecommonhead />
      <div className="profile-notify">
        <Profileandevents userData={userData} />

        <div className="notify">
          <div className="heading">
            <h1>Notifications</h1>
          </div>
          <div className="notify-btns" style={{ marginBottom: "40px" }}>
            <button
              className={selectedButton === "All" ? "selected" : ""}
              onClick={() => {
                handleButtonClick("All");
                setNotiType("all");
              }}
            >
              All ({notifyList.length})
            </button>
            <button
              className={selectedButton === "New" ? "selected" : ""}
              onClick={() => {
                handleButtonClick("New");
                setNotiType("new");
              }}
            >
              New ({notifyList.filter((item) => item.read === false).length})
            </button>
            <button
              className={selectedButton === "Read" ? "selected" : ""}
              onClick={() => {
                handleButtonClick("Read");
                setNotiType("read");
              }}
            >
              Read ({notifyList.filter((item) => item.read === true).length})
            </button>
            <button
              className={selectedButton === "Primary" ? "selected" : ""}
              onClick={() => handleButtonClick("Primary")}
            >
              Primary ({notifyList.length})
            </button>
          </div>
          <div>
            {fetchingNotify && (
              <img src={spinner} className="spinner-css" alt="loading" />
            )}
          </div>
          {!fetchingNotify && notifyList.length === 0 && (
            <h3 className="no-notify">No Notifications</h3>
          )}
          {notifyList.map((item) => {
            const shouldDisplay =
              notiType === "all" ||
              (notiType === "new" && !item.read) ||
              (notiType === "read" && item.read);

            if (shouldDisplay) {
              return (
                <div
                  onClick={() => markReadNotification(item._id)}
                  className={`${!item.read ? "box-color" : "box"}`}
                >
                  <Box
                    message={item.message}
                    time={item.__created}
                    url={item.link}
                    isread={item.read}
                    id={item._id}
                    category={item.type}
                    type={notiType}
                    img={item.fromUserProfileImg}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className="side-nav-notifications"></div>
    </>
  );
};

export default Notification;
