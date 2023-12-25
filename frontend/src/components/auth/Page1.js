import React, { useState } from "react";
import img1 from "../../components/images/img1.png";
import Nav from "./Nav";
import { FaLinkedin, FaGoogle } from "react-icons/fa";
import { googleIdVerifyAndLogin, registerUser } from "../../api/userRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Page1 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const signupClicked = async () => {
    // block the signup buttom

    try {
      const { data } = await registerUser({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      });
      console.log(data);
      if (data.result) {
        localStorage.setItem("skilloptoken", data.token);
        toast.success(data.message);
        navigate("/skill3");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    console.log(idToken);
    const decodedToken = jwt_decode(idToken);
    console.log(decodedToken);

    const { data } = await googleIdVerifyAndLogin({ token: idToken });
    console.log(data);
    // Store the token in local storage
    localStorage.setItem("skilloptoken", data.token);
    if (data && data.result) {
      if (data.type === "old") {
        navigate("/homepage");
      } else {
        navigate("/skills");
      }
    } else {
      toast.error(data.message);
    }

    // console.log(decodedToken);

    // // Extract user information from decoded token
    // const userFirstName = decodedToken.given_name || "";
    // const userEmail = decodedToken.email || "";
    // const userLastName = decodedToken.family_name || "";

    // // Set user information in state
    // setFirstname(userFirstName);
    // setLastname(userLastName);
    // setEmail(userEmail);
  };

  return (
    <div>
      <div className="fixed w-full">
        {" "}
        <Nav />
      </div>
      <div className="flex justify-around items-start pt-[15vh] mx-[20vh]">
        <div class="flex justify-center items-center ">
          <div class="flex flex-col items-start justify-start">
            <div className="flex items-center justify-center gap-[8vh] text-[30px] font-semibold">
              <div>
                {" "}
                <a href="/signup">SIGNUP</a>
              </div>
              <div>
                {" "}
                <a href="/login">LOGIN</a>
              </div>
            </div>
            <p className="text-[#7E8B9E] font-semibold text-lg mt-[4vh]">
              Welcome, We are glad to see you!
            </p>
            <div className="flex flex-col w-[80%]">
              <label className="mt-5 mb-2">First Name</label>
              <input
                className="border-2 rounded-lg bg-[#FAFAFC] py-2"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label className="mt-5 mb-2">Last Name</label>
              <input
                className="border-2 rounded-lg bg-[#FAFAFC] py-2"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <label className="mt-5 mb-2">Email</label>
              <input
                className="border-2 rounded-lg bg-[#FAFAFC] py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="mt-5 mb-2">Password</label>
              <input
                className="border-2 rounded-lg bg-[#FAFAFC] py-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="w-[80%]">
              <div class="mt-4">
                <label for="agree" class="flex items-center">
                  <input
                    type="checkbox"
                    id="agree"
                    class="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span class="ml-2 text-sm">
                    By signing up, you are creating a SKILLOP account, and you
                    agree to SKILLOP’s{" "}
                    <a href="#" class="text-blue-600">
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a href="#" class="text-blue-600">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>
              <div class="mt-4">
                <label for="remember" class="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    class="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span class="ml-2 text-sm">
                    Remember Me as a{" "}
                    <a href="#" class="text-blue-600">
                      Member
                    </a>{" "}
                    of{" "}
                    <a href="#" class="text-blue-600">
                      SKILLOP Community
                    </a>
                  </span>
                </label>
              </div>
              <button
                className="bg-[#3568FF] w-full text-white py-3 rounded-lg mt-5"
                onClick={signupClicked}
              >
                Sign Up
              </button>
              <div class="w-full mt-6 flex items-center justify-center ">
                <hr class="border-t border-gray-300 w-1/4 mr-4"></hr>
                <span class="text-gray-500">OR</span>
                <hr class="border-t border-gray-300 w-1/4 ml-4"></hr>
              </div>
              <div className="flex mt-4 text-[#7E8B9E] mb-2 w-full">
                <button className="bg-transparent hover:bg-blue-100  font-bold py-2 px-8 rounded flex items-center border-[1px] ">
                  <FaLinkedin className="mr-2" />
                  Sign in with LinkedIn
                </button>
                <button className="bg-transparent hover:bg-red-100 font-bold py-2 px-8 ml-4 rounded flex items-center border-[1px]">
                  <FaGoogle className="mr-2" />
                  Sign in with Google
                </button>
              </div>

              <span class="ml-2 text-md text-[#7E8B9E] ">
                Already a part of SKILLOP Community ?
                <a href="/login" class="text-blue-600 mx-2">
                  LOGIN
                </a>
                here
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-center flex-col ">
          <h1 className="text-5xl w-[100%] mb-2">Connecting Dreams,</h1>
          <h1 className="text-5xl w-[80%] mb-2">Fostering Growth</h1>
          <p className="text-[27px] font-medium">
            Sign up for your mentorship journey today!
          </p>
          <img src={img1} />
        </div>
      </div>
    </div>
  );
};

export default Page1;
