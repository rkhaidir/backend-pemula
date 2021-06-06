const { nanoid } = require('nanoid');
const books = require('../books');
const { failedResponseWithMsg, successResponseWithMsgAndData } = require('../utils/handler-response');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) return failedResponseWithMsg(h, 'Gagal menambahkan buku. Mohon isi nama buku', 400);

  if (isNaN(year)) return failedResponseWithMsg(h, 'Gagal menambahkan buku. year harus bertipe number', 400);

  if (isNaN(pageCount)) return failedResponseWithMsg(h, 'Gagal menambahkan buku. pageCount harus bertipe number', 400);

  if (isNaN(readPage)) return failedResponseWithMsg(h, 'Gagal menambahkan buku. readPage harus bertipe number', 400);

  if (readPage > pageCount) return failedResponseWithMsg(h, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', 400);

  const id = nanoid(15);
  const currentDate = new Date().toISOString();

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readPage === pageCount,
    reading,
    insertedAt: currentDate,
    updatedAt: currentDate,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) return successResponseWithMsgAndData(h, 'Buku berhasil ditambahkan', { bookId: id }, 201);

  const response = h.response({
    status: 'error',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

module.exports = addBookHandler;
