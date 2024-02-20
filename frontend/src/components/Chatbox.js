import React, { useEffect, useRef, useState } from 'react';
import { findUser } from '../api/userRequest';
import { addMessage, getMessages, seenMessage } from '../api/messageRequest';
import { FaArrowLeft } from 'react-icons/fa6';
import { SlOptionsVertical } from 'react-icons/sl';
import { toast } from 'react-hot-toast';
import EmojiPicker from 'emoji-picker-react';
import { IoMdAdd } from 'react-icons/io';
import spinner from '../components/images/spinner.gif';

const Chatbox = ({
  chat,
  currentUser,
  setSendMessage,
  recieveMessage,
  chats,
  toggleChatbox,
  // reloadChats,
  // setReloadChats,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  let lastDisplayedDate = '';
  let currDisplayedDate = '';
  const [showEmoji, setShowEmoji] = useState(false);

  const handleChatboxClose = () => {
    // Call the toggleChatbox function from props to close the chatbox
    toggleChatbox();
  };

  // document.querySelector(".chatbox-messages").scrollTop = document.querySelector(".chatbox-messages").scrollHeight;
  const messagesRef = useRef();
  const onEmojiClick = (event) => {
    setNewMessage((oldMsg) => {
      return oldMsg + event.emoji;
    });
  };

  useEffect(() => {
    const otherUserId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await findUser(otherUserId);
        setUserData(data.result);
      } catch (e) {
        console.log(e);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  const handleChange = (event) => {
    const newMessageValue = event.target.value;
    setNewMessage(newMessageValue);
  };

  const handleSend = async (e) => {
    if (newMessage) {
      const message = {
        senderId: currentUser,
        text: newMessage,
        chatId: chat._id,
        // chatId: "64db7e1e8bb983fa766a79a5",
      };

      // send message to database

      try {
        const { data } = await addMessage(message);
        setMessages([...messages, data]);
        setNewMessage('');
        // setReloadChats(!reloadChats);
        document
          .querySelector('.chatbox-messages')
          .scrollIntoView({ behavior: 'smooth', block: 'end' });
        document.querySelector('.chatbox-messages').scrollTop =
          document.querySelector('.chatbox-messages').scrollHeight;
      } catch (e) {
        console.log(e);
      }

      // send message to socket server
      const receiverId = chat.members.find((id) => id !== currentUser);

      setSendMessage({ ...message, receiverId });
    } else {
      toast.error('Type something to send!');
    }
    var chats = document.querySelector('.chatbox-messages');
    chats.scrollTop = chats.scrollHeight;
  };

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        // console.log(data);
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    // ... (existing code)

    const chats = document.querySelector('.chatbox-messages');
    chats.scrollTop = chats.scrollHeight;

    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='chatting'>
      <div className='chat-user-details'>
        <div onClick={handleChatboxClose} className='left-arrow'>
          <FaArrowLeft size={24} />
        </div>
        {userData && (
          <>
            <div className='font-semibold'>
              {' '}
              {userData.firstname} <span>{userData.lastname}</span>
            </div>
            <div className='verticall'>
              <SlOptionsVertical />
            </div>
          </>
        )}
      </div>
      {chat ? (
        <div
          className='chatbox-messages'
          onClick={() => setShowEmoji(false)}
          id='chat-scroll'
          ref={messagesRef}
        >
          {' '}
          {messages ? (
            messages.map((message) => {
              lastDisplayedDate = currDisplayedDate;
              currDisplayedDate = new Date(message.createdAt)
                .toString()
                .slice(4, 15);
              if (message._id && message.senderId !== currentUser && !message.seen) {
                try {
                  console.log("going to seen this msg - ", message._id)
                  seenMessage(message._id);
                  // setReloadChats(!reloadChats);
                } catch (err) {
                  console.log('Unable to seen msgs', err);
                }
              }
              return (
                <div
                  className={`${
                    message.senderId === currentUser
                      ? 'message-right'
                      : 'message-left'
                  }`}
                >
                  {currDisplayedDate !== lastDisplayedDate && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        fontSize: '0.9rem',
                        margin: '10px',
                        color: 'black',
                      }}
                    >
                      <div
                        style={{
                          width: '16%',
                          borderRadius: '8px',
                          textAlign: 'center',
                          padding: '3px',
                        }}
                      >
                        {new Date(message.createdAt).toString().slice(4, 15)}
                      </div>
                    </div>
                  )}

                  <p
                    style={{
                      overflow: 'hidden',
                      wordWrap: 'break-word',
                      fontSize: '1.05rem',
                      lineHeight: '26px',
                    }}
                  >
                    {message.text}
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'gray',
                        margin: '0.3rem 0px 0rem 0px',
                      }}
                    >
                      <div className='flex items-center justify-between gap-2'>
                        {new Date(message.createdAt).toString().slice(16, 21)}
                        {message.senderId === currentUser && (
                          <img
                            src={
                              message.seen ? `/double-tick.png` : `/tick.png`
                            }
                            width={20}
                            alt=''
                          />
                        )}
                      </div>
                    </div>
                  </p>
                </div>
              );
            })
          ) : (
            <img src={spinner} className='absolute right-[50vw]' />
          )}
        </div>
      ) : (
        <div
          className='chatbox-messages'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
          }}
        >
          <p
            style={{
              textAlign: 'center',
            }}
          >
            {chats.length === 0
              ? 'Follow someone to chat with him!'
              : 'Please Select a User to Chat with!'}
          </p>
        </div>
      )}
      <div className='message-send-bar border-t-[1px]'>
        {chat && (
          <input
            placeholder='Type Here....'
            value={newMessage}
            onChange={handleChange}
            className='bg-[#84848426] border-0 rounded-3xl w-[70%] py-3 px-5'
            onKeyDown={(e) => {
              if (e.keyCode === 13 && !e.shiftKey) handleSend();
            }}
          />
        )}

        {chat ? (
          <>
            <div className='emoji' onClick={() => setShowEmoji(!showEmoji)}>
              {showEmoji && (
                <div className='emoji-picker'>
                  <EmojiPicker
                    emojiStyle='google'
                    onEmojiClick={onEmojiClick}
                    width={300}
                    height={400}
                  />
                </div>
              )}
              <div className='bg-[#108CFF] rounded-full p-[10px] shadow-md'>
                <IoMdAdd className='text-white' />
              </div>
              {/* <img src={add} alt="emoji" width={36} /> */}
            </div>
            <img
              className='send-btn'
              height={36}
              width={36}
              onClick={handleSend}
              src='/post.png'
              alt=''
            />
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Chatbox;