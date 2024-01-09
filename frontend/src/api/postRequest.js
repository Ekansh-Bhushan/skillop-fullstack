import axios from "axios";

const API = axios.create({ baseURL: "https://skillop.in" });

export const createPost = (data) => {
    const token = localStorage.getItem("skilloptoken");
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.post(`/api/post/create`, data, config);
};
export const getAllPost = (limit = 10, skip = 0) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/post/from/all?limit=${limit}&skip=${skip}`, config);
};
export const getSpecificPost = (postId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/post/${postId}`, config);
};

export const likeOrDislikePost = (postId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.put(`/api/post/like/${postId}`, {}, config);
};

export const addCommentToPost = (postId, commentData) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    const body = {
        comment: commentData,
    };

    return API.post(`/api/post/comment/add/${postId}`, body, config);
};

export const getCommentsForPost = (postId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.get(`/api/post/get/comments/${postId}`, config);
};

export const getLikers = (postId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.get(`/api/post/get/likers/${postId}`, config);
};

// export const getCommentsForPost = (postId) => {
//   const token = localStorage.getItem("skilloptoken");

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//     withCredentials: true,
//   };

//   return API.get(`/api/post/${postId}`, config);
// };

export const deleteComment = (commentId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.delete(`/api/post/comment/delete/${commentId}`, config);
};

export const getSpecificUser = (userId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };

    return API.get(`/api/user/profile/${userId}`, config);
};

// export const commentPost = (postId, commentData) => {
//     return addCommentToPost(postId, commentData);
// };

export const getPostFromSpecificUser = (userId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/post/from/${userId}`, config);
};
