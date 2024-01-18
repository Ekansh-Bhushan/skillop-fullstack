import React, { useState } from "react";
import Nav from "./Nav";
import doodle1 from "../../components/images/doodle-6 1.png";
import doodle2 from "../../components/images/doodle-7 1.png";
import Saly from "../../components/images/Saly-26.png";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import { updateProfile } from "../../api/userRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SkillFive = ({setProgress}) => {
    const navigate = useNavigate();
    let [data, setData] = useState([
        {
            institution: "",
            degree: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            country: "",
            state: "",
            city: "",
        },
    ]);
    const onChange = (e) => {
        let { name, value } = e.target;

        setData((prevData) => [
            {
                ...prevData[0],
                [name]: value,
            },
        ]);
    };
    const nextClicked = () => {
        addEdu();
    };
    const addEdu = async () => {
        console.log("data", data);
        try {
            let formdata = new FormData();
            formdata.append("education", JSON.stringify(data));
            const data1 = await updateProfile(formdata);
            console.log(data1.data.result);
            if (data1.data.result) {
                toast.success(data1.data.message);
                navigate("/skill5");
            } else {
                toast.error(data1.data.message);
            }
        } catch (err) {
            console.log("Unable to update profile at the moment! ", err);
            toast.error("Unable to update profile at the moment! ");
        }
    };
    return (
        <div>
            {/* <Nav /> */}
            <img
                src={doodle1}
                className="absolute top-[80vh] left-[29vw] z-10"
            />
            <img
                src={doodle2}
                className="absolute right-[19vw] top-[80vh] z-10"
            />
            <img src={Saly} className="absolute right-[14vw] z-10 top-[18vh]" />
            <div className="flex items-start flex-col ml-[35vh] z-50">
                <h1 className="text-[35px] mb-5 mt-[8vh] font-bold">
                    Complete Your Profile
                </h1>
                <div className="flex items-start gap-[10vh] ">
                    <div className="flex items-start justify-center flex-col text-xl gap-8 mt-3 font-normal">
                        <span>Personal Information</span>
                        <span>Contact Information</span>
                        <span>Skills/Interests</span>
                        <span>Education Information</span>
                        <span>Cover & Profile Photos</span>
                        <span>Additional Information</span>
                    </div>
                    <div className="flex flex-col border-[1px] px-10 py-8 w-[40vw] rounded-3xl z-40 bg-white bg-opacity-50 backdrop-blur-[20px]">
                        <div className="flex mb-6 items-center">
                            <span className="text-xl font-semibold">
                                You are:
                            </span>
                            <button className="mx-5 px-4 py-3 rounded-lg border border-gray-500">
                                Student
                            </button>
                            <button className="px-4 py-3 rounded-lg border border-gray-500">
                                Professional
                            </button>
                        </div>

                        <label className="mb-2 text-lg font-bold">
                            College
                        </label>
                        <input
                            name="institution"
                            type="text"
                            placeholder="College"
                            className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                            onChange={(Event) => {
                                onChange(Event);
                            }}
                        />
                        <label className="mb-2 text-lg font-bold">Degree</label>
                        <input
                            name="degree"
                            type="text"
                            placeholder="Degree"
                            className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                            onChange={(Event) => {
                                onChange(Event);
                            }}
                        />
                        <label className="mb-2 text-lg font-bold">
                            Field Of Study/Branch
                        </label>
                        <input
                            name="fieldOfStudy"
                            type="text"
                            placeholder="Field Of Study"
                            className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                            onChange={(Event) => {
                                onChange(Event);
                            }}
                        />

                        <div className="flex justify-between w-[118%]">
                            <div className="flex-1">
                                <label className="mb-2 text-lg font-bold">
                                    Start Year
                                </label>
                                <input
                                    name="startDate"
                                    type="text"
                                    placeholder="Start Year"
                                    className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                                    onChange={(Event) => {
                                        onChange(Event);
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="mb-2 text-lg font-bold">
                                    End Year
                                </label>
                                <input
                                    name="endDate"
                                    type="text"
                                    placeholder="End Year"
                                    className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                                    onChange={(Event) => {
                                        onChange(Event);
                                    }}
                                />
                            </div>
                        </div>
                        <label className="mb-2 text-lg font-bold">
                            Job Title
                        </label>
                        <input
                            type="text"
                            placeholder="job title"
                            className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                        />
                        <label className="mb-2 text-lg font-bold">
                            Comapany Name
                        </label>
                        <input
                            type="text"
                            placeholder="company name"
                            className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                        />
                        <label className="mb-2 text-lg font-bold">
                            Job Description
                        </label>
                        <input
                            type="text"
                            placeholder="job description"
                            className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                        />

                        <div className="flex justify-between w-[118%]">
                            <div className="flex-1">
                                <label className="mb-2 text-lg font-bold">
                                    Start Year
                                </label>
                                <input
                                    type="text"
                                    placeholder="Start Year"
                                    className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="mb-2 text-lg font-bold">
                                    End Year
                                </label>
                                <input
                                    type="text"
                                    placeholder="End Year"
                                    className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between w-full items-center">
                            <button className="rounded-full border-[2px] border-black h-9 w-9 flex items-center justify-center">
                                <FaArrowLeft />
                            </button>
                            <div className="flex rounded-3xl border-[2px] border-black items-center justify-center px-1.5 py-1.5 gap-2">
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

export default SkillFive;
