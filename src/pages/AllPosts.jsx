import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config";
import PostCard from '../components/PostCard';
import './AllPosts.css';

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className="all-posts">
            <div className="all-posts-container">
                <div className="posts-grid">
                    {posts.map((post) => (
                        <div key={post.$id} className="post-item">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllPosts;