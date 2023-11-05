import { hasGrantedAllScopesGoogle, useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const MyCustomGoogleButton = () => {
	const [Gtoken, setGtoken] = useState("");

	const login = useGoogleLogin({
		onSuccess: (codeResponse) => {
			setGtoken(codeResponse.code);
			console.log(codeResponse);
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
		"google-scope-1",
		"google-scope-2"
	);

	return (
		<>
			<button id='oauth2-btn' onClick={() => login()}>
				Sign in with Google 🚀{" "}
			</button>
		</>
	);
};

export default MyCustomGoogleButton;
