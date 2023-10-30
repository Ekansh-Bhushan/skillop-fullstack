import axios from "axios";

const API = axios.create({ baseURL: "https://skillop-back.onrender.com" });

const editEdu = (expId, data) => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.put(`/api/user/edit/education/${expId}`, data, config);
};

export default editEdu;
