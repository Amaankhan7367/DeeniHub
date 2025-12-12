import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import "./PostCard.css";

function PostCard({ $id, title, featuredimage }) {
  

  const imageUrl = featuredimage
    ? appwriteService.getFileUrl(featuredimage)
    : "/fallback.jpg";

  return (
    <Link to={`/post/${$id}`} className="postcard-link">
      <div className="postcard">
        <div className="postcard-image-wrapper">
         <img
            src={imageUrl}
            alt={title}
            className="postcard-image"
          />

         

        </div>

        <h2 className="postcard-title">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;