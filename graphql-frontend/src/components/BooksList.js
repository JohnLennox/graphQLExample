import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import apiHandler from './ApiHandler';
import { useNavigate } from 'react-router-dom';

function BooksList() {
    const [books, setBooks] = useState([]);

    const navigate = useNavigate(); // Hook for navigation

    const handleItemClick = (bookId) => {
        navigate(`/book?bookId=${bookId}`); // Navigate on click
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const api = apiHandler();
            try {
                const response = await api.queryBooks();
                const items = response.data.books;
                setBooks(items);
            } catch (error) {
                console.error("Error fetching books: ", error);
            }
        };
        fetchBooks();
    }, []); // Empty array means this effect runs once on mount

    return (
        <List>
            {books? books.map((book, index) => (
                <React.Fragment key={book.bookId}>
                    <ListItem button onClick={() => handleItemClick(book.bookId)}>
                        <ListItemText primary={book.name} />
                    </ListItem>
                    {index < books.length - 1 && <Divider />}
                </React.Fragment>
            )): <></>}
        </List>
    );
}

export default BooksList;
