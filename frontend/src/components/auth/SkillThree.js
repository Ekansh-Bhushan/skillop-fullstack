import React, { useState } from 'react';
import Nav from './Nav';
import doodle1 from '../../components/images/doodle-6 1.png';
import doodle2 from '../../components/images/doodle-7 1.png';
import Saly from '../../components/images/Saly-26.png';
import { IoMdAdd } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa6';
import { updateIsMentor } from '../../api/userRequest';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const SkillThree = ({ setProgress }) => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const defaultSkillsToDisplay = [
    'Web Development',
    'UI/UX',
    'Data Structures & Algorithm',
    'Technology',
  ];
  const [skills, setSkills] = useState([]);

  const handleAddSkill = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleSkillAdd = () => {
    if (skills.includes(newSkill)) {
      toast.error('This skill is already selected!');
      setNewSkill('');
      setShowInput(false);
      return;
    }
    if (newSkill.trim() !== '') {
      setSkills([...skills, newSkill]);
      setNewSkill('');
      setShowInput(false);
    }
  };

  const nextClicked = async () => {
    setProgress(40);
    if (skills.length)
      try {
        const request = {
          skills: skills,
        };
        const { data } = await updateIsMentor(request);

        if (data.result) {
          toast.success('Skills added!');
          navigate('/skill4');
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    navigate('/skill4');
    setProgress(100);
  };

  return (
    <div>
      <Nav />
      <ProgressBar progress={20} />

      <img src={doodle1} className='absolute top-[66vh] left-[29vw] z-10' alt='Doodle 1'/>
      <img src={doodle2} className='absolute right-[19vw] top-[62vh] z-10' alt='Doodle 2'/>
      <img src={Saly} className='absolute right-[16vw] z-10 top-[18vh]' alt='Saly'/>
      <div className='flex items-start flex-col ml-[35vh] z-50 mt-5'>
        <h1 className='text-[35px] mb-5 mt-[8vh] font-bold'>
          Complete Your Profile
        </h1>
        <div className='flex items-center gap-[10vh]'>
          <div className='flex items-start justify-center flex-col text-xl gap-8 mt-3 font-normal'>
            {window.location.pathname === '/skill3' ? (
              <span className='font-semibold'>Skills/Interests</span>
            ) : (
              <span>Skills/Interests</span>
            )}
            {window.location.pathname === '/skill4' ? (
              <span className='font-semibold'>Education Information</span>
            ) : (
              <span>Education Information</span>
            )}
            {window.location.pathname === '/skill6' ? (
              <span className='font-semibold'>Cover & Profile Photos</span>
            ) : (
              <span>Cover & Profile Photos</span>
            )}
            {window.location.pathname === '/skill7' ? (
              <span className='font-semibold'>Additional Information</span>
            ) : (
              <span>Additional Information</span>
            )}
          </div>

          <div className='flex flex-wrap justify-center gap-4 border-[1px] px-10 py-8 w-[40vw] rounded-3xl z-40 bg-white bg-opacity-50 backdrop-blur-[20px]'>
            {/* Existing skills */}
            <div className='flex flex-wrap justify-center gap-4 w-full'>
              {skills.length === 0 &&
                defaultSkillsToDisplay.map((skill, index) => (
                  <div
                    key={index}
                    className='border px-4 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer'
                    style={{
                      backgroundColor: '#F2F2F2',
                      color: 'gray',
                    }}
                  >
                    <span>{skill}</span>
                  </div>
                ))}
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className='border px-4 py-2 rounded-3xl hover:bg-red-100 cursor-pointer'
                  onClick={() =>
                    setSkills(skills.filter((item) => item !== skill))
                  }
                >
                  <span>{skill}</span>
                </div>
              ))}
              <div
                onClick={handleAddSkill}
                className='flex items-center justify-center gap-2 cursor-pointer'
              >
                <button className='p-1 rounded-full border-black border-[1px]  hover:bg-gray-100 cursor-pointer '>
                  <IoMdAdd className='text-lg' />
                </button>
                <span>Add a skills/ interest</span>
              </div>
            </div>

            {showInput && (
              <div className='mt-4 absolute bg-white rounded-3xl flex flex-col items-start justify-center px-10 py-5 border-2 border-black gap-4'>
                <div className='flex justify-center gap-4'>
                  <h1 className='text-2xl font-semibold'>
                    Add a Skill/Interest{' '}
                  </h1>
                  <img className='cursor-pointer' onClick={()=>setShowInput(false)} src='/close.png' width={30} alt='close' />
                </div>
                <input
                  type='text'
                  value={newSkill}
                  onChange={handleInputChange}
                  onKeyDown={(event)=>{if(event.key==="Enter")handleSkillAdd()}}
                  placeholder='Eg: AI-ML, WebD, UI/UX...'
                  className='rounded-lg w-full mt-5 bg-[#8484841A] border-[#5F5F5F80] p-2'
                />
                <button
                  class='bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 w-[100%] p-1 mt-1 rounded-xl overflow-hidden'
                  onClick={handleSkillAdd}
                >
                  <span class='flex justify-center items-center w-full bg-white rounded-lg p-2'>
                    Add
                  </span>
                </button>
              </div>
            )}

            <div className='flex justify-end w-full items-center'>
              <div
                className='flex rounded-3xl border-[2px] border-black items-center justify-center px-1.5 py-1.5 gap-2 hover:cursor-pointer hover:bg-[#8484841A]'
                onClick={nextClicked}
              >
                <button className='font-bold '>NEXT</button>
                <span className='rounded-full border-[2px] border-black py-1 px-1'>
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

export default SkillThree;