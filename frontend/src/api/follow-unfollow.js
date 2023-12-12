import axios from "axios";

const API = axios.create({ baseURL: "https://app.skillop.in" });

export const followUnfollowUser = (id) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.put(`/api/user/follow/${id}`, {}, config);
};
