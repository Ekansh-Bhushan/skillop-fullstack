import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { updateIsMentor } from "../../api/userRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import coolimg from "../../components/images/logo.png";
import ProgressBar from "../auth/ProgressBar";
import MProgressBar from "./MProgressBar";

const MSkills = () => {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const defaultSkillsToDisplay = [
        "Web Development",
        "UI/UX",
        "Data Structures & Algorithm",
        "Technology",
    ];

  const handleSkillAdd = () => {
      if (skills.includes(newSkill)) {
          toast.error("This skill is already selected!");
          setNewSkill("");
          return;
      }
        if (newSkill.trim() !== "") {
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
    };

    const nextClicked = async () => {
        console.log(skills);
        try {
            const request = {
                skills: skills,
            };
            const { data } = await updateIsMentor(request);

            if (data.result) {
                toast.success(data.message);
                console.log(data.message);
                navigate("/mstudinfo");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="mx-auto max-w-xl p-8">
            <div className="flex items-center justify-center gap-3 mt-10">
                <img src={coolimg} className="h-[40px]" />
                <h1 className="font-bold text-xl">SKILLOP</h1>
            </div>
            <div className="flex items-start flex-col mt-[12vh] mx-[2vh]">
                <h1 className="text-start text-2xl font-semibold mb-2 ">
                    Complete your
                </h1>
                <span className="text-4xl font-bold ">Profile</span>
                <MProgressBar progress={20} />
                <h1 className="text-xl font-bold my-4 mt-10">
                    Skills/Interests
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                    {skills.length === 0 &&
                        defaultSkillsToDisplay.map((skill, index) => (
                            <div
                                key={index}
                                className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer"
                            >
                                <span>{skill}</span>
                            </div>
                        ))}
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="border px-4 py-2 rounded-3xl hover:bg-red-100 cursor-pointer"
                            onClick={() =>
                                setSkills(
                                    skills.filter((item) => item !== skill)
                                )
                            }
                        >
                            <span>{skill}</span>
                        </div>
                    ))}
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill/interest"
                            className="border rounded-md px-2 py-1"
                        />
                        <button
                            onClick={handleSkillAdd}
                            className="p-2 rounded-full border-black border hover:bg-gray-100 cursor-pointer"
                        >
                            <IoMdAdd className="text-lg" />
                        </button>
                    </div>
                </div>

                <div className="flex justify-end items-center w-full">
                    <button
                        className="flex items-center gap-1 px-3 py-1 rounded-2xl border border-black hover:bg-gray-100 cursor-pointer"
                        onClick={nextClicked}
                    >
                        <span>Next</span>
                        {/* <FaArrowRight /> */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MSkills;
