import React from "react";
import img1 from "../../components/images/img1.png";
import Nav from "./Nav";
import { FaLinkedin, FaGoogle } from "react-icons/fa";

const Page1 = () => {
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
              <div>SIGNUP</div>
              <div>LOG IN</div>
            </div>
            <p className="text-[#7E8B9E] font-semibold text-lg mt-[4vh]">
              Welcome, We are glad to see you!
            </p>
            <div className="flex flex-col w-[80%]">
              <label className="mt-5 mb-2">Email</label>
              <input className="border-2 rounded-lg bg-[#FAFAFC] py-2" />
              <label className="mt-5 mb-2">Password</label>
              <input className="border-2 rounded-lg bg-[#FAFAFC] py-4" />
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
              <button className="bg-[#3568FF] w-full text-white py-3 rounded-lg mt-5">
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
                <a href="#" class="text-blue-600 mx-2">
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