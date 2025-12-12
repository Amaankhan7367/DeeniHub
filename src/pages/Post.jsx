import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import './Post.css';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((data) => {
                if (data) setPost(data);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="post-wrapper">
            <Container>
                {/* Image */}
                <div className="post-image-wrapper">
                    <img
                        src={post.featuredimage ? appwriteService.getFileUrl(post.featuredimage) : "/fallback.jpg"}
                        alt={post.title}
                        className="post-image"
                    />
                </div>

                {/* Username + Buttons */}
                <div className="post-meta">
                    {post.username && <span className="post-username">By: {post.username}</span>}

                    {isAuthor && (
                        <div className="post-buttons">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="btn-edit">Edit</Button>
                            </Link>
                            <Button className="btn-delete" onClick={deletePost}>Delete</Button>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h1 className="post-title">{post.title}</h1>

                {/* Content */}
                <div className="post-content">{parse(post.content)}</div>
            </Container>
        </div>
    ) : null;
}