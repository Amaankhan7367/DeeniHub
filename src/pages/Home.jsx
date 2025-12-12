import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import { PostCard } from '../components'
import './Home.css'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) setPosts(posts.documents)
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="home-wrapper">
                <div className="empty-msg">
                    <h1>Login to read posts</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="home-wrapper">
            <div className="post-grid">
                {posts.map((post) => (
                    <div key={post.$id} className="post-box">
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home