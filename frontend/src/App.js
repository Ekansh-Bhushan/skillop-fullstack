import { useEffect, useState } from "react";
import "./App.css";
import { getUser } from "./api/userRequest";
import { Toaster } from 'react-hot-toast';
import AuthPage from "./components/Maincomp";
import LoadingBar from "react-top-loading-bar";
import SideNav from '../src/components/SideNav/SideNav'
import Searchbar from "./components/Searchbar";
import Mobilecommonhead from "./components/Mobilecommonhead";
import { Emoji } from "emoji-picker-react";
import { getNotifications } from "./api/getNotifications";

function App() {
  const [userData, setUserData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [Mentor, setMentor] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [notifyList, setNotifyList] = useState([]);

  // GET USER DATA
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {data} = await getUser();
        setUserData(data.result);
        setMentor(data.result.isMentor);
        setIsFetched(true);
      }
      catch (err) {
        console.log("Unable to fetch user", err);
      }
    }

    const fetchNotifications = async () => {
      try {
        const NotiData = await getNotifications();
        setNotifyList(NotiData.data.result);
      }
      catch (err) {
        console.log("Unable to fetch notifications", err);
      }
    }
    fetchUser();
    fetchNotifications();
  }, []);

  return (
    <>
      {/* <RouteLanding/> */}
      <Toaster />
      <AuthPage Mentor={Mentor} isFetched={isFetched} notifyList={notifyList} userData={userData} setUserData={setUserData } setProgress={setProgress}/>
      <LoadingBar
        color="#f11946"
        height={4}
        progress={progress}
        shadow={true}
      />
      <Emoji />
    </>
  );
}

export default App;
