import React from 'react';
import PropTypes from 'prop-types';

const HomeBookItem = ({
  book: { title, author, coverImage, description, amazonLink, rating },
}) => {
  return (
    <div className='card2 text-center'>
      <img
        className='card-img'
        src={coverImage}
        alt={title}
        style={{ width: '60px' }}
      />
      <h3>{title}</h3>
      {/* <h3>by</h3> */}
      <h3>{author}</h3>
      <p>{description.substring(0, 150)}</p>
      <h4>User rating: {rating}</h4>
      <a
        className='btn btn-primary btn-sm btn-anm'
        href={amazonLink}
        target='_blank'
        rel='noopener noreferrer'
      >
        Amazon
      </a>

      <div></div>
    </div>
  );
};

export default HomeBookItem;
