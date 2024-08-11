import React, { useContext, useState } from 'react';
import coolimg from '../../components/images/logo.png';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { googleIdVerifyAndLogin, loginUser } from '../../api/userRequest'; // Import your loginUser API request function
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../context/MainContextProvider';

const Mlogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useContext(MainContext);

  const login = async () => {
    const redirectTo = new URL(window.location.href).searchParams.get(
      'redirect'
    );
    try {
      const { data } = await loginUser({
        email: email,
        password: password,
      });
      if (data.result) {
        localStorage.setItem('skilloptoken', data.token);
        localStorage.setItem('current-user-id', data.result._id);
        if (redirectTo) navigate(redirectTo);
        else navigate('/homepage');
        setCurrentUser(data.result);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.err);
    }
  };
  const loginClicked = async () => {
    await login();
  };
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    console.log(idToken);
    const { data } = await googleIdVerifyAndLogin({ token: idToken });
    console.log(data);
    // Store the token in local storage
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
    <div>
      <div className='flex items-center justify-center gap-3 mt-10'>
        <img src={coolimg} className='h-[40px]' alt='Logo' />
        <h1 className='font-bold text-xl'>SKILLOP</h1>
      </div>
      <div className='flex items-center flex-col mt-[12vh] mx-[5vh]'>
        <h1 className='text-3xl font-bold text-start'>LOGIN</h1>
        <div className='flex flex-col items-center justify-center'>
          <div className='relative my-6'>
            <label className='absolute top-0 left-2 -mt-3.5 bg-white px-1'>
              Email
            </label>
            <input
              className='border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='relative'>
            <label className='absolute top-0 left-2 -mt-3 bg-white px-1'>
              Password
            </label>
            <input
              className='border-2 rounded-xl bg-[#FAFAFC] py-2 pl-10 w-[80vw]'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className='bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 w-[100%] rounded p-1 mt-5'
            onClick={loginClicked}
          >
            <span className='flex justify-center items-center w-full bg-white rounded p-2'>
              Login
            </span>
          </button>
          <p className='mt-2'>Not Registered Yet?</p>

          <span className='flex justify-center items-center w-full bg-white rounded  text-blue-500'>
            <a href='/msignup'> Signup</a>
          </span>
          {/* ... (Social login buttons and other UI elements) */}
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

export default Mlogin;
