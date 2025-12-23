const supabase = require('../config/db_connection');

/**
 * CREA UN NUOVO LIBRO
 */
const createBook = async (userId, title, author, totalPages, currentPage) => {
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
 * LIBRI NON FINITI - USA SOLO FILTRO JAVASCRIPT
 */
const getNotFinishedBooksByUserId = async (userId) => {
  if (!userId) {
    throw new Error('userId is required');
  }
  
  // PRENDI TUTTI I LIBRI SENZA FILTRI AGGIUNTIVI
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('user_id', userId);
  
  if (error) throw error;
  
  // FILTRA IN JAVASCRIPT
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
const updateBook = async (bookId, title, author, totalPages, currentPage) => {
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
  deleteBook,
};