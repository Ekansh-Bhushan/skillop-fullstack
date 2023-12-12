import axios from "axios";

const API = axios.create({ baseURL: "https://app.skillop.in" });

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
