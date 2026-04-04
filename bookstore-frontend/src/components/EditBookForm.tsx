import React, { useState } from 'react';
import type { Book } from '../types/Book';
import { updateBook } from '../api/BooksAPI';
interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [bookData, setBookData] = useState<Book>({ ...book });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setBookData({ ...bookData, [name]: type === 'number' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateBook(bookData.bookID, bookData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new book</h2>
      <label>Title</label>
      <input type="text" value={bookData.title} onChange={handleChange} name="title" />
      <label>Author</label>
      <input type="text" value={bookData.author} onChange={handleChange} name="author" />
      <label>Publisher</label>
      <input type="text" value={bookData.publisher} onChange={handleChange} name="publisher" />
      <label>ISBN</label>
      <input type="text" value={bookData.isbn} onChange={handleChange} name="isbn" />
      <label>Classification</label>
      <input
        type="text"
        value={bookData.classification}
        onChange={handleChange}
        name="classification"
      />
      <label>Category</label>
      <input type="text" value={bookData.category} onChange={handleChange} name="category" />
      <label>Page Count</label>
      <input type="number" value={bookData.pageCount} onChange={handleChange} name="pageCount" />
      <label>Price</label>
      <input type="number" value={bookData.price} onChange={handleChange} name="price" />
      <button type="submit">Add</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditBookForm;
