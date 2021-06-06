const books = require('../books');
const { successResponseWithMsg, failedResponseWithMsg } = require('../utils/handler-response');

const deleteBooksHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return successResponseWithMsg(h, 'Buku berhasil dihapus', 200);
  }

  return failedResponseWithMsg(h, 'Buku gagal dihapus. Id tidak ditemukan', 404);
};

module.exports = deleteBooksHandler;
