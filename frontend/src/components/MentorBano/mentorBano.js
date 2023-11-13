import { Circle } from "rc-progress";
import React, { useEffect, useState } from "react";
// import logo from "../../images/logo.png";
// import { useNavigate } from "react-router-dom";
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
import { requestToBeMentor } from "../../api/mentorRequest";
function MentorBano({ userData, setProgress, Mentor, isFetched, notifyList }) {
    // const navigate = useNavigate();
    const [isTaskDone, setIsTaskDone] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [Pprogress, setPProgress] = useState(0);

    if (userData.becomingMentorStatus !== "not applied") {
        setIsActive(false);
    }

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

    const [addedAboutPastAndFuture, setAddedAboutPastAndFuture] =
        useState(false);
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
    }, [
        addedAboutPastAndFuture,
        addedAtleast4Posts,
        addedEducationOrExperence,
        uploadProfilePicAndVideo,
    ]);
    console.log(Pprogress);

    useEffect(() => {
        try {
            const getProfileCompletionData = async () => {
                const { data } = await getProfileCompletionStatus();
                console.log(data.result);
                if (data.result) {
                    setAddedAboutPastAndFuture(
                        data.result.profileComplitionStatus
                            .addedAboutPastAndFuture
                    );
                    setAddedAtleast4Posts(
                        data.result.profileComplitionStatus.addedAtleast4Posts
                    );
                    setAddedEducationOrExperence(
                        data.result.profileComplitionStatus
                            .addedEducationOrExperence
                    );
                    setUploadProfilePicAndVideo(
                        data.result.profileComplitionStatus
                            .uploadProfilePicAndVideo
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
        try {
            const { data } = await requestToBeMentor();
            if (data.result) {
                toast.success(data.message);
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
            <div className="heading">Become a Mentor</div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: 150,
                    height: 130,
                }}
            >
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
                >
                    <ul>
                        <li
                            className={
                                uploadProfilePicAndVideo ? "done" : "not-done"
                            }
                        >
                            Upload Profile Pic and Video
                        </li>
                        <li
                            className={
                                addedAboutPastAndFuture ? "done" : "not-done"
                            }
                        >
                            Add About, Past And Future
                        </li>
                        <li
                            className={
                                addedEducationOrExperence ? "done" : "not-done"
                            }
                        >
                            Add Education, Qualifications and Jobs
                        </li>
                        <li
                            className={addedAtleast4Posts ? "done" : "not-done"}
                        >
                            Add At least 4 Posts
                        </li>
                    </ul>
                </div>
            </div>

            <div className="last-content">
                You are One step away from becoming a Mentor...
            </div>
            <div className="but">
                <button
                    className={
                        isActive ? "custom-button" : "custom-button-active"
                    }
                    onClick={requestToBeMentorX}
                >
                    {isActive
                        ? "Become a mentor"
                        : "Your application is under process"}
                </button>
            </div>
        </>
    );
}

export default MentorBano;
