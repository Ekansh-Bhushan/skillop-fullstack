import axios from "axios";

const API = axios.create({ baseURL: "https://app.skillop.in" });

const delExp = (expId) => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.delete(`/api/user/remove/experence/${expId}`, config);
};

export default delExp;
