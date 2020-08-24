const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Book = require('../models/Book');

// @route     GET api/books/all
// @desc      Get all users books
// @access    Public
router.get('/all', async (req, res) => {
  try {
    const books = await Book.find({}).sort({ date: -1 });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route     GET api/books
// @desc      Get all users books
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id }).sort({ date: -1 });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/books
// @desc      Add new book
// @access    Private
router.post(
  '/',
  [auth, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      author,
      coverImage,
      description,
      amazonLink,
      rating,
      type,
    } = req.body;

    try {
      const newBook = new Book({
        title,
        author,
        coverImage,
        description,
        amazonLink,
        rating,
        type,
        user: req.user.id,
      });

      const book = await newBook.save();
      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/books/:id
// @desc      Update book
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {
    title,
    author,
    coverImage,
    description,
    amazonLink,
    rating,
    type,
  } = req.body;

  // Build book object
  const bookFields = {};
  if (title) bookFields.title = title;
  if (author) bookFields.author = author;
  if (coverImage) bookFields.coverImage = coverImage;
  if (description) bookFields.description = description;
  if (amazonLink) bookFields.amazonLink = amazonLink;
  if (rating) bookFields.rating = rating;
  if (type) bookFields.type = type;

  try {
    let book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ msg: 'Book not found' });

    // Make sure user owns book
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: bookFields },
      { new: true }
    );

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/books/:id
// @desc      Delete book
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ msg: 'Book not found' });

    // Make sure user owns book
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    book = await Book.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
