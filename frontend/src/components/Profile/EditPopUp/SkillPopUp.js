import React from 'react';
import "./SkillPopUp.css";
import { updateProfile } from '../../../api/userRequest';
import { getUser } from '../../../api/userRequest';
import { useState } from 'react';
const SkillPopUp = ({onClose, oldSkills, setUpdateDom}) => {

    const[skill, setSkill] = useState("");

    const onChange = (e) => {
        setSkill(e.target.value);
    }

    const handleSkillAdd = async () => {
        try {
            await updateProfile({"skills":[...oldSkills, skill]});
            // console.log("succcess");
            setUpdateDom(true);
            // window.location.reload();
        }
        catch (err) {
            // console.log("failed")
            console.log("Unable to update profile at the moment! ", err)
        }
        onClose();
    }
    return (
        <div className="blur-bg">
            <div className='skill-container'>
                <h1>Add Skills</h1>
                <span className='close-btn' onClick={onClose}>X</span>
                <input onChange={onChange} value={skill} name="skill" placeholder='Enter your skill...' type="text" />
                <button  disabled={skill.length===0} onClick={handleSkillAdd} style={{color:'white'}}>Add</button>
            </div>
        </div>
    )
}

export default SkillPopUp;