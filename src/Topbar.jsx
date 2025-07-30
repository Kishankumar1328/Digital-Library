// src/components/Topbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Topbar.css';

const Topbar = ({ onSearch }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();

  // Update wishlist count on component mount and when localStorage changes
  useEffect(() => {
    const updateWishlistCount = () => {
      const savedWishlist = localStorage.getItem('digitalLibraryWishlist');
      if (savedWishlist) {
        setWishlistCount(JSON.parse(savedWishlist).length);
      } else {
        setWishlistCount(0);
      }
    };

    updateWishlistCount();

    // Listen for storage changes
    window.addEventListener('storage', updateWishlistCount);
    
    // Custom event for same-tab updates
    window.addEventListener('wishlistUpdated', updateWishlistCount);

    return () => {
      window.removeEventListener('storage', updateWishlistCount);
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
    };
  }, []);

  // Trigger update when location changes (helps with same-tab updates)
  useEffect(() => {
    const savedWishlist = localStorage.getItem('digitalLibraryWishlist');
    if (savedWishlist) {
      setWishlistCount(JSON.parse(savedWishlist).length);
    } else {
      setWishlistCount(0);
    }
  }, [location]);

  // Handle search functionality
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <nav className="topbar">
      <div className="topbar-container">
        <div className="topbar-brand">
          <Link to="/" className="brand-link">
            <i className="bx bx-book-open"></i>
            <span>Digital Library</span>
          </Link>
        </div>
        
        {/* Search Bar - Only show on home page */}
        {location.pathname === '/' && (
          <div className="search-container">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className={`search-input-wrapper ${isSearchFocused ? 'focused' : ''}`}>
                <i className="bx bx-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search books by title, author, or theme..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="clear-search-btn"
                    title="Clear search"
                  >
                    <i className="bx bx-x"></i>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
        
        <div className="topbar-nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <i className="bx bx-home"></i>
            <span>Home</span>
          </Link>
          
          <Link 
            to="/wishlist" 
            className={`nav-link wishlist-btn ${location.pathname === '/wishlist' ? 'active' : ''}`}
          >
            <i className="bx bx-heart"></i>
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="wishlist-count">{wishlistCount}</span>
            )}
          </Link>
          
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            <i className="bx bx-info-circle"></i>
            <span>About</span>
          </Link>
          
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            <i className="bx bx-envelope"></i>
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;