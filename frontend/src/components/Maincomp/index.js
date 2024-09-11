import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Chat from '../Landing/chatroom';
import Dashboard from '../dashboard/Slots';
import Account from '../dashboard/account';
import Bookings from '../dashboard/bookings';
import Earning from '../dashboard/earnings';
import Post from '../Landing/Post';
import Notification from '../Landing/notifications/notification';
import PublicProfile from '../PublicProfile/PublicProfile';
import Otherpost from '../Landing/Otherpost';
import Profile from '../Profile/profile';
import Searchbar from '../Searchbar';
import Addskills from '../Page9';
import Bookslot from '../Bookslot';
import UserPost from '../UserPosts/UserPosts';
import EditSkillsPage from '../Profile/EditSkills/EditSkillsPage';
import ConfirmBooking from '../dashboard/bookings/ConfirmBooking';
import Payment from '../dashboard/bookings/Payment';
import EditPic from '../Profile/EditPic/EditPic';
// import FinalLandinPage from '../../landing/Page'
import FinalLandinPage from '../../landing/newlanding'
import RequestedMeets from '../dashboard/requestedMeets';
import MentorBano from '../MentorBano/mentorBano';
import PlatformfeedbackForm from '../PlatfromFeedback/PlatformfeedbackForm';
import MentorfeedbackForm from '../MentorFeedback/feedbackForm';
import ChangePasswordPage from '../passwordChange/changepassword';
import ResetPasswordPage from '../resetpassword/resetpassword';
import ResetPasswordEmail from '../resetpassword/resetpasswordEmail';
import Admin from '../Admin Panel/Admin';
import PublicPost from '../PublicPost';
import Page from '../../landing/Page';
import Page1 from '../auth/Page1';
import Login from '../auth/Login';
import SkillThree from '../auth/SkillThree';
import SkillFour from '../auth/SkillFour';
import About from '../Misc Pages/AboutNew';
import Contact from '../Misc Pages/Contact';
import PrivacyPolicy from '../Misc Pages/PrivacyPolicy';
import Faqs from '../Misc Pages/Faqs';
import SkillSix from '../auth/SkillSix';
import SkillSeven from '../auth/SkillSeven';
import Mlogin from '../mobileauth/Mlogin';
import Msignup from '../mobileauth/Msignup';
import MPersonal from '../mobileauth/MPersonal';
import MContact from '../mobileauth/MContact';
import MSkills from '../mobileauth/MSkills';
import MStudentInfo from '../mobileauth/MStudentInfo';
import MProfInformation from '../mobileauth/MProfInformation';
import Cover from '../mobileauth/Cover';
import Social from '../mobileauth/Social';
import SideNav from '../SideNav/SideNav';
import TermsOfService from '../Misc Pages/TermsOfService';
import AuthorizeZoomMeet from '../dashboard/bookings/AuthorizeZoomMeet';
import HashtagPage from '../../api/hashtag';
import NotworkingBokking from '../../components/dashboard/bookings/Notworking/notworkingbooking'
import Student_Dasboard from '../SocietyMember/DashBoard/dashboard'
import NoteMaking from '../SocietyMember/Notes/notes'
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Admin_Users from '../Admin Panel/Admin_Users';
import Admin_Dashboard from '../Admin Panel/Admin_Dashboard';
import CreateEvent from '../Admin Panel/CreateEvent';
import MlLogin from '../MLEvent/Login';
import LeaderBoard from '../MLEvent/LeaderBoard';
import QuestionOne from '../MLEvent/questions/questionOne';
import QuestionTwo from '../MLEvent/questions/questionTwo'
import QuestionThree from '../MLEvent/questions/questionThird'
import QuestionFour from '../MLEvent/questions/questionFour'
import QuestionFive from '../MLEvent/questions/questionfive'
import QuestionSix from '../MLEvent/questions/questionSix'
import QuestionSeven from '../MLEvent/questions/questionSeven'
import QuestionEight from '../MLEvent/questions/questionEight'
import QuestionNine from '../MLEvent/questions/questionNine'
import QuestionTen from '../MLEvent/questions/quesitonTen'
import HintTwo from '../MLEvent/hint/hintTwo'


