import React, { useEffect, useState } from "react";
import Postlist from "../Postlist";
import SideNav from "../../SideNav/SideNav";
import Profileandevents from "../Profileandevents";
import Mobilecommonhead from "../../Mobilecommonhead";

function Post({ userData, setProgress, Mentor, isFetched, notifyList }) {
  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // }

  const [isHome, setIsHome] = useState(false);

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
  // Function to handle input changes

  // useEffect(()=>{
  //   window.location.reload();
  // },[])

  return (
    <div className="homepage">
      <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      />
      {/* <Searchbar/> */}
      <Mobilecommonhead />

      {/* <Common setProgress={setProgress}/> */}

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
      {/* <img id="scrollUp" onClick={scrollToTop} style={{ zIndex: "1000", position: "fixed", bottom: "20px", right: "20px", cursor: "pointer", borderRadius:"100%", boxShadow:"3px 3px 20px green"}} src={scrollUp} height={50} width={50} alt="scrollToTop" /> */}
    </div>
  );
}
export default Post;
