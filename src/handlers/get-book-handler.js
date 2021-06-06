const books = require('../books');
const { successResponseWithData, failedResponseWithMsg } = require('../utils/handler-response');

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let filterBooks = null;

  if (name) filterBooks = getBooksByName(books, name);

  else if (finished) filterBooks = getBookByFinished(books, finished);

  else if (reading) filterBooks = getBookByReading(books, reading);

  else filterBooks = getBooks(books);

  return successResponseWithData(h, { books: filterBooks }, 200);
};

const getBooksByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) return successResponseWithData(h, { book: books[index] }, 200);

  return failedResponseWithMsg(h, 'Buku tidak ditemukan', 404);
};

const getBooksByName = (unfilterBooks, name) => {
  const booksByName = unfilterBooks.filter((book) => {
    return book.name.toUpperCase().includes(name.toUpperCase());
  });
  return getBooks(booksByName);
};

const getBookByReading = (unfilterBooks, reading) => {
  const read = reading === '1' ? true : false;
  const booksByReading = unfilterBooks.filter((book) => book.reading === read);
  return getBooks(booksByReading);
};

const getBookByFinished = (unfilterBooks, finished) => {
  const finish = finished === '1' ? true : false;
  const booksByFinished = unfilterBooks.filter((book) => book.finished === finish);
  return getBooks(booksByFinished);
};

const getBooks = (unfilterBooks) => {
  const filterBooks = [];
  unfilterBooks.forEach((book) => {
    const { id, name, publisher } = book;
    filterBooks.push({ id, name, publisher });
  });
  return filterBooks;
};

module.exports = { getAllBooksHandler, getBooksByIdHandler };
