import userpic from "../../../images/user.png";
import "./box.css";
import { useNavigate } from "react-router-dom";

const Box = ({ message, time, url, isread, id, type, img, category }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (category === "post") navigate(`/postsection/${url.split('/')[2]}`);
    else if (category === "like") navigate(`/postsection/${url.split('/')[2]}`);
    else if (category === "comment") navigate(`/postsection/${url.split('/')[2]}`);
    else if (category === "follow") navigate(`/public-profile/${url.split('/')[2]}`);
    else if (category === "meet_requested") navigate(`/mybookings`);
    else if (category === "meet_accepted") navigate(`/requestedMeets`);
    else if (category === "meet_starting") navigate(`/requestedMeets`);
  }

  return (
    <div className="notify-box" onClick={handleNavigation}>
      <div className="notify-box-content">
        <div className="notify-box-content-image">
          <img src={img ? img : userpic} alt="user" />
        </div>
        <div className="notify-box-content-data">
          <h4>{message}</h4>
          <p>{(new Date(time)).toString().slice(4, 21)}</p>
        </div>
      </div>
    </div>
  );
};

export default Box;
