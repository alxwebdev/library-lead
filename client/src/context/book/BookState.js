import React, { useReducer } from 'react';
import axios from 'axios';
import BookContext from './bookContext';
import bookReducer from './bookReducer';
import {
  GET_ALL_BOOKS,
  GET_BOOKS,
  ADD_BOOK,
  DELETE_BOOK,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BOOK,
  FILTER_BOOKS,
  CLEAR_BOOKS,
  CLEAR_FILTER,
  BOOK_ERROR,
} from '../types';

const BookState = props => {
  const initialState = {
    books: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(bookReducer, initialState);

  // Get All Books
  const getAllBooks = async () => {
    try {
      const res = await axios.get('/api/books/all');

      dispatch({ type: GET_ALL_BOOKS, payload: res.data });
    } catch (err) {
      dispatch({ type: BOOK_ERROR, payload: err.response.msg });
    }
  };
  // Get Books
  const getBooks = async () => {
    try {
      const res = await axios.get('/api/books');

      dispatch({ type: GET_BOOKS, payload: res.data });
    } catch (err) {
      dispatch({ type: BOOK_ERROR, payload: err.response.msg });
    }
  };

  // Add Book
  const addBook = async book => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/books', book, config);

      dispatch({ type: ADD_BOOK, payload: res.data });
    } catch (err) {
      dispatch({ type: BOOK_ERROR, payload: err.response.msg });
    }
  };

  // Delete Book
  const deleteBook = async id => {
    try {
      await axios.delete(`/api/books/${id}`);

      dispatch({ type: DELETE_BOOK, payload: id });
    } catch (err) {
      dispatch({ type: BOOK_ERROR, payload: err.response.msg });
    }
  };

  // Update Book
  const updateBook = async book => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/books/${book._id}`, book, config);

      dispatch({ type: UPDATE_BOOK, payload: res.data });
    } catch (err) {
      dispatch({ type: BOOK_ERROR, payload: err.response.msg });
    }
  };

  // Clear Books
  const clearBooks = () => {
    dispatch({ type: CLEAR_BOOKS });
  };
  // Set Current Book
  const setCurrent = book => {
    dispatch({ type: SET_CURRENT, payload: book });
  };

  // Clear Current Book
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Books
  const filterBooks = text => {
    dispatch({ type: FILTER_BOOKS, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addBook,
        deleteBook,
        setCurrent,
        clearCurrent,
        updateBook,
        filterBooks,
        clearFilter,
        getBooks,
        getAllBooks,
        clearBooks,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
