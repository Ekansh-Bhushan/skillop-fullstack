import './Admin_Users.css';
import Group108 from "../images/Group 108.png";
import profilepic from "../images/Frame 55250.png";

const Admin_Users = () => {
    return (
        <div className="container_overview">
            Users Overview
            <div className="box">
                <div>
                    Total Users
                </div>
                <div className="inside-box">
                    <div className="data">
                        93
                    </div>
                    <img src={Group108} alt="Total Users"/>
                </div>
            </div>
            <div>
                <div className="reviews">
                    <div className="top_of_review">
                        <div>
                            Daily New Users
                        </div>
                        <div>
                            <button className="viewall">
                                View All -
                            </button>
                        </div>
                    </div>
                <div classname="reviews_feedbacks">
                    <div classname="reviewer">
                        <div>
                            <img src={profilepic} alt="User Profile"/>
                        </div>
                        <div>
                            User
                            
                        </div>
                        <div>

                            <button classname="View_profile">
                                View Profile
                            </button>
                        </div>
                    </div>
                    <div classname="reviewer">
                        <div>
                            <img src={profilepic} alt="User Profile"/>
                        </div>
                        <div>
                            User
                            
                        </div>
                        <div>

                            <button classname="View_profile">
                                View Profile
                            </button>
                        </div>
                    </div><div classname="reviewer">
                        <div>
                            <img src={profilepic} alt="User Profile"/>
                        </div>
                        <div>
                            User
                            
                        </div>
                        <div>

                            <button classname="View_profile">
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div classname="reviews">
                <div classname="top_of_review">
                    <div>
                        Most Active Users
                    </div>
                    <div>
                        <button classname="viewall">
                            View All --
                        </button>
                    </div>
                </div>
                <div classname="reviews_feedbacks">
                    <div classname="reviewer">
                        <div>
                            <img src={profilepic} alt="User Profile"/>
                        </div>
                        <div>
                            User
                            
                        </div>
                        <div>

                            <button classname="View_profile">
                                View Profile
                            </button>
                        </div>
                    </div>
                    <div classname="reviewer">
                        <div>
                            <img src={profilepic} alt="User Profile"/>
                        </div>
                        <div>
                            User
                            
                        </div>
                        <div>

                            <button classname="View_profile">
                                View Profile
                            </button>
                        </div>
                    </div><div classname="reviewer">
                        <div>
                            <img src={profilepic} alt="User Profile"/>
                        </div>
                        <div>
                            User
                            
                        </div>
                        <div>

                            <button classname="View_profile">
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div classname="reviews">
                <div classname="top_of_review">
                    <div>
                        Most Followed Users
                    </div>
                    <div>
                        <button classname="viewall">
                            View All --
                        </button>
                    </div>
                </div>
                <div classname="reviews_feedbacks">
                    <div classname="reviewer">
                        <div>
                            <img src={profilepic} alt="User Profile"/>
                        </div>
                        <div>
                            User
                            
                        </div>
                        <div>

                            <button classname="View_profile">
                                View Profile
                            </button>
                        </div>
                    </div>
                    <div classname="reviewer">
                        <div>
                            <img src={profilepic} alt="User Profile"/>
                        </div>
                        <div>
                            User
                            
                        </div>
                        <div>

                            <button classname="View_profile">
                                View Profile
                            </button>
                        </div>
                    </div><div classname="reviewer">
                        <div>
                            <img src={profilepic} alt="User Profile"/>
                        </div>
                        <div>
                            User
                            
                        </div>
                        <div>

                            <button classname="View_profile">
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
};
export default Admin_Users ;