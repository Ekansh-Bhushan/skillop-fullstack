// HashtagPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HashtagPage = ({ hashtag }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log('useEffect triggered');
        console.log('Hashtag:', hashtag);
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/api/hashtag/${hashtag}`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [hashtag]);

    return (
        <div>
            <h1>Posts with #{hashtag}</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <p>Title: {post.title}</p>
                        <p>Caption: {post.caption}</p>
                        {/* Render other post details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HashtagPage;
