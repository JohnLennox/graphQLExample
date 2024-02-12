import React, { useState, useEffect } from 'react';
import apiHandler from './ApiHandler';
import { useNavigate } from 'react-router-dom';


function BookDetail() {
    const [book, setBook] = useState([]);
    const navigate = useNavigate(); // Hook for navigation
    useEffect(() => {
        const fetchBooks = async () => {
            const api = apiHandler();
            try {
                const response = await api.queryBooksById();
                const items = response.data.books;
                setBook(items);
            } catch (error) {
                console.error("Error fetching books: ", error);
            }
        };
        fetchBooks();
    }, []); // Empty array means this effect runs once on mount

    return (
    <div>
    <button onClick={() =>  navigate(`/`)}> back</button>
    <div style = {{display: 'block'}}>
        <p>Book Title: {book[0]?.name}</p>
        <p>Book Length: {book[0]?.pages} pages</p>
        <p>Author: {book[0]?.author.name}</p>
    </div >
    </div>
    )

}

export default BookDetail;