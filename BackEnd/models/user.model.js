const supabase = require('../config/db_connection');

/**
 * CREA UTENTE
 */
const createUser = async (name, email, hashedPassword) => {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        name,
        email,
        password: hashedPassword,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * TROVA UTENTE PER EMAIL
 */
const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return data || null;
};

/**
 * TROVA UTENTE PER ID
 */
const findUserById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
