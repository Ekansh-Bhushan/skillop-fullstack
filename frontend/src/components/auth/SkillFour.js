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
import ProgressBar from "./ProgressBar";

const SkillFour = () => {
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

    const [collegeSearchResults, setCollegeSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [collegeSelected, setCollegeSelected] = useState(false);

    const handleOnChange = (e) => {
        setCollegeSelected(false);
        setData((prevData) => [
            {
                ...prevData[0],
                institution: e.target.value,
                city: "",
                state: "",
            },
        ]);

        setSearchQuery(e.target.value);
        document.querySelector(".college-search-results1").style.display =
            "block";
        searchCollege(e.target.value);
        if (e.target.value.length === 0) {
            document.querySelector(".college-search-results1").style.display =
                "none";
        }

        console.log("data", data);
    };

    const handleCollegeSelection = (clg_details) => {
        setData((prevData) => [
            {
                ...prevData[0],
                institution: clg_details.college,
                city: clg_details.city,
                state: clg_details.state,
            },
        ]);
        setCollegeSelected(true);
        setSearchQuery(clg_details.college);
        document.querySelector(".college-search-results1").style.display =
            "none";
    };

    const searchCollege = async (qrr) => {
        try {
            const { data } = await axios.get(
                `https://app.skillop.in/api/college/info?college=${qrr}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setCollegeSearchResults(data.result);
        } catch (err) {
            console.log(err);
        }
    };

    const nextClicked = () => {
        addEdu();
    };

    const addEdu = async () => {
        console.log("data", data);
        // check start date and end date
        if (data[0].startDate > data[0].endDate) {
            toast.error("Start year cannot be greater than end year");
            return;
        }
        try {
            let formdata = new FormData();
            formdata.append("education", JSON.stringify(data));
            // console.log("data", JSON.stringify(data));
            const data1 = await updateProfile(formdata);
            console.log(data1.data.result);
            if (data1.data.result) {
                toast.success("College Added!");
                navigate("/skill6");
            } else {
                toast.error(data1.data.message);
            }
        } catch (err) {
            // console.log("failed");
            console.log("Unable to update profile at the moment! ", err);
            toast.error("Unable to update profile at the moment! ");
        }
    };
    return (
        <div>
            <Nav />
            <ProgressBar progress={40} />

            <img
                src={doodle1}
                className="absolute top-[80vh] left-[29vw] z-10"
            />
            <img
                src={doodle2}
                className="absolute right-[19vw] top-[80vh] z-10"
            />
            <img src={Saly} className="absolute right-[14vw] z-10 top-[18vh]" />
            <div className="flex items-start flex-col ml-[35vh] mt-5">
                <h1 className="text-[35px] mb-5 mt-[8vh] font-bold">
                    Complete Your Profile
                </h1>
                <div className="flex items-start gap-[10vh] justify-start">
                    <div className="flex items-start  flex-col text-xl gap-8 mt-3 font-normal">
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
                    <div className="flex flex-col border-[1px] px-10 py-8 w-[40vw] rounded-3xl z-50 bg-white bg-opacity-50 backdrop-blur-[20px] ">
                        {/* <div className="flex mb-6 items-center">
              <span className="text-xl font-semibold">You are:</span>
              <button className="mx-5 px-4 py-3 rounded-lg border border-gray-500">
                Student
              </button>
              <button className="px-4 py-3 rounded-lg border border-gray-500">
                Professional
              </button>
            </div> */}

                        {/* <div className="search-college"> */}
                        {/* <input
                                id="search-college"
                                type="text"
                                onChange={handleOnChange}
                                value={searchQuery}
                                placeholder="Search your college, university or insititution"
                            /> */}
                        {/* <div className="college-search-results1">
                                {collegeSearchResults.length > 0
                                    ? collegeSearchResults.map(
                                          (college, idx) => {
                                              return (
                                                  <div
                                                      key={idx}
                                                      id="college-result"
                                                      onClick={() =>
                                                          handleCollegeSelection(
                                                              college
                                                          )
                                                      }
                                                  >
                                                      <h3>{college.college}</h3>
                                                      <p>
                                                          {college.city}
                                                          {", "}
                                                          {college.state}
                                                      </p>
                                                  </div>
                                              );
                                          }
                                      )
                                    : searchQuery.length > 0 &&
                                      `No results found for "${searchQuery}"`}
                            </div> */}
                        {/* <p id="note-search" style={{ marginTop: "15px" }}>
                                Note : If your college is not found in search,
                                enter it below manually
                            </p>
                        </div> */}

                        <label className="mb-2 text-lg font-bold">
                            College
                        </label>
                        {/* <input
                            name="institution"
                            type="text"
                            placeholder="College"
                            className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-4 block mb-4"
                            onChange={(Event) => {
                                onChange(Event);
                            }}
                        /> */}
                        <div
                            onPointerLeave={() => {
                                document.querySelector(
                                    ".college-search-results1"
                                ).style.display = "none";
                            }}
                        >
                            <input
                                id="search-college1"
                                type="text"
                                onChange={handleOnChange}
                                value={searchQuery}
                                placeholder="College"
                            />
                            <div className="college-search-results1">
                                {collegeSearchResults.length > 0
                                    ? collegeSearchResults.map(
                                          (college, idx) => {
                                              return (
                                                  <div
                                                      key={idx}
                                                      id="college-result"
                                                      onClick={() =>
                                                          handleCollegeSelection(
                                                              college
                                                          )
                                                      }
                                                  >
                                                      <h3>{college.college}</h3>
                                                      <p>
                                                          {college.city}
                                                          {", "}
                                                          {college.state}
                                                      </p>
                                                  </div>
                                              );
                                          }
                                      )
                                    : searchQuery.length > 0 &&
                                      `No results found for "${searchQuery}"`}
                            </div>
                            {searchQuery && !collegeSelected && (
                  <div id="college-result" onClick={() => { 
                    document.querySelector(".college-search-results1").style.display =
                      "none";
                    setData((prevData) => [
                      {
                        ...prevData[0],
                        institution: searchQuery,
                        city: "",
                        state: "",
                      }] );
                  }}>
                                    {searchQuery +
                                        " will be added as your college"}
                                </div>
                            )}
                        </div>
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

                        <div className="flex justify-between w-[80%] gap-5">
                            <div className="">
                                <label className="mb-2 text-lg font-bold">
                                    Start Year
                                </label>
                                <input
                                    name="startDate"
                                    type="text"
                                    placeholder="Start Year"
                                    className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-2 block mb-4"
                                    onChange={(Event) => {
                                        onChange(Event);
                                    }}
                                />
                            </div>
                            <div className="">
                                <label className="mb-2 text-lg font-bold">
                                    End Year
                                </label>
                                <input
                                    name="endDate"
                                    type="text"
                                    placeholder="End Year"
                                    className="border-[1px] border-[#5F5F5F] rounded-md py-3 px-2 block mb-4"
                                    onChange={(Event) => {
                                        onChange(Event);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between w-full items-center">
                            <button className="rounded-full border-[2px] border-black h-9 w-9 flex items-center justify-center">
                                <a href="/skill3">
                                    <FaArrowLeft />
                                </a>
                            </button>
                            <div
                                className="flex rounded-3xl border-[2px] border-black items-center justify-center px-1.5 py-1.5 gap-2 hover:bg-[#8484841A]"
                                onClick={nextClicked}
                            >
                                <button className="font-bold ">NEXT</button>
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

export default SkillFour;
