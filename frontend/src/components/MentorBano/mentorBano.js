import { Circle } from 'rc-progress';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import './mentorBano.css';
import { getProfileCompletionStatus } from '../../api/userRequest';
import { requestToBeMentor } from '../../api/mentorRequest';
import Mobilecommonhead from '../Mobilecommonhead';

function MentorBano({setProgress}) {
  const [isTaskDone, setIsTaskDone] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [Pprogress, setPProgress] = useState(0);

  function increaseCircularProgress(currentProgress, steps) {
    if (steps <= 0) {
      throw new Error('Number of steps must be greater than 0');
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
  console.log('New progress:', newProgress);

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

  const [mentorStatus, setMentorStatus] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isNotApplied, setIsNotApplied] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [PercentageProfileComplete, setPercentageProfileComplete] = useState(0);

  useEffect(() => {
    try {
      const getProfileCompletionData = async () => {
        const { data } = await getProfileCompletionStatus();
        console.log("here is status",data);
        if (data.status === 'pending') {
          setIsPending(true);
        } else if (data.status === 'accepted') {
          setIsAccepted(true);
        } else if (data.status === 'not applied') {
          setIsNotApplied(true);
        } else if (data.status === 'rejected') {
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
          console.log(data.result.profileComplitionStatus, 'hello');
        } else {
          toast.error(data.error);
        }
      };
      getProfileCompletionData();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }, []);

  const requestToBeMentorX = async () => {
    if (!isActive) {
      toast.error('First complete all steps!');
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
      <Mobilecommonhead />
      <div className='flex items-center justify-center mx-[25vw] border-r-2 flex-col h-[100vh] pt-[6vh] md:mx-5 md:border-0 md:pt-[10vh] md:h-full md:pb-5'>
        <h2 className='text-3xl font-semibold my-5'>Become a Mentor</h2>
        <div className='w-[30%] flex items-center justify-center pr-10 md:w-[55%] md:pr-0'>
          <div className='absolute flex items-center justify-center flex-col'>
            <h2 className='text-4xl font-semibold'>
              {PercentageProfileComplete}%
            </h2>
            <p className='text-2xl font-semibold'>Complete</p>
          </div>
          <Circle
            percent={PercentageProfileComplete}
            strokeColor='#0AE70A'
            strokeWidth={9}
            trailWidth={8}
            strokeLinecap='square'
            className={isTaskDone ? 'done' : 'not-done'}
          >
            <div
              style={{
                backgroundColor: 'red',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              {isTaskDone ? '1 Of 4 steps is completed' : ''}
            </div>
          </Circle>
        </div>

        <div className=' bg-white bg-opacity-50 backdrop-blur-[20px] border-2 py-4 px-[5vw] text-lg rounded-2xl mt-2'>

          <ul>
            <li className={uploadProfilePicAndVideo ? 'done' : 'not-done'}>
              Upload Profile Pic and My story video
            </li>
            <li className={addedAboutPastAndFuture ? 'done' : 'not-done'}>
              Add About, Past experience And Future plans
            </li>
            <li className={addedEducationOrExperence ? 'done' : 'not-done'}>
              Add Education, Experience and Skills
            </li>
            <li className={addedAtleast4Posts ? 'done' : 'not-done'}>
              Create atleast 4 posts
            </li>
          </ul>
        </div>
        {isNotApplied && (
          <div className='font-semibold text-center my-5'>
            You are One step away from becoming a Mentor...
          </div>
        )}
        <div className='but md:mb-10'>
          {isNotApplied && (
            <button
              className={isActive ? 'custom-button' : 'custom-button-active'}
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
      </div>
    </>
  );
}

export default MentorBano;
