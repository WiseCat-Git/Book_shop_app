const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/books.json');

const getBooks = () => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const saveBooks = (books) => {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};

module.exports = { getBooks, saveBooks };
