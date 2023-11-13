// import React from 'react';
import axios from 'axios';
import './Admin.css';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    const [applicantsList, setApplicantsList] = useState([]);
    const [eligibleList, setEligibleList] = useState([]);
    const navigate = useNavigate();

    const getApplicants = async () => {
        try {

            const { data } = await axios.get("https://app.skillop.in/api/admin/get/applicants/for/mentor", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("skilloptoken").toString()
                },
                withCredentials: true
            });
            setApplicantsList(data.applicants);
            console.log("here", data.applicants);
        }
        catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
        }
    }

    const getEligibleUsers = async () => {
        try {

            const { data } = await axios.get("https://app.skillop.in/api/admin/get/elegible/for/mentor", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("skilloptoken").toString()
                },
                withCredentials: true
            });
            setEligibleList(data.applicants);
            console.log("here", data.applicants);
        }
        catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
        }
    }

    const approveMentor = (user_id) => {
        try {

            axios.post(`https://app.skillop.in/api/admin/make/mentor/${user_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("skilloptoken").toString()
                },
                withCredentials: true
            });
            toast.success("Mentor Approved!");
            window.location.reload();
        }
        catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
        }
    }

    useEffect(() => {
        getApplicants();
        getEligibleUsers();
    }, []);

    return (
        <div className='admin-container'>
            <div>
                <h2 style={{ display: "flex", alignItems: "center" }}><img src="/skillop-logo.png" alt="" /><u>SKILLOP Admin Panel</u></h2>
            </div>
            <div className="admin-content">
                <h3>Users who applied to become mentor</h3>
                <table border={1}>
                    <thead>
                        <tr>
                            <td>S.no.</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Profile</td>
                            <td>Approval</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applicantsList.length ? applicantsList.map((applicant, index) => {
                                return <tr>
                                    <td>{index + 1}</td>
                                    <td>{applicant.firstname + " " + applicant.lastname}</td>
                                    <td>{applicant.email}</td>
                                    <td><button id="view-prof-admin" onClick={() => navigate(`/public-profile/${applicant._id}`)}>View Profle</button></td>
                                    <td><button id="approve-admin" onClick={() => approveMentor(applicant._id)}>Approve</button></td>
                                </tr>
                            }) : <tr>No one applied yet! ✋❌</tr>
                        }
                    </tbody>
                </table>
                <h3>Users who are eligible to become mentor but not applied yet!</h3>
                <table border={1}>
                    <thead>
                        <tr>
                            <td>S.no.</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Profile</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            eligibleList.length ? eligibleList.map((applicant, index) => {
                                return <tr>
                                    <td>{index + 1}</td>
                                    <td>{applicant.firstname + " " + applicant.lastname}</td>
                                    <td>{applicant.email}</td>
                                    <td><button id="view-prof-admin" onClick={() => navigate(`/public-profile/${applicant._id}`)}>View Profle</button></td>
                                    {/* <td><button id="approve-admin" onClick={() => approveMentor(applicant._id)}>Approve</button></td> */}
                                </tr>
                            }) : <tr>No one is eligible! ✋❌</tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin;