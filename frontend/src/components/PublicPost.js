import React, { useEffect, useState } from "react";
import { getSpecificPost } from "../api/postRequest";
import { useParams } from "react-router-dom";
import Post from "./Landing/Post"; // Adjust the import path

const PublicPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getSpecificPost(postId);

        if (response.data && response.data.result) {
          // Check if the expected data is available in the response
          const postData = response.data.result;
          console.log(postData);
          setPost(postData);
        } else {
          console.error("Invalid API response:", response);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div>
      {post && (
        <div>
          <h1>
            {post.author && (
              <>
                {post.author.firstname} {post.author.lastname}
              </>
            )}
          </h1>
          {/* Assuming your Post component takes 'data' as a prop */}
          <Post key={post.id} data={post} />
        </div>
      )}
    </div>
  );
};

export default PublicPost;
