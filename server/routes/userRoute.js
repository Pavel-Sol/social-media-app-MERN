const router = require('express').Router();
const {
  updateUser,
  deleteUser,
  getOneUser,
  followUser,
  unfollowUser,
} = require('../controllers/user.controllers');

// update user
router.put('/:id', updateUser);

//delete user
router.delete('/:id', deleteUser);

//get a user
router.get('/:id', getOneUser);

//follow a user
router.put('/:id/follow', followUser);

//unfollow a user
router.put('/:id/unfollow', unfollowUser);

module.exports = router;
