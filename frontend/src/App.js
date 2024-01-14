import { useEffect, useState } from 'react';
import './App.css';
import { getUser } from './api/userRequest';
import toast, { Toaster } from 'react-hot-toast';
import AuthPage from './components/Maincomp';
import LoadingBar from 'react-top-loading-bar';
import { Emoji } from 'emoji-picker-react';
import { getNotifications } from './api/getNotifications';
import TopBar from './components/CommonTopBar/TopBar';
import { useNavigate } from 'react-router-dom';

function App({ location }) {
  const [userData, setUserData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [Mentor, setMentor] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [notifyList, setNotifyList] = useState([]);

  const pagesToNotRedirect = [
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
    '/careers',
    '/resetpassword',
    '/password/reset',
  ];

  const redirectIfNotAuthorize = () => {
    localStorage.removeItem('skilloptoken');
    console.log(window.location.pathname);

    if (
      !pagesToNotRedirect.includes((element, index) => {
        return (
          element === window.location.pathname ||
          window.location.pathname.includes(element)
        );
      })
    )
      return;
    toast.error('Please Login/Signup to continue');

    if (window.innerWidth > 500)
      window.location.replace(`/login?redirect=${window.location.pathname}`);
    else
      window.location.replace(`/mlogin?redirect=${window.location.pathname}`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUser();
        if (data.result) {
          setUserData(data.result);
          setMentor(data.result.isMentor);
          setIsFetched(true);
          setNotifyList(data.result.notifications);
        } else {
          console.log(data.result);
          redirectIfNotAuthorize();
        }
      } catch (err) {
        if (!err.response.data.result) {
          console.log(err.response.data.result);
          redirectIfNotAuthorize();
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
    setShouldRender(!excludedRoutes.includes(window.location.pathname));

    if (localStorage.getItem('skilloptoken')) {
      fetchUser();
      // fetchNotifications();
    } else {
      redirectIfNotAuthorize();
    }
  }, [window.location.pathname]);

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
    '/careers',
    '/admin',
    '/admin/skillop-dtu/1941',
    // Add more routes as needed
  ];

  const [shouldRender, setShouldRender] = useState(
    !excludedRoutes.includes(window.location.pathname)
  );

  const navigate = useNavigate();

  return (
    <>
      <Toaster />
      <div className='md:hidden'>
        {shouldRender && (
          <TopBar setShowPostPopUp={setShowPostPopUp} navigate={navigate} />
        )}
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
        color='#f11946'
        height={4}
        progress={progress}
        shadow={true}
      />
      <Emoji />
    </>
  );
}

export default App;
