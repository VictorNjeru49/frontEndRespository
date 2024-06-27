import React, { useReducer, useEffect, useState, useCallback } from 'react';
import '../App.scss';
import { Book } from '../types/alltypes';
import BookForm from './bookform';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../API/apiservices';
import Reducer, { InitialState } from './reducers/reducer';

const BookRepository: React.FC = () => {
  const [state, dispatch] = useReducer(Reducer, InitialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks();
      dispatch({ type: 'SET_BOOKS', payload: books });
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    if (editingBook) {
      dispatch({ type: 'SET_EDITING_BOOK', payload: editingBook });
    }
  }, [editingBook]);

  const handleAddBook = async (book: Book) => {
    const newBook = await createBook(book);
    dispatch({ type: 'ADD_BOOK', payload: newBook });
  };

  const handleEditBook = async (id: string) => {
    const book = await getBookById(id);
    setEditingBook(book);
  };

  const handleUpdateBook = async (book: Book) => {
    const updatedBook = await updateBook(book.id, book);
    dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
    setEditingBook(null);
  };

  const handleDeleteBook = async (id: string) => {
    await deleteBook(id);
    dispatch({ type: 'DELETE_BOOK', payload: id });
  };


  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const filteredBooks = state.books.filter((book) =>
    book.title.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className='container'>
      <BookForm onSubmit={handleAddBook} editingBook={editingBook} onUpdate={handleUpdateBook} />
      <input className='search'
        type="text"
        placeholder="Search by title"
        value={state.searchTerm}
        onChange={(e) =>  dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book: Book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>
                <button onClick={() => handleEditBook(book.id)}>Edit</button>
                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="nextpage">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookRepository;
