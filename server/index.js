const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');

dotenv.config();

// ----middleware-----
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
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
