import { useEffect, useState } from 'react';
import './App.css';
import { getUser } from './api/userRequest';
import { Toaster } from 'react-hot-toast';
import AuthPage from './components/Maincomp';
import LoadingBar from 'react-top-loading-bar';
import { Emoji } from 'emoji-picker-react';
import { getNotifications } from './api/getNotifications';
import TopBar from './components/CommonTopBar/TopBar';

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
        const { data } = await getUser();
        setUserData(data.result);
        setMentor(data.result.isMentor);
        setIsFetched(true);
        setNotifyList(data.result.notifications);
      } catch (err) {
        if (!err.response.data.result) {
          localStorage.removeItem('skilloptoken');
          console.log(err.response.data.result);
        }
        console.log('Unable to fetch user', err);
      }
    };
    const fetchNotifications = async () => {
      try {
        const NotiData = await getNotifications();
        setNotifyList(NotiData.data.result);
      } catch (err) {
        console.log('Unable to fetch notifications', err);
      }
    };

    if (localStorage.getItem('skilloptoken')) {
      fetchUser();
      // fetchNotifications();
    }
  }, []);

  const [showPostPopUp, setShowPostPopUp] = useState(false);

  const excludedRoutes = [
    '/',
    '/mlogin',
    '/msignup',
    '/mpersonal',
    '/mcontact',
    '/mskill',
    '/mstudinfo',
    '/mprofinfo',
    '/mcover',
    '/msocial',
    '/signup',
    '/login',
    '/skill1',
    '/skill2',
    '/skill3',
    '/skill4',
    '/skill5',
    '/skill6',
    '/skill7',
    '/loginn',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/faqs',
    // Add more routes as needed
  ];
  const [shouldRender, setShouldRender] = useState(
    !excludedRoutes.includes(window.location.pathname)
  );

  return (
    <>
      {/* <RouteLanding/> */}
      <Toaster />
      <div className="md:hidden">
        {' '}
        {shouldRender && <TopBar setShowPostPopUp={setShowPostPopUp} />}
      </div>
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
        setShowPostPopUp={setShowPostPopUp}
        showPostPopUp={showPostPopUp}
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
