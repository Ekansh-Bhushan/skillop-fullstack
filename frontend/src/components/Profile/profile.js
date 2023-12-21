import React, { useState } from 'react';
import './profile.css';
import { getUser } from '../../api/userRequest';
import { updateProfile } from '../../api/userRequest';
import { useEffect } from 'react';
import EduPopUp from './EditPopUp/EduPopUp';
import ExpPopUp from './EditPopUp/ExpPopUp';
import './EditPopUp/EduPopUp.css';
import './EditPopUp/ExpPopUp.css';
import plusIcon from '../images/plus.png';
import editIcon from '../images/edit.png';
import tickIcon from '../images/tick.png';
import delIcon from '../images/delete.png';
import SkillPopUp from './EditPopUp/SkillPopUp';
import delEdu from '../../api/delEdu';
import delExp from '../../api/delExp';
import RightProfileComp from './Right Profile/RightProfileComp';
import Spinner from '../images/spinner.gif';
import { useNavigate, useNavigation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Mobilecommonhead from '../Mobilecommonhead';
import ProfileHeader from './ProfileHeader/ProfileHeader';

const Profile = ({ setProgress, Mentor, isFetched, notifyList }) => {
  const [updateDom, setUpdateDom] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [ShowSkillPopUp, setShowSkillPopUp] = useState(false);
  const [ShowEduPopUp, setShowEduPopUp] = useState(['', false, '']);
  const [ShowExpPopUp, setShowExpPopUp] = useState(['', false, '']);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [journeyContent, setJourneyContent] = useState('');
  const [pastExpContent, setpastExpContent] = useState('');
  const [futurePlansContent, setfuturePlansContent] = useState('');
  const [isJourneyExpanded, setIsJourneyExpanded] = useState(false);
  const [isPastExpanded, setIsPastExpanded] = useState(false);
  const [isFutureExpanded, setIsFutureExpanded] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isButtonClicked2, setIsButtonClicked2] = useState(false);
  const [isButtonClicked3, setIsButtonClicked3] = useState(false);

  const navigate = useNavigate();

  const updateAbt = async () => {
    try {
      await updateProfile({ about: journeyContent });
    } catch (err) {
      console.log('Unable to update about ', err);
    }
  };
  const updatePastExp = async () => {
    try {
      await updateProfile({ pastExp: pastExpContent });
    } catch (err) {
      console.log('Unable to update past journey ', err);
    }
  };
  const updateFuturePlans = async () => {
    try {
      await updateProfile({ futurePlans: futurePlansContent });
    } catch (err) {
      console.log('Unable to update future plans ', err);
    }
  };

  const handleSave = async () => {
    setIsButtonClicked(false);
    await updateAbt();
    setUpdateDom(true);
    toast.success('About updated!');
  };
  const handleSave2 = async () => {
    setIsButtonClicked2(false);
    await updatePastExp();
    setUpdateDom(true);
    toast.success('Past journey updated!');
  };
  const handleSave3 = async () => {
    setIsButtonClicked3(false);
    await updateFuturePlans();
    setUpdateDom(true);
    toast.success('Future plans updated!');
  };

  const handleJourneyExpandClick = () => {
    setIsJourneyExpanded(!isJourneyExpanded);
  };
  const handlePastExpandClick = () => {
    setIsPastExpanded(!isPastExpanded);
  };
  const handleFutureExpandClick = () => {
    setIsFutureExpanded(!isFutureExpanded);
  };
  const handleEdu = (e, eduID) => {
    setShowEduPopUp([e.target.id, true, eduID]);
  };
  const handleExp = (e, expID) => {
    setShowExpPopUp([e.target.id, true, expID]);
  };

  const onClose = () => {
    setShowEduPopUp(['', false, '']);
    setShowExpPopUp(['', false, '']);
    setShowSkillPopUp(false);
  };

  const handleEditClick = () => {
    setIsButtonClicked(true);
  };
  const handleEditClick2 = () => {
    setIsButtonClicked2(true);
  };
  const handleEditClick3 = () => {
    setIsButtonClicked3(true);
  };

  const handleDelExp = async (id) => {
    try {
      // Display a confirmation dialog to confirm the deletion
      const confirmed = window.confirm(
        'Are you sure you want to delete this item?'
      );

      if (confirmed) {
        // If the user confirms, proceed with the deletion
        await delExp(id);
        toast.success('Deleted successfully!');
        // window.location.reload();
      } else {
        // If the user cancels, do nothing or provide feedback if needed
        console.log('Deletion cancelled by the user');
      }
    } catch (err) {
      console.log('Error deleting exp', err);
      toast.error(err.response.data.err);
    }
  };
  const handleDelEdu = async (id) => {
    // Display a confirmation dialog
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (userConfirmed) {
      try {
        await delEdu(id);
        toast.success('Deleted successfully!');
        // window.location.reload();
      } catch (err) {
        console.log('Error deleting edu', err);
        toast.error(err.response.data.err);
      }
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const userData = await getUser();
        setUserDetails(userData.data.result);
        // Set journeyContent when userDetails is available
        setJourneyContent(userData.data.result.about || '');
        setpastExpContent(userData.data.result.pastExp || '');
        setfuturePlansContent(userData.data.result.futurePlans || '');
      } catch (err) {
        console.log('Unable to fetch user details', err);
      }
      setIsLoading(false);
    };
    fetchUserDetails();
  }, [updateDom]);

  return (
    <>
      {/* <SideNav setProgress={setProgress} Mentor={Mentor} isFetched={isFetched} notifyList={notifyList} /> */}
      <Mobilecommonhead />
      {/* <RightProfileComp about={journeyContent} /> */}
      <ProfileHeader />
      <div className="main-profile-page">
        {isLoading && (
          <img
            id="spinner-prof"
            src={Spinner}
            alt="spinner"
            className="loader"
          />
        )}
        {/* <div className="profile-heading">Profile</div> */}
        <div className="profile-data">
          <div className="journey">
            <h2>
              About
              {isButtonClicked ? (
                <span className="edit-button-text" onClick={handleSave}>
                  <img src={tickIcon} height={25} width={25} alt="tick-icon" />
                </span>
              ) : (
                <span className="edit-button-text" onClick={handleEditClick}>
                  <img src={editIcon} height={25} width={25} alt="edit-icon" />
                </span>
              )}
            </h2>
            {/* <div className="add-icon-container">
            </div> */}
            {isButtonClicked ? (
              <textarea
                type="text"
                value={journeyContent}
                placeholder="Describe About Yourself...?"
                onChange={(e) => setJourneyContent(e.target.value)}
                className="long-textarea" // Apply the CSS class
              />
            ) : (
              <div
                className={`journey-content ${
                  isJourneyExpanded ? 'expanded' : ''
                }`}
              >
                <span className="text-wrapper">
                  {journeyContent || 'Describe About Yourself...?'}
                </span>
              </div>
            )}
            <button
              className={`read-more-button ${
                isJourneyExpanded ? 'expanded' : ''
              }`}
              onClick={handleJourneyExpandClick}
            >
              {userDetails.about &&
                userDetails.about.length > 239 &&
                (isJourneyExpanded ? 'Read Less' : 'Read More')}
            </button>
          </div>

          <hr className="line" />
          {/* PAST JOURNEY */}
          <div className="journey">
            <h2>
              Past Journey
              {isButtonClicked2 ? (
                <span className="edit-button-text" onClick={handleSave2}>
                  <img src={tickIcon} height={25} width={25} alt="tick-icon" />
                </span>
              ) : (
                <span className="edit-button-text" onClick={handleEditClick2}>
                  <img src={editIcon} height={25} width={25} alt="edit-icon" />
                </span>
              )}
            </h2>
            {/* <div className="add-icon-container">
            </div> */}
            {isButtonClicked2 ? (
              <textarea
                type="text"
                value={pastExpContent}
                placeholder={'Your Past Journey...'}
                onChange={(e) => setpastExpContent(e.target.value)}
                className="long-textarea" // Apply the CSS class
              />
            ) : (
              <div
                className={`journey-content ${
                  isPastExpanded ? 'expanded' : ''
                }`}
              >
                <p className={`lorem-ipsum-dolor`}>
                  <span className="text-wrapper">
                    {pastExpContent || 'Your Past Journey...'}
                  </span>
                </p>
              </div>
            )}
            <button
              className={`read-more-button ${isPastExpanded ? 'expanded' : ''}`}
              onClick={handlePastExpandClick}
            >
              {userDetails.about &&
                userDetails.pastExp.length > 239 &&
                (isPastExpanded ? 'Read Less' : 'Read More')}
            </button>
          </div>

          <hr className="line" />
          {/* FUTURE PLANS */}
          <div className="journey">
            <h2>
              Future Plans
              {isButtonClicked3 ? (
                <span className="edit-button-text" onClick={handleSave3}>
                  <img src={tickIcon} height={25} width={25} alt="tick-icon" />
                </span>
              ) : (
                <span className="edit-button-text" onClick={handleEditClick3}>
                  <img src={editIcon} height={25} width={25} alt="edit-icon" />
                </span>
              )}
            </h2>
            {/* <div className="add-icon-container">
            </div> */}
            {isButtonClicked3 ? (
              <textarea
                type="text"
                value={futurePlansContent}
                placeholder={'What Plans do you have for Future...?'}
                onChange={(e) => setfuturePlansContent(e.target.value)}
                className="long-textarea" // Apply the CSS class
              />
            ) : (
              <div
                className={`journey-content ${
                  isFutureExpanded ? 'expanded' : ''
                }`}
              >
                <p className={`lorem-ipsum-dolor`}>
                  <span className="text-wrapper">
                    {futurePlansContent ||
                      'What Plans do you have for Future...?'}
                  </span>
                </p>
              </div>
            )}
            <button
              className={`read-more-button ${
                isFutureExpanded ? 'expanded' : ''
              }`}
              onClick={handleFutureExpandClick}
            >
              {userDetails.about &&
                userDetails.futurePlans.length > 239 &&
                (isFutureExpanded ? 'Read Less' : 'Read More')}
            </button>
          </div>

          <hr className="line" />
          <div className="journey">
            <div className="add-icon-container">
              <h2>Experience</h2>

              <span
                className="edit-button-text"
                onClick={(e) => {
                  handleExp(e);
                }}
              >
                <img src={plusIcon} height={25} width={25} alt="plus-icon" />
              </span>
            </div>
            {userDetails.experence && userDetails.experence.length === 0 && (
              <p style={{ margin: '10px', fontSize: '1.1rem' }}>
                Add your experience details here...
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
                .map((item, idx) => {
                  return (
                    <div key={item._id} className="experience-content">
                      <div>
                        <div className="job-title" style={{ width: '38vw' }}>
                          ➤ {item.title}
                        </div>
                        <div className="company" style={{ width: '38vw' }}>
                          {item.company}
                        </div>
                        <div className="co-location">{item.location}</div>
                        <p className="jd" style={{ width: '38vw' }}>
                          {item.description}
                        </p>
                        <div className="profile-page-content">
                          <div className="date">
                            <span className="date-m">From:</span>
                            <span>
                              {item.startDate &&
                                new Date(item.startDate)
                                  .toString()
                                  .slice(4, 15)}
                            </span>
                            <span className="date-m gap">To:</span>
                            <span>
                              {item &&
                                (item.endDate !== null
                                  ? new Date(item.endDate)
                                      .toString()
                                      .slice(4, 15)
                                  : 'Present')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <img
                          src={editIcon}
                          id="edit-text"
                          className={`add-icon ${
                            isButtonClicked ? 'active' : ''
                          }`}
                          onClick={(e) => {
                            handleExp(e, item._id);
                          }}
                          style={{
                            height: '30px',
                            width: '30px',
                          }}
                          alt="add-icon"
                        />
                        <img
                          onClick={() => handleDelExp(item._id)}
                          style={{ cursor: 'pointer' }}
                          src={delIcon}
                          height={20}
                          width={20}
                          alt="del"
                        />
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
          {ShowExpPopUp[1] && (
            <ExpPopUp
              expID={ShowExpPopUp[2]}
              id={ShowExpPopUp[0]}
              setUpdateDom={setUpdateDom}
              onClose={onClose}
            />
          )}
          {/* {ShowExpPopUp && <ExpEditPopUp setUpdateDom={setUpdateDom} onClose={onClose} />} */}
          <hr className="line" />
          <div className="journey">
            <div className="add-icon-container">
              <h2>Skills</h2>

              <span
                className="edit-button-text"
                onClick={() => {
                  navigate('/editskills');
                }}
              >
                <img src={editIcon} height={25} width={25} alt="edit-icon" />
              </span>
            </div>
            {userDetails.skills && userDetails.skills.length === 0 && (
              <p style={{ margin: '10px', fontSize: '1.1rem' }}>
                Add your skills here...
              </p>
            )}
            <div id="skills-cont" className="skills-cont">
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
            <div className="add-icon-container">
              <h2>Education</h2>
              <span
                className="edit-button-text"
                onClick={(e) => {
                  handleEdu(e);
                }}
              >
                <img src={plusIcon} height={25} width={25} alt="plus-icon" />
              </span>
            </div>
            {userDetails.education && userDetails.education.length === 0 && (
              <p style={{ margin: '10px', fontSize: '1.1rem' }}>
                Add your education details here...
              </p>
            )}
            {ShowSkillPopUp && (
              <SkillPopUp
                setUpdateDom={setUpdateDom}
                onClose={onClose}
                oldSkills={userDetails.skills}
              />
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
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <div>
                          <div
                            className="education-qualification"
                            style={{ width: '38vw' }}
                          >
                            ➤ {item.institution} <br />
                          </div>
                          <div className="institute-address">
                            {item.city ? `${item.city},` : ''}{' '}
                            {item.state ? item.state : ''}
                          </div>
                          <div className="degree" style={{ width: '38vw' }}>
                            {item.degree}{' '}
                            {item.fieldOfStudy ? `- ${item.fieldOfStudy}` : ''}
                          </div>
                          <div className="profile-page-content">
                            <div className="date">
                              <span className="date-m">From:</span>
                              <span>
                                {item.startDate &&
                                  new Date(item.startDate)
                                    .toString()
                                    .slice(4, 15)}
                              </span>
                              <span className="date-m gap">To:</span>
                              <span>
                                {item.endDate &&
                                  new Date(item.endDate)
                                    .toString()
                                    .slice(4, 15)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            gap: '4px',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={editIcon}
                            id="edit-text"
                            className={`add-icon ${
                              isButtonClicked ? 'active' : ''
                            }`}
                            onClick={(e) => {
                              handleEdu(e, item._id);
                            }}
                            style={{ height: '30px', width: '30px' }}
                            alt="add-icon"
                          />
                          <img
                            onClick={() => handleDelEdu(item._id)}
                            style={{ cursor: 'pointer' }}
                            src={delIcon}
                            height={20}
                            width={20}
                            alt="del"
                          />
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
            {ShowEduPopUp[1] && (
              <EduPopUp
                eduID={ShowEduPopUp[2]}
                id={ShowEduPopUp[0]}
                setUpdateDom={setUpdateDom}
                onClose={onClose}
              />
            )}
            {/* {ShowEduPopUp && <EduEditPopUp setUpdateDom={setUpdateDom} onClose={onClose} />} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
