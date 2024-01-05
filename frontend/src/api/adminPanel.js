import axios from 'axios';

const API = axios.create({ baseURL: 'https://skillop.in' });

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

export const createEvent = (data) => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.post(`/api/admin/action/event/create`, data, config);
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

export const getMostFollowedUsers = (num) => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/admin/query/most/followed?getTopOf=${num}`, config);
};

export const fetchUpcomingEvents = (type) => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`api/admin/action/event/all?type=${type}`, config);
};

export const delEvents = (id) => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.delete(`/api/admin/action/event/delete/${id}`, config);
};

export const getMentorList = () => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/admin/query/mentor/matrix`, config);
};

export const getNewUserList = () => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/admin/query/users/new?days=1`, config);
};

export const getDeadUserList = () => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/admin/query/dead/users?days=365`, config);
};

export const getHighestEarnerList = () => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/admin/query/highest/earning`, config);
};

export const getTopPosts = (num) => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/admin/query/post/matrix?getTopOf=${num}`, config);
};

export const getSiteMetrics = () => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/admin/query/site/matrix`, config);
};

export const fetchUserByUsername = (username) => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(
    `/api/user/query/from/username?queryUsername=${username}`,
    config
  );
};

export const delUserByUserId = (userId) => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.delete(`/api/admin/action/user/delete/${userId}`, config);
};

export const delPostByPostId = (userId) => {
  const token = localStorage.getItem('skilloptoken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.delete(`api/admin/action/post/delete/${userId}`, config);
};
