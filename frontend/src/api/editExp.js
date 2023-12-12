import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

const editExp = (expId, data) => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.put(`/api/user/edit/experence/${expId}`, data, config);
};

export default editExp;
