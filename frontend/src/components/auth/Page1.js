import React, { useContext, useState } from 'react';
import img1 from '../../components/images/img1.png';
import Nav from './Nav';
import { googleIdVerifyAndLogin, registerUser } from '../../api/userRequest';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { MainContext } from '../../context/MainContextProvider';

const Page1 = ({ setProgress }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const { setCurrentUser } = useContext(MainContext);

  const [agreeToTermsAndConditions, setAgreeToTermsAndConditions] =
    useState(false);

  const signupClicked = async () => {
    // block the signup buttom
    if (!agreeToTermsAndConditions) {
      toast.error('Please agree to the terms and conditions.');
      return;
    }

    setProgress(40);
    try {
      const { data } = await registerUser({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      });
      console.log(data);
      if (data.result) {
        localStorage.setItem('skilloptoken', data.token);
        localStorage.setItem('current-user-id', data.result._id);
        toast.success(data.message);
        setCurrentUser(data.result);
        navigate('/skill3');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setProgress(100);
  };
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    console.log(idToken);
    const decodedToken = jwt_decode(idToken);
    console.log(decodedToken);

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
                  <a href='/login'>LOGIN</a>
                )}
              </div>
            </div>
            <p className='text-[#7E8B9E] font-semibold text-lg mt-[4vh]'>
              Welcome, We are glad to see you!
            </p>
            <div className='flex flex-col w-[80%]'>
              <label className='mt-5 mb-2'>First Name</label>
              <input
                className='border-2 rounded-lg bg-[#FAFAFC] py-2'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label className='mt-5 mb-2'>Last Name</label>
              <input
                className='border-2 rounded-lg bg-[#FAFAFC] py-2'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <label className='mt-5 mb-2'>Email</label>
              <input
                className='border-2 rounded-lg bg-[#FAFAFC] py-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className='mt-5 mb-2'>Password</label>
              <input
                className='border-2 rounded-lg bg-[#FAFAFC] py-4'
                minlength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
              />
            </div>
            <div className='w-[80%]'>
              <div class='mt-4'>
                <label for='agree' class='flex items-center'>
                  <input
                    type='checkbox'
                    id='agree'
                    required
                    onChange={(e) =>
                      setAgreeToTermsAndConditions(e.target.checked)
                    }
                  />
                  <span class='ml-2 text-sm'>
                    By signing up, you are creating a SKILLOP account, and you
                    agree to SKILLOP’s{' '}
                    <Link to='/terms-of-service' class='text-blue-600'>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to='/privacy-policy' class='text-blue-600'>
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>
              <div class='mt-4'>
                <label for='remember' class='flex items-center'>
                  <input type='checkbox' id='remember' />
                  <span class='ml-2 text-sm'>
                    Remember Me as a{' '}
                    <a href='#' class='text-blue-600'>
                      Member
                    </a>{' '}
                    of{' '}
                    <a href='#' class='text-blue-600'>
                      SKILLOP Community
                    </a>
                  </span>
                </label>
              </div>
              <button
                className='bg-[#3568FF] w-full text-white py-3 rounded-lg mt-5 hover:bg-blue-700'
                onClick={signupClicked}
              >
                Sign Up
              </button>
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
                Already a part of SKILLOP Community ?
                <a href='/login' class='text-blue-600 mx-2'>
                  LOGIN
                </a>
                here
              </span>
            </div>
          </div>
        </div>

        <div className='flex items-start justify-center flex-col '>
          <h1 className='text-5xl w-[100%] mb-2'>Connecting Dreams,</h1>
          <h1 className='text-5xl w-[80%] mb-2'>Fostering Growth</h1>
          <p className='text-[27px] font-medium'>
            Sign up for your mentorship journey today!
          </p>
          <img src={img1} />
        </div>
      </div>
    </div>
  );
};

export default Page1;
