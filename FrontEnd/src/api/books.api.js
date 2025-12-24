import api from "./client";

export const getBooks = () =>
  api.get("/books");

export const getFinishedBooks = () =>
  api.get("/books/finished");

export const createBook = (data) =>
  api.post("/books", data);
