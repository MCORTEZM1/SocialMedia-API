const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// ROUTE: /api/thoughts
router
    .route('/')
    .get(getAllThoughts);

// ROUTE: /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .post(addThought)
    .put(updateThought)
    .delete(deleteThought);

// ROUTE: /api/thoughts/:thoughtId/reactions/
router.route('/:thoughtId/reactions/').put(addReaction);

// ROUTE: /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router; 