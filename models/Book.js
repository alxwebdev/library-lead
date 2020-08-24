const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amazonLink: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: 'unread',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('book', BookSchema);
