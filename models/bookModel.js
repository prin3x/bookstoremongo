const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    unique: true
  },
  image_url: {
    type: String,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'price is required']
  },
  createdAt: {
      type: Date,
      default: Date.now()
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
