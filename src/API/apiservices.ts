import { Book } from "../types/alltypes";
import Apiset from "./routes";

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await Apiset.get<Book[]>("/books");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBookById = async (id: string): Promise<Book> => {
  try {
    const response = await Apiset.get<Book>(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createBook = async (book: Book): Promise<Book> => {
  try {
    const response = await Apiset.post<Book>("/books", book);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBook = async (id: string, updates: Partial<Book>): Promise<Book> => {
  try {
    const response = await Apiset.put<Book>(`/books/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBook = async (id: string): Promise<void> => {
  try {
    await Apiset.delete(`/books/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchBooks = async (searchTerm: string): Promise<Book[]> => {
  try {
    const response = await Apiset.get<Book[]>(`/books?q=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
