const supabase = require('../config/db_connection');

/**
 * CREA UN NUOVO LIBRO
 */
const createBook = async (userId, title, author, totalPages, currentPage, genre = null) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  const { data, error } = await supabase
    .from('books')
    .insert([
      {
        user_id: userId,
        title,
        author,
        total_pages: totalPages,
        current_page: currentPage,
        genre,
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
};

/**
 * LIBRI DI UN UTENTE
 */
const getBooksByUserId = async (userId) => {
  if (!userId) {
    throw new Error('userId is required');
  }
  
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
};

/**
 * LIBRI NON FINITI
 * Il client Supabase JS non supporta confronti colonna-colonna (current_page < total_pages)
 * senza una VIEW o RPC. Per un'app personale con pochi libri per utente il filtro
 * JS post-fetch è accettabile. Per scalare: creare una view `books_in_progress` in Supabase.
 */
const getNotFinishedBooksByUserId = async (userId) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  return data.filter(book => book.current_page < book.total_pages);
};

/**
 * LIBRI FINITI
 */
const getFinishedBooksByUserId = async (userId) => {
  if (!userId) {
    throw new Error('userId is required');
  }
  
  const { data, error } = await supabase
    .from('books_finished')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};

/**
 * SINGOLO LIBRO
 */
const getBookById = async (bookId) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', bookId)
    .single();
  if (error) throw error;
  return data;
};

/**
 * UPDATE COMPLETO
 */
const updateBook = async (bookId, title, author, totalPages, currentPage, genre = null) => {
  if (currentPage > totalPages) {
    throw new Error('current_page cannot exceed total_pages');
  }
  const { data, error } = await supabase
    .from('books')
    .update({
      title,
      author,
      total_pages: totalPages,
      current_page: currentPage,
      genre,
    })
    .eq('id', bookId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

/**
 * UPDATE PAGINA CORRENTE
 */
const updateCurrentPage = async (bookId, currentPage) => {
  const { data, error } = await supabase
    .from('books')
    .update({ current_page: currentPage })
    .eq('id', bookId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

/**
 * TOGGLE PREFERITO
 */
const toggleFavorite = async (bookId, isFavorite) => {
  const { data, error } = await supabase
    .from('books')
    .update({ is_favorite: isFavorite })
    .eq('id', bookId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

/**
 * LIBRI PREFERITI
 */
const getFavoriteBooks = async (userId) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('user_id', userId)
    .eq('is_favorite', true);
  if (error) throw error;
  return data;
};

/**
 * STATS UTENTE — aggrega i dati dei libri dell'utente in una sola query.
 * Calcolo client-side perché l'app è personale (pochi libri per utente).
 * Per scalare: spostare l'aggregazione in una VIEW o RPC Supabase.
 */
const getStatsByUserId = async (userId) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  const { data: books, error } = await supabase
    .from('books')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  let total_pages_read = 0;
  let total_pages = 0;
  let finished_count = 0;
  let in_progress_count = 0;
  let not_started_count = 0;
  let favorites_count = 0;
  let most_advanced = null;
  let most_advanced_ratio = -1;
  const genre_counts = {};

  for (const book of books) {
    const current = book.current_page || 0;
    const total = book.total_pages || 0;

    total_pages_read += current;
    total_pages += total;
    if (book.is_favorite) favorites_count++;

    if (total > 0 && current >= total) {
      finished_count++;
    } else if (current === 0) {
      not_started_count++;
    } else {
      in_progress_count++;
      const ratio = total > 0 ? current / total : 0;
      if (ratio > most_advanced_ratio) {
        most_advanced_ratio = ratio;
        most_advanced = {
          id: book.id,
          title: book.title,
          author: book.author,
          progress: Math.round(ratio * 100),
        };
      }
    }

    if (book.genre) {
      genre_counts[book.genre] = (genre_counts[book.genre] || 0) + 1;
    }
  }

  const favorite_genre =
    Object.entries(genre_counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  const average_progress =
    total_pages > 0 ? Math.round((total_pages_read / total_pages) * 100) : 0;

  return {
    total_books: books.length,
    finished_count,
    in_progress_count,
    not_started_count,
    favorites_count,
    total_pages_read,
    total_pages,
    average_progress,
    most_advanced_book: most_advanced,
    favorite_genre,
  };
};

/**
 * DELETE
 */
const deleteBook = async (bookId) => {
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', bookId);
  if (error) throw error;
  return true;
};

module.exports = {
  createBook,
  getBooksByUserId,
  getFinishedBooksByUserId,
  getNotFinishedBooksByUserId,
  getBookById,
  updateBook,
  updateCurrentPage,
  toggleFavorite,
  getFavoriteBooks,
  getStatsByUserId,
  deleteBook,
};