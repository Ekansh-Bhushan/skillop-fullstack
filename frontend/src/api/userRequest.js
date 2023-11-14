import axios from "axios";

const API = axios.create({ baseURL: "https://app.skillop.in" });

export const getUser = () => {
  // get token  from local storage
  const token = localStorage.getItem("skilloptoken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/user/profile/me`, config);
  // return API.get(`/api/user/profile/me`, { withCredentials: true });
};

export const linkedInAuth = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/user/limkedin`, config);
};

export const findUser = (id) => {
  // get token  from local storage
  const token = localStorage.getItem("skilloptoken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/user/profile/${id}`, config);
};

export const registerUser = (data) =>
  API.post(`/api/user/register`, data, { withCredentials: true });

export const loginUser = (data) =>
  API.post(`/api/user/login`, data, { withCredentials: true });

export const changePassword = (data) =>
  API.post(`/api/user/password/forget`, data, { withCredentials: true });

export const updateIsMentor = (data) => {
  // get token  from local storage
  const token = localStorage.getItem("skilloptoken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.put(`/api/user/update/profile`, data, config);
};

export const updateProfile = (data) => {
  // get token  from local storage
  const token = localStorage.getItem("skilloptoken");

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.put(`/api/user/update/profile`, data, config);
};

export const getAllUsers = (data) => {
  // get token  from local storage
  const token = localStorage.getItem("skilloptoken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/user/profile/all`, config);
};
export const getfilteredUser = (data) => {
  // get token  from local storage
  const token = localStorage.getItem("skilloptoken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.post(`/api/user/profile/search`, data, config);
};

export const getSpecificUser = (id) => {
  // get token  from local storage
  const token = localStorage.getItem("skilloptoken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    withCredentials: true,
  };
  return API.get(`/api/user/profile/${id}`, config);
};

export const getFollowers = (userid) => {
  // Get the token from local storage
  const token = localStorage.getItem("skilloptoken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    withCredentials: true,
  };

  return API.get("/api/user/followers?limit=200", {
    params: { userId: userid }, // Pass userId directly as a query parameter
    ...config, // Merge the headers and withCredentials into the request
  });
};

export const getFollowings = (userid) => {
  // get token  from local storage
  const token = localStorage.getItem("skilloptoken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    withCredentials: true,
  };

  return API.get("/api/user/followings?limit=200", {
    params: { userId: userid },
    ...config,
  });
};

export const getProfileCompletionStatus = () => {
  // get token  from local storage
  const token = localStorage.getItem("skilloptoken");

  const config = {
    headers: { Authorization: token },
    withCredentials: true,
  };

  return API.get(`/api/user/profile/completion/status`, config);
};
