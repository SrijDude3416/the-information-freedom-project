// src/pages/BlogPage.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/BlogPage.css";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Use React Router",
      videoUrl: "https://path-to-thumbnail1.jpg",
      link: "/blog/how-to-use-react-router",
    },
    {
      id: 2,
      title: "Exploring React Hooks",
      videoUrl: "https://path-to-thumbnail2.jpg",
      link: "/blog/exploring-react-hooks",
    },
    // Add more blog post objects here
  ];

  return (
    <div className="blog-page">
      <h1>Blog Posts</h1>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <Link to={post.link} className="blog-box" key={post.id}>
            <img src={post.videoUrl} alt={`${post.title} thumbnail`} className="blog-thumbnail" />
            <div className="blog-title">{post.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
