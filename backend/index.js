let express = require('express');
let mysql2 = require('mysql2');
let cors = require('cors');
let port = 8000;

let app = express();
app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies

let db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mkce',
    port: 3306
});

db.connect((err) => {
    if (!err) {
        console.log('Database connected successfully');
    } else {
        console.log('Database connection failed: ' + err);
    }
});

// GET endpoint to fetch all books
app.get('/mkce', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err);
            return res.status(500).json({ error: err.message });
        } else {
            console.log('Query executed successfully');
        }
        console.log('Query results:', results);
        return res.json(results);
    });
});

// POST endpoint to add a new book
app.post('/mkce/add', (req, res) => {
    const { title, author, theme, year, link } = req.body;
    
    // Validate required fields
    if (!title || !author || !theme || !year) {
        return res.status(400).json({ 
            error: 'Missing required fields. Title, author, theme, and year are required.' 
        });
    }

    // Validate year is a number
    if (isNaN(year) || year < 1000 || year > 2025) {
        return res.status(400).json({ 
            error: 'Year must be a valid number between 1000 and 2025.' 
        });
    }

    // Insert query
    const insertQuery = 'INSERT INTO books (title, author, theme, year, link) VALUES (?, ?, ?, ?, ?)';
    const values = [title, author, theme, parseInt(year), link || null];

    db.query(insertQuery, values, (err, results) => {
        if (err) {
            console.error('Error inserting book: ' + err);
            return res.status(500).json({ error: 'Failed to add book: ' + err.message });
        }
        
        console.log('Book added successfully with ID:', results.insertId);
        
        // Return the newly created book
        res.status(201).json({
            message: 'Book added successfully',
            bookId: results.insertId,
            book: {
                id: results.insertId,
                title,
                author,
                theme,
                year: parseInt(year),
                link: link || null
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});