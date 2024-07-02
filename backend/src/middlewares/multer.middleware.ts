import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = 'uploads';

const ensureUploadDirExists = () => {
  const dirPath = path.join(__dirname, uploadDir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

ensureUploadDirExists();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export const uploadSingle = upload.single('file');
