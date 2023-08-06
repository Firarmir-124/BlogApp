import path from 'path';
import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const rootPath = __dirname;

console.log(process.env.PORT);

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  imgDirName: process.env.IMG_DIR_NAME || 'images',
  port: Number(process.env.PORT) || 8000,
  apiUrl: process.env.API_URL || 'http://localhost:8000',
  db: 'mongodb://localhost/blog-db',
  SALT_WORK_FACTOR: 10,
  token: {
    accessKey: process.env.JWT_ACCESS_SECRET || 'key',
    refreshKey: process.env.JWT_REFFRESH_SECRET || 'key',
  },
};

export default config;
