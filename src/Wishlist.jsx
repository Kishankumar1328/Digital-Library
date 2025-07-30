import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const BookIcon = () => (
  <span className="book-icon" style={{ fontSize: '40px', color: '#2563eb', marginBottom: '8px' }}>
    <i className="bx bxs-book"></i>
  </span>
);

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // API base URL
  const API_BASE_URL = 'http://localhost:8000/api';

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('digitalLibraryWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    setLoading(false);
  }, []);

  // Remove from wishlist
  const removeFromWishlist = (bookId) => {
    const updatedWishlist = wishlist.filter(book => book.id !== bookId);
    setWishlist(updatedWishlist);
    localStorage.setItem('digitalLibraryWishlist', JSON.stringify(updatedWishlist));
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('digitalLibraryWishlist');
  };

  // Handle download and update count
  const handleDownload = async (bookId, downloadLink) => {
    try {
      // Update download count in database
      await fetch(`${API_BASE_URL}/books/${bookId}/download`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Open download link
      if (downloadLink) {
        window.open(downloadLink, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      console.error('Error updating download count:', err);
      // Still open the download link even if count update fails
      if (downloadLink) {
        window.open(downloadLink, '_blank', 'noopener,noreferrer');
      }
    }
  };

  if (loading) {
    return (
      <div className="wishlist-container">
        <div className="loading">
          <i className="bx bx-loader-alt"></i>
          <p>Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>
          <i className="bx bxs-heart"></i>
          My Wishlist
        </h1>
        <p>Books you've saved for later</p>
        {wishlist.length > 0 && (
          <div className="wishlist-actions">
            <span className="wishlist-count-text">
              {wishlist.length} book{wishlist.length !== 1 ? 's' : ''} in your wishlist
            </span>
            <button 
              className="clear-wishlist-btn"
              onClick={clearWishlist}
            >
              <i className="bx bx-trash"></i>
              Clear All
            </button>
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">
            <i className="bx bx-heart"></i>
          </div>
          <h2>Your wishlist is empty</h2>
          <p>Start adding books to your wishlist by clicking the heart icon on any book.</p>
          <Link to="/" className="browse-books-btn">
            <i className="bx bx-book-open"></i>
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((book) => (
            <div className="wishlist-card" key={book.id}>
              <div className="remove-btn-container">
                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(book.id)}
                  title="Remove from wishlist"
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>

              <BookIcon />
              
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                
                {book.genre && (
                  <p className="book-genre">
                    <i className="bx bx-tag"></i>
                    {book.genre}
                  </p>
                )}
                
                {book.file_size && (
                  <p className="book-size">
                    <i className="bx bx-file"></i>
                    {book.file_size}
                  </p>
                )}
                
                {book.download_count > 0 && (
                  <p className="book-downloads">
                    <i className="bx bx-download"></i>
                    {book.download_count} downloads
                  </p>
                )}

                {book.description && (
                  <p className="book-description">
                    {book.description.length > 120 
                      ? `${book.description.substring(0, 120)}...` 
                      : book.description
                    }
                  </p>
                )}
              </div>

              <div className="book-actions">
                {book.download_link ? (
                  <button 
                    className="download-btn"
                    onClick={() => handleDownload(book.id, book.download_link)}
                  >
                    <i className="bx bx-download"></i>
                    Download
                  </button>
                ) : (
                  <button className="download-btn disabled" disabled>
                    <i className="bx bx-x-circle"></i>
                    Not Available
                  </button>
                )}
                
                <button
                  className="remove-from-wishlist-btn"
                  onClick={() => removeFromWishlist(book.id)}
                >
                  <i className="bx bx-heart-circle"></i>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;