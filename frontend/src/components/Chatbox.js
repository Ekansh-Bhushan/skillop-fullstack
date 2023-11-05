import React, { useEffect, useRef, useState } from "react";
import { findUser } from "../api/userRequest";

import { addMessage, getMessages } from "../api/messageRequest";
import { format } from "timeago.js";
import { AiOutlineSend } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import user from "./images/user.png";
import { SlOptionsVertical } from "react-icons/sl";
import { toast } from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const Chatbox = ({
	chat,
	currentUser,
	setSendMessage,
	recieveMessage,
	chats,
}) => {
	const [userData, setUserData] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	// const [lastDisplayedDate, setLastDisplayedDate] = useState(null);
	let lastDisplayedDate = "";
	let currDisplayedDate = "";
	const [showEmoji, setShowEmoji] = useState(false);

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
				setNewMessage("");
				document
					.querySelector(".chatbox-messages")
					.scrollIntoView({ behavior: "smooth", block: "end" });
				document.querySelector(".chatbox-messages").scrollTop =
					document.querySelector(".chatbox-messages").scrollHeight;
			} catch (e) {
				console.log(e);
			}

			// send message to socket server
			const receiverId = chat.members.find((id) => id !== currentUser);

			setSendMessage({ ...message, receiverId });
		} else {
			toast.error("Type something to send!");
		}
		var chats = document.querySelector(".chatbox-messages");
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

		const chats = document.querySelector(".chatbox-messages");
		chats.scrollTop = chats.scrollHeight;

		if (messagesRef.current) {
			messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div className="chatting">
			<div className="chat-user-details">
				{userData && chat ? (
					<img src={userData.profilePicUrl} className="chat-user-img"></img>
				) : (
					<div></div>
				)}
				{userData && (
					<>
						<div className="chat-user-name">
							{" "}
							{userData.firstname} <span>{userData.lastname}</span>
						</div>
						<div className="verticall">
							<SlOptionsVertical />
						</div>
					</>
				)}
			</div>

			{chat ? (
				<div
					className="chatbox-messages"
					onClick={() => setShowEmoji(false)}
					id="chat-scroll"
					ref={messagesRef}
				>
					{" "}
					{messages ? (
						messages.map((message) => {
							lastDisplayedDate = currDisplayedDate;
							currDisplayedDate = new Date(message.createdAt).toString().slice(4, 15); 
							return (
								<div
									className={`${message.senderId === currentUser ? "message-right" : "message-left"
										}`}
								>
									{currDisplayedDate !== lastDisplayedDate && (
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												width: "100%",
												fontSize: "0.9rem",
												margin: "10px",
												color: "black",
											}}
										>
											<div
												style={{
													width: "16%",
													borderRadius: "8px",
													textAlign: "center",
													padding: "3px",
												}}
											>
												{new Date(message.createdAt).toString().slice(4, 15)}
											</div>
										</div>
									)}

									<p
										style={{
											overflow: "hidden",
											wordWrap: "break-word",
											fontSize: "1.05rem",
											lineHeight: "26px",
										}}
									>
										{message.text}
										<div
											style={{
												fontSize: "12px",
												color: "gray",
												margin: "0.3rem 0px 0rem 0px",
											}}
										>
											{new Date(message.createdAt).toString().slice(16, 21)}
										</div>
									</p>
								</div>
							);
						})
					) : (
						<span>Start Typing</span>
					)}

				</div>
			) : (
				<div
					className="chatbox-messages"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "30px",
					}}
				>
					<p
						style={{
							textAlign: "center",
						}}
					>
						{chats.length === 0
							? "Follow someone to chat with him!"
							: "Please Select a User to Chat with!"}
					</p>
				</div>
			)}
			<div className="message-send-bar">
				{chat && (
					<textarea
						placeholder="Type Here...."
						value={newMessage}
						onChange={handleChange}
						className="message-tobe-sent"
						onKeyDown={(e) => {
							if (e.keyCode === 13 && !e.shiftKey) handleSend();
						}}
					/>
				)}

				{chat ? (
					<>
						<div className="emoji" onClick={() => setShowEmoji(!showEmoji)}>
							{showEmoji && (
								<div className="emoji-picker">
									<EmojiPicker
										emojiStyle="google"
										onEmojiClick={onEmojiClick}
										width={300}
										height={400}
									/>
								</div>
							)}
							<img src="emoji.png" alt="emoji" width={36} />
						</div>
						<img
							className="send-btn"
							height={36}
							width={36}
							onClick={handleSend}
							src="/post.png"
							alt=""
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
