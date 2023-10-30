import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

const delEdu = (eduId) => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.delete(`/api/user/remove/education/${eduId}`, config);
};

export default delEdu;
