import React, { useState } from 'react';
import type { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';
interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [bookData, setBookData] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBook = await addBook(bookData);
    if (newBook) {
      onSuccess();
    }
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
      <input type="text" value={bookData.isbn} onChange={handleChange} />
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

export default NewBookForm;
