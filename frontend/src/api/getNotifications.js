import axios from "axios";

const API = axios.create({ baseURL: "https://skillop.in" });

export const getNotifications = () => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/user/notifications`, config);
};

export const readNotifications = (notiId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.put(`/api/user/read/notification/${notiId}`, {}, config);
};
