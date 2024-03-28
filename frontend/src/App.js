import { useContext, useEffect, useState } from 'react';
import './App.css';
import { getUser } from './api/userRequest';
import toast, { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import { Emoji } from 'emoji-picker-react';
import TopBar from './components/CommonTopBar/TopBar';
import { useNavigate } from 'react-router-dom';
import WebPages from './components/Maincomp';
import { MainContext } from './context/MainContextProvider';
export const pagesToNotRedirect = [
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

function App() {
  const [userData, setUserData] = useState(null);
  const [Mentor, setMentor] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [notifyList, setNotifyList] = useState([]);

  const { progress, setProgress } = useContext(MainContext);

  const redirectIfNotAuthorize = () => {
    localStorage.removeItem('skilloptoken');
    if (pagesToNotRedirect.includes(window.location.pathname)) {
      return;
    }
    toast.error('Please Login/Signup to continue');

    if (window.innerWidth > 500) {
      navigate(`/login?redirect=${window.location.pathname}`);
    } else {
      navigate(`/mlogin?redirect=${window.location.pathname}`);
    }
  };

  useEffect(() => {
    setShouldRender(!excludedRoutes.includes(window.location.pathname));
  }, [window.location.pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUser();
        console.log(data);
        if (data.result) {
          console.log('authorized user ');
          setUserData(data.result);
          setMentor(data.result.isMentor);
          setIsFetched(true);
          setNotifyList(data.result.notifications);
        } else {
          console.log('Unauthorize : redirecting...');
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
    if (localStorage.getItem('skilloptoken')) {
      console.log('token found going to fetch user');
      fetchUser();
    } else {
      console.log('token not found redirecting to login/signup');
      redirectIfNotAuthorize();
    }
  }, []);

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
      <div className='md:hidden'>{shouldRender && <TopBar />}</div>
      <WebPages
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