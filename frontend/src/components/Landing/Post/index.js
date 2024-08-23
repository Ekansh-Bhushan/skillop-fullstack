import React, { useContext, useEffect, useState } from "react";
import Profileandevents from "../Profileandevents";
import Mobilecommonhead from "../../Mobilecommonhead";
import { getUser } from "../../../api/userRequest";
import { getNotifications } from "../../../api/getNotifications";
import Postlist from "../Postlist";
import { MainContext } from "../../../context/MainContextProvider";
import toast from "react-hot-toast";

function Post({
  userData,
  setUserData,
  setProgress,
  isFetched,
  setMentor,
  setIsFetched,
  setNotifyList,
}) {
  const [isHome, setIsHome] = useState(false);
  const [reloadPost, setReloadPost] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHome(true);
      } else {
        setIsHome(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const NotiData = await getNotifications();
      setNotifyList(NotiData.data.result);
    } catch (err) {
      toast.error("Unable to fetch notifications", err);
    }
  };
  const { currentUser, setCurrentUser } = useContext(MainContext);
  useEffect(() => {
    const refreshFN = async () => {
      if (!currentUser) {
        const { data } = await getUser();
        setUserData(data.result);
        setMentor(data.result.isMentor);
        setCurrentUser(data.result);
      } else {
        setUserData(currentUser);
        setMentor(currentUser.isMentor);
      }
      setIsFetched(true);
      await fetchNotifications();
    };
    refreshFN();
  }, []);

  return (
    <div className="homepage">
      <Mobilecommonhead
        setProgress={setProgress}
        setReloadPost={setReloadPost}
        reloadPost={reloadPost}
      />
      <div className="main-content-landing">
        {isFetched && (
          <Postlist
            setProgress={setProgress}
            displaycreatepost={true}
            userData={userData}
          />
        )}

        <Profileandevents isHome={isHome} userData={userData} />
      </div>
    </div>
  );
}
export default Post;
