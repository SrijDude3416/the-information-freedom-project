// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Search for Different Viewpoints</h1>
      <p>
        Welcome to the Google Search with Ollama! Enter a topic, and we'll help you find different perspectives on it.
      </p>
      <Link to="/search" className="button">Go to Search Page</Link>
    </div>
  );
};

export default HomePage;
