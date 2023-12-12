import { useEffect, useState } from "react";
import "./App.css";
import { getUser } from "./api/userRequest";
import { Toaster } from "react-hot-toast";
import AuthPage from "./components/Maincomp";
import LoadingBar from "react-top-loading-bar";
import { Emoji } from "emoji-picker-react";
import { getNotifications } from "./api/getNotifications";

import { gapi } from "gapi-script";

const clientId =
    "107286850999-b807i22qqt7abdvq69lb6a0qsqmd67e1.apps.googleusercontent.com";

function App() {
    const [userData, setUserData] = useState(null);
    const [progress, setProgress] = useState(0);
    const [Mentor, setMentor] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [notifyList, setNotifyList] = useState([]);

    // const navigate = useNavigate();

    // GET USER DATA
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await getUser();
                setUserData(data.result);
                setMentor(data.result.isMentor);
                setIsFetched(true);
            } catch (err) {
                if (!err.response.data.result) {
                    localStorage.removeItem("skilloptoken");
                    console.log("here is ", err.response.data.result);
                    // navigate('/');
                    // toast.error("Session expired, Login again!");
                }
                console.log("Unable to fetch user", err);
            }
        };

        const fetchNotifications = async () => {
            try {
                const NotiData = await getNotifications();
                setNotifyList(NotiData.data.result);
            } catch (err) {
                console.log("Unable to fetch notifications", err);
            }
        };
        fetchUser();
        fetchNotifications();
    }, []);

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            });
        }
        gapi.load("client:auth2", start);
    }, []);

    return (
        <>
            {/* <RouteLanding/> */}
            <Toaster />
            <AuthPage
                setNotifyList={setNotifyList}
                Mentor={Mentor}
                setMentor={setMentor}
                setIsFetched={setIsFetched}
                isFetched={isFetched}
                notifyList={notifyList}
                userData={userData}
                setUserData={setUserData}
                setProgress={setProgress}
            />
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
