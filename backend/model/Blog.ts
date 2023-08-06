import { model, Schema } from 'mongoose';
import { BlogType } from '../types';

const blogSchema = new Schema<BlogType>({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  createAt: {
    type: String,
    required: false,
    default: new Date().toISOString,
  },
});

const Blog = model('Blog', blogSchema);

export default Blog;
