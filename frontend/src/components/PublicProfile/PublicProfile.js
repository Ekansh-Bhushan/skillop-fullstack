import React from "react";
import "./PublicProfile.css";
import { findUser, getUserFromUsername } from "../../api/userRequest";
import { useEffect } from "react";
import Spinner from "../images/spinner.gif";
import { useState } from "react";
import Mobilecommonhead from "../Mobilecommonhead";
import PublicProfileHeader from "./PublicProfileHeader";
import TaggingManager from "../../utils/tagManager";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PublicProfile = ({
  userDatamain,
  setProgress,

}) => {
  const navigate = useNavigate();
  const userId = window.location.pathname.split("/")[2];

  const [userDetails, setUserDetails] = useState({});

  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);

  const [pastExpContent, setpastExpContent] = useState("");
  const [futurePlansContent, setfuturePlansContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const userData = await findUser(userId);
      setUserDetails(userData.data.result);
      // console.log("details", userDetails);
    } catch (err) {
      console.log("Unable to fetch user details", err);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const userData = await findUser(userId);
        setUserDetails(userData.data.result);
        // Set journeyContent when userDetails is available
        setJourneyContent(userData.data.result.about || "Nothing to display!");
        setpastExpContent(
          userData.data.result.pastExp || "Nothing to display!"
        );
        setfuturePlansContent(
          userData.data.result.futurePlans || "Nothing to display!"
        );
        setIsLoading(false);
      } catch (err) {
        // alert("No such user found");
        console.log("Unable to fetch user details", err);
      }
    };

    fetchUserDetails();
  }, []);

  const [journeyContent, setJourneyContent] = useState("");
  const [isJourneyExpanded, setIsJourneyExpanded] = useState(false);
  const [isPastExpanded, setIsPastExpanded] = useState(false);
  const [isFutureExpanded, setIsFutureExpanded] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleJourneyExpandClick = () => {
    setIsJourneyExpanded(!isJourneyExpanded);
  };
  const handlePastExpandClick = () => {
    setIsPastExpanded(!isPastExpanded);
  };
  const handleFutureExpandClick = () => {
    setIsFutureExpanded(!isFutureExpanded);
  };

  useEffect(() => {
    fetchUserDetails();
    // setJourneyContent(userDetails.about);
  }, []);

  const taggingManager = new TaggingManager(
    setProgress,
    navigate,
    getUserFromUsername,
    toast
  );

  return (
    <>
      <Mobilecommonhead />
      <PublicProfileHeader userDetails={userDetails} userData={userDatamain}/>
      <div className="main-profile-page">
        {isLoading && (
          <img
            id="spinner-prof"
            src={Spinner}
            alt="spinner"
            className="spinner"
          />
        )}
        {/* <div className="profile-heading">Profile</div> */}
        <div className="profile-data">
          <div className="journey">
            {/* ABOUT */}
            <h2>About</h2>

            <div
              className={`journey-content ${
                isJourneyExpanded ? "expanded" : ""
              }`}
            >
              <p className={`lorem-ipsum-dolor`}>
                <span className="text-wrapper">
                  {taggingManager.convert(journeyContent)}
                </span>
              </p>
            </div>

            <button
              className={`read-more-button ${
                isJourneyExpanded ? "expanded" : ""
              }`}
              onClick={handleJourneyExpandClick}
            >
              {userDetails.about &&
                userDetails.about.length > 239 &&
                (isJourneyExpanded ? "Read Less" : "Read More")}
            </button>
          </div>

          <hr className="line" />

          {/* PAST JOURNEY */}
          <div className="journey">
            <h2>Past Journey</h2>

            <div
              className={`journey-content ${isPastExpanded ? "expanded" : ""}`}
            >
              <p className={`lorem-ipsum-dolor`}>
                <span className="text-wrapper">{pastExpContent}</span>
              </p>
            </div>

            <button
              className={`read-more-button ${isPastExpanded ? "expanded" : ""}`}
              onClick={handlePastExpandClick}
            >
              {userDetails.pastExp &&
                userDetails.pastExp.length > 239 &&
                (isPastExpanded ? "Read Less" : "Read More")}
            </button>
          </div>

          <hr className="line" />

          {/* FUTURE PLANS */}
          <div className="journey">
            <h2>Future Plans</h2>

            <div
              className={`journey-content ${
                isFutureExpanded ? "expanded" : ""
              }`}
            >
              <p className={`lorem-ipsum-dolor`}>
                <span className="text-wrapper">{futurePlansContent}</span>
              </p>
            </div>

            <button
              className={`read-more-button ${
                isFutureExpanded ? "expanded" : ""
              }`}
              onClick={handleFutureExpandClick}
            >
              {userDetails.futurePlans &&
                userDetails.futurePlans.length > 239 &&
                (isFutureExpanded ? "Read Less" : "Read More")}
            </button>
          </div>

          <hr className="line" />
          <div className="journey">
            <h2>Experience</h2>
            {userDetails.experence && userDetails.experence.length === 0 && (
              <p
                style={{
                  margin: "10px",
                  fontSize: "1.1rem",
                }}
              >
                Nothing to display!
              </p>
            )}
            {userDetails.experence &&
              (showAllExperiences
                ? [...userDetails.experence].sort(
                    (a, b) => new Date(b.startDate) - new Date(a.startDate)
                  )
                : [...userDetails.experence]
                    .sort(
                      (a, b) => new Date(b.startDate) - new Date(a.startDate)
                    )
                    .slice(0, 2)
              ) // Apply slice when showAllExperiences is false
                .map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="experience-content"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div className="job-title">➤ {item.title}</div>
                        <div className="company">{item.company}</div>
                        <div className="co-location">{item.location}</div>
                        <p className="jd">{item.description}</p>
                        <div className="profile-page-content">
                          <div className="date">
                            <span className="date-m">From:</span>
                            <span>
                              {item.startDate &&
                                item.startDate.toString().slice(0, 4)}
                            </span>
                            <span className="date-m gap">To:</span>
                            <span>
                              {item &&
                                (item.endDate !== null
                                  ? item.endDate.toString().slice(0, 4)
                                  : "Present")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            {userDetails.experence && userDetails.experence.length > 2 && (
              <div className="more">
                {!showAllExperiences && (
                  <span
                    onClick={() => setShowAllExperiences(!showAllExperiences)}
                  >
                    Show more
                  </span>
                )}
              </div>
            )}
          </div>
          <hr className="line" />
          <div className="journey">
            <h2>Skills</h2>
            {userDetails.skills && userDetails.skills.length === 0 && (
              <p
                style={{
                  margin: "10px",
                  fontSize: "1.1rem",
                }}
              >
                Nothing to display!
              </p>
            )}
            <div
              id="skills-cont"
              style={{
                display: "flex",
                gap: "12px",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              {userDetails.skills &&
                [...userDetails.skills].reverse().map((item, idx) => {
                  return (
                    <div key={idx} className="skills-content">
                      <div>{item}</div>
                      {/* <img style={{ cursor: "pointer" }} src={delIcon} height={20} width={20} alt="del" /> */}
                    </div>
                  );
                })}
            </div>
          </div>
          <hr className="line" />
          <div className="journey">
            <h2>Education</h2>
            {userDetails.education && userDetails.education.length === 0 && (
              <p
                style={{
                  margin: "10px",
                  fontSize: "1.1rem",
                }}
              >
                Nothing to display!
              </p>
            )}
            <div className="education-content">
              {userDetails.education &&
                (showAllEducation
                  ? [...userDetails.education].sort(
                      (a, b) => new Date(b.startDate) - new Date(a.startDate)
                    )
                  : [...userDetails.education]
                      .sort(
                        (a, b) => new Date(b.startDate) - new Date(a.startDate)
                      )
                      .slice(0, 2)
                )
                  .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                  .map((item) => {
                    return (
                      <div
                        key={item._id}
                        id="edu-field"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div className="education-qualification">
                            ➤ {item.institution} <br />
                          </div>
                          <div className="institute-address">
                            {item.city ? `${item.city},` : ""}{" "}
                            {item.state ? item.state : ""}
                          </div>
                          <div className="degree">
                            {item.degree}{" "}
                            {item.fieldOfStudy ? `- ${item.fieldOfStudy}` : ""}
                          </div>
                          <div className="profile-page-content">
                            <div className="date">
                              <span className="date-m">From:</span>
                              <span>
                                {item.startDate &&
                                  item.startDate.toString().slice(0, 4)}
                              </span>
                              <span className="date-m gap">To:</span>
                              <span>
                                {item.endDate &&
                                  item.endDate.toString().slice(0, 4)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              {userDetails.education && userDetails.education.length > 2 && (
                <div className="more">
                  {!showAllEducation && (
                    <span
                      onClick={() => setShowAllEducation(!showAllEducation)}
                    >
                      Show more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <RightProfileComp userDatamain={userDatamain} /> */}
      </div>
    </>
  );
};

export default PublicProfile;
