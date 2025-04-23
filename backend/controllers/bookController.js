const Book = require('../models/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new book
exports.createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single book
exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};