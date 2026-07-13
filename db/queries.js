const pool = require('../db/pool');

async function findByUsername(username) {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ]);
  const user = result.rows[0]; // undefined if no match
  return user;
}

async function createUser({
  first_name,
  last_name,
  username,
  hash,
  salt,
  ismember,
  isadmin,
}) {
  const result = await pool.query(
    'INSERT INTO users (first_name, last_name, username, hash, salt, ismember, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [first_name, last_name, username, hash, salt, ismember, isadmin],
  );
  const newUser = result.rows[0];
  return newUser;
}

async function findById(id) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  const user = result.rows[0];
  return user;
}

async function getAllUsernames() {
  const results = await pool.query('SELECT username FROM users');
  return results;
}

async function createMessage({ title, body, author_id }) {
  const result = await pool.query(
    // created_at is omitted on purpose: the column defaults to now()
    `INSERT INTO messages (title, body, author_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, body, author_id],
  );
  return result.rows[0];
}

async function getAllMessages() {
  const results = await pool.query(
    'SELECT messages.*, users.username FROM messages JOIN users ON users.id = messages.author_id ORDER BY created_at DESC;',
  );
  return results.rows;
}

module.exports = {
  findByUsername,
  createUser,
  findById,
  getAllUsernames,
  createMessage,
  getAllMessages,
};
