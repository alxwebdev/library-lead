import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeBookItem from './HomeBookItem';
import Spinner from '../layout/Spinner';

import BookContext from '../../context/book/bookContext';

const HomeBooks = () => {
  const bookContext = useContext(BookContext);

  const { books, getAllBooks, loading } = bookContext;

  useEffect(() => {
    getAllBooks();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div className='header-home-books'>
          <h1>View &amp; Discover People's Favourite Books 👍</h1>
          <h2>What books would you recommend?</h2>
          <h3>
            ➡️ Login with these testing-account-credentials: ✉️ laura@mail.com
            🔑 success
          </h3>
          <Link className='btn btn-success mt-1 btn-anm' to='/login'>
            Login!
          </Link>
        </div>

        <div className='grid-3'>
          {books !== null &&
            !loading &&
            books.map(book => <HomeBookItem key={book.title} book={book} />)}
        </div>
      </Fragment>
    );
  }
};

export default HomeBooks;
