import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Book Directory</h1>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
