import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // le mutazioni invalidano già le query giuste: questo evita solo i refetch inutili tra un tab e l'altro
      gcTime: 10 * 60 * 1000, // tiene le viste già visitate in cache per il resto della sessione
      retry: 2, // qualche tentativo in più in caso di cold start del backend
      refetchOnWindowFocus: false, // app personale mono-utente, nessuno cambia i dati da un'altra scheda
    },
    mutations: {
      retry: 0, // niente retry automatico su scritture: rischio di duplicare POST/PATCH/DELETE
    },
  },
});
