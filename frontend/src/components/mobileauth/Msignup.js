// import React from "react";
// import coolimg from "../../components/images/logo.png";
// import { FaLinkedin, FaGoogle } from "react-icons/fa";

// const Msignup = () => {
//   return (
//     <div>
//       <div className="flex items-center justify-center gap-3 mt-10">
//         {" "}
//         <img src={coolimg} className="h-[40px]" />
//         <h1 className="font-bold text-xl">SKILLOP</h1>
//       </div>
//       <div className="flex items-start flex-col mt-[3vh] mx-[5vh]">
//         <h1 className="text-3xl font-bold text-start mb-3">SIGNUP</h1>
//         <div className="flex flex-col items-center justify-center">
//           <div class="relative my-4">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               First Name
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div>
//           <div class="relative my-4">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               Last Name
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div>
//           <div class="relative my-4">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               Email
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div>
//           <div class="relative my-4">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               Password
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div>
//           {/* <div class="relative my-4">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               Re-Enter-Password
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div> */}
//           <button class="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 w-[100%] rounded p-1 mt-5">
//             <span class="flex justify-center items-center w-full bg-white rounded p-2">
//               Signup
//             </span>
//           </button>
//           <div className="flex items-center justify-center mt-6 mb-8 w-[90%]">
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

// export default Msignup;

import React, { useState } from "react";
import { FaLinkedin, FaGoogle } from "react-icons/fa";
import { registerUser } from "../../api/userRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import coolimg from "../../components/images/logo.png";
import img1 from "../../components/images/img1.png";

const Msignup = () => {
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
        navigate("/mskill");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mt-10">
        <img src={coolimg} className="h-[40px]" alt="Logo" />
        <h1 className="font-bold text-xl">SKILLOP</h1>
      </div>
      <div className="flex items-start flex-col mt-[3vh] mx-[5vh]">
        <h1 className="text-3xl font-bold text-start mb-3">SIGNUP</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="relative my-4">
            <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
              First Name
            </label>
            <input
              className="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="relative my-4">
            <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
              Last Name
            </label>
            <input
              className="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="relative my-4">
            <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
              Email
            </label>
            <input
              className="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative my-4">
            <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
              Password
            </label>
            <input
              className="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 w-[100%] rounded p-1 mt-5"
            onClick={signupClicked}
          >
            <span className="flex justify-center items-center w-full bg-white rounded p-2">
              Signup
            </span>
          </button>
          <div className="flex items-center justify-center mt-6 mb-8 w-[90%]">
            Already have an account ? {"  "}
            <span className="text-blue-500" onClick={() => navigate("/mlogin")}>
              {"  "}
              Login
            </span>
          </div>
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

export default Msignup;
