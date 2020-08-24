import React, { useContext } from 'react';
import BookContext from '../../context/book/bookContext';

const BookItem = ({ book }) => {
  const bookContext = useContext(BookContext);
  const { deleteBook, setCurrent, clearCurrent } = bookContext;

  const {
    title,
    author,
    coverImage,
    description,
    amazonLink,
    rating,
    type,
    _id,
  } = book;

  const onDelete = () => {
    deleteBook(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left mb-1'>
        "{title}" by <span> {author}</span>
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'unread' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <div className='flex-div'>
        <img src={coverImage} alt={title} className='BookItem-img' />
      </div>
      <h4 className='mt-1'>User Rating: {rating} </h4>
      <p className='my lead'>{description.substring(0, 190)}</p>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(book)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
        <a
          className='btn btn-primary btn-sm'
          href={amazonLink}
          target='_blank'
          rel='noopener noreferrer'
        >
          Amazon
        </a>
      </p>
    </div>
  );
};

export default BookItem;
