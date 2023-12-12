import { config } from "@fortawesome/fontawesome-svg-core";
import { hasGrantedAllScopesGoogle, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const MyCustomGoogleButton = ({ setIsSignedIn }) => {
	const [Gtoken, setGtoken] = useState("");

	const handleToken = async (code) => {
		const skilloptoken = localStorage.getItem("skilloptoken");
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: skilloptoken,
			},
			withCredentials: true,
		};
		return axios
			.post(
				"http://localhost:4000/api/mentor/meet/create-tokens",
				{ code },
				config
			)
			.then((res) => {
				// console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const login = useGoogleLogin({
		onSuccess: (codeResponse) => {
			setGtoken(codeResponse.code);
			handleToken(codeResponse.code);
			setIsSignedIn(true);
			console.log("by google : ", codeResponse.code);
		},
		onError: (err) => {
			console.log(err);
			toast.error(err.string);
		},
		scope: "openid email profile https://www.googleapis.com/auth/calendar",
		flow: "auth-code",
	});

	const hasAccess = hasGrantedAllScopesGoogle(
		Gtoken,
		"https://www.googleapis.com/auth/caledndar",
		"https://www.googleapis.com/auth/meet"
	);

	return (
		<>
			<p
				style={{
					fontSize: "1.08rem",
					textAlign: "center",
					lineHeight: "23px",
				}}>
				You need to authorize <b>SKILLOP MEETS </b>to create an event{" "}
				<br /> in your Google Calendar along with Google Meet link.
			</p>
			<button
				style={{
					padding: "0.6vw",
					fontSize: "1.1rem",
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					gap: "10px",
				}}
				id='oauth2-btn'
				onClick={() => login()}>
				<img src='/google.png' width={30} alt='' />
				Sign in & Authorize SKILLOP MEETS!
			</button>
		</>
	);
};

export default MyCustomGoogleButton;
