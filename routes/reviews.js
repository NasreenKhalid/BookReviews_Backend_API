import express from 'express';
import * as reviews from '../controllers/reviews-controller.js';
import { authenticate } from '../util/auth.js';
import { upload } from '../util/upload.js';

const router = express.Router();

// Create a new review
router.post('/' , reviews.create)
 router.post('/', authenticate, upload.single('image'), reviews.create);

// Edit an review by id
router.put('/:id', reviews.edit)


router.put('/:id', authenticate, upload.single('image'), reviews.edit);

// Delete an review by id
router.delete('/:id', authenticate, reviews.deleteItem);

// Get all reviews
router.get('/', reviews.getAll);

// Get a single review by id
router.get('/:id', reviews.getSingle);

router.post('/:id/register', authenticate, reviews.register);

router.delete('/:id/unregister', authenticate, reviews.unregister);

export default router;
