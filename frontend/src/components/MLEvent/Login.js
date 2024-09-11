import React, { useState } from 'react';
import axios from 'axios';
import skillop from './img/skillop.png';
import loginImg from './img/login-2.png';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  // const navigate = useNavigate();
  const login = async () => {
    try {
      const response = await axios.post(
        '/api/login', 
        {
          teamLeaderEmail: email,
          teamPassword: password,
        }
      );

      if (response.status === 200) {
        setMessage('Login successful');
        console.log('User logged in successfully:', response.data);

        localStorage.setItem('user', JSON.stringify(response.data.result));

        // navigate('/questions');

      } else {
        setMessage('Login failed');
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      setMessage('Login failed');
      console.error('Error during login:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className='login-page-container'>
      <div className='login-page'>
        <div className='skillop-moofli'>
          <div className='skillop-image'>
            <img src={skillop} alt='Skillop Logo' className='skillop-img' />
          </div>
          <div className='skillop-text'>
            Skillop
          </div>
        </div>

        <div className='login-text-container'>
          <div className='login-txt'>LOGIN</div>
          <div className='border-btm'></div>
        </div>

        <div className='email'>
          <div className='Input-element'>
            <div className='Input-text'>Email</div>
            <input
              type="email"
              className='Input-data'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className='password'>
          <div className='Input-element'>
            <div className='Input-text'>Password</div>
            <input
              type="password"
              className='Input-data'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className='login-2-container' onClick={login}>
          <img src={loginImg} alt='Login Button' className='login-2-btn' />
        </div>

        {message && <div className='message'>{message}</div>}
      </div>
    </div>
  );
};

export default Login;
