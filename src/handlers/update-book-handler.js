const books = require('../books');
const { failedResponseWithMsg, successResponseWithMsg } = require('../utils/handler-response');

const updateBooksHandler = (request, h) => {
  const { bookId } = request.params;
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

  if (!name) return failedResponseWithMsg(h, 'Gagal memperbarui buku. Mohon isi nama buku', 400);

  if (isNaN(year)) return failedResponseWithMsg(h, 'Gagal memperbarui buku. year harus bertipe number', 400);

  if (isNaN(pageCount)) return failedResponseWithMsg(h, 'Gagal memperbarui buku. pageCount harus bertipe number', 400);

  if (isNaN(readPage)) return failedResponseWithMsg(h, 'Gagal memperbarui buku. readPage harus bertipe number', 400);

  if (readPage > pageCount) return failedResponseWithMsg(h, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', 400);

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    return successResponseWithMsg(h, 'Buku berhasil diperbarui', 200);
  }

  return failedResponseWithMsg(h, 'Gagal memperbarui catatan. Id tidak ditemukan', 404);
};

module.exports = updateBooksHandler;
