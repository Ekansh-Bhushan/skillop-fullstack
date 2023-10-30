import React from 'react';
import './ExpPopUp.css';
import { getUser, updateProfile } from '../../../api/userRequest';
import { useState } from 'react';
import { useEffect } from 'react';
import spinner from '../../images/spinner.gif';
import editExp from '../../../api/editExp';
import toast from 'react-hot-toast';

const ExpPopUp = ({ onClose, setUpdateDom, id, expID }) => {

    let [data, setData] = useState([
        {
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ])

    const [isChecked, setIsChecked] = useState(false);

    const handlePresent = () => {
        setIsChecked(!isChecked);
    }

    const onChange = (e) => {
        let { name, value } = e.target;
        setData((prevData) => ([
            {
                ...prevData[0],
                [name]: value
            }
        ]
        ));
    }

    const handleExpAdd = async () => {
        if (id === "edit-text") {
            try {
                // let formdata = new FormData();
                // formdata.append("experence", JSON.stringify(data))
                await editExp(expID, data[0]);
                setUpdateDom(true);
                toast.success("Updated successfully!");
            }
            catch (err) {
                console.log("Unable to update profile at the moment! ", err)
                toast.error(err.response.data.err);
            }
            onClose();
        }
        else {

            try {
                let formdata = new FormData();
                formdata.append("experence", JSON.stringify(data))
                await updateProfile(formdata);
                setUpdateDom(true);
                toast.success("Added successfully!");
            }
            catch (err) {
                console.log("Unable to update profile at the moment! ", err);
                toast.error(err.response.data.err);
            }
            onClose();
        }
    }

    const dateFormatter = (JSdate) => {
        if (!JSdate) {
            return null;
        }
        const date = new Date(JSdate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based.
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const fetchExpDetails = async () => {
        const res = await getUser();
        let expData = res.data.result.experence.filter((item) => item._id === expID)
        expData[0].startDate = dateFormatter(expData[0].startDate);
        expData[0].endDate = dateFormatter(expData[0].endDate);
        setData(expData);
    }

    useEffect(() => {
        if (id === "edit-text") {
            fetchExpDetails();
        }
    }, [])

    return (
        <div className="blur-bg-prof">
            <div className='exp-pop-up-container'>
                <h1 style={{ marginBottom: "10px" }}>{(id === "edit-text") ? 'Update Experience' : 'Add Experience'}</h1>
                <span onClick={onClose} className='close-btn'>X</span>
                {(data[0].title.length >= 1 || id !== "edit-text") ? <> <input name='title' onChange={onChange} value={data[0].title} type="text" placeholder='Position or Job Title' />
                    <input name='company' onChange={onChange} value={data[0].company} type="text" placeholder='Company' />
                    <input name='location' onChange={onChange} value={data[0].location} type="text" placeholder='Location' />
                    <label style={{ paddingRight: "24vw" }} htmlFor="startDate">Start Date:</label>
                    <input name='startDate' onChange={onChange} value={data[0].startDate} type="date" max={new Date().toISOString().split('T')[0]} placeholder='Start date' />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingRight: "17vw" }} htmlFor="startDate">End Date: <div style={{ display: 'flex', alignItems: 'center' }}><input onClick={handlePresent} type="checkbox" name="present" value="present" /> <div>Ongoing</div> </div></label>
                    {!isChecked && <input name='endDate' onChange={onChange} value={data[0].endDate} type="date" placeholder='End date' />}
                    <textarea rows={4} name='description' onChange={onChange} value={data[0].description} type="text" placeholder='Description' style={{ border: 'none', resize: 'none' }} />
                    <button onClick={handleExpAdd} style={{ color: 'white', fontSize: "1.2rem" }}>{(id === "edit-text") ? 'Update' : 'Add'}</button>
                </> : <img src={spinner} alt="spinner" width={100} />}
            </div>
        </div>
    )
}

export default ExpPopUp;