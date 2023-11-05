import { Circle } from "rc-progress";
import React, { useEffect, useState } from "react";
// import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
// import Commondash from "../common";
// import Topbar from "../topbar";
import SideNav from "../SideNav/SideNav";
// import Profileandevents from "../../Landing/Profileandevents";
// import "./earning.css";
import toast from "react-hot-toast";
// import { getEarnings } from "../../../api/mentorRequest";
// import Mobilecommonhead from "../../Mobilecommonhead";
import "./mentorBano.css";
import { getProfileCompletionStatus } from "../../api/userRequest";
function MentorBano({ userData, setProgress, Mentor, isFetched, notifyList }) {
  // const navigate = useNavigate();
  const [isTaskDone, setIsTaskDone] = useState(false);
  const [isActive, setIsActive] = useState(false)

  
  function increaseCircularProgress(currentProgress, steps) {
    if (steps <= 0) {
      throw new Error("Number of steps must be greater than 0");
    }

    // Calculate the increment for each step
    const increment = 0.25 / steps;

    // Increase the progress in each step
    for (let i = 0; i < steps; i++) {
      currentProgress += increment;
      currentProgress %= 1; // Ensure progress stays within the range [0, 1)
    }
    return currentProgress;
  }

  // Example usage
  const currentProgress = 0.2; // Initial progress (between 0 and 1)
  const steps = 4;
  const newProgress = increaseCircularProgress(currentProgress, steps);
  console.log("New progress:", newProgress);

  useEffect(() => {
    try {
      const getProfileCompletionData = async () => {
        const { data } = await getProfileCompletionStatus();
        console.log(data);
      }
      getProfileCompletionData();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
    <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      />
      <div className="heading">Become a Mentor</div>

    <div style={{ display: 'flex', justifyContent: 'space-between', margin: 150, height: 130}}>
      <div style={{ marginLeft: '300px',width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '10px' }}>
        <Circle
          percent={50}
          strokeColor="cyan"
          strokeWidth={9}
          trailWidth={8}
          strokeLinecap="square"
          className={isTaskDone ? 'done' : 'not-done'}
        >
          <div style={{ backgroundColor: 'red', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            {isTaskDone ? '1 Of 4 steps is completed' : ''}
          </div>
        </Circle>
      </div>

      <div style={{ width: '50%', position: 'relative', paddingLeft: '30px' }}>
        <ul>
          <li className='done'>Upload Profile Pic and Video</li>
          <li className='done'>Add About, Past And Future</li>
          <li className={isTaskDone ? 'done' : 'not-done'}>Add Education, Qualifications and Jobs</li>
          <li className={isTaskDone ? 'done' : 'not-done'}>Add At least 4 Posts</li>
        </ul>
      </div>
      </div>

      <div className="last-content">You are One step away from becoming a Mentor...</div>
      <div className="but">
  <button className={isActive?"custom-button":"custom-button-active"}>Become a mentor</button>
</div>
    </>
  );
}

export default MentorBano;
