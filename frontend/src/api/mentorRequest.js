import axios from "axios";

const API = axios.create({ baseURL: "https://skillop.in" });

export const getMentorData = (mentorId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.get(`/api/user/mentor/${mentorId}`, config);
};

export const getMentorAvaibility = (date, mentorId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.post(`/api/mentor/availability/${mentorId}`, date, config);
};

export const becomeMentor = () => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.put(`api/mentor/become`, {}, config);
};

export const getscheduledbookings = () => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.get(`api/mentor/meets`, config);
};

export const getUpcommingBookings = () => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.get(`api/mentor/meet/upcomming`, config);
};

export const getPendingMeet = () => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.get(`api/mentor/meet/pending`, config);
};

export const getCompletedMeet = () => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.get(`api/mentor/meet/completed`, config);
};

export const acceptMeet = (meetId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.put(`/api/mentor/meet/accept/${meetId}`, {}, config);
};

export const sendMeetRequest = (mentorId, day, s, e, userid, formData) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.post(`/api/mentor/book/${mentorId}`, formData, config);
};

export const getEarnings = () => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/mentor/earnings`, config);
};

export const requestToBeMentor = () => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    };

    return API.put(`/api/mentor/request`, {}, config);
};
