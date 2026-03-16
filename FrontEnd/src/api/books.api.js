import api from "./client";

export const getBooks = () =>
  api.get("/books");

export const getFinishedBooks = () =>
  api.get("/books/finished");

export const getFavoriteBooks = () =>
  api.get("/books/favorites");

export const createBook = (data) =>
  api.post("/books", data);

export const toggleFavorite = (bookId, isFavorite) =>
  api.patch(`/books/${bookId}/favorite`, { is_favorite: isFavorite });
