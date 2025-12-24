// Configurazione JWT => tutte le costanti JWT e cookie in un file
// Cosa fa: Contiene tutte le costanti per JWT e cookie
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: '1d',
  SALT_ROUNDS: 10,
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
    path: '/'
  }
};