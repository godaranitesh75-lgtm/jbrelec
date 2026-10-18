import { v2 as cloudinary } from 'cloudinary';
import { Router, type NextFunction, type Request, type Response } from 'express';
import multer from 'multer';
import { Readable } from 'node:stream';
import { authenticate, authorize } from '../middleware/auth.js';

export const uploadRouter = Router();

const maxFileSize = 5 * 1024 * 1024;
const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxFileSize, files: 1 },
});

function receiveImage(req: Request, res: Response, next: NextFunction) {
  upload.single('image')(req, res, (error: unknown) => {
    if (error instanceof multer.MulterError) {
      const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
      const message = error.code === 'LIMIT_FILE_SIZE'
        ? 'Images must be 5 MB or smaller.'
        : 'Upload one image using the "image" form field.';
      return res.status(status).json({ message });
    }
    if (error) return next(error);
    return next();
  });
}

uploadRouter.post(
  '/image',
  authenticate,
  authorize(['ADMIN']),
  receiveImage,
  async (req, res, next) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: 'Select an image to upload.' });
      }
      if (!allowedMimeTypes.has(file.mimetype)) {
        return res.status(415).json({ message: 'Use a JPEG, PNG, WebP, or AVIF image.' });
      }

      const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
      if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
        return res.status(500).json({ message: 'Cloudinary is not configured on the server.' });
      }

      cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
      });

      const image = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'jbr/products', resource_type: 'image' },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (!result) {
              reject(new Error('Cloudinary did not return an uploaded image.'));
            } else {
              resolve({ secure_url: result.secure_url, public_id: result.public_id });
            }
          },
        );
        Readable.from(file.buffer).pipe(stream);
      });

      return res.status(201).json({ url: image.secure_url, publicId: image.public_id });
    } catch (error) {
      return next(error);
    }
  },
);
