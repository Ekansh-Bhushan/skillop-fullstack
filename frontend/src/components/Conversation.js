import React, { useEffect, useState } from 'react';
import { findUser } from '../api/userRequest';
import user from './images/user.png';
import { getMessages } from '../api/messageRequest';

const Conversation = ({ data, currentUser, chat, chatID, reloadChats }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

  //   console.log(data);
  useEffect(() => {
    const otherUserId = data.members.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await findUser(otherUserId);
        setUserData(data.result);
        // console.log(data.result);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const d = await getMessages(chatID);
        setMessages(d.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, [reloadChats]);

  return (
    <div>
      {userData && messages.length > 0 && (
        <div
          className={`chats-user ${
            currentUser !== messages[messages.length - 1].senderId &&
            !messages[messages.length - 1].seen
              ? 'bg-yellow-200'
              : 'bg-white'
          }`}
        >
          {' '}
          <div className='user-section'>
            <img
              id='chat-user-pic'
              src={userData.profilePicUrl ? userData.profilePicUrl : user}
              height={70}
              width={70}
              alt='chat'
            />
            <div className='friend-name'>
              <span style={{ fontSize: '1.06rem', fontWeight: 'bold' }}>
                {userData.firstname} {userData.lastname}
              </span>
              <div className='text-[0.96rem] text-gray-800'>
                <p
                  className={`${
                    currentUser !== messages[messages.length - 1].senderId &&
                    !messages[messages.length - 1].seen
                      ? 'font-bold'
                      : ''
                  }`}
                >
                  {currentUser === messages[messages.length - 1].senderId
                    ? 'You: ' + messages[messages.length - 1].text.slice(0, 25)
                    : messages[messages.length - 1].text.slice(0, 25)}
                </p>
                {/* {!messages.seen && (
                    <div className='bg-yellow-500 h-4 w-4 rounded-full'></div>
                )} */}
              </div>
            </div>
          </div>
          {/* <div>Chat ended</div> */}
        </div>
      )}
    </div>
  );
};

export default Conversation;
