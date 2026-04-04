import { useState, useEffect } from 'react';
import type { Book } from '../types/Book';
import { fetchBooks, deleteBook } from '../api/BooksAPI';
import Pagination from '../components/Pagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [showNewBookForm, setShowNewBookForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, page, []);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [page, pageSize]);
  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1>Admin Books Page</h1>

      {showNewBookForm && (
        <NewBookForm
          onSuccess={() => {
            setShowNewBookForm(false);
            fetchBooks(pageSize, page, []).then((data) => setBooks(data.books));
          }}
          onCancel={() => setShowNewBookForm(false)}
        />
      )}

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            fetchBooks(pageSize, page, []).then((data) => setBooks(data.books));
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

      <button className="btn btn-primary btn-sm" onClick={() => setShowNewBookForm(true)}>
        Add New Book
      </button>
      <table className="table table-striped table-hover mb-0">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookID}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
              <td>{book.classification}</td>
              <td>{book.category}</td>
              <td>{book.pageCount}</td>
              <td>{book.price}</td>
              <td>
                <button className="btn btn-success btn-sm" onClick={() => setEditingBook(book)}>
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={async () => {
                    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
                      await deleteBook(book.bookID);
                      const data = await fetchBooks(pageSize, page, []);
                      setBooks(data.books);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </div>
  );
};

export default AdminBooksPage;
