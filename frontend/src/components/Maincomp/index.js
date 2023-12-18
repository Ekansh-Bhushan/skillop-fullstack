import React from "react";
import Auth1Component from "../Page1";
import Auth3Component from "../Page3";
import Auth4Component from "../Page4";
import Auth5Component from "../Page5";
import Auth7Component from "../Page7";
import Uploadpic from "../Page8";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "../Landing/chatroom";
import Dashboard from "../dashboard/Slots";
import Account from "../dashboard/account";
import Bookings from "../dashboard/bookings";
import Earning from "../dashboard/earnings";
import Post from "../Landing/Post";
import CheckProfile from "../CheckProfile";
import Notification from "../Landing/notifications/notification";
import PublicProfile from "../PublicProfile/PublicProfile";
import { DisplayPosts } from "../Landing/DisplayPosts";
import Otherpost from "../Landing/Otherpost";
import Profile from "../Profile/profile";
import Searchbar from "../Searchbar";
import Addskills from "../Page9";
import Bookslot from "../Bookslot";
import UserPost from "../UserPosts/UserPosts";
import Mobilecommonhead from "../Mobilecommonhead";
import Mobilepost from "../Landing/mobilepost";
import EditSkillsPage from "../Profile/EditSkills/EditSkillsPage";
import ConfirmBooking from "../dashboard/bookings/ConfirmBooking";
import Payment from "../dashboard/bookings/Payment";
import EditPic from "../Profile/EditPic/EditPic";
import RequestedMeets from "../dashboard/requestedMeets";
import MentorBano from "../MentorBano/mentorBano";
import PlatformfeedbackForm from "../PlatfromFeedback/PlatformfeedbackForm";
import MentorfeedbackForm from "../MentorFeedback/feedbackForm";
import ChangePasswordPage from "../passwordChange/changepassword";
import ResetPasswordPage from "../resetpassword/resetpassword";
import ResetPasswordEmail from "../resetpassword/resetpasswordEmail";
import Admin from "../Admin Panel/Admin";
import PublicPost from "../PublicPost";
import Page from "../../landing/Page";
import Page1 from "../auth/Page1";
import Login from "../auth/Login";
import SkillOne from "../auth/SkillOne";
import SkillTwo from "../auth/SkillTwo";
import SkillThree from "../auth/SkillThree";
import SkillFour from "../auth/SkillFour";
import About from "../Misc Pages/About";
import Contact from "../Misc Pages/Contact";
import PrivacyPolicy from "../Misc Pages/PrivacyPolicy";
import Faqs from "../Misc Pages/Faqs";
import SkillFive from "../auth/SkillFive";
import SkillSix from "../auth/SkillSix";
import SkillSeven from "../auth/SkillSeven";
import Mlogin from "../mobileauth/Mlogin";
import Msignup from "../mobileauth/Msignup";
import MPersonal from "../mobileauth/MPersonal";
import MContact from "../mobileauth/MContact";
import MSkills from "../mobileauth/MSkills";
import MStudentInfo from "../mobileauth/MStudentInfo";
import MProfInformation from "../mobileauth/MProfInformation";
import Cover from "../mobileauth/Cover";
import Social from "../mobileauth/Social";

