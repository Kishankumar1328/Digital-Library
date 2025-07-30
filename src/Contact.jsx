import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="contact-container">
        <div className="success-message">
          <div className="success-icon"><i className='bx bx-check-circle'></i></div>
          <h2>Message Sent Successfully!</h2>
          <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
          <button
            className="back-btn"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Get in touch with any questions, suggestions, or feedback.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Get In Touch</h2>

          <div className="info-item">
            <div className="info-icon"><i className='bx bx-envelope'></i></div>
            <div className="info-details">
              <h3>Email Us</h3>
              <p><a href="mailto:support@digitallibrary.com">support@digitallibrary.com</a></p>
              <p><a href="mailto:suggestions@digitallibrary.com">suggestions@digitallibrary.com</a></p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><i className='bx bx-phone'></i></div>
            <div className="info-details">
              <h3>Call Us</h3>
              <p><a href="tel:+911234567890">+91 12345 67890</a></p>
              <p>Monday to Friday, 9:00 AM – 6:00 PM IST</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><i className='bx bx-map'></i></div>
            <div className="info-details">
              <h3>Visit Us</h3>
              <p>Digital Library Headquarters</p>
              <p>123 Knowledge Street, Tech Park</p>
              <p>Coimbatore, Tamil Nadu 641001</p>
              <p>India</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><i className='bx bx-time-five'></i></div>
            <div className="info-details">
              <h3>Response Time</h3>
              <p>Email: Within 24 hours</p>
              <p>Phone: Immediate during business hours</p>
              <p>Book requests: 2-3 business days</p>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="book-request">Book Request</option>
                <option value="technical-support">Technical Support</option>
                <option value="bug-report">Bug Report</option>
                <option value="suggestion">Suggestion</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How do I download books?</h3>
            <p>Simply browse our collection, click on the book you want, and hit the download button. No registration required!</p>
          </div>
          <div className="faq-item">
            <h3>Are the books free?</h3>
            <p>Yes! Our digital library provides free access to all books in our collection.</p>
          </div>
          <div className="faq-item">
            <h3>Can I request specific books?</h3>
            <p>Absolutely! Send us your book requests via email at suggestions@digitallibrary.com</p>
          </div>
          <div className="faq-item">
            <h3>What file formats are available?</h3>
            <p>Currently, we provide books in PDF format for the best reading experience across all devices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
