import express from 'express';
import cors from 'cors';
import config from './config';
import path from 'path';
import * as mongoose from 'mongoose';
import blogsRouter from './routes/blogs';
import authRouter from './routes/auth';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);
app.use('/images', express.static(path.join(config.publicPath, 'images')));
app.use(express.json());
app.use('/blogs', blogsRouter);
app.use('/auth', authRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  app.listen(config.port, () => console.log(`We are live on ${config.port}`));
  process.on('exit', () => mongoose.disconnect());
};

run().catch(console.error);
