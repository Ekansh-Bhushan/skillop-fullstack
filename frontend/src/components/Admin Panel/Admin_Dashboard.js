import './Admin_Dashboard.css';
import Group108 from "../images/Group 108.png";
import Group105 from "../images/Group 105.png";
import Group106 from "../images/Group 106.png";
import Group107 from "../images/Group 107.png";
import arrow from "../images/mingcute_right-line.png";

import profilepic from "../images/Frame 55250.png";

const Admin_Dashboard = () => {
    return (
        <div className="container_overview" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            DashBoard Container
            <div className="information">
                <div className="two_boxes">
                    <div className="box">
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            Total Users
                        </div>
                        <div className="inside-box">
                            <div className="data">
                                93
                            </div>
                            <img src={Group108} alt="Total Users"/>
                        </div>
                    </div>
                    <div className="box">
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            Total Mentors
                        </div>
                        <div className="inside-box">
                            <div className="data">
                                93
                            </div>
                            <img src={Group105} alt="Total Mentors"/>
                        </div>
                    </div>
                </div>
                <div className="two_boxes">
                    <div className="box">
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            Posts
                        </div>
                        <div className="inside-box">
                            <div className="data">
                                93
                            </div>
                            <img src={Group106} alt="Posts"/>
                        </div>
                    </div>
                    <div className="box">
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            Total Meets
                        </div>
                        <div className="inside-box">
                            <div className="data">
                                93
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
                        To : 
                        <select>
                            <option>
                                All
                            </option>
                        </select>
                    </div> 
                    <textarea id="message" name="message" rows="8" cols="56" placeholder="Write A Message"></textarea>
                    <div className="post_button">
                        <button className="post">
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
                                View All -
                            </button>
                        </div>
                    </div>
                    <div className="reviews_feedbacks">
                        <div className="reviewer">
                            <div>
                                <img src={profilepic} alt="User Profile"/>
                            </div>
                            <div>
                                User
                            </div>
                            <img src={arrow} alt="Arrow" height="30px" width="30px"/>
                        </div>
                        <div className="reviewer">
                            <div>
                                <img src={profilepic} alt="User Profile"/>
                            </div>
                            <div>
                                User
                            </div>
                            <img src={arrow} alt="Arrow" height="30px" width="30px"/>
                        </div>
                        <div className="reviewer">
                            <div>
                                <img src={profilepic} alt="User Profile"/>
                            </div>
                            <div>
                                User
                            </div>
                            <img src={arrow} alt="Arrow" height="30px" width="30px"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin_Dashboard;
