import React, { useState } from "react";
import img1 from "../../components/images/Saly-24.png";
import Nav from "./Nav";
import { FaLinkedin, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { loginUser } from "../../api/userRequest";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    try {
      const { data } = await loginUser({
        email: email,
        password: password,
      });
      if (data.result) {
        localStorage.setItem("skilloptoken", data.token);
        navigate("/homepage");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.err);
    }
  };
  const loginClicked = async () => {
    await login();
  };
  return (
    <div>
      {/* <div className="fixed w-full">
                {" "}
                <Nav />
            </div> */}
      <div className="flex justify-around items-start pt-[15vh] mx-[20vh]">
        <div class="flex justify-center items-center ">
          <div class="flex flex-col items-start justify-start">
            <div className="flex items-center justify-center gap-[8vh] text-[30px] font-semibold">
              <div>SIGNUP</div>
              <div>LOG IN</div>
            </div>
            <p className="text-[#7E8B9E] font-semibold text-lg mt-[4vh]">
              Welcome back, We are happy to see you back!
            </p>
            <div className="flex flex-col w-[100%]">
              <label className="mt-5 mb-2">Email</label>
              <input
                className="border-2 rounded-lg bg-[#FAFAFC] py-2"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="mt-5 mb-2">Password</label>
              <input
                className="border-2 rounded-lg bg-[#FAFAFC] py-4"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-[100%]">
              <button
                className="bg-[#3568FF] w-full text-white py-3 rounded-lg mt-5"
                onClick={loginClicked}
              >
                Login
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
                Not a part of SKILLOP Community?
                <a
                  class="text-blue-600 mx-2"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </a>
                here
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-center flex-col ">
          <h1 className="text-5xl w-[100%] mb-2">Empower your Journey,</h1>
          <h1 className="text-5xl w-[80%] mb-2">Welcome Back!</h1>
          <p className="text-[27px] font-medium">
            Log in to unlock a world of mentorship possibilities
          </p>
          <img src={img1} />
        </div>
      </div>
    </div>
  );
};

export default Login;
