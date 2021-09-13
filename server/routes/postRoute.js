const router = require('express').Router();
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getOnePost,
  getTimlinePosts,
} = require('../controllers/post.controllers');

//create a post
router.post('/', createPost);

//update a post
router.put('/:id', updatePost);

//delete a post
router.delete('/:id', deletePost);

//like / dislike a post
router.put('/:id/like', likePost);

//get a post
router.get('/:id', getOnePost);

//get timeline posts
router.get('/timeline/all', getTimlinePosts);

module.exports = router;