function WebPages({
  userData,
  setUserData,
  setProgress,
  Mentor,
  setMentor,
  isAdmin,
  isSocietyMember,
  setIsAdmin,
  setIsSocietyMember,
  isFetched,
  notifyList,
  setIsFetched,
  setNotifyList,
}) {
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
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/faqs',
    '/loginn',
    '/careers',
    '/admin',
    '/admin/skillop-dtu/1941',
    '/Admin_Dashboard' ,
    '/Admin_Users',
    '/Admin_Events',
    '/dashboard',
    '/dashboard/notes'

    // Add more routes as needed
  ];

  const [shouldRender, setShouldRender] = useState(
    !excludedRoutes.includes(window.location.pathname)
  );

  useEffect(() => {
    setShouldRender(!excludedRoutes.includes(window.location.pathname));
  }, [window.location.pathname]);

  return (
    <>
      {shouldRender && userData && (
        <SideNav
          setProgress={setProgress}
          Mentor={Mentor}
          isAdmin={isAdmin}
          isSocietyMember={isSocietyMember}
          isFetched={isFetched}
          notifyList={notifyList}
        />
      )}

      {/* -----------------------------MOBILE SIGN UP PAGES-------------------------------- */}

      <Routes>
        <Route path='/' element={<FinalLandinPage setProgress={setProgress} />} />
        <Route path='/mlogin' element={<Mlogin setProgress={setProgress} />} />
        <Route
          path='/msignup'
          element={<Msignup setProgress={setProgress} />}
        />
        <Route
          path='/mpersonal'
          element={<MPersonal setProgress={setProgress} />}
        />
        <Route
          path='/mcontact'
          element={<MContact setProgress={setProgress} />}
        />
        <Route path='/mskill' element={<MSkills setProgress={setProgress} />} />
        <Route
          path='/mstudinfo'
          element={<MStudentInfo setProgress={setProgress} />}
        />
        <Route
          path='/mprofinfo'
          element={<MProfInformation setProgress={setProgress} />}
        />
        <Route path='/mcover' element={<Cover setProgress={setProgress} />} />
        <Route path='/msocial' element={<Social setProgress={setProgress} />} />

        {/* -----------------------------DESKTOP SIGN UP PAGES------------------------------ */}

        <Route path='/signup' element={<Page1 setProgress={setProgress} />} />
        <Route path='/login' element={<Login setProgress={setProgress} />} />
        {/* Skills page */}
        <Route
          path='/skill3'
          element={<SkillThree setProgress={setProgress} />}
        />
        {/* College/Edu details page */}
        <Route
          path='/skill4'
          element={<SkillFour setProgress={setProgress} />}
        />
        {/* Profile & Cover Photo page */}
        <Route
          path='/skill6'
          element={<SkillSix setProgress={setProgress} />}
        />
        {/* Final page */}
        <Route
          path='/skill7'
          element={<SkillSeven setProgress={setProgress} />}
        />

        {/* -----------------------------MISCELLANEOUS PAGES------------------------------ */}

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/careers' element={<Faqs />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />

        {/* -----------------------------MAIN WEB PAGES------------------------------ */}

        <Route path='post/:postId' element={<PublicPost />} />

        <Route
          path='/homepage'
          element={
            <Post
              userData={userData}
              setUserData={setUserData}
              setProgress={setProgress}
              Mentor={Mentor}
              isAdmin={isAdmin}
              isSocietyMember={isSocietyMember}
              setIsAdmin={setIsAdmin}
              setIsSocietyMember={setIsSocietyMember}
              isFetched={isFetched}
              notifyList={notifyList}
              setMentor={setMentor}
              setIsFetched={setIsFetched}
              setNotifyList={setNotifyList}
            />
          }
        />

        <Route
          path='/chat'
          element={
            userData && <Chat userData={userData} setProgress={setProgress} />
          }
        />
        <Route
          path='/myaccount'
          element={
            userData && (
              <Account userData={userData} setProgress={setProgress} />
            )
          }
        />

        <Route
          path='/userposts/:id'
          element={<UserPost setProgress={setProgress} />}
        />

        <Route
          path='/mybookings'
          element={
            userData && (
              <Bookings
                userData={userData}
                setProgress={setProgress}
                Mentor={Mentor}
              />
            )
          }
        />

        <Route
          path='/requestedMeets'
          element={userData && <RequestedMeets setProgress={setProgress} />}
        />

        <Route
          path='/mySlots'
          element={
            userData && (
              <Dashboard
                userData={userData}
                setProgress={setProgress}
                shouldbevisible={true}
                Mentor={Mentor}
              />
            )
          }
        />

        <Route
          path='/myearnings'
          element={
            userData && (
              <Earning
                userData={userData}
                setProgress={setProgress}
                Mentor={Mentor}
              />
            )
          }
        />

        <Route
          path='/postsection/:postId'
          element={
            userData && (
              <Otherpost setProgress={setProgress} userData={userData} />
            )
          }
        />
        <Route
          path='/public-profile/:userId'
          element={
            <PublicProfile userDatamain={userData} setProgress={setProgress} />
          }
        />

        <Route
          path='/notifications'
          element={
            <Notification
              setProgress={setProgress}
              userData={userData}
              setUserData={setUserData}
            />
          }
        />
        <Route path='/dashboard' element={<Student_Dasboard/>}/>
        <Route path='/dashboard/notes' element={<NoteMaking/>}/>
        <Route
          path='/profile'
          element={<Profile setProgress={setProgress} />}
        />
        <Route
          path='/Admin_Users'
          element={<Admin_Users setProgress={setProgress} />}
        />
        <Route
          path='/Admin_Dashboard'
          element={<Admin_Dashboard setProgress={setProgress} />}
        />
        <Route
          path='/Admin_Events'
          element={<CreateEvent setProgress={setProgress} />}
        />
        <Route
          path='/searchbar'
          element={<Searchbar setProgress={setProgress} />}
        />

        <Route
          path='/hashtag/:hashtag'
          element={<HashtagPage setProgress={setProgress} />}
        />

        <Route
          path='/authskill'
          element={
            <Addskills
              userData={userData}
              setProgress={setProgress}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
            />
          }
        />

        <Route
          path='/mentorBano'
          element={<MentorBano setProgress={setProgress} />}
        />

        <Route
          path='/bookslot/:userId'
          element={<Bookslot userData={userData} setProgress={setProgress} />}
        />

        <Route
          path='/authorize-zoom-meet/:mentorid/:day/:s/:e/:userid/:charge'
          element={<AuthorizeZoomMeet setProgress={setProgress} />}
        />

        <Route
          path='/confirm-booking/:mentorid/:day/:s/:e/:userid/:charge'
          element={<ConfirmBooking setProgress={setProgress} />}
        />
        <Route
          path='/payment/:userId'
          element={<Payment setProgress={setProgress} />}
        />

        {/* Password resetting / forget password */}
        <Route path='/changePassword' element={<ChangePasswordPage />} />
        <Route path='/password/reset/:id' element={<ResetPasswordPage />} />
        <Route path='/resetPasswordEmail' element={<ResetPasswordEmail />} />

        <Route path='/mentorfeedback' element={<MentorfeedbackForm />} />

        <Route
          path='/platformfeedback'
          element={<PlatformfeedbackForm setProgress={setProgress} />}
        />

        {/* <Route
          path='/hashtag/:hashtag'
          element={<HashtagPage setProgress={setProgress} />}
        /> */}

        <Route
          path='/editskills'
          element={<EditSkillsPage setProgress={setProgress} />}
        />
        <Route path='/ml-login' element={<MlLogin/>} />
        <Route path='/leaderboard' element={<LeaderBoard/>} />
        <Route path='/question/54sdf5443' element={<QuestionOne/>} />
        <Route path='/question/14suj8d59' element={<QuestionTwo/>} />
        <Route path='/question/86asdj8d9' element={<QuestionThree/>} />
        <Route path='/question/asdfr3456' element={<QuestionFour/>} />
        <Route path='/question/45j9dm8rd' element={<QuestionFive/>} />
        <Route path='/question/notforwardpropogation' element={<QuestionSix/>} />
        <Route path='/question/4=89u9hf8g' element={<QuestionSeven/>} />
        <Route path='/question/f55556byyt' element={<QuestionEight/>} />
        <Route path='/question/32rj8ndef' element={<QuestionNine/>} />
        <Route path='/question/afewf34fr' element={<QuestionTen/>} />
        <Route path='/hint/14suj8d59/84f8ds64r8fd' element={<HintTwo/>} />

          





        <Route
          path='/editpic'
          element={<EditPic setProgress={setProgress} />}
        />

        {/* ADMIN ROUTE */}
        <Route path='/admin/skillop-dtu/1941' element={<Admin />} />
        {/* NotFound */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path='/book' element={<NotworkingBokking/>}/>
      </Routes>
    </>
  );
}

export default WebPages;
