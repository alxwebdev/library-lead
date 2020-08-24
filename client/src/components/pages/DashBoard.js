import React, { useContext, useEffect } from 'react';
import Books from '../Books/Books';
import BookForm from '../Books/BookForm';
import BookFilter from '../Books/BookFilter';
import AuthContext from '../../context/auth/authContext';

const DashBoard = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <BookForm />
      </div>
      <div>
        <BookFilter />
        <Books />
      </div>
    </div>
  );
};

export default DashBoard;
