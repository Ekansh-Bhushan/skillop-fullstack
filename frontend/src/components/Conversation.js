import React, { useEffect, useState } from "react";
import { findUser } from "../api/userRequest";
import user from "./images/user.png";
import { getMessages } from "../api/messageRequest";

const Conversation = ({ data, currentUser, chat, chatID }) => {
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
        console.log("chat - id", chatID);
        const d = await getMessages(chatID);
        setMessages(d.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div>
      {userData && (
        <div className="chats-user">
          {" "}
          <div className="user-section">
            <img
              id="chat-user-pic"
              src={userData.profilePicUrl ? userData.profilePicUrl : user}
              height={70}
              width={70}
            />
            <div className="friend-name">
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                {userData.firstname} {userData.lastname}
              </span>
              {messages.length > 0 && (
                <p style={{ color: "#4d4d4d" }}>
                  {messages[messages.length - 1].text.slice(0, 25)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
