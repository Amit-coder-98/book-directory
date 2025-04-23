import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Use environment variable with fallback
const API_URL = process.env.REACT_APP_API_URL || 'https://book-directory-backend.onrender.com';

function AddBook() {
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: '',
        author: '',
        category: '',
        publishedYear: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            console.log('Sending request to:', `${API_URL}/api/books`);
            const response = await axios.post(`${API_URL}/api/books`, book);
            console.log('Response:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error adding book:', error);
            setError(error.response?.data?.message || 'Error adding book. Please try again.');
        }
    };

    return (
        <div className="add-book">
            <h2>Add New Book</h2>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={book.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Published Year:</label>
                    <input
                        type="number"
                        name="publishedYear"
                        value={book.publishedYear}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit">Add Book</button>
                    <button type="button" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddBook;