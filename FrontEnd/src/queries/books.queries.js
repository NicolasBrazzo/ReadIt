import { useQuery } from "@tanstack/react-query";
import api from "../api/client";
import { useAuth } from "../context/AuthProvider";

// Scoped per userId: dopo un logout/login con un altro account non deve
// restare in cache per qualche istante la lista libri dell'utente precedente.
export const bookKeys = {
  all: (userId) => ["books", userId],
  lists: (userId) => [...bookKeys.all(userId), "list"],
  list: (userId, view) => [...bookKeys.lists(userId), view],
  stats: (userId) => [...bookKeys.all(userId), "stats"],
};

const LIST_ENDPOINTS = {
  all: "/books",
  finished: "/books/finished",
  in_progress: "/books/in_progress",
};

// view: "all" | "finished" | "in_progress"
export function useBooksListQuery(view, { enabled = true } = {}) {
  const { user, loading: authLoading } = useAuth();

  return useQuery({
    queryKey: bookKeys.list(user?.id, view),
    queryFn: () => api.get(LIST_ENDPOINTS[view]).then((res) => res.data.books),
    enabled: !!user && !authLoading && enabled,
  });
}

export function useBookStatsQuery({ enabled = true } = {}) {
  const { user, loading: authLoading } = useAuth();

  return useQuery({
    queryKey: bookKeys.stats(user?.id),
    queryFn: () => api.get("/books/stats").then((res) => res.data.stats),
    enabled: !!user && !authLoading && enabled,
  });
}
