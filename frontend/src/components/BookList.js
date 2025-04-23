import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Use environment variable with fallback
const API_URL = process.env.REACT_APP_API_URL || 'https://book-directory-backend-3h6l.onrender.com';

function BookList() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            console.log('Fetching books from:', `${API_URL}/api/books`);
            const response = await axios.get(`${API_URL}/api/books`);
            setBooks(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Error loading books. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await axios.delete(`${API_URL}/api/books/${id}`);
                setBooks(books.filter(book => book._id !== id));
                setError('');
            } catch (error) {
                console.error('Error deleting book:', error);
                setError('Error deleting book. Please try again.');
            }
        }
    };

    if (loading) {
        return <div>Loading books...</div>;
    }

    return (
        <div className="book-list">
            <div className="book-list-header">
                <h2>Books List</h2>
                <Link to="/add" className="add-button">Add New Book</Link>
            </div>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            {books.length === 0 ? (
                <p>No books found. Add some books to get started!</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Published Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>{book.publishedYear}</td>
                                <td>
                                    <Link to={`/edit/${book._id}`} className="edit-button">Edit</Link>
                                    <button 
                                        onClick={() => handleDelete(book._id)} 
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default BookList;