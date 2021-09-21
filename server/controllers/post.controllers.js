const Post = require('../models/PostModel');
const User = require('../models/UserModel');

module.exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();

    return res.json(savedPost);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId !== req.body.userId) {
      return res.status(403).json({ message: 'вы можете изменить только свой пост' });
    }

    await post.updateOne({ $set: req.body });
    res.json({ message: 'пост был успешно изменён' });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId !== req.body.userId) {
      return res.status(403).json({ message: 'вы можете удалить только свой пост' });
    }

    await post.deleteOne();
    res.json({ message: 'пост был успешно удалён' });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('вы поставили лайк');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('вы удалили лайк поста');
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports.getOnePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports.getTimlinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      }),
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};
