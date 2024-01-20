import axios from 'axios';

const API = axios.create({ baseURL: 'https://skillop.in' });

export const sendPlatformFeedback = (data) => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.post(`/api/feedback/to/platform`, data, config);
};
