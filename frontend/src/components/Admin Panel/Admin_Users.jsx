import React, { useEffect, useState } from 'react';
import { getNewUserList, getSiteMetrics } from '../../api/adminPanel';
import './Admin_Users.css';
import Group108 from "../images/Group 108.png";
import MostFollowedUsers_Admin from './MostFollowedUsers_Admin';
import TopActiveUsers_Admin from './TopActiveUsers_Admin';
import NewUserList_Admin from './NewUserList_Admin';
import MobileAdminSideNav from '../MobileAdminSideNav/MobileAdminSideNav';
import AdminSideNav from './AdminSideNav/AdminSideNav';
import DelProfPost from './DelProfPost';
import MentorApproval from './MentorApproval';
import DeadUserList from './DeadUserList';
import TopPosts from './TopPosts';

const Admin_Users = () => {
    // const isMobile = window.innerWidth <= 600;
    // console.log(isMobile);
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
    return (
        <>
        <MobileAdminSideNav/>
        {/* {isMobile ? <MobileAdminSideNav/> : <AdminSideNav />} */}
        <AdminSideNav />
        <div className="container_user" style={{fontWeight: 'bold' }}>
            Users Overview
            <div className="boxes1" style={{fontWeight: 'bold' }}>
                <div>
                    Total Users
                </div>
                <div className="inside-box">
                    <div className="data">
                    {siteData.users}
                    </div>
                    <img src={Group108} alt="Total Users"/>
                </div>
            </div>
            <MentorApproval />
            <div className="review">
                <div className="top_of_reviews" style={{fontWeight: 'bold' }}>
                    <div>
                        Daily New Users
                    </div>
                    <div>
                        <button className="viewall">
                            View All 
                        </button>
                    </div>
                </div>
                <NewUserList_Admin/>
         
            </div>
            <div className="review">
                <div className="top_of_reviews">
                    <div>
                        Most Active Users
                    </div>
                    <div>
                        <button className="viewall">
                            View All 
                        </button>
                    </div>
                </div>
                <TopActiveUsers_Admin/>
                
            </div>
            <div className="review">
                <div className="top_of_reviews">
                    <div>
                        Most Followed Users
                    </div>
                    <div>
                        <button className="viewall">
                            View All 
                        </button>
                    </div>
                </div>
                <MostFollowedUsers_Admin/>
                
            </div>
            <DelProfPost />
            <DeadUserList />
            <TopPosts />
        </div>
        </>

    );
};
export default Admin_Users ;