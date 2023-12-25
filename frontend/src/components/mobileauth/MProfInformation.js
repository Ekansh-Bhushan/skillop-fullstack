import React from "react";
import coolimg from "../../components/images/logo.png";

const MProfInformation = () => {
    return (
        <div>
            <div className="flex items-center justify-center gap-3 mt-10">
                {" "}
                <img src={coolimg} className="h-[40px]" />
                <h1 className="font-bold text-xl">SKILLOP</h1>
            </div>
            <div className="flex items-start flex-col mt-[12vh] mx-[5vh]">
                <h1 className="text-start text-2xl font-semibold mb-2">
                    Complete your
                </h1>
                <span className="text-4xl font-bold">Profile</span>
                <h1 className="text-lg font-semibold mt-5">
                    Education Information
                </h1>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-start justify-start flex-col w-full">
                        <span className="text-md font-semibold w-full">
                            You are:
                        </span>
                        <div className="flex mt-3 items-start justify-between w-full">
                            <button className="px-4 py-2 rounded-lg border border-gray-500 w-full mx-2">
                                Student
                            </button>
                            <button className="px-4 py-2 rounded-lg border border-gray-500 w-full">
                                Professional
                            </button>
                        </div>
                    </div>
                    <div class="relative my-6">
                        <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
                            College/ Institution{" "}
                        </label>
                        <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
                    </div>
                    <div class="relative">
                        <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
                            Degree
                        </label>
                        <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
                    </div>
                    <div class="relative mt-6">
                        <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
                            Field Of Study/ Branch
                        </label>
                        <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
                    </div>
                    <div className="flex gap-5">
                        <div class="relative mt-6">
                            <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
                                Start-Year
                            </label>
                            <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[38vw]" />
                        </div>
                        <div class="relative mt-6">
                            <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
                                End-Year
                            </label>
                            <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[38vw]" />
                        </div>
                    </div>
                    <div class="relative my-6">
                        <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
                            Job Title{" "}
                        </label>
                        <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
                    </div>
                    <div class="relative">
                        <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
                            Company Name
                        </label>
                        <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
                    </div>
                    <div class="relative mt-6">
                        <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
                            Job Description
                        </label>
                        <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]" />
                    </div>
                    <div className="flex gap-5">
                        <div class="relative mt-6">
                            <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
                                Start-Year
                            </label>
                            <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[38vw]" />
                        </div>
                        <div class="relative mt-6">
                            <label class="absolute top-0 left-2 -mt-2 bg-white px-1">
                                End-Year
                            </label>
                            <input class="border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[38vw]" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-[80%] my-[5vh] ">
                        <button className="border-[1px] border-black py-2 px-3 rounded-2xl">
                            Prev
                        </button>
                        <button className="border-[1px] border-black py-2 px-3 rounded-2xl">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MProfInformation;
