import React, { useRef } from "react";
import "../../Page3/index.css";
import Header1 from "../../Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateIsMentor } from "../../../api/userRequest";
import { getUser } from "../../../api/userRequest";
import Pageloader from "../../Pagesbar";
import { useEffect } from "react";
import spinner from '../../images/spinner.gif';
import toast from "react-hot-toast";

function get_object_from_array(array, object) {
    const obj = {};
    for (var i = 0; i < array.length; ++i)
        obj[array[i]] = object ? object[array[i]] : true;
    return obj;
}

function EditSkillsPage({ setProgress }) {

    const textareaRef = useRef(null); // Create a ref for the textarea
    const [skills, setSkills] = useState({});
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
    const redirectToProfile = async () => {
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
        navigate('/Profile')
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

    const fetchCurrSkills = async () => {
        const res = await getUser();
        setSkills(get_object_from_array(res.data.result.skills));
    }

    useEffect(() => {
        fetchCurrSkills();
    }, [])

    return (
        <>
            <Header1 />
            <div className="main-3">
        
                <div className="head-3">
                    <h2>Tell Us Your Skills</h2>
                    <div>Select Your Skills</div>
                </div>
                <form>
                    <div className="options234">
                        <div className="row-1">
                            {Object.keys(skills).length>0 ? Object.keys(skills).map((skill, index) => (
                                <div key={index + 1}>
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
                                </div>
                            )) : <img width={100} src={spinner} alt="spinner"/>}
                        </div>

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
                                    toast.success("New skill added");
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

                <div className="btnCont">
                    <button onClick={() => navigate('/Profile')} className="back">
                        Back
                    </button>
                    <button
                        className="next2"
                        type="button"
                        form="myform2"
                        onClick={redirectToProfile}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
export default EditSkillsPage;
