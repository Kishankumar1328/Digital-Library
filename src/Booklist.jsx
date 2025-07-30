// src/components/BookList.jsx
import React, { useEffect, useState } from 'react';
import './Booklist.css';


function BookList({ searchQuery = '' }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    theme: '',
    year: '',
    link: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchBooks();
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const savedWishlist = localStorage.getItem('digitalLibraryWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  };

  const fetchBooks = () => {
    fetch('http://localhost:8000/mkce')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch(err => console.error('Error fetching books:', err));
  };

  // Filter books based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.theme.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, books]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newBook.title || !newBook.author || !newBook.theme || !newBook.year) {
      alert('Please fill in all required fields (Title, Author, Theme, Year)');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/mkce/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        // Reset form and hide it
        setNewBook({
          title: '',
          author: '',
          theme: '',
          year: '',
          link: ''
        });
        setShowAddForm(false);
        
        // Refresh the books list
        fetchBooks();
        
        alert('Book added successfully!');
      } else {
        const errorData = await response.json();
        alert('Error adding book: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setNewBook({
      title: '',
      author: '',
      theme: '',
      year: '',
      link: ''
    });
    setShowAddForm(false);
  };

  // Wishlist functions
  const isInWishlist = (bookId) => {
    return wishlist.some(item => item.id === bookId);
  };

  const toggleWishlist = (book) => {
    let updatedWishlist;
    
    if (isInWishlist(book.id)) {
      // Remove from wishlist
      updatedWishlist = wishlist.filter(item => item.id !== book.id);
    } else {
      // Add to wishlist
      updatedWishlist = [...wishlist, {
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.theme, // Map theme to genre for wishlist
        download_link: book.link,
        download_count: book.download_count || 0
      }];
    }
    
    setWishlist(updatedWishlist);
    localStorage.setItem('digitalLibraryWishlist', JSON.stringify(updatedWishlist));
    
    // Dispatch custom event to update wishlist count in topbar
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div className="booklist-wrapper">
      <div className="top-right">
        <button 
          className="add-btn" 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add Book'}
        </button>
      </div>

      {/* Add Book Form */}
      {showAddForm && (
        <div className="add-book-form">
          <h3>Add New Book</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
                required
                placeholder="Enter book title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={newBook.author}
                onChange={handleInputChange}
                required
                placeholder="Enter author name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="theme">Theme *</label>
              <input
                type="text"
                id="theme"
                name="theme"
                value={newBook.theme}
                onChange={handleInputChange}
                required
                placeholder="Enter book theme/genre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year *</label>
              <input
                type="number"
                id="year"
                name="year"
                value={newBook.year}
                onChange={handleInputChange}
                required
                placeholder="Enter publication year"
                min="1000"
                max="2025"
              />
            </div>

            <div className="form-group">
              <label htmlFor="link">Download Link (Optional)</label>
              <input
                type="url"
                id="link"
                name="link"
                value={newBook.link}
                onChange={handleInputChange}
                placeholder="Enter download link (optional)"
              />
            </div>

            <div className="form-buttons">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Book'}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="body">
        {searchQuery && (
          <div className="search-results-info">
            <p>
              {filteredBooks.length > 0 
                ? `Found ${filteredBooks.length} book${filteredBooks.length !== 1 ? 's' : ''} matching "${searchQuery}"`
                : `No books found matching "${searchQuery}"`
              }
            </p>
          </div>
        )}
        
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, idx) => (
            <div className="cart" key={idx}>
              {/* Wishlist icon */}
              <div className="wishlist-icon-container">
                <button
                  className={`wishlist-icon ${isInWishlist(book.id) ? 'in-wishlist' : ''}`}
                  onClick={() => toggleWishlist(book)}
                  title={isInWishlist(book.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <i className={`bx ${isInWishlist(book.id) ? 'bxs-heart' : 'bx-heart'}`}></i>
                </button>
              </div>

              <h2>{book.title}</h2>
              <h3>by {book.author}</h3>
              <p><strong>Theme:</strong> {book.theme}</p>
              <p><strong>Year:</strong> {book.year}</p>
              {book.link ? (
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  <button className="download-btn">Download</button>
                </a>
              ) : (
                <p style={{ color: 'red' }}>No download link available</p>
              )}
            </div>
          ))
        ) : (
          !searchQuery ? (
            <div className="no-results">
              <p>No books available</p>
            </div>
          ) : (
            <div className="no-results">
              <p>No books found matching your search</p>
              <p className="search-suggestion">Try searching with different keywords</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default BookList;
