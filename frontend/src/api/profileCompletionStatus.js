import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

const ProfileCompletionStatus = (expId) => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`api/user/profile/completion/status/${expId}`, config);
};

export default ProfileCompletionStatus;
