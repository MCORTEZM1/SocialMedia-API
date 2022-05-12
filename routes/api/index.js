const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// append users to api = /api/users
router.use('/users', userRoutes);// append thoughts to api = /api/thoughts
router.use('/thoughts', thoughtRoutes);


module.exports = router;