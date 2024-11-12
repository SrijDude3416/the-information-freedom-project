// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
// import CountyMap from './pages/CountyMap';
import BlogPage from './pages/BlogPage';
import Navbar from './components/Navbar';

import './styles/reset.css';
import './styles/theme.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar is rendered here, so it appears on all pages */}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* <Route path="/america" element={<CountyMap />} /> */}
          <Route path="/posts" element={<BlogPage />} /> {/* New Blog Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
