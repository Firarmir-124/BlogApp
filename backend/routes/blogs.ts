import express from 'express';
import Blog from '../model/Blog';
import { imagesUpload } from '../multer';
import { promises as fs } from 'fs';
import config from '../config';
import { auth } from '../middleware/auth';

const blogsRouter = express.Router();

blogsRouter.get('/search', async (req, res, next) => {
  const value = (req.query.value as string) || '';

  try {
    if (value !== '') {
      const blogList = await Blog.find({ name: { $regex: value } });
      return res.send(blogList);
    }
  } catch (e) {
    next(e);
  }
});

blogsRouter.get('/', async (req, res, next) => {
  let page = parseInt(req.query.page as string);
  let perPage = parseInt(req.query.perPage as string);

  page = isNaN(page) || page <= 0 ? 1 : page;
  perPage = isNaN(perPage) || perPage <= 0 ? 10 : perPage;

  try {
    const count = await Blog.count();
    let pages = Math.ceil(count / perPage);

    if (pages === 0) pages = 1;
    if (page > pages) page = pages;

    const blogs = await Blog.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    return res.send({ blogs: blogs, count, page, perPage, pages });
  } catch (e) {
    return next(e);
  }
});

blogsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const newBlog = await Blog.create({
      name: req.body.name,
      content: req.body.content,
      user: req.body.user,
      image: req.file ? req.file.filename : null,
      createAt: new Date().toISOString(),
    });
    return res.send(newBlog);
  } catch (e) {
    return next(e);
  }
});

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blogOne = await Blog.findOne({ _id: req.params.id });
    return res.send(blogOne);
  } catch (e) {
    return next(e);
  }
});

blogsRouter.put('/:id', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const blogOne = await Blog.findOne({ _id: req.params.id });

    if (!blogOne) {
      return res.status(404).send({ error: 'Блог не найдет !' });
    }

    const newBlog = {
      name: req.body.name,
      content: req.body.content,
    };

    const image = {
      image: req.body.image,
    };

    if (blogOne.image === null) {
      await Blog.updateOne({ _id: req.params.id }, { image: req.file ? req.file.filename : null });
    } else if (image.image !== blogOne.image) {
      try {
        await fs.unlink(`${config.publicPath}/${config.imgDirName}/${blogOne.image}`);
        await Blog.updateOne({ _id: req.params.id }, { image: req.file ? req.file.filename : null });
      } catch (e) {
        console.log(e);
      }
    }

    await Blog.updateMany({ _id: req.params.id }, { $set: newBlog });
    return res.send({ update: req.params.id });
  } catch (e) {
    next(e);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const blogOne = await Blog.findOne({ _id: req.params.id });
    await Blog.deleteOne({ _id: req.params.id });

    if (!blogOne) {
      return res.status(404).send({ error: 'Блог не найдет !' });
    }

    if (blogOne.image !== null) {
      await fs.unlink(`${config.publicPath}/${config.imgDirName}/${blogOne.image}`);
    }

    return res.send({ delete: req.params.id });
  } catch (e) {
    return next(e);
  }
});

export default blogsRouter;
