import axios from "axios";

const API = axios.create({ baseURL: "https://skillop-back.onrender.com" });

export const getMessages = (id) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/message/${id}`, config);
};

export const addMessage = (data) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.post("/api/message/", data, config);
};
