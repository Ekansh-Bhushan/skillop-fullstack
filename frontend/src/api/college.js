import axios from "axios";

const API = axios.create({ baseURL: "https://skillop-back.onrender.com" });

export const getstate = () => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/college/info`, config);
};
export const getcity = (state) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/college/info?state=${state}`, config);
};

export const getcollege = (state, city) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/college/info?state=${state}&city=${city}`, config);
};
