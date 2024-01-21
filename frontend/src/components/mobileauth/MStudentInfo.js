import React, { useState } from 'react';
import coolimg from '../../components/images/logo.png';
import { updateProfile } from '../../api/userRequest';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MProgressBar from './MProgressBar';
import axios from 'axios';

const MStudentInfo = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    country: '',
    state: '',
    city: '',
  }]);
  const [searchQuery, setSearchQuery] = useState('');
  const [collegeSelected, setCollegeSelected] = useState(false);
  const [collegeSearchResults, setCollegeSearchResults] = useState([]);

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
    console.log('search q set to ', clg_details.college);
    document.querySelector('.college-search-results1').style.display = 'none';
  };

  const handleOnChange = (e) => {
    setCollegeSelected(false);
    setData((prevData) => [
      {
        ...prevData[0],
        institution: e.target.value,
        city: '',
        state: '',
      },
    ]);

    setSearchQuery(e.target.value);
    document.querySelector('.college-search-results1').style.display = 'block';
    searchCollege(e.target.value);
    if (e.target.value.length === 0) {
      document.querySelector('.college-search-results1').style.display = 'none';
    }
  };

  const searchCollege = async (qrr) => {
    try {
      const { data } = await axios.get(
        `https://skillop.in/api/college/info?college=${qrr}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setCollegeSearchResults(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => [
      {
        ...prevData[0],
        [name]: value,
      },
    ]);
  };

  const nextClicked = async () => {
    // check start date and end date
    if(data[0].startDate < 1900) {
        toast.error("Start year can't be smaller than 1900");
        return;
    }
    if (!data[0].institution || !data[0].degree || !data[0].startDate || !data[0].endDate) {
      console.log(data);
      toast.error('Institution, Degree, Start & End Year are required!');
      return;
    }
    if (data[0].startDate > data[0].endDate) {
      toast.error('Start Year must be smaller than End Year');
      return;
    }
    try {
      let formdata = new FormData();
      formdata.append('education', JSON.stringify(data));
      console.log('hi this is data ', data);
      await updateProfile(formdata);
      toast.success('College Added!');
      navigate('/mcover');
    } catch (err) {
      console.log('Unable to update profile at the moment! ', err);
      toast.error(err.response.data.message);
      toast.error('Unable to update profile at the moment! ');
    }
  };

  return (
    <div>
      <div className='flex items-center justify-center gap-3 mt-10'>
        <img src={coolimg} className='h-[40px]' alt='Logo' />
        <h1 className='font-bold text-xl'>SKILLOP</h1>
      </div>
      <div className='flex items-start flex-col mt-[7vh] mx-[5vh] '>
        <h1 className='text-start text-2xl font-semibold mb-2'>
          Complete your
        </h1>
        <span className='text-4xl font-bold'>Profile</span>
        <MProgressBar progress={40} />
        <h1 className='text-lg font-semibold mt-7'>Student Information</h1>
        <div className='flex flex-col items-center justify-center'>
          <div className='relative my-6'>
            <label className='absolute top-0 left-2 -mt-2 bg-white px-1'>
              College/ Institution
            </label>
            <input
              className='border-[1px] border-gray-500 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]'
              name='institution'
              type='text'
              onChange={handleOnChange}
              value={searchQuery}
            />
            <div className='college-search-results1 flex flex-wrap gap-1 border-gray-500 border-[1px] w-full rounded-3xl z-40 bg-white bg-opacity-50 backdrop-blur-[20px]'>
              <div>
                <div className='college-search-results1 border rounded-xl max-h-64 scroll-auto overflow-auto'>
                  {collegeSearchResults.length > 0
                    ? collegeSearchResults.map((college, idx) => {
                        return (
                          <div
                            key={idx}
                            id='college-result'
                            onClick={() => handleCollegeSelection(college)}
                            className='p-2'
                          >
                            <h3>{college.college}</h3>
                            <p>
                              {college.city}
                              {', '}
                              {college.state}
                            </p>
                          </div>
                        );
                      })
                    : searchQuery.length > 0 &&
                      `No results found for "${searchQuery}"`}
                </div>
              </div>
            </div>

            <div className='relative mt-6'>
              <label className='absolute top-0 left-2 -mt-2 bg-white px-1'>
                Degree
              </label>
              <input
                className='border-[1px] border-gray-500 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]'
                name='degree'
                type='text'
                // placeholder="Degree"
                onChange={onChange}
              />
            </div>
            <div className='relative mt-6'>
              <label className='absolute top-0 left-2 -mt-2 bg-white px-1'>
                Field Of Study/ Branch
              </label>
              <input
                className='border-[1px] border-gray-500 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]'
                name='fieldOfStudy'
                type='text'
                // placeholder="Field Of Study/ Branch"
                onChange={onChange}
              />
            </div>
            <div className='flex gap-5'>
              <div className='relative mt-6'>
                <label className='absolute top-0 left-2 -mt-2 bg-white px-1'>
                  Start-Year
                </label>
                <input
                  className='border-[1px] border-gray-500 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[38vw]'
                  name='startDate'
                  type='number'
                  // placeholder="Start-Year"
                  onChange={onChange}
                />
              </div>
              <div className='relative mt-6'>
                <label className='absolute top-0 left-2 -mt-2 bg-white px-1'>
                  End-Year
                </label>
                <input
                  className='border-[1px] border-gray-500 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[38vw]'
                  name='endDate'
                  type='number'
                  // placeholder="End-Year"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className='flex items-center justify-between w-[100%] mt-10'>
              <button
                className='border-[1px] border-black py-2 px-3 rounded-2xl'
                onClick={() => navigate('/mskill')}
              >
                Previous
              </button>
              <button
                className='border-[1px] border-black py-2 px-3 rounded-2xl'
                onClick={nextClicked}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MStudentInfo;
