import React, { useState, useContext, useEffect } from 'react';
import BookContext from '../../context/book/bookContext';

const BookForm = () => {
  const bookContext = useContext(BookContext);
  const { addBook, updateBook, clearCurrent, current } = bookContext;

  useEffect(() => {
    if (current !== null) {
      setBook(current);
    } else {
      setBook({
        title: '',
        author: '',
        coverImage: '',
        description: '',
        amazonLink: '',
        rating: 0,
        type: 'unread',
      });
    }
  }, [bookContext, current]);

  const [book, setBook] = useState({
    title: '',
    author: '',
    coverImage: '',
    description: '',
    amazonLink: '',
    rating: 0,
    type: 'unread',
  });

  const {
    title,
    author,
    coverImage,
    description,
    amazonLink,
    rating,
    type,
  } = book;

  const onChange = e => setBook({ ...book, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addBook(book);
    } else {
      updateBook(book);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit} className='position-sticky'>
      <h2 className='text-primary'>{current ? 'Edit Book' : 'Add Book'}</h2>
      <input
        type='text'
        placeholder='Title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Author'
        name='author'
        value={author}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Cover image link'
        name='coverImage'
        value={coverImage}
        onChange={onChange}
      />
      <textarea
        placeholder='Your description, 200 characters limit...'
        name='description'
        value={description}
        rows={5}
        cols={5}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Amazon link'
        name='amazonLink'
        value={amazonLink}
        onChange={onChange}
      />
      <h5>Your Rating from 0 to 5:</h5>
      <input
        type='number'
        name='rating'
        value={rating}
        min={0}
        max={5}
        onChange={onChange}
      />
      <h5>Mark Book as Unread or Read:</h5>
      <input
        type='radio'
        name='type'
        value='unread'
        checked={type === 'unread'}
        onChange={onChange}
      />{' '}
      Unread{' '}
      <input
        type='radio'
        name='type'
        value='read'
        checked={type === 'read'}
        onChange={onChange}
      />{' '}
      Read
      <div>
        <input
          type='submit'
          value={current ? 'Update Book' : 'Add Book'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default BookForm;
