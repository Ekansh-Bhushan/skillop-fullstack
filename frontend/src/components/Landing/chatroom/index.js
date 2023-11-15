import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userChats } from "../../../api/chatRequest";
import Conversation from "../../Conversation";
import Chatbox from "../../Chatbox";
import { io } from "socket.io-client";
import SideNav from "../../SideNav/SideNav";
import Mobilecommonhead from "../../Mobilecommonhead";
import "./chat.css";

function Chat({ userData, setProgress, Mentor, isFetched, notifyList }) {
  // console.log(userData);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const [showChatbox, setShowChatbox] = useState(false);
  const socket = useRef();

  // send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("https://app.skillop.in");

    userData && socket.current.emit("new-user-add", userData._id);

    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  // receive message from socket server

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  /*-------------------------------------------------------*/

  const targetRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (targetRef.current && !targetRef.current.contains(event.target)) {
        document.querySelector(".filtered-results").classList.add("hidethis");
        document.querySelector(".search-bar-landing").value = "";
        document.querySelector(".search-bar-landing").style.width = "200px";
        document.querySelector(".search-bar-landing").style.borderRadius =
          "20px";
        document.querySelector(".search-bar-landing").style.background =
          "rgb(225,225,225)";
        document.querySelector(".search-bar-landing").style.width = "200px";
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  const redirect_chat_id = new URLSearchParams(window.location.search).get(
    "chat-id"
  );

  useEffect(() => {
    if (userData !== null) {
      const getChats = async () => {
        try {
          const { data } = await userChats(userData._id);
          setChats(data);
          if (redirect_chat_id.length > 0) {
            setCurrentChat(
              data.filter((item) => item._id === redirect_chat_id)[0]
            );
          }
        } catch (error) {
          console.log(error);
        }
      };
      getChats();
    }
  }, [redirect_chat_id, userData]);

  const handleChatClick = (chat) => {
    document.querySelector('.text-chat-prev').style.display = 'none';
    setCurrentChat(chat);
    setShowChatbox(true);

    setTimeout(() => {
      const chatboxMessages = document.querySelector(".chatbox-messages");
      if (chatboxMessages) {
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
      }
    }, 100);
  };
  const handleToggleChatbox = () => {
    setShowChatbox((prevShowChatbox) => !prevShowChatbox);
  };

  return (
    <div>
      <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      />
      <Mobilecommonhead />
      {/* <Common setProgress={setProgress}/> */}
      <div className="main-content-landing-chat">
        <div className="chat-room">
          {showChatbox && (
            <div className="chat-slider">
              <Chatbox
                chats={chats}
                chat={currentChat}
                currentUser={userData._id}
                setSendMessage={setSendMessage}
                recieveMessage={recieveMessage}
                toggleChatbox={handleToggleChatbox}
              />{" "}
            </div>
          )}
          <h2
           className="text-chat-prev"
          >
            {chats.length === 0
              ? "Follow someone to chat with him!"
              : "Please Select a User to Chat with!"}
          </h2>
          <div className="chat-friends-list">
            <div>
              <h2 className="chat-head">Chats</h2>
              {/* <input
                className="search-input"
                type="text"
                placeholder="Search chats..."
              />

              <img
                className="search-img"
                src="/search.png"
                alt="search"
                height={21}
                width={21}
              /> */}
              <hr
                style={{
                  height: "2px",
                  background: "black",
                  borderRadius: "20px",
                }}
              />

              <div className="chat-list">
                {chats.length > 0 &&
                  chats.map((chat) => (
                    <div
                      // onClick={() => {
                      //   setCurrentChat(chat);
                      //   document.querySelector(".chatbox-messages").scrollTop =
                      //     document.querySelector(
                      //       ".chatbox-messages"
                      //     ).scrollHeight;
                      // }}
                      onClick={() => handleChatClick(chat)}
                    >
                      <Conversation
                        data={chat}
                        chatID={chat._id}
                        currentUser={userData._id}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chat;
