import React, { useRef } from "react";
import index from "./index.css";
import Header1 from "../Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateIsMentor } from "../../api/userRequest";
import Pageloader from "../Pagesbar";

function get_object_from_array(array, object) {
    const obj = {};
    for (var i = 0; i < array.length; ++i)
        obj[array[i]] = object ? object[array[i]] : false;
    return obj;
}

function Auth3Component({ setProgress }) {
    const preSetSkills = [
        " Graphic Designer",
        "Full stack Web developer",
        "Software Developer",
        "IT Manager",
        "Software Engineer",
        "Product Manager",
    ];

    const handleBack = () => {
        setProgress(35);
        setTimeout(() => {
            setProgress(100);
        }, 300);
        navigate("/continue");
    };

    const textareaRef = useRef(null); // Create a ref for the textarea
    const [skills, setSkills] = useState(get_object_from_array(preSetSkills));
    const addSkills = (skill) => {
        setSkills({ ...skills, [skill]: true });
    };
    const removeSkills = (skill) => {
        // remove this skill from the list
        setSkills(
            get_object_from_array(
                Object.keys(skills).filter((s) => s !== skill),
                skills
            )
        );
    };

    const navigate = useNavigate();
    const redirectToPage4 = async () => {
        setProgress(30);
        try {
            const selectedSkills = Object.keys(skills).filter(
                (skill) => skills[skill]
            );
            const request = {
                skills: selectedSkills,
            };
            const { data } = await updateIsMentor(request);
            setProgress(60);
            if (data.result) {
                if (data.result) {
                    setProgress(40);
                    navigate("/skills");
                    setProgress(100);
                }
            }
        } catch (error) {
            console.log(error);
        }
        setProgress(100);
        navigate("/jobtitles");
        setProgress(100);
    };
    var y = 0;

    const elaborate = () => {
        if (y == 0) {
            document.querySelector(".other").style.backgroundColor = "#108CFF";
            document.querySelector(".other").style.color = "#FFFFFF";
            document.querySelector(".explain").classList.remove("hidethis");
            y++;
        } else {
            document.querySelector(".other").style.backgroundColor = "white";
            document.querySelector(".explain").classList.add("hidethis");
            document.querySelector(".other").style.color = "black";
            y--;
        }
    };

    return (
        <>
            <Header1 />
            <div classNam="main-3">
                <Pageloader
                    givecolor1={false}
                    givecolor2={true}
                    givecolor3={true}
                    givecolor4={true}
                    givecolor5={true}
                    givecolor6={true}
                    isactive2={true}
                />
                <div className="head-3">
                    <h2>Tell Us Your Skills</h2>
                    <div>Select Your Skills</div>
                </div>
                <form>
                    <div className="options234">
                        <div className="row-1">
                            {Object.keys(skills).map((skill, index) => (
                                <>
                                    <div
                                        className={
                                            skills[skill]
                                                ? "selectedSDF skillbox"
                                                : "skillbox"
                                        }
                                    >
                                        <div
                                            key={index}
                                            onClick={(e) => {
                                                if (skills[skill]) {
                                                    removeSkills(skill);
                                                } else {
                                                    addSkills(skill);
                                                }
                                            }}
                                        >
                                            {skill}
                                        </div>
                                        <span
                                            className="remove-skill"
                                            onClick={(e) => removeSkills(skill)}
                                        >
                                            &nbsp; &#10005;
                                        </span>
                                    </div>
                                </>
                            ))}
                        </div>
                        {/* <div className="row-2"> */}

                        {/* </div> */}
                        <div
                            className="other"
                            style={{
                                display: "flex",
                            }}
                        >
                            <input
                                style={{
                                    border: "2px solid #108CFF",
                                    outline: "none",
                                    width: "100%",
                                    height: "100%",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    color: "black",
                                    backgroundColor: "transparent",
                                    padding: "10px",
                                }}
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (e.target.previousSibling.value === "")
                                        return;
                                    addSkills(e.target.previousSibling.value);
                                    e.target.previousSibling.value = "";
                                }}
                                style={{
                                    backgroundColor: "#108CFF",
                                    color: "white",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    border: "none",
                                    outline: "none",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </form>
                {/* <div style={{ height: "40px" }}></div>
                <div className="explain hidethis">
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: "5px",
                        }}
                    > */}
                        {/* Explain A little about Your Skills */}
                        {/* <div className="elliptical-skills"> */}
                            {/* {selectedSkills.map((s) => (
                <div key={s.id} className="ellipse">
                  <span className="skill-name">{s.skill}</span>
                  <span
                    className="remove-skill"
                    onClick={(e) => {
                      handleSkillRemoval(e, s.skill);
                    }}
                  >
                    &#10005;
                  </span>
                </div>
              ))} */}
                        {/* </div> */}
                    {/* </div> */}
                {/* </div> */}
                <div className="btnCont">
                    {/* <button onClick={handleBack} className="back">
                        Back
                    </button> */}
                    <button
                        className="next2"
                        type="button"
                        form="myform2"
                        onClick={redirectToPage4}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
export default Auth3Component;
