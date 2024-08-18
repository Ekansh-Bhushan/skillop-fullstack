import React, { useEffect, useState } from "react";
import "./PublicProfile.css";
import { findUser } from "../../api/userRequest";
import Spinner from "../images/spinner.gif";
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
  const [pastExpContent, setPastExpContent] = useState("");
  const [futurePlansContent, setFuturePlansContent] = useState("");
  const [journeyContent, setJourneyContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isJourneyExpanded, setIsJourneyExpanded] = useState(false);
  const [isPastExpanded, setIsPastExpanded] = useState(false);
  const [isFutureExpanded, setIsFutureExpanded] = useState(false);

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const userData = await findUser(userId);
      setUserDetails(userData.data.result);
      setJourneyContent(userData.data.result.about || "Nothing to display!");
      setPastExpContent(userData.data.result.pastExp || "Nothing to display!");
      setFuturePlansContent(userData.data.result.futurePlans || "Nothing to display!");
      setIsLoading(false);
    } catch (err) {
      toast.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]); // Include userId as a dependency

  const handleJourneyExpandClick = () => setIsJourneyExpanded(!isJourneyExpanded);
  const handlePastExpandClick = () => setIsPastExpanded(!isPastExpanded);
  const handleFutureExpandClick = () => setIsFutureExpanded(!isFutureExpanded);

  const taggingManager = new TaggingManager(setProgress, navigate, getUserFromUsername, toast);

  return (
    <>
      <Mobilecommonhead />
      <PublicProfileHeader userDetails={userDetails} userData={userDatamain} />
      <div className="main-profile-page">
        {isLoading && <img id="spinner-prof" src={Spinner} alt="spinner" className="spinner" />}
        <div className="profile-data">
          <div className="journey">
            <h2>About</h2>
            <div className={`journey-content ${isJourneyExpanded ? "expanded" : ""}`}>
              <p className="lorem-ipsum-dolor">
                <span className="text-wrapper">{taggingManager.convert(journeyContent)}</span>
              </p>
            </div>
            <button className={`read-more-button ${isJourneyExpanded ? "expanded" : ""}`} onClick={handleJourneyExpandClick}>
              {userDetails.about && userDetails.about.length > 239 && (isJourneyExpanded ? "Read Less" : "Read More")}
            </button>
          </div>
          <hr className="line" />
          <div className="journey">
            <h2>Past Journey</h2>
            <div className={`journey-content ${isPastExpanded ? "expanded" : ""}`}>
              <p className="lorem-ipsum-dolor">
                <span className="text-wrapper">{pastExpContent}</span>
              </p>
            </div>
            <button className={`read-more-button ${isPastExpanded ? "expanded" : ""}`} onClick={handlePastExpandClick}>
              {userDetails.pastExp && userDetails.pastExp.length > 239 && (isPastExpanded ? "Read Less" : "Read More")}
            </button>
          </div>
          <hr className="line" />
          <div className="journey">
            <h2>Future Plans</h2>
            <div className={`journey-content ${isFutureExpanded ? "expanded" : ""}`}>
              <p className="lorem-ipsum-dolor">
                <span className="text-wrapper">{futurePlansContent}</span>
              </p>
            </div>
            <button className={`read-more-button ${isFutureExpanded ? "expanded" : ""}`} onClick={handleFutureExpandClick}>
              {userDetails.futurePlans && userDetails.futurePlans.length > 239 && (isFutureExpanded ? "Read Less" : "Read More")}
            </button>
          </div>
          <hr className="line" />
          <div className="journey">
            <h2>Experience</h2>
            {userDetails.experence && userDetails.experence.length === 0 && <p style={{ margin: "10px", fontSize: "1.1rem" }}>Nothing to display!</p>}
            {userDetails.experence && (showAllExperiences
              ? [...userDetails.experence].sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
              : [...userDetails.experence].sort((a, b) => new Date(b.startDate) - new Date(a.startDate)).slice(0, 2))
              .map(item => (
                <div key={item._id} className="experience-content" style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <div className="job-title">➤ {item.title}</div>
                    <div className="company">{item.company}</div>
                    <div className="co-location">{item.location}</div>
                    <p className="jd" style={{ width: "90%" }}>{item.description}</p>
                    <div className="profile-page-content">
                      <div className="date">
                        <span className="date-m">From:</span>
                        <span>{item.startDate && item.startDate.toString().slice(0, 4)}</span>
                        <span className="date-m gap">To:</span>
                        <span>{item && (item.endDate !== null ? item.endDate.toString().slice(0, 4) : "Present")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {userDetails.experence && userDetails.experence.length > 2 && (
              <div className="more">
                {!showAllExperiences && <span onClick={() => setShowAllExperiences(!showAllExperiences)}>Show more</span>}
              </div>
            )}
          </div>
          <hr className="line" />
          <div className="journey">
            <h2>Skills</h2>
            {userDetails.skills && userDetails.skills.length === 0 && <p style={{ margin: "10px", fontSize: "1.1rem" }}>Nothing to display!</p>}
            <div id="skills-cont" style={{ display: "flex", gap: "12px", width: "100%", flexWrap: "wrap" }}>
              {userDetails.skills && [...userDetails.skills].reverse().map((item, idx) => (
                <div key={idx} className="skills-content">
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>
          <hr className="line" />
          <div className="journey">
            <h2>Education</h2>
            {userDetails.education && userDetails.education.length === 0 && <p style={{ margin: "10px", fontSize: "1.1rem" }}>Nothing to display!</p>}
            <div className="education-content">
              {userDetails.education && (showAllEducation
                ? [...userDetails.education].sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                : [...userDetails.education].sort((a, b) => new Date(b.startDate) - new Date(a.startDate)).slice(0, 2))
                .map(item => (
                  <div key={item._id} id="edu-field" style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      <div className="education-qualification">➤ {item.institution} <br /></div>
                      <div className="institute-address">{item.city ? `${item.city},` : ""} {item.state ? item.state : ""}</div>
                      <div className="degree">{item.degree} {item.fieldOfStudy ? `- ${item.fieldOfStudy}` : ""}</div>
                      <div className="profile-page-content">
                        <div className="date">
                          <span className="date-m">From:</span>
                          <span>{item.startDate && item.startDate.toString().slice(0, 4)}</span>
                          <span className="date-m gap">To:</span>
                          <span>{item.endDate && item.endDate.toString().slice(0, 4)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {userDetails.education && userDetails.education.length > 2 && (
                <div className="more">
                  {!showAllEducation && <span onClick={() => setShowAllEducation(!showAllEducation)}>Show more</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicProfile;
