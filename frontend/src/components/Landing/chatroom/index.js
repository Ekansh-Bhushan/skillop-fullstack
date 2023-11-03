import React, { useEffect, useState, useRef } from "react";
import user from "../../images/user.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userChats } from "../../../api/chatRequest";
import Conversation from "../../Conversation";
import Chatbox from "../../Chatbox";
import { io } from "socket.io-client";
import SideNav from "../../SideNav/SideNav";
import Mobilecommonhead from "../../Mobilecommonhead";
import Chats from "./Chats";
import "./chat.css";

function Chat({ userData, setProgress, Mentor, isFetched, notifyList }) {
  // console.log(userData);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const socket = useRef();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (userData !== null) {
      const getChats = async () => {
        try {
          const { data } = await userChats(userData._id);
          setChats(data);
          // console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      getChats();
    }
  }, [userData]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };
  const handleSendMessage = () => {
    var newMessage;
    if (inputMessage.trim() !== "") {
      newMessage = {
        id: messages.length + 1,
        sender: "user",
        message: inputMessage,
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
    axios
      .put("path/to/updateChat", newMessage)
      .then((response) => {
        console.log("Message added:", response.data);
      })
      .catch((error) => {
        console.error("Error adding message:", error);
      });
  };
  /*-------------------------------------------------------*/

  const targetRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (targetRef.current && !targetRef.current.contains(event.target)) {
        // This condition checks if the clicked element is not within the target div
        // Place your function code here

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
          <Chatbox
            chats={chats}
            chat={currentChat}
            currentUser={userData._id}
            setSendMessage={setSendMessage}
            recieveMessage={recieveMessage}
          />{" "}
          <div className="chat-friends-list">
            <div
              style={{
                position: "fixed",
                top: "1rem",
                background: "white",
                width: "26%",
              }}
            >
              {/* <h2 className="chat-head">Chats</h2> */}
              {/* <input
                                className="search-input"
                                type="text"
                                placeholder="Search chats..."
                            /> */}

              {/* <img
                className="search-img"
                src="/search.png"
                alt="search"
                height={21}
                width={21}
              /> */}
              {/* <hr /> */}
            </div>
            {/* <div style={{ marginBottom: "40px" }}></div> */}
            {chats.length > 0 &&
              chats.map((chat) => (
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                    console.log("here");
                    document.querySelector(".chatbox-messages").scrollTop =
                      document.querySelector(".chatbox-messages").scrollHeight;
                  }}
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
  );
}
export default Chat;
