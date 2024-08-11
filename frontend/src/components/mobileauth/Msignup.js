import React, { useContext, useState } from 'react';
import { googleIdVerifyAndLogin, registerUser } from '../../api/userRequest';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import coolimg from '../../components/images/logo.png';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { MainContext } from '../../context/MainContextProvider';

const Msignup = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(MainContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const signupClicked = async () => {
    // block the signup buttom

    try {
      const { data } = await registerUser({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      });
      if (data.result) {
        localStorage.setItem('skilloptoken', data.token);
        localStorage.setItem('current-user-id', data.result._id);
        toast.success(data.message);
        navigate('/homepage');
        setCurrentUser(data.result);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    const decodedToken = jwt_decode(idToken);
    const { data } = await googleIdVerifyAndLogin({ token: idToken });
    localStorage.setItem('skilloptoken', data.token);
    if (data && data.result) {
      if (data.type === 'old') {
        navigate('/homepage');
      } else {
        navigate('/homepage');
      }
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className= "">
      <div className='flex items-center justify-center gap-3 mt-10'>
        <img src={coolimg} className='h-[40px]' alt='Logo' />
        <h1 className='font-bold text-xl'>SKILLOP</h1>
      </div>
      <div className='flex items-center flex-col mt-[3vh] mx-[5vh]'>
        <h1 className='text-3xl font-bold text-start mb-3'>SIGNUP</h1>
        <div className='flex flex-col items-center justify-center'>
          <div className='relative my-4'>
            <label className='absolute top-0 left-2 -mt-3 bg-white px-1'>
              First Name
            </label>
            <input
              className='border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]'
              placeholder='First Name'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className='relative my-4'>
            <label className='absolute top-0 left-2 -mt-3 bg-white px-1'>
              Last Name
            </label>
            <input
              className='border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]'
              placeholder='Last Name'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className='relative my-4'>
            <label className='absolute top-0 left-2 -mt-3.5 bg-white px-1'>
              Email
            </label>
            <input
              className='border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='relative my-4'>
            <label className='absolute top-0 left-2 -mt-3.5 bg-white px-1'>
              Password
            </label>
            <input
              className='border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className='bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 w-[100%] rounded p-1 mt-5'
            onClick={signupClicked}
          >
            <span className='flex justify-center items-center w-full bg-white rounded p-2'>
              Signup
            </span>
          </button>
          <div className='flex items-center justify-center mt-6 mb-8 w-[90%]'>
            Already have an account ? {'  '}
            <span className='text-blue-500' onClick={() => navigate('/mlogin')}>
              {'  '}
              Login
            </span>
          </div>
          <div className='flex items-center justify-center mt-10 mb-8 w-[90%]'>
            <div className='border-t border-[#7E8B9E] w-full'></div>
            <span className='text-[#7E8B9E] px-2'>or</span>
            <div className='border-t border-[#7E8B9E] w-full'></div>
          </div>
          <div className='flex my-4 text-center p-auto w-full justify-center items-center'>
            <button className='rounded-full hover:bg-[#8484841A] font-bold py-2 px-8 ml-4 flex border-black border items-center justify-center bg-gray-100 text-lg w-full'>
              <GoogleOAuthProvider clientId='154719299730-irqnpdj9jo8n2pa475b0gbpmoi78orha.apps.googleusercontent.com'>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    toast.error('Google Login Failed');
                  }}
                />
              </GoogleOAuthProvider>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Msignup;
