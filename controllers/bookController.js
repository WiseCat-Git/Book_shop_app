const { getBooks, saveBooks } = require('../models/books');

// Task 1 & 10: Get all books - Using async callback function
const getAllBooks = async (req, res) => {
  try {
    const books = await new Promise((resolve, reject) => {
      const allBooks = getBooks();
      if (allBooks) resolve(allBooks);
      else reject('Error retrieving books');
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Task 2 & 11: Get book by ISBN - Using Promises
const getBookByISBN = (req, res) => {
  const books = getBooks();
  new Promise((resolve, reject) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) resolve(book);
    else reject('Book not found');
  })
    .then(book => res.json(book))
    .catch(error => res.status(404).json({ message: error }));
};

// Task 3 & 12: Get books by author - Using async/await
const getBooksByAuthor = async (req, res) => {
  try {
    const books = await new Promise((resolve) => {
      const allBooks = getBooks();
      const authorBooks = allBooks.filter(b => b.author === req.params.author);
      resolve(authorBooks);
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books by author' });
  }
};

// Task 4 & 13: Get books by title - Using async/await
const getBooksByTitle = async (req, res) => {
  try {
    const books = await new Promise((resolve) => {
      const allBooks = getBooks();
      const titleBooks = allBooks.filter(b => b.title === req.params.title);
      resolve(titleBooks);
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books by title' });
  }
};

// Task 5: Get book reviews
const getBookReviews = (req, res) => {
  const books = getBooks();
  const book = books.find(b => b.isbn === req.params.isbn);
  book ? res.json(book.reviews) : res.status(404).json({ message: 'Book not found' });
};

// Task 8: Add/Modify book review
const addReview = (req, res) => {
  console.log("Add review endpoint hit");
  const books = getBooks();
  const book = books.find(b => b.isbn === req.params.isbn);

  if (book) {
    const { review } = req.body;
    const user = req.user?.username;

    if (!review) {
      return res.status(400).json({ message: 'Review text is required' });
    }

    const existingReview = book.reviews.find(r => r.user === user);
    if (existingReview) {
      existingReview.text = review;
      console.log("Review modified for user:", user);
    } else {
      book.reviews.push({ user, text: review });
      console.log("New review added for user:", user);
    }

    saveBooks(books);
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

// Task 9: Delete book review
const deleteReview = (req, res) => {
  const books = getBooks();
  const book = books.find(b => b.isbn === req.params.isbn);

  if (book) {
    const user = req.user?.username;
    book.reviews = book.reviews.filter(r => r.user !== user);
    saveBooks(books);
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};
  module.exports = {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBookReviews,
    addReview,
    deleteReview
  };
  
