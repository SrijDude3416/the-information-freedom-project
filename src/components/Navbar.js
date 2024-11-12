// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">The Information Freedom Project</h2>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/search" className="navbar-link">Search</Link>
        <Link to="/america" className="navbar-link">Map</Link>
        <Link to="/posts" className="navbar-link">Posts</Link>
        {/* Add more links here if you add more pages */}
      </div>
    </nav>
  );
};

export default Navbar;
