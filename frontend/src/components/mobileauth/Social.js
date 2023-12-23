// import React from "react";
// import coolimg from "../../components/images/logo.png";

// const Social = () => {
//   return (
//     <div>
//       <div className="flex items-center justify-center gap-3 mt-10">
//         {" "}
//         <img src={coolimg} className="h-[40px]" />
//         <h1 className="font-bold text-xl">SKILLOP</h1>
//       </div>
//       <div className="flex items-start flex-col mt-[12vh] mx-[5vh]">
//         <h1 className="text-start text-2xl font-semibold mb-2">
//           Complete your
//         </h1>
//         <span className="text-4xl font-bold">Profile</span>
//         <h1 className="text-lg font-semibold mt-5">Socail Handles</h1>
//         <div className="flex flex-col items-center justify-center">
//           <div class="relative my-6">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               {" "}
//               LinkedIn Profile
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div>
//           <div class="relative mb-6">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               Upi Id
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div>
//           <div class="relative">
//             <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
//               whatsapp number
//             </label>
//             <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
//           </div>

//           <div className="flex items-center justify-between w-[80%] absolute bottom-10 ">
//             <button className="border-[1px] border-black py-2 px-3 rounded-2xl">
//               Prev
//             </button>
//             <button className="border-[1px] border-black py-2 px-3 rounded-2xl">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Social;

import React, { useState } from "react";
import coolimg from "../../components/images/logo.png";
import { useNavigate } from "react-router-dom";
import { updateIsMentor } from "../../api/userRequest";
import toast from "react-hot-toast";

const Social = () => {
  const navigate = useNavigate();
  const [linkedinId, setLinkedinId] = useState("");
  const [upiId, setUpiId] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const nextClicked = async () => {
    if (!whatsappNumber) {
      toast.error("Phone number is required!");
      return;
    }

    if (whatsappNumber.length !== 10) {
      toast.error("Phone number should contain 10 digits");
      return;
    }

    if (!upiId) {
      toast.error("UPI ID is required!");
      return;
    }

    try {
      const { data } = await updateIsMentor({
        whatsappNumber,
        upiId,
        linkedinId,
      });

      if (data.result) {
        navigate("/homepage");
        toast.success("User registered!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred!");
    }
  };

  const prevClicked = () => {
    navigate("/skill6");
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mt-10">
        <img src={coolimg} className="h-[40px]" alt="Logo" />
        <h1 className="font-bold text-xl">SKILLOP</h1>
      </div>
      <div className="flex items-start flex-col mt-[12vh] mx-[5vh]">
        <h1 className="text-start text-2xl font-semibold mb-2">
          Complete your
        </h1>
        <span className="text-4xl font-bold">Profile</span>
        <h1 className="text-lg font-semibold mt-5">Social Handles</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="relative my-6">
            <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
              LinkedIn Profile
            </label>
            <input
              className="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]"
              value={linkedinId}
              onChange={(e) => setLinkedinId(e.target.value)}
            />
          </div>
          <div className="relative mb-6">
            <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
              UPI ID
            </label>
            <input
              className="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="absolute top-0 left-2 -mt-2 bg-white px-1">
              WhatsApp Number
            </label>
            <input
              className="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between w-[80%] absolute bottom-10">
            <button
              className="border-[1px] border-black py-2 px-3 rounded-2xl"
              onClick={prevClicked}
            >
              Prev
            </button>
            <button
              className="border-[1px] border-black py-2 px-3 rounded-2xl"
              onClick={nextClicked}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
