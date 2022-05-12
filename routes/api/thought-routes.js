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
    .get(getAllThoughts)
    .post(addThought);

// ROUTE: /api/thoughts/:id
router
    .route('/:id')
    .put(updateThought)
    .delete(deleteThought);

// ROUTE: /api/thoughts/:thoughtId/reactions/
// router.route('/:thoughtId/reactions/').put(addReaction);

// ROUTE: /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .put(addReaction)
    .delete(deleteReaction);

module.exports = router; 