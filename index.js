import express from 'express';

import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postsRoutes from './routes/postsRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: 'mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: 'mb', extended: true }));
app.use(cors());

app.use('/posts', postsRoutes);
app.use('/users', authRoutes);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    })
  )
  .catch((error) => console.log(error));
