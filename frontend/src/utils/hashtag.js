
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const HashtagPage = () => {
  const { hashtag } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/hashtag/get/posts/${hashtag}`);
        const data = await response.json();
        setPosts(data.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [hashtag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Posts with #{hashtag}</h1>
      {posts.length === 0 ? (
        <p>No posts found for this hashtag.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.title}</h2>
            <p>{post.caption}</p>
            {post.imageUrls.map((url, index) => (
              <img key={index} src={url} alt="Post" />
            ))}
            <p>Likes: {post.likes}</p>
            <p>Comments: {post.comments}</p>
            <div>
              <p>Posted by: {post.user.username}</p>
              <p>
                {post.user.firstname} {post.user.lastname}
              </p>
              <img src={post.user.profileUrl} alt="User Profile" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HashtagPage;
