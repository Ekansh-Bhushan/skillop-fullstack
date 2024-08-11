import './Admin_Dashboard.css';
import Group108 from "../images/Group 108.png";
import Group105 from "../images/Group 105.png";
import Group106 from "../images/Group 106.png";
import Group107 from "../images/Group 107.png";
import arrow from "../images/mingcute_right-line.png";
import React, { useEffect, useState } from 'react';
import { getNewUserList, getSiteMetrics } from '../../api/adminPanel';
import AdminSideNav from './AdminSideNav/AdminSideNav';
import MentorApproval from './MentorApproval';
import MobileAdminSideNav from '../MobileAdminSideNav/MobileAdminSideNav';
import toast from 'react-hot-toast';
import { sendNotification } from '../../api/adminPanel';
import profilepic from "../images/Frame 55250.png";

const Admin_Dashboard = () => {
    // ----------------- SITE METRICS CODE -------------------------
    const [siteData, setSiteData] = useState({});
    const [NewUsrList, setNewUsrList] = useState([]);

    useEffect(() => {
      const getData = async () => {
        const data = await getSiteMetrics();
        setSiteData(data.data.result);
        const newUsrs = await getNewUserList();
        setNewUsrList(newUsrs.data.result);
    };
    getData();
  }, []);
// --------------------------   SEND NOTIFICATIONS CODE ----------------------------
  const [message, setMessage] = useState('');
  const [sendTo, setSendTo] = useState('all');

  const handleNotification = async () => {
    const data = {
      message: message,
      to: sendTo,
      dateTime: Date(),
    };
    try {
      await sendNotification(data);
      toast.success('Notification sent!');
      setMessage("");
    } catch(err) {
      toast.error(err.response.data.message);
    }
  };
    return (
        <>
        <MobileAdminSideNav/>
        {/* {isMobile ? <MobileAdminSideNav/> : <AdminSideNav />} */}
        <AdminSideNav />
        <div className="container_overview" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Admin Panel Overview
            <div className="information">
                <div className="two_boxes">
                    <div className="boxes">
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            Total Users
                        </div>
                        <div className="inside-box">
                            <div className="data">
                            {siteData.users}
                            </div>
                            {/* <div>
                            <img src="/increase.png" width={1} alt="" />+{NewUsrList.length}
                            </div> */}
                            <img src={Group108} alt="Total Users"/>
                        </div>
                    </div>
                    <div className="boxes">
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            Total Mentors
                        </div>
                        <div className="inside-box">
                            <div className="data">
                            {siteData.mentors}
                            </div>
                            <img src={Group105} alt="Total Mentors"/>
                        </div>
                    </div>
                </div>
                <div className="two_boxes">
                    <div className="boxes">
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            Posts
                        </div>
                        <div className="inside-box">
                            <div className="data">
                            {siteData.posts}
                            </div>
                            <img src={Group106} alt="Posts"/>
                        </div>
                    </div>
                    <div className="boxes">
                        <div style={{fontSize: '20px',fontWeight: 'bold' }}>  
                            Total Meets
                        </div>
                        <div className="inside-box">
                            <div className="data">
                            {siteData.meets}
                            </div>
                            <img src={Group107} alt="Total Meets"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Notifs_Feedbacks">
                <div className="Send_notifs">
                    <div style={{ paddingBottom: '10px' }}>Send Notification</div> 
                    <div>
                        <label htmlFor="receiver">To : </label>
                            <select
                                 value={sendTo}
                                onChange={(e) => setSendTo(e.target.value)}
                                className="border-[2px] border-black"
                                name="receiver"
                            >
                                <option value="all">All</option>
                                <option value="mentors">Mentors</option>
                                <option value="users">Users</option>
                            </select>
                    </div> 
                    <textarea id="message" name="message" rows="4" cols="30" placeholder="Write A Message" value={message}
        onChange={(e) => setMessage(e.target.value)}></textarea>
                    <div className="post_button">
                        <button className="post" onClick={handleNotification}>
                            Post
                        </button> 
                    </div>
                </div>
                <div className="reviews">
                    <div className="top_of_review">
                        <div>
                            User Feedbacks
                        </div>
                        <div>
                            <button className="viewall">
                                View All 
                            </button>
                        </div>
                    </div>
                    <div className="reviews_feedbacks">
                        <div className="reviewer">
                            <div className='user'>

                                <div>
                                    <img src={profilepic} alt="User Profile"/>
                                </div>
                                <div>
                                    User
                                </div>
                            </div>
                            <img src={arrow} alt="Arrow" className='arrow'/>
                        </div>
                        <div className="reviewer">
                            <div className='user'>

                                <div>
                                    <img src={profilepic} alt="User Profile"/>
                                </div>
                                <div>
                                    User
                                </div>
                            </div>
                            <img src={arrow} alt="Arrow" className='arrow'/>
                        </div>
                        <div className="reviewer">
                            <div className='user'>

                                <div>
                                    <img src={profilepic} alt="User Profile"/>
                                </div>
                                <div>
                                    User
                                </div>
                            </div>
                            <img src={arrow} alt="Arrow" className='arrow'/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Admin_Dashboard;
