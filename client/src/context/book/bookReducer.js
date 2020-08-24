import {
  ADD_BOOK,
  DELETE_BOOK,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BOOK,
  FILTER_BOOKS,
  CLEAR_FILTER,
  BOOK_ERROR,
  GET_BOOKS,
  GET_ALL_BOOKS,
  CLEAR_BOOKS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [action.payload, ...state.books],
        loading: false,
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(book =>
          book._id === action.payload._id ? action.payload : book
        ),
        loading: false,
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book._id !== action.payload),
        loading: false,
      };
    case CLEAR_BOOKS:
      return {
        ...state,
        books: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_BOOKS:
      return {
        ...state,
        filtered: state.books.filter(book => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return book.title.match(regex) || book.author.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case BOOK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
