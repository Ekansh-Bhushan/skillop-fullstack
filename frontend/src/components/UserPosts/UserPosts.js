import React, { useContext, useEffect, useState } from 'react';
import { getPostFromSpecificUser } from '../../api/postRequest';
import PostComp from '../PostComp';
import './UserPost.css';
import Profileandevents from '../Landing/Profileandevents';
import { getUser } from '../../api/userRequest';
import toast from 'react-hot-toast';
import Mobilecommonhead from '../Mobilecommonhead';
import { MainContext } from '../../context/MainContextProvider';

const UserPosts = ({ setProgress, Mentor, isFetched, notifyList }) => {
  const userId = window.location.pathname.split('/')[2];

  const [PostData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);

  const fetchPosts = async () => {
    try {
      const Data = await getPostFromSpecificUser(userId);
      setPostData(Data.data.result);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log('Unable to fetch posts at the moment', err);
    }
  };
  const { currentUser, setCurrentUser } = useContext(MainContext);
  const fetchUser = async () => {
    try {
      if (!currentUser) {
        const Data = await getUser();
        setUserData(Data.data.result);
        setCurrentUser(Data.data.result);
      } else {
        setUserData(currentUser);
      }
    } catch (err) {
      console.log('Unable to fetch user data at the moment', err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, []);

  return (
    <>
      <div className='.main-content-landing2'>
        <Mobilecommonhead />
        <div className='people-post2 w-[60%]'>
          <h1>
            Posts from{' '}
            {PostData[0] &&
              PostData[0].author.firstname +
                ' ' +
                PostData[0].author.lastname}{' '}
          </h1>
          <div className='w-[84%]'>
            {PostData &&
              PostData.slice()
                .reverse()
                .map((val, i) => (
                  <PostComp
                    {...val}
                    userData={userData}
                    // user={user}
                    key={i}
                    setProgress={setProgress}
                  />
                ))}
          </div>
        </div>
        <Profileandevents userData={userData} />
      </div>
    </>
  );
};

export default UserPosts;
