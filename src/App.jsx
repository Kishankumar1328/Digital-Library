// src/App.jsx
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import About from './About';
import Contact from './Contact';
import Wishlist from './Wishlist'; // Import the Wishlist component
import './App.css';

import Topbar from './Topbar';
import BookList from './Booklist';

function Home({ searchQuery }) {
  return (
    <div className="home-content">
      <BookList searchQuery={searchQuery} />
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <Topbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;