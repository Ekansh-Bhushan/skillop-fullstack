import React, { useEffect, useState } from 'react';
import Profileandevents from '../Profileandevents';
import Mobilecommonhead from '../../Mobilecommonhead';
// import scrollUp from '../../images/scrollUp.png';
import { getUser } from '../../../api/userRequest';
import { getNotifications } from '../../../api/getNotifications';
import Postlist from '../Postlist';

function Post({
  userData,
  setUserData,
  setProgress,
  Mentor,
  isFetched,
  notifyList,
  setMentor,
  setIsFetched,
  setNotifyList,
  setShowPostPopUp,
  showPostPopUp,
}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHome(true);
      } else {
        setIsHome(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const NotiData = await getNotifications();
      setNotifyList(NotiData.data.result);
    } catch (err) {
      console.log('Unable to fetch notifications', err);
    }
  };

  useEffect(() => {
    const refreshFN = async () => {
      const { data } = await getUser();
      setUserData(data.result);
      setMentor(data.result.isMentor);
      setIsFetched(true);
      await fetchNotifications();
    };
    refreshFN();
  }, []);
  

  return (
    <div className="homepage">
      {/* <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      /> */}

      {/* <Searchbar/> */}
      <Mobilecommonhead />
      {/* <Common setProgress={setProgress}/> */}
      <div className="main-content-landing">
  
          {isFetched && (
            <Postlist
              setProgress={setProgress}
              displaycreatepost={true}
              userData={userData}
              setUserData={setUserData}
              setShowPostPopUp={setShowPostPopUp}
              showPostPopUp={showPostPopUp}
            />
          )}
    
        <Profileandevents isHome={isHome} userData={userData} />
      </div>
      {/* <img id="scrollUp" onClick={scrollToTop} style={{ zIndex: "1000", position: "fixed", bottom: "20px", right: "20px", cursor: "pointer", borderRadius: "100%", boxShadow: "3px 3px 20px green" }} src={scrollUp} height={50} width={50} alt="scrollToTop" /> */}
    </div>
  );
}
export default Post;
