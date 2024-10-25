const express = require('express');
const { 
  getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle, 
  getBookReviews, addReview, deleteReview 
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllBooks);                             // Task 1
router.get('/isbn/:isbn', getBookByISBN);                 // Task 2
router.get('/author/:author', getBooksByAuthor);          // Task 3
router.get('/title/:title', getBooksByTitle);             // Task 4
router.get('/:isbn/reviews', getBookReviews);             // Task 5
router.post('/:isbn/reviews', authMiddleware, addReview); // Task 8
router.delete('/:isbn/reviews', authMiddleware, deleteReview); // Task 9

module.exports = router;
