import {
    createReview,
    editReview,
    deleteReview,
    getAllReviews,
    getReviewById,
    registerUserForReview,
    unregisterUserFromReview,
  } from '../models/review.js';
  
  export function create(req, res) {
    const { title, description, author, genre } = req.body;
    const image = req.file;
  
    // Validation
    if (
      !title ||
      !title.trim() ||
      !description ||
      !description.trim() ||
      !author ||
      !author.trim() ||
      !genre ||
      !image
    ) {
      return res.status(400).json({ message: 'Invalid input data' });
    }
  
    const review = createReview({
      title: title.trim(),
      description: description.trim(),
      author: author.trim(),
      genre:genre.trim(),
      image: image.filename,
      userId: req.user.id,
    });
    res.status(201).json(review);
    console.log(review)
  }
  
  export function edit(req, res) {
    const { id } = req.params;
    const { title, description, author, genre } = req.body;
    const image = req.file;
  
    // Validation
    if (
      !title ||
      !title.trim() ||
      !description ||
      !description.trim() ||
      !author ||
      !author.trim() ||
      !genre ||
      !image
    ) {
      return res.status(400).json({ message: 'Invalid input data' });
    }
  
    const review = getReviewById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
  
    if (review.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'Forbidden: You are not allowed to edit this review' });
    }
  
    const updatedReview = editReview(id, {
      title: title.trim(),
      description: description.trim(),
      address: address.trim(),
      genre,
      image: image.filename,
    });
  
    res.status(200).json(updatedReview);
  }
  
  export function deleteItem(req, res) {
    const { id } = req.params;
  
    const review = getReviewById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
  
    if (review.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'Forbidden: You are not allowed to delete this review' });
    }
  
    const success = deleteReview(id);
    if (success) {
      res.status(200).json({ message: 'Review deleted successfully' });
    } else {
      res.status(500).json({ message: 'Review not deleted' });
    }
  }
  
  export function getAll(req, res) {
    const reviews = getAllReviews();
    res.status(200).json(reviews);
  }
  
  export function getSingle(req, res) {
    const { id } = req.params;
    const review = getReviewById(id);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  }
  
  export function register(req, res) {
    const { id } = req.params;
    const review = getReviewById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
  
    const success = registerUserForReview(id, req.user.id);
    if (success) {
      res.status(201).json({ message: 'Registered successfully' });
    } else {
      res.status(500).json({ message: 'Registration failed' });
    }
  }
  
  export function unregister(req, res) {
    const { id } = req.params;
    const review = getReviewById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
  
    const success = unregisterUserFromReview(id, req.user.id);
    if (success) {
      res.status(200).json({ message: 'Unregistered successfully' });
    } else {
      res.status(500).json({ message: 'Unregistration failed' });
    }
  }
  