function AuthPage({
  userData,
  setUserData,
  setProgress,
  Mentor,
  setMentor,
  isFetched,
  notifyList,
  setIsFetched,
  setNotifyList,
}) {
  // console.log(userData);
  return (
    <Router>
      {/* <SideNav /> */}
      {/* -----------------------------SIGN UP PAGES----------------------------- */}
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/mlogin" element={<Mlogin />} />
        <Route path="/msignup" element={<Msignup />} />
        <Route path="/mpersonal" element={<MPersonal />} />
        <Route path="/mcontact" element={<MContact />} />
        <Route path="/mskill" element={<MSkills />} />
        <Route path="/mstudinfo" element={<MStudentInfo />} />
        <Route path="/mprofinfo" element={<MProfInformation />} />
        <Route path="/mcover" element={<Cover />} />
        <Route path="/msocial" element={<Social />} />
        <Route path="/signup" element={<Page1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/skill1" element={<SkillOne />} />
        <Route path="/skill2" element={<SkillTwo />} />
        <Route path="/skill3" element={<SkillThree />} />
        <Route path="/skill4" element={<SkillFour />} />
        <Route path="/skill5" element={<SkillFive />} />
        <Route path="/skill6" element={<SkillSix />} />
        <Route path="/skill7" element={<SkillSeven />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route
          path="/loginn"
          element={<Auth1Component setProgress={setProgress} />}
        />
        <Route path="post/:postId" element={<PublicPost />} />
        {/* <Route path="/continue" element={<Auth2Component setProgress={setProgress}/>} /> */}
        <Route
          path="/skills"
          element={<Auth3Component setProgress={setProgress} />}
        />
        <Route
          path="/jobtitles"
          element={<Auth4Component setProgress={setProgress} />}
        />
        <Route
          path="/collegedetails"
          element={<Auth5Component setProgress={setProgress} />}
        />
        {/* <Route
          path="/slots"
          element={<Auth6Component setProgress={setProgress} />}
        /> */}
        <Route
          path="/pic"
          element={<Uploadpic userData={userData} setProgress={setProgress} />}
        />
        <Route
          path="/laststep"
          element={<Auth7Component setProgress={setProgress} />}
        />

        {/* ----------------------------HOME PAGE----------------------------*/}

        <Route
          path="/homepage"
          element={
            <Post
              userData={userData}
              setUserData={setUserData}
              setProgress={setProgress}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
              setMentor={setMentor}
              setIsFetched={setIsFetched}
              setNotifyList={setNotifyList}
            />
          }
        />

        <Route path="/userprof" element={<CheckProfile />} />

        <Route
          path="/chat"
          element={
            userData && (
              <Chat
                userData={userData}
                setProgress={setProgress}
                Mentor={Mentor}
                isFetched={isFetched}
                notifyList={notifyList}
              />
            )
          }
        />
        <Route
          path="/myaccount"
          element={
            userData && (
              <Account
                userData={userData}
                setProgress={setProgress}
                Mentor={Mentor}
                isFetched={isFetched}
                notifyList={notifyList}
              />
            )
          }
        />
        <Route
          path="/myposts"
          element={
            <DisplayPosts
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
            />
          }
        />
        <Route
          path="/userposts/:id"
          element={
            <UserPost
              setProgress={setProgress}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
            />
          }
        />

        <Route
          path="/mybookings"
          element={
            userData && (
              <Bookings
                userData={userData}
                setProgress={setProgress}
                Mentor={Mentor}
                isFetched={isFetched}
                notifyList={notifyList}
              />
            )
          }
        />
        <Route
          path="/requestedMeets"
          element={
            userData && (
              <RequestedMeets
                userData={userData}
                setProgress={setProgress}
                Mentor={Mentor}
                isFetched={isFetched}
                notifyList={notifyList}
              />
            )
          }
        />
        <Route
          path="/mySlots"
          element={
            userData && (
              <Dashboard
                userData={userData}
                setProgress={setProgress}
                shouldbevisible={true}
                Mentor={Mentor}
                isFetched={isFetched}
                notifyList={notifyList}
              />
            )
          }
        />
        <Route
          path="/myearnings"
          element={
            userData && (
              <Earning
                userData={userData}
                setProgress={setProgress}
                Mentor={Mentor}
                isFetched={isFetched}
                notifyList={notifyList}
              />
            )
          }
        />
        <Route
          path="/postsection/:postId"
          element={
            userData && (
              <Otherpost
                setProgress={setProgress}
                userData={userData}
                Mentor={Mentor}
                isFetched={isFetched}
                notifyList={notifyList}
              />
            )
          }
        />
        <Route
          path="/public-profile/:userId"
          element={
            <PublicProfile
              userDatamain={userData}
              setProgress={setProgress}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
            />
          }
        />
        <Route path="/books" element={<CheckProfile />} />

        <Route
          path="/notifications"
          element={
            <Notification
              setProgress={setProgress}
              userData={userData}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
              setUserData={setUserData}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              setProgress={setProgress}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
            />
          }
        />
        <Route
          path="/searchbar"
          element={
            <Searchbar
              userData={userData}
              setProgress={setProgress}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
            />
          }
        />
        <Route
          path="/authskill"
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
        {/* <Route path= "/emailRequest" element= {<ResetPasswordEmail/>}/> */}
        <Route
          path="/mentorBano"
          element={
            <MentorBano
              userData={userData}
              setProgress={setProgress}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
            />
          }
        />
        <Route
          path="/bookslot/:userId"
          element={
            <Bookslot
              userData={userData}
              setProgress={setProgress}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
            />
          }
        />
        <Route
          path="/confirm-booking/:userId"
          element={
            <ConfirmBooking
              userData={userData}
              setProgress={setProgress}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
            />
          }
        />
        <Route
          path="/payment/:userId"
          element={
            <Payment
              userData={userData}
              setProgress={setProgress}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
            />
          }
        />
        <Route path="/mobile" element={<Mobilecommonhead />} />
        <Route path="/newpost" element={<Mobilepost />} />
        <Route path="/changePassword" element={<ChangePasswordPage />} />
        <Route path="/password/reset/:id" element={<ResetPasswordPage />} />
        <Route path="/resetPasswordEmail" element={<ResetPasswordEmail />} />
        <Route path="/mentorfeedback" element={<MentorfeedbackForm />} />
        <Route
          path="/platformfeedback"
          element={
            <PlatformfeedbackForm
              userData={userData}
              setProgress={setProgress}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
            />
          }
        />
        <Route
          path="/editskills"
          element={
            <EditSkillsPage
              setProgress={setProgress}
              Mentor={Mentor}
              isFetched={isFetched}
              notifyList={notifyList}
            />
          }
        />
        <Route
          path="/editpic"
          element={<EditPic userData={userData} setProgress={setProgress} />}
        />
        <Route path="/admin" element={<Admin />} />

        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
}

export default AuthPage;
