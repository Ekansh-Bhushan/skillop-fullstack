import { Circle } from "rc-progress";
import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/SideNav";
import toast from "react-hot-toast";
import "./mentorBano.css";
import { getProfileCompletionStatus, getUser } from "../../api/userRequest";
import { requestToBeMentor } from "../../api/mentorRequest";

function MentorBano({ userData, setProgress, Mentor, isFetched, notifyList }) {
  const [isTaskDone, setIsTaskDone] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [Pprogress, setPProgress] = useState(0);

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
  const currentProgress = 0; // Initial progress (between 0 and 1)
  const steps = 10;
  const newProgress = increaseCircularProgress(currentProgress, steps);
  console.log("New progress:", newProgress);

  const [addedAboutPastAndFuture, setAddedAboutPastAndFuture] = useState(false);
  const [addedAtleast4Posts, setAddedAtleast4Posts] = useState(false);
  const [addedEducationOrExperence, setAddedEducationOrExperence] =
    useState(false);
  const [uploadProfilePicAndVideo, setUploadProfilePicAndVideo] =
    useState(false);

  useEffect(() => {
    if (addedAboutPastAndFuture) {
      increaseCircularProgress(Pprogress, steps);
      setPProgress((prev) => prev + 25);
    }
    if (addedAtleast4Posts) {
      increaseCircularProgress(Pprogress, steps);
      setPProgress((prev) => prev + 25);
    }
    if (addedEducationOrExperence) {
      increaseCircularProgress(Pprogress, steps);
      setPProgress((prev) => prev + 25);
    }
    if (uploadProfilePicAndVideo) {
      increaseCircularProgress(Pprogress, steps);
      setPProgress((prev) => prev + 25);
    }
  }, []);
  console.log(Pprogress);

  const [mentorStatus, setMentorStatus] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isNotApplied, setIsNotApplied] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [PercentageProfileComplete, setPercentageProfileComplete] = useState(0);

  useEffect(() => {
    try {
      const getProfileCompletionData = async () => {
        const { data } = await getProfileCompletionStatus();
        if (data.status === "pending") {
          setIsPending(true);
        } else if (data.status === "accepted") {
          setIsAccepted(true);
        } else if (data.status === "not applied") {
          setIsNotApplied(true);
        } else if (data.status === "rejected") {
          setIsRejected(true);
        }
        setPercentageProfileComplete(data.result.percentageProfileComplete);
        if (data.result.percentageProfileComplete === 100) {
          setIsActive(true);
        }

        setMentorStatus(data.status);
        console.log(data.result);
        if (data.result) {
          setAddedAboutPastAndFuture(
            data.result.profileComplitionStatus.addedAboutPastAndFuture
          );
          setAddedAtleast4Posts(
            data.result.profileComplitionStatus.addedAtleast4Posts
          );
          setAddedEducationOrExperence(
            data.result.profileComplitionStatus.addedEducationOrExperence
          );
          setUploadProfilePicAndVideo(
            data.result.profileComplitionStatus.uploadProfilePicAndVideo
          );
          console.log(data.result.profileComplitionStatus, "hello");
        } else {
          toast.error(data.error);
        }
      };
      getProfileCompletionData();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, []);

  const requestToBeMentorX = async () => {
    if (!isActive) {
      toast.error("First complete all steps!");
      return;
    }
    try {
      const { data } = await requestToBeMentor();
      if (data.result) {
        toast.success(data.message);
        // window.location.reload();
        setIsPending(true);
        setIsNotApplied(false);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      />
      <h2 className="heading">Become a Mentor</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "8vw -10vw",
          height: "30vh",
        }}
      >
        <div id="percentage-profile">
          <h2>{PercentageProfileComplete}%</h2>
          <p>Complete</p>
        </div>
        <div
          style={{
            marginLeft: "300px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: "10px",
          }}
        >
          <Circle
            percent={Pprogress}
            strokeColor="cyan"
            strokeWidth={9}
            trailWidth={8}
            strokeLinecap="square"
            className={isTaskDone ? "done" : "not-done"}
          >
            <div
              style={{
                backgroundColor: "red",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              {isTaskDone ? "1 Of 4 steps is completed" : ""}
            </div>
          </Circle>
        </div>

        <div
          style={{
            width: "50%",
            position: "relative",
            paddingLeft: "30px",
          }}
          className="criterias"
        >
          <h3>
            Please complete the following things in your profile to become
            Mentor😎
          </h3>
          <ul>
            <li className={uploadProfilePicAndVideo ? "done" : "not-done"}>
              Upload Profile Pic and My story video
            </li>
            <li className={addedAboutPastAndFuture ? "done" : "not-done"}>
              Add About, Past experience And Future plans
            </li>
            <li className={addedEducationOrExperence ? "done" : "not-done"}>
              Add Education, Experience and Skills
            </li>
            <li className={addedAtleast4Posts ? "done" : "not-done"}>
              Create atleast 4 posts
            </li>
          </ul>
        </div>
      </div>

      {isNotApplied && (
        <div className="last-content">
          You are One step away from becoming a Mentor...
        </div>
      )}
      <div className="but">
        {isNotApplied && (
          <button
            className={isActive ? "custom-button" : "custom-button-active"}
            disabled={!isActive}
            onClick={requestToBeMentorX}
          >
            Become a Mentor!
          </button>
        )}
        {isAccepted && (
          <h3>
            Your application is accepted✅. You are a Verified Mentor 😎 now!
          </h3>
        )}
        {isPending && <h3>Your application is under process🔃!</h3>}
        {isRejected && <h3>Your application is rejected❌.</h3>}
      </div>
    </>
  );
}

export default MentorBano;
