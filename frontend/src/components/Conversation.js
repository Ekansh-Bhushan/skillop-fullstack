import React, { useEffect, useState } from 'react';
import { findUser } from '../api/userRequest';
import user from './images/user.png';
import { getMessages } from '../api/messageRequest';
import { toast } from 'react-hot-toast';

const Conversation = ({ data, currentUser, chat, chatID }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const otherUserId = data.members.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await findUser(otherUserId);
        setUserData(data.result);
      } catch (e) {
        toast.error(e);
      }
    };
    getUserData();
  }, [data.members, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const d = await getMessages(chatID);
        setMessages(d.data);
      } catch (err) {
        toast.error(err);
      }
    };
    fetchMessages();
  }, [chatID]);

  return (
    <div>
      {userData && (
        <div
          className={`chats-user ${
            messages.length > 0 &&
            currentUser !== messages[messages.length - 1]?.senderId &&
            !messages[messages.length - 1]?.seen
              ? 'bg-yellow-200'
              : 'bg-white'
          }`}
        >
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
                {messages.length > 0 && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;