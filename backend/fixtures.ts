import mongoose from 'mongoose';
import config from './config';
import Blog from './model/Blog';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('blogs');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  for (let i = 0; i <= 50; i++) {
    await Blog.create({
      name: `Блог ${i}`,
      content: `Lorem ipsum ${i}`,
      user: `Дима ${i}`,
      image: null,
      createAt: new Date().toISOString(),
    });
  }

  await db.close();
};

void run();
