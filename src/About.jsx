import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Our Digital Library</h1>

      <section className="intro-section">
        <p>
          Welcome to our Digital Library! Your gateway to a vast collection of digital books and resources. Our platform provides instant access to thousands of books that you can download and read directly from our site. Whether you're a student researching for assignments, a professional expanding your knowledge, or simply a book lover, our digital library offers an extensive collection at your fingertips.
        </p>
      </section>

      <section className="features-section">
        <h2>What We Offer</h2>
        <ul className="about-features">
          <li>Instant access to thousands of digital books across various genres</li>
          <li>Quick and easy book downloads in PDF format</li>
          <li>Advanced search functionality to find books by title, author, or genre</li>
          <li>Curated collection of academic, professional, and recreational reading</li>
          <li>Mobile-friendly interface for reading on any device</li>
          <li>Regularly updated library with new titles and editions</li>
          <li>Fast download speeds and reliable file hosting</li>
        </ul>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to democratize access to knowledge by providing a free, comprehensive digital library platform. We believe that everyone should have access to quality books and educational resources, regardless of their location or financial situation. We're committed to building a community of readers and learners while respecting intellectual property rights and supporting authors and publishers.
        </p>
      </section>

      <section className="technology-section">
        <h2>How It Works</h2>
        <p>
          Simply browse our collection using the search bar or by browsing categories. Click on any book that interests you and hit the download button to get instant access to the PDF file. All our books are hosted on reliable servers ensuring fast downloads and 24/7 availability. No registration required - just find, click, and download!
        </p>
      </section>

      <section className="contact-section">
        <h2>Get In Touch</h2>
        <p>
          Have questions about our digital library? Need help finding a specific book? Want to suggest new titles for our collection? We'd love to hear from you!
        </p>
        <ul className="about-contact">
          <li>
            <strong>Email:</strong> 
            <a href="mailto:support@digitallibrary.com">support@digitallibrary.com</a>
          </li>
          <li>
            <strong>Phone:</strong> 
            <a href="tel:+911234567890">+91 12345 67890</a>
          </li>
          <li>
            <strong>Support Hours:</strong> Monday to Friday, 9:00 AM – 6:00 PM IST
          </li>
          <li>
            <strong>Location:</strong> Coimbatore, Tamil Nadu, India
          </li>
          <li>
            <strong>Book Suggestions:</strong> <a href="mailto:suggestions@digitallibrary.com">suggestions@digitallibrary.com</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;