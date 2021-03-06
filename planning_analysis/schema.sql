CREATE DATABASE decisio;
\c decisio
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
);
CREATE TABLE polls (
  id SERIAL PRIMARY KEY,
);
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  poll_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  guest_name VARCHAR(255),
  rank JSON
);