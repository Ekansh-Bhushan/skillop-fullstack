import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

const mentorBanoRequest = (expId) => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`api/mentor/request/${expId}`, config);
};

export default mentorBanoRequest;
