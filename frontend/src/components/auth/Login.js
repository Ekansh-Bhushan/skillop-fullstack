import React, { useState } from 'react';
import img1 from '../../components/images/Saly-24.png';
import google from '../../components/images/Google_signup.png';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Nav from './Nav';
import toast from 'react-hot-toast';
import { googleIdVerifyAndLogin, loginUser } from '../../api/userRequest';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const redirectTo = new URL(window.location.href).searchParams.get('redirect');
  console.log(redirectTo);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    try {
      const { data } = await loginUser({
        email: email,
        password: password,
      });
      if (data.result) {
        localStorage.setItem('skilloptoken', data.token);
        if (redirectTo) window.location.replace(redirectTo);
        else navigate('/homepage');
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
        navigate('/skill3');
      }
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div>
      <div className='fixed w-full'>
        {' '}
        <Nav />
      </div>
      <div className='flex justify-around items-start pt-[15vh] mx-[20vh]'>
        <div class='flex justify-center items-center '>
          <div class='flex flex-col items-start justify-start'>
            <div className='flex items-center justify-center gap-[8vh] text-[30px] font-semibold'>
              <div className=''>
                {' '}
                {window.location.pathname === '/signup' ? (
                  <a href='/signup' className='border-b-2 border-black'>
                    SIGNUP
                  </a>
                ) : (
                  <a href='/signup'>SIGNUP</a>
                )}
              </div>
              <div>
                {' '}
                {window.location.pathname === '/login' ? (
                  <a href='/login' className='border-b-2 border-black'>
                    LOGIN
                  </a>
                ) : (
                  <a href='/login'>SIGNUP</a>
                )}
              </div>
            </div>
            <p className='text-[#7E8B9E] font-semibold text-lg mt-[4vh]'>
              Welcome back, We are happy to see you back!
            </p>
            <div className='flex flex-col w-[100%]'>
              <label className='mt-5 mb-2'>Email</label>
              <input
                className='border-2 rounded-lg bg-[#FAFAFC] py-2'
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className='mt-5 mb-2'>Password</label>
              <input
                className='border-2 rounded-lg bg-[#FAFAFC] py-4'
                onChange={(e) => setPassword(e.target.value)}
                type='password'
              />
            </div>
            <div className='w-[100%]'>
              <button
                className='bg-[#3568FF] w-full text-white py-3 rounded-lg mt-5 hover:bg-blue-700'
                onClick={loginClicked}
              >
                Login
              </button>
              {/* forget password */}
              <div className='flex justify-end mt-4'>
                <span
                  className='text-[#7E8B9E] cursor-pointer'
                  onClick={() => navigate('/resetPasswordEmail')}
                >
                  Forget Password?
                </span>
              </div>

              <div class='w-full mt-6 flex items-center justify-center '>
                <hr class='border-t border-gray-300 w-1/4 mr-4'></hr>
                <span class='text-gray-500'>OR</span>
                <hr class='border-t border-gray-300 w-1/4 ml-4'></hr>
              </div>
              <div className='flex my-4 text-center p-auto w-full justify-center items-center'>
                <button className='rounded-full hover:bg-[#8484841A] font-bold py-2 px-8 ml-4 flex border-black border items-center justify-center bg-gray-100 text-lg w-full'>
                  <GoogleOAuthProvider clientId='154719299730-irqnpdj9jo8n2pa475b0gbpmoi78orha.apps.googleusercontent.com'>
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={() => {
                        console.log('Google Login Failed');
                      }}
                    />
                  </GoogleOAuthProvider>
                </button>
              </div>

              <span class='ml-2 text-md text-[#7E8B9E] '>
                Not a part of SKILLOP Community?
                <span
                  class='text-blue-600 mx-2 cursor-pointer'
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </span>
                here
              </span>
            </div>
          </div>
        </div>

        <div className='flex items-start justify-center flex-col '>
          <h1 className='text-5xl w-[100%] mb-2'>Empower your Journey,</h1>
          <h1 className='text-5xl w-[80%] mb-2'>Welcome Back!</h1>
          <p className='text-[27px] font-medium'>
            Log in to unlock a world of mentorship possibilities
          </p>
          <img src={img1} />
        </div>
      </div>
    </div>
  );
};

export default Login;
