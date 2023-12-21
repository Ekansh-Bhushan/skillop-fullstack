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
const Notification = ({
  setProgress,
  userData,
  setUserData,
  Mentor,
  isFetched,
}) => {
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
      {/* <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      /> */}
      <Mobilecommonhead />
      <div className="mt-0">
        <div>
          <Profileandevents userData={userData} />
        </div>

        <div className="d-flex items-center justify-center w-[50%] ml-[20vw] border-x-2 pt-[15vh]">
          <div className="text-3xl font-semibold pl-5 border-b-2 pb-5">
            <h2>Notifications</h2>
          </div>
          {/* <div className="notify-btns hidden">
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
          </div> */}
          {/* <div> */}
          {fetchingNotify && (
            <img src={spinner} className="spinner-css" alt="loading" />
          )}
          {/* </div> */}
          {!fetchingNotify && notifyList.length === 0 && (
            <h3 className="no-notify">No Notifications</h3>
          )}
          <div className="">
            {notifyList.map((item) => {
              const shouldDisplay =
                notiType === "all" ||
                (notiType === "new" && !item.read) ||
                (notiType === "read" && item.read);

              if (shouldDisplay) {
                return (
                  <div
                    onClick={() => markReadNotification(item._id)}
                    className={`border-b-2 ${
                      !item.read ? "" : "bg-[#84848426]"
                    }`}
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
      </div>

      <div className="side-nav-notifications"></div>
    </>
  );
};

export default Notification;
