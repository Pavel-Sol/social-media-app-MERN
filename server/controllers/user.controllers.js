const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

module.exports.updateUser = async (req, res) => {
  if (req.params.id === req.body.userId || req.body.isAdmin) {
    // если пользователь поменял пароль, хешируем новый
    if (req.body.password) {
      // console.log(req.body.password);
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        console.log('work', req.body.password);
      } catch (error) {
        // console.log(error.message);
        return res.status(500).json(error.message);
      }
    }

    // производим апдейт юзера в базе данных
    try {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true },
      );

      res.json({ message: 'информация успешно изменена' });
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json('вы можете изменить только свой аккаунт');
  }
};

module.exports.deleteUser = async (req, res) => {
  if (req.params.id === req.body.userId || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete({ _id: req.params.id });
      res.json({ message: 'аккаунт удалён' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res.status(403).json('вы можете удалить только свой аккаунт');
  }
};

module.exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, updatedAt, ...other } = user._doc;

    res.json(other);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports.followUser = async (req, res) => {
  if (req.params.id === req.body.userId) {
    return res
      .status(403)
      .json({ message: 'вы не можете подписаться на свой собственный аккаунт' });
  }

  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (user.followers.includes(req.body.userId)) {
      return res.status(403).json({ message: 'вы уже подписаны на этого пользователя' });
    }

    await user.updateOne({ $push: { followers: req.body.userId } });
    await currentUser.updateOne({ $push: { followings: req.params.id } });
    res.status(200).json('подписка на пользователя прошла успешно');
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports.unfollowUser = async (req, res) => {
  if (req.params.id === req.body.userId) {
    return res.status(403).json({ message: 'вы не можете отписаться от собственного аккаунта' });
  }

  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (!user.followers.includes(req.body.userId)) {
      return res.status(403).json({ message: 'вы не подписаны этого пользователя' });
    }

    await user.updateOne({ $pull: { followers: req.body.userId } });
    await currentUser.updateOne({ $pull: { followings: req.params.id } });
    res.status(200).json('вы успешно отписались');
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
