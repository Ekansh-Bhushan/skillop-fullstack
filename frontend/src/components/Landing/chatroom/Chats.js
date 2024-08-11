import React from "react";
import Chatbox from "../../Chatbox";

const Chats = ({ chat, currentUser, setSendMessage, recieveMessage }) => {
  return (
    <div
      className="chatSpace"
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Chatbox
        chat={chat}
        currentUser={currentUser}
        setSendMessage={setSendMessage}
        recieveMessage={recieveMessage}
      />
    </div>
  );
};

export default Chats;
