const router = require('express').Router();
const { 
    getAllUsers,
    getUserById,
    createUser,
    updateUserInfo,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

//  set up /api/users routes 
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUserInfo)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend);

module.exports = router;