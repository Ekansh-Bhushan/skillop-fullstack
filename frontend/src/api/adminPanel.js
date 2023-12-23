import axios from 'axios';

const API = axios.create({ baseURL: 'https://app.skillop.in' });

export const sendNotification = (data) => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.post(`/api/admin/action/send/notification`, data, config);
};

export const getMostActiveUsers = () => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/admin/query/users/most/active`, config);
};
