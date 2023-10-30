import axios from "axios";

const API = axios.create({ baseURL: "https://app.skillop.in" });

export const logoutUser = () => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.get(`/api/user/logout`, config);
};
