// import React from "react";
// import coolimg from "../../components/images/logo.png";
// import { FaLinkedin, FaGoogle } from "react-icons/fa";

// const Mlogin = () => {
//   return (
//     <div>
//       <div className="flex items-center justify-center gap-3 mt-10">
//         {" "}
//         <img src={coolimg} className="h-[40px]" />
//         <h1 className="font-bold text-xl">SKILLOP</h1>
//       </div>
//       <div className="flex items-start flex-col mt-[12vh] mx-[5vh]">
//         <h1 className="text-3xl font-bold text-start">LOGIN</h1>
//         <div className="flex flex-col items-center justify-center">
//           <div class="relative my-6">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               Email
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div>
//           <div class="relative">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               Password
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div>

//           <button class="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 w-[100%] rounded p-1 mt-5">
//             <span class="flex justify-center items-center w-full bg-white rounded p-2">
//               Login
//             </span>
//           </button>
//           <div className="flex items-center justify-center mt-10 mb-8 w-[90%]">
//             <div className="border-t border-[#7E8B9E] w-full"></div>
//             <span className="text-[#7E8B9E] px-2">or</span>
//             <div className="border-t border-[#7E8B9E] w-full"></div>
//           </div>
//           <div className="flex mt-4 text-[#7E8B9E] flex-col items-center justify-center gap-3">
//             <button className="bg-transparent hover:bg-blue-100  font-bold py-4 px-8 rounded flex items-center justify-center border-[1px] w-[100%] ">
//               <FaLinkedin className="mr-2" />
//               <span className="text-xs"> Sign in with LinkedIn</span>
//             </button>
//             <button className="bg-transparent hover:bg-red-100 font-bold py-4 px-8  rounded flex items-center border-[1px] w-[100%]">
//               <FaGoogle className="mr-2" />
//               <span className="text-xs">Sign in with Google</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Mlogin;

import React, { useState } from "react";
import coolimg from "../../components/images/logo.png";
import { FaLinkedin, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { loginUser } from "../../api/userRequest"; // Import your loginUser API request function
import { useNavigate } from "react-router-dom";

const Mlogin = () => {
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
      <div className="flex items-center justify-center gap-3 mt-10">
        <img src={coolimg} className="h-[40px]" alt="Logo" />
        <h1 className="font-bold text-xl">SKILLOP</h1>
      </div>
      <div className="flex items-start flex-col mt-[12vh] mx-[5vh]">
        <h1 className="text-3xl font-bold text-start">LOGIN</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="relative my-6">
            <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
              Email
            </label>
            <input
              className="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
              Password
            </label>
            <input
              className="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 w-[100%] rounded p-1 mt-5"
            onClick={loginClicked}
          >
            <span className="flex justify-center items-center w-full bg-white rounded p-2">
              Login
            </span>
          </button>
          <p className="mt-2">Not Registered Yet?</p>
          <a href="/msignup" className="cursor-pointer">
            SIGN UP
          </a>
          {/* ... (Social login buttons and other UI elements) */}
          <div className="flex items-center justify-center mt-10 mb-8 w-[90%]">
            <div className="border-t border-[#7E8B9E] w-full"></div>
            <span className="text-[#7E8B9E] px-2">or</span>
            <div className="border-t border-[#7E8B9E] w-full"></div>
          </div>
          <div className="flex mt-4 text-[#7E8B9E] flex-col items-center justify-center gap-3">
            <button className="bg-transparent hover:bg-blue-100  font-bold py-4 px-8 rounded flex items-center justify-center border-[1px] w-[100%] ">
              <FaLinkedin className="mr-2" />
              <span className="text-xs"> Sign in with LinkedIn</span>
            </button>
            <button className="bg-transparent hover:bg-red-100 font-bold py-4 px-8  rounded flex items-center border-[1px] w-[100%]">
              <FaGoogle className="mr-2" />
              <span className="text-xs">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mlogin;
