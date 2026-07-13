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

module.exports = { findByUsername, createUser, findById, getAllUsernames };
