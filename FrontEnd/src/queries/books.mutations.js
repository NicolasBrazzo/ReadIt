import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/client";
import { useAuth } from "../context/AuthProvider";
import { handleMutationError } from "../utils/toast";
import { bookKeys } from "./books.queries";

// POST /books
export function useCreateBook() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookData) =>
      api.post("/books", bookData).then((res) => res.data.book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.all(user?.id) });
    },
    onError: (err) => handleMutationError(err, "Failed to create book"),
  });
}

// PUT /books/:id
export function useUpdateBook() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, bookData }) =>
      api.put(`/books/${bookId}`, bookData).then((res) => res.data.book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.all(user?.id) });
    },
    onError: (err) => handleMutationError(err, "Failed to update book"),
  });
}

// PATCH /books/:id/progress
export function useUpdateBookProgress() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, currentPage }) =>
      api
        .patch(`/books/${bookId}/progress`, { currentPage })
        .then((res) => res.data.book),
    onSuccess: () => {
      // finire un libro lo sposta tra viste (in_progress/finished/all) e cambia le stats
      queryClient.invalidateQueries({ queryKey: bookKeys.all(user?.id) });
    },
    onError: (err) => handleMutationError(err, "Failed to update progress"),
  });
}

// PATCH /books/:id/favorite
export function useToggleBookFavorite() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, isFavorite }) =>
      api
        .patch(`/books/${bookId}/favorite`, { is_favorite: isFavorite })
        .then((res) => res.data.book),
    onSuccess: (_data, { bookId, isFavorite }) => {
      // patcha TUTTE le liste in cache (all/finished/in_progress), non solo quella attiva,
      // altrimenti tornando su un tab già cachato si vedrebbe un is_favorite non aggiornato
      queryClient.setQueriesData(
        { queryKey: bookKeys.lists(user?.id) },
        (old) =>
          old?.map((b) =>
            b.id === bookId ? { ...b, is_favorite: isFavorite } : b
          ) ?? old
      );
      queryClient.invalidateQueries({ queryKey: bookKeys.stats(user?.id) });
    },
    onError: (err) => handleMutationError(err, "Failed to update favorite"),
  });
}

// DELETE /books/:id
export function useDeleteBook() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId) => api.delete(`/books/${bookId}`).then(() => bookId),
    onSuccess: (bookId) => {
      queryClient.setQueriesData(
        { queryKey: bookKeys.lists(user?.id) },
        (old) => old?.filter((b) => b.id !== bookId) ?? old
      );
      queryClient.invalidateQueries({ queryKey: bookKeys.stats(user?.id) });
    },
    onError: (err) => handleMutationError(err, "Failed to delete book"),
  });
}
