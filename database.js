import Database from 'better-sqlite3';

let db = null;

export function initializeDatabase() {
  if (db) {
    return db;
  }

  db = new Database('./database.sqlite', { verbose: console.log });

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      email TEXT UNIQUE,
      password TEXT
    );
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      author TEXT,
      genre TEXT,
      image TEXT,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY,
      event_id INTEGER,
      user_id INTEGER,
      FOREIGN KEY (review_id) REFERENCES reviews(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  return db;
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}

