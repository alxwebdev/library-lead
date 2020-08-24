import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BookItem from './BookItem';
import Spinner from '../layout/Spinner';
import BookContext from '../../context/book/bookContext';

const Books = () => {
  const bookContext = useContext(BookContext);

  const { books, filtered, getBooks, loading } = bookContext;

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, []);

  if (books !== null && books.length === 0 && !loading) {
    return <h4>Please add a book</h4>;
  }

  return (
    <Fragment>
      {books !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(book => (
                <CSSTransition key={book._id} timeout={500} classNames='item'>
                  <BookItem book={book} />
                </CSSTransition>
              ))
            : books.map(book => (
                <CSSTransition key={book._id} timeout={500} classNames='item'>
                  <BookItem book={book} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Books;
