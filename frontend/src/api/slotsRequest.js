import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const postSlot = (data) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.put(`/api/mentor/update/availability`, data, config);
};

export const getActualAvail = () => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/mentor/getAvailability`, config);
};

export const bookslot = (data, mentorId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.post(`/api/mentor/book/${mentorId}`, data, config);
};

export const updateMeetCharge = (rate) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.put(`/api/mentor/set?meetChargePerHour=${rate}`, {}, config);
};
