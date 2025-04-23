import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://book-directory-backend-3h6l.onrender.com';

function EditBook() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState({
        title: '',
        author: '',
        category: '',
        publishedYear: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                console.log('Fetching book details from:', `${API_URL}/api/books/${id}`);
                const response = await axios.get(`${API_URL}/api/books/${id}`);
                setBook(response.data);
                setError('');
            } catch (error) {
                console.error('Error fetching book:', error);
                setError('Error loading book details. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            console.log('Updating book at:', `${API_URL}/api/books/${id}`);
            await axios.put(`${API_URL}/api/books/${id}`, book);
            navigate('/');
        } catch (error) {
            console.error('Error updating book:', error);
            setError(error.response?.data?.message || 'Error updating book. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading book details...</div>;
    }

    return (
        <div className="edit-book">
            <h2>Edit Book</h2>
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
                    <button type="submit">Update Book</button>
                    <button type="button" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditBook;