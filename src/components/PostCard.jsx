import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import './PostCard.css'

function PostCard({ $id, title, featuredImage }) {

  return (
    <Link to={`/post/${$id}`} className="postcard-link">
      <div className="postcard">
        
        <div className="postcard-image-wrapper">
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            className="postcard-image"
          />
        </div>

        <h2 className="postcard-title">{title}</h2>

      </div>
    </Link>
  )
}

export default PostCard