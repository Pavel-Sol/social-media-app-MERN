const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

//------register--------
module.exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    // проверка использован ли email для регистрации ранее
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res
        .status(400)
        .json({ message: `email ${email} уже использован для регистрации, попробуйте другой` });
    }

    //генерация пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//------login--------
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: `неверный email` });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json({ message: 'неверный пароль' });

    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};
