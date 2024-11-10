import { getDatabase } from '../database.js';

export function createReview({ title, description, author, genre, image, userId }) {
  const db = getDatabase();
  const stmt = db.prepare(
    'INSERT INTO reviews (title, description, author, genre, image, user_id) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const info = stmt.run(title, description, author, genre, image, userId);
  return {
    id: info.lastInsertRowid,
    title,
    description,
    author,
    genre,
    image,
    userId,
  };
}

export function editReview(id, { title, description, author, genre, image }) {
  const db = getDatabase();
  const stmt = db.prepare(
    'UPDATE reviews SET title = ?, description = ?, author = ?, genre = ?, image = ? WHERE id = ?'
  );
  const info = stmt.run(title, description, author, genre, image, id);
  return info.changes > 0 ? { id, title, description, author, genre, image } : null;
}

export function deleteReview(id) {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM reviews WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}

export function getAllReviews() {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM reviews');
  return stmt.all();
}

export function getReviewById(id) {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM reviews WHERE id = ?');
  return stmt.get(id);
}

export function registerUserForReview(reviewId, userId) {
  const db = getDatabase();
  const stmt = db.prepare(
    'INSERT INTO registrations (review_id, user_id) VALUES (?, ?)'
  );
  const info = stmt.run(reviewId, userId);
  return info.changes > 0;
}

export function unregisterUserFromReview(reviewId, userId) {
  const db = getDatabase();
  const stmt = db.prepare(
    'DELETE FROM registrations WHERE review_id = ? AND user_id = ?'
  );
  const info = stmt.run(reviewId, userId);
  return info.changes > 0;
}
