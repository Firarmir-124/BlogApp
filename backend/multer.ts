import path from 'path';
import { promises as fs } from 'fs';
import { randomUUID } from 'crypto';
import multer from 'multer';
import config from './config';

const imageStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const destDir = path.join(config.publicPath, config.imgDirName);
    await fs.mkdir(destDir, { recursive: true });
    if (_file.fieldname) {
      cb(null, destDir);
    }
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, randomUUID() + extension);
  },
});

export const imagesUpload = multer({ storage: imageStorage });
