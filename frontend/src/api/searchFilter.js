import axios from "axios";

const API = axios.create({ baseURL: "https://skillop.in" });

export const getSearchResultByPeople = (
    searchValue,
    eduInstitute,
    eduDeg,
    jobTitle,
    company,
    location
) => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(
        `api/v2/search?searchBy=people&searchValue=${searchValue}&limit=10&skip=0&educationInstitution=${eduInstitute}&educationDegree=${eduDeg}&experienceTitle=${jobTitle}&experienceCompany=${company}&experienceLocation=${location}`,
        config
    );
};
export const getSearchResultByPost = (
    searchValue,
    eduInstitute,
    eduDeg,
    jobTitle,
    company,
    location
) => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    console.log(searchValue, "searchValue");
    return API.get(
        `api/v2/search?searchBy=posts&searchValue=${searchValue}&limit=10&skip=0`,
        config
    );
};
