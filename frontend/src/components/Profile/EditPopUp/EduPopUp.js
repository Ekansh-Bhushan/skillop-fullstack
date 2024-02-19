import React, { useContext } from 'react';
import './EduPopUp.css';
import { getUser, updateProfile } from '../../../api/userRequest';
import { useState } from 'react';
import editEdu from '../../../api/editEdu';
import { useEffect } from 'react';
import spinner from '../../images/spinner.gif';
import toast from 'react-hot-toast';
import { MainContext } from '../../../context/MainContextProvider';

const EduPopUp = ({ onClose, setUpdateDom, id, eduID, updateDom }) => {
  let [data, setData] = useState([
    {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      country: '',
      state: '',
      city: '',
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

  const handleEduAdd = async () => {
    if (
      !data[0].institution ||
      !data[0].degree ||
      !data[0].startDate ||
      !data[0].endDate
    ) {
      toast.error('Institute, Degree, Start & End Date are required');
      return;
    }
    if (data[0].endDate && data[0].endDate < data[0].startDate) {
      toast.error('Start date must be smaller than End date');
      return;
    }
    if (id === 'edit-text') {
      try {
        // let formdata = new FormData();
        // formdata.append("education", JSON.stringify(data))
        await editEdu(eduID, data[0]);
        setUpdateDom(!updateDom);
        toast.success('Updated successfully!');
      } catch (err) {
        console.log('Unable to update profile at the moment! ', err);
        toast.error(err.response.data.err);
      }
      onClose();
    } else {
      try {
        let formdata = new FormData();
        formdata.append('education', JSON.stringify(data));
        await updateProfile(formdata);
        setUpdateDom(!updateDom);
        toast.success('Added successfully!');
      } catch (err) {
        console.log('Unable to update profile at the moment! ', err);
        toast.error(err.response.data.err);
      }
      onClose();
    }
  };

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
  };
  const { currentUser, setCurrentUser } = useContext(MainContext);
  const fetchEduDetails = async () => {
    let eduData;
    if (!currentUser) {
      const res = await getUser();
      setCurrentUser(res.data.result)
      eduData = res.data.result.education.filter((item) => item._id === eduID);
    } else {
      eduData = currentUser.education.filter((item) => item._id === eduID);
    }
    eduData[0].startDate = dateFormatter(eduData[0].startDate);
    eduData[0].endDate = dateFormatter(eduData[0].endDate);
    setData(eduData);
  };

  useEffect(() => {
    if (id === 'edit-text') {
      fetchEduDetails();
    }
  }, []);

  return (
    <div className='blur-bg-prof'>
      <div className='edu-pop-up-container'>
        <span className='close-btn' onClick={onClose}>
          X
        </span>
        <h1 style={{ marginBottom: '10px' }}>
          {id === 'edit-text' ? 'Update Education' : 'Add Education'}
        </h1>
        {data[0].institution.length >= 1 || id !== 'edit-text' ? (
          <>
            {' '}
            <input
              name='institution'
              onChange={onChange}
              value={data[0].institution}
              type='text'
              placeholder='College/University name'
            />
            <input
              name='degree'
              onChange={onChange}
              value={data[0].degree}
              type='text'
              placeholder='Degree'
            />
            <input
              name='fieldOfStudy'
              onChange={onChange}
              value={data[0].fieldOfStudy}
              type='text'
              placeholder='Field of Study'
            />
            <label style={{ paddingRight: '21vw' }} htmlFor='startDate'>
              Start Date:
            </label>
            <input
              name='startDate'
              onChange={onChange}
              value={data[0].startDate}
              type='date'
              max={new Date().toISOString().split('T')[0]}
              placeholder='Start date'
            />
            <label style={{ paddingRight: '21vw' }} htmlFor='endDate'>
              End Date:
            </label>
            <input
              name='endDate'
              onChange={onChange}
              value={data[0].endDate}
              type='date'
              placeholder='End date or Expected end date'
            />
            <input
              name='city'
              onChange={onChange}
              value={data[0].city}
              type='text'
              placeholder='City'
            />
            <input
              name='state'
              onChange={onChange}
              value={data[0].state}
              type='text'
              placeholder='State'
            />
            {/* <input name='country' onChange={onChange} value={data[0].country} type="text" placeholder='Country' /> */}
            <button
              onClick={handleEduAdd}
              style={{ color: 'white', fontSize: '1.2rem',width: '102px'}}
            >
              {id === 'edit-text' ? 'Update' : 'Add'}
            </button>
          </>
        ) : (
          <img src={spinner} alt='spinner' width={100} />
        )}
      </div>
    </div>
  );
};

export default EduPopUp;
