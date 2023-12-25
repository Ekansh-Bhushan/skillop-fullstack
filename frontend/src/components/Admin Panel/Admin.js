import './Admin.css';
import SendNotification from './SendNotification';
import TopActiveUsers from './TopActiveUsers';
import MostFollowedUsers from './MostFollowedUsers';
import CreateEvent from './CreateEvent';
import UpcomingEvents from '../Landing/Profileandevents/UpcomingEvents';
import EventList from './EventList';
import MentorList from './MentorList';
import NewUserList from './NewUserList';
import DeadUserList from './DeadUserList';
import HighestEarnerList from './HighestEarnerList';
import TopPosts from './TopPosts';
import SiteMetrics from './SiteMetrics';
import MentorApproval from './MentorApproval';

const Admin = () => {
  return (
    <div>
      <div className="bg-gray-100 p-2">
        <h2 style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/skillop-logo.png" alt="" />
          <u>SKILLOP Admin Panel</u>
        </h2>
      </div>
      <div className="px-7 py-5">
        <SiteMetrics />
        <MentorApproval />
        <div className="flex justify-between gap-5 mb-10">
          <TopActiveUsers />
          <MostFollowedUsers />
          <NewUserList />
        </div>
        <div className="flex justify-between gap-5 mb-10">
          <MentorList />
          <HighestEarnerList />
          <DeadUserList />
        </div>
        <div className="flex justify-between gap-5 mb-10">
          <CreateEvent />
          <EventList />
          <TopPosts />
        </div>
      </div>
    </div>
  );
};

export default Admin;
