import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Use environment variable with fallback
const API_URL = process.env.REACT_APP_API_URL || 'https://book-directory-backend-3h6l.onrender.com';

function AddBook() {
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: '',
        author: '',
        category: '',
        publishedYear: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
        setError(''); // Clear error when user makes changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('Sending request to:', `${API_URL}/api/books`);
            console.log('Book data:', book);

            const response = await axios.post(`${API_URL}/api/books`, book);
            console.log('Response:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error adding book:', error);
            
            // Handle different types of errors
            if (error.response) {
                // Server responded with an error
                const errorMessage = error.response.data.message || error.response.data.error;
                if (error.response.data.details) {
                    // Handle validation errors
                    const details = Object.values(error.response.data.details)
                        .filter(detail => detail)
                        .join(', ');
                    setError(details);
                } else {
                    setError(errorMessage || 'Failed to add book. Please check your input.');
                }
            } else if (error.request) {
                // Request was made but no response received
                setError('Unable to connect to the server. Please try again later.');
            } else {
                // Something else went wrong
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-book">
            <h2>Add New Book</h2>
            {error && (
                <div className="error-message" style={{ 
                    color: 'red', 
                    backgroundColor: '#fee', 
                    padding: '10px', 
                    borderRadius: '4px',
                    marginBottom: '1rem' 
                }}>
                    {error}
                </div>
            )}
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
                        min="1000"
                        max={new Date().getFullYear()}
                        required
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding Book...' : 'Add Book'}
                    </button>
                    <button type="button" onClick={() => navigate('/')} disabled={loading}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddBook;