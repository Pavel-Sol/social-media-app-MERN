const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const authRoute = require('./routes/authRoute');
const conversationRoute = require('./routes/conversationRoute');
const messageRoute = require('./routes/messageRoute');
const multer = require('multer');
const path = require('path');

dotenv.config();

// ----middleware-----
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('файл успешно загружен');
  } catch (error) {
    console.error(error);
  }
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);
// --------------------------
const start = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => console.log('MONGO-DB connected'))
      .catch((er) => console.log('MONGO-DB ERROR!!! ', er));

    await app.listen(process.env.PORT, () => {
      console.log(`server running on ${process.env.PORT} PORT`);
    });
  } catch (error) {
    console.log('error ', error);
  }
};
start();
