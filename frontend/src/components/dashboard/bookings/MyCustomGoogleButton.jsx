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
        "https://skillop.in/api/mentor/meet/create-tokens",
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
          fontSize: "1.1rem",
          textAlign: "center",
          lineHeight: "28px",
          marginBottom: "15vh",
          fontWeight: "600",
        }}
      >
        You need to authorize SKILLOP MEETS to create an event in your Google{" "}
        <br /> Calendar along with Google Meet link.
      </p>
      <button
        style={{
          padding: "0.6vw",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          border: "1px solid #00000026",
          padding: "15px 30px",
        }}
        id="oauth2-btn"
        onClick={() => login()}
      >
        <img src="/google.png" width={23} alt="" />
        Sign in & Authorize SKILLOP MEETS!
      </button>
    </>
  );
};

export default MyCustomGoogleButton;
