import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Mobilecommonhead from '../components/Mobilecommonhead';

const HashtagPage = () => {
    const { hashtag } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`https://skillop.in/api/hashtag/get/posts/${hashtag}`);
                setPosts(response.data.result || []);  // Assuming response.data.result is an array of posts
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [hashtag]);

    return (
        <>
        <Mobilecommonhead/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h1 style={{ marginTop: '80px' }}>Posts with # <span style={{ color: 'green' }}>#{hashtag}</span></h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {posts.length > 0 ? posts.map(post => (
                    <li key={post._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', width: '80%', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', alignItems: 'center' }}>
                            <img src={post.user.profileUrl} alt="User Profile" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                            <div>
                                <p style={{ margin: 0, fontWeight: 'bold' }}>{post.user.username}</p>
                                <p style={{ margin: 0 }}>{post.user.firstname} {post.user.lastname}</p>
                            </div>
                        </div>
                        <p style={{ marginTop: '50px' }}>{post.title}</p>
                        
                        {post.imageUrls.length > 0 && (
                            <div>
                                <strong>Images:</strong>
                                {post.imageUrls.map((url, index) => (
                                    <img key={index} src={url} alt={`Post Image ${index + 1}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                                ))}
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                
                                <p><strong>Likes:</strong> {post.likes}</p>
                                <p><strong>Comments:</strong> {post.comments}</p>
                            </div>
                    </li>
                )) : <p>No posts found for #{hashtag}</p>}
            </ul>
        </div>
        </>
    );
};

export default HashtagPage;
