import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SendNotification from './SendNotification';

const MentorApproval = () => {
  const [applicantsList, setApplicantsList] = useState([]);
  const [eligibleList, setEligibleList] = useState([]);
  const navigate = useNavigate();

  const API = axios.create({ baseURL: 'https://skillop.in' });

  const getApplicants = async () => {
    try {
      const { data } = await axios.get(
        'https://skillop.in/api/admin/get/applicants/for/mentor',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('skilloptoken').toString(),
          },
          withCredentials: true,
        }
      );
      setApplicantsList(data.applicants);
      console.log('here', data.applicants);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  const getEligibleUsers = async () => {
    try {
      const { data } = await axios.get(
        'https://skillop.in/api/admin/get/elegible/for/mentor',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('skilloptoken').toString(),
          },
          withCredentials: true,
        }
      );
      setEligibleList(data.applicants);
      console.log('here', data.applicants);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  const approveMentor = async (user_id) => {
    try {
      const approveFunc = () => {
        const token = localStorage.getItem('skilloptoken');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          withCredentials: true,
        };
        return API.post(`/api/admin/make/mentor/${user_id}`, {}, config);
      };
      const res = await approveFunc();
      toast.success('Mentor Approved!');
      // console.log(res);
      window.location.reload();
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getApplicants();
    getEligibleUsers();
  }, []);

  return (
    <div className="flex">
      <div className="admin-container text-left w-[66%] border border-2">
        <div className="admin-content text-left border border-2">
          <h2>Users who applied to become mentor</h2>
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
              {applicantsList.length ? (
                applicantsList.map((applicant, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{applicant.firstname + ' ' + applicant.lastname}</td>
                      <td>{applicant.email}</td>
                      <td>
                        <button
                          id="view-prof-admin"
                          onClick={() =>
                            navigate(`/public-profile/${applicant._id}`)
                          }
                        >
                          View Profle
                        </button>
                      </td>
                      <td>
                        <button
                          id="approve-admin"
                          onClick={() => approveMentor(applicant._id)}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>No one applied yet! ✋❌</tr>
              )}
            </tbody>
          </table>
          <h2>Users who are eligible to become mentor but not applied yet!</h2>
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
              {eligibleList.length ? (
                eligibleList.map((applicant, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{applicant.firstname + ' ' + applicant.lastname}</td>
                      <td>{applicant.email}</td>
                      <td>
                        <button
                          id="view-prof-admin"
                          onClick={() =>
                            navigate(`/public-profile/${applicant._id}`)
                          }
                        >
                          View Profle
                        </button>
                      </td>
                      {/* <td><button id="approve-admin" onClick={() => approveMentor(applicant._id)}>Approve</button></td> */}
                    </tr>
                  );
                })
              ) : (
                <tr>No one is eligible! ✋❌</tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* <SendNotification /> */}
    </div>
  );
};

export default MentorApproval;
