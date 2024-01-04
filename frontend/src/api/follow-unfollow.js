import axios from "axios";

const API = axios.create({ baseURL: "https://skillop.in" });

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
