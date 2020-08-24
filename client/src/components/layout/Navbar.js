import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import BookContext from '../../context/book/bookContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearBooks } = bookContext;

  const onLogout = () => {
    logout();
    clearBooks();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}!</li>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/dashboard'>DashBoard</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'Library Lead',
  icon: 'fas fa-book-reader',
};

export default Navbar;
