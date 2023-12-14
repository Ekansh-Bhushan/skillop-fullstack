import React from "react";
import { getSpecificPost } from "../api/postRequest";
import { useState, useEffect } from "react";

const PublicPost = () => {
  const postId = window.location.pathname.split("/")[2];
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await getSpecificPost(postId);
        console.log(data.result);
        setPost(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [postId]);

  return (
    <div>
      {post && (
        <div>
          <h1>
            {" "}
            {post.author.firstname} {post.author.lastname}
          </h1>
        </div>
      )}
    </div>
  );
};

export default PublicPost;
