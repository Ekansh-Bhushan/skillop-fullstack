import React, { useState } from "react";
import Nav from "./Nav";
import doodle1 from "../../components/images/doodle-6 1.png";
import doodle2 from "../../components/images/doodle-7 1.png";
import Saly from "../../components/images/Saly-26.png";
import { IoMdAdd } from "react-icons/io";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { updateIsMentor } from "../../api/userRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const SkillThree = () => {
    const navigate = useNavigate();
    const [showInput, setShowInput] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const defaultSkillsToDisplay = [
        "Web Development",
        "UI/UX",
        "Data Structures & Algorithm",
        "Technology",
    ];
    const [skills, setSkills] = useState([]);

    const handleAddSkill = () => {
        setShowInput(true);
    };

    const handleInputChange = (e) => {
        setNewSkill(e.target.value);
    };

    const handleSkillAdd = () => {
        if (skills.includes(newSkill)) {
            toast.error("This skill is already selected!");
            setNewSkill("");
            setShowInput(false);
            return;
        }
        if (newSkill.trim() !== "") {
            setSkills([...skills, newSkill]);
            setNewSkill("");
            setShowInput(false);
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
                navigate("/skill4");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <Nav />
            <ProgressBar progress={20} />

            <img
                src={doodle1}
                className="absolute top-[66vh] left-[29vw] z-10"
            />
            <img
                src={doodle2}
                className="absolute right-[19vw] top-[62vh] z-10"
            />
            <img src={Saly} className="absolute right-[16vw] z-10 top-[18vh]" />
            <div className="flex items-start flex-col ml-[35vh] z-50 mt-5">
                <h1 className="text-[35px] mb-5 mt-[8vh] font-bold">
                    Complete Your Profile
                </h1>
                <div className="flex items-center gap-[10vh]">
                    <div className="flex items-start justify-center flex-col text-xl gap-8 mt-3 font-normal">
                        {/* <span>Personal Information</span>
            <span>Contact Information</span> */}
                        {window.location.pathname === "/skill3" ? (
                            <span className="font-semibold">
                                Skills/Interests
                            </span>
                        ) : (
                            <span>Skills/Interests</span>
                        )}
                        {window.location.pathname === "/skill4" ? (
                            <span className="font-semibold">
                                Education Information
                            </span>
                        ) : (
                            <span>Education Information</span>
                        )}
                        {window.location.pathname === "/skill6" ? (
                            <span className="font-semibold">
                                Cover & Profile Photos
                            </span>
                        ) : (
                            <span>Cover & Profile Photos</span>
                        )}
                        {window.location.pathname === "/skill7" ? (
                            <span className="font-semibold">
                                Additional Information
                            </span>
                        ) : (
                            <span>Additional Information</span>
                        )}

                        {/* <span>Education Information</span>
            <span>Cover & Profile Photos</span>
            <span>Additional Information</span> */}
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 border-[1px] px-10 py-8 w-[40vw] rounded-3xl z-40 bg-white bg-opacity-50 backdrop-blur-[20px]">
                        {/* Existing skills */}
                        <div className="flex flex-wrap justify-center gap-4 w-full">
                            {skills.length === 0 &&
                                defaultSkillsToDisplay.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer"
                                        style={{
                                            backgroundColor: "#F2F2F2",
                                            color: "gray",
                                        }}
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
                                            skills.filter(
                                                (item) => item !== skill
                                            )
                                        )
                                    }
                                >
                                    <span>{skill}</span>
                                </div>
                            ))}
                            <div className="flex items-center justify-center gap-2">
                                <button
                                    onClick={handleAddSkill}
                                    className="p-1 rounded-full border-black border-[1px]  hover:bg-gray-100 cursor-pointer "
                                >
                                    <IoMdAdd className="text-lg" />
                                </button>
                                <span>Add a skills/ interest</span>
                            </div>
                        </div>

                        {showInput && (
                            <div className="mt-4 absolute bg-white rounded-3xl flex flex-col items-start justify-center px-10 py-5 border-2 border-black gap-4">
                                <h1 className="text-2xl font-semibold">
                                    Add a Skill/Interest{" "}
                                </h1>
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={handleInputChange}
                                    placeholder="Add a Skill/Interest"
                                    className="rounded-3xl bg-[#8484841A] border-[#5F5F5F80]"
                                />
                                <button
                                    class="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 w-[100%] p-1 mt-5 rounded-xl overflow-hidden"
                                    onClick={handleSkillAdd}
                                >
                                    <span class="flex justify-center items-center w-full bg-white rounded-lg p-2">
                                        Add
                                    </span>
                                </button>
                            </div>
                        )}

                        <div className="flex justify-end w-full items-center">
                            {/* <button className="rounded-full border-[2px] border-black h-9 w-9 flex items-center justify-center">
                                <FaArrowLeft />
                            </button> */}
                            <div className="flex rounded-3xl border-[2px] border-black items-center justify-center px-1.5 py-1.5 gap-2 hover:cursor-pointer">
                                <button
                                    className="font-bold "
                                    onClick={nextClicked}
                                >
                                    NEXT
                                </button>
                                <span className="rounded-full border-[2px] border-black py-1 px-1">
                                    <FaArrowRight />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillThree;
