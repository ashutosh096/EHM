import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import multer, { StorageEngine } from "multer";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

interface CustomRequest extends Request {
  adminId?: string;
}

// ✅ Admin Authentication Middleware
function AdminMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;
  try {
    const decode = jwt.verify(token, JWT_SECRET) as { id: string };
    req.adminId = decode.id;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please log in again" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
}

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Custom Multer StorageEngine using cloudinary v2 upload_stream directly.
// multer-storage-cloudinary (all versions) requires cloudinary v1 as a peer dep
// and is incompatible with cloudinary v2. This inline engine replaces it.
const cloudinaryStorage: StorageEngine = {
  _handleFile(req: any, file: any, cb: any) {
    // Validate MIME type before uploading to Cloudinary
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("INVALID_FORMAT: Only JPG, PNG, and WEBP images are allowed."));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "EHM-APP", allowed_formats: ["jpg", "png", "jpeg", "webp"] },
      (error: any, result: any) => {
        if (error) return cb(error);
        // path = secure_url, filename = public_id — matches existing route handlers
        cb(null, {
          path: result.secure_url,
          filename: result.public_id,
          size: result.bytes,
        });
      }
    );
    file.stream.pipe(uploadStream);
  },
  _removeFile(req: any, file: any, cb: any) {
    cloudinary.uploader.destroy(file.filename, cb);
  },
};

const upload = multer({
  storage: cloudinaryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max for file upload field
    fieldSize: 25 * 1024 * 1024, // 25 MB max to accommodate base64-encoded images embedded in the text content
  },
});

// ✅ Multer error handler — call this in routes after upload middleware
// Converts multer/format errors to clean JSON responses (prevents server crash).
function handleUploadError(err: any, req: any, res: Response, next: NextFunction) {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ success: false, message: "File too large. Maximum size is 5 MB." });
    }
    if (err.code === "LIMIT_FIELD_VALUE") {
      return res.status(400).json({ success: false, message: "Content field is too large. Embedded images must be smaller." });
    }
    if (err.message?.startsWith("INVALID_FORMAT")) {
      return res.status(400).json({ success: false, message: "Invalid file type. Only JPG, PNG, and WEBP are allowed." });
    }
    return res.status(400).json({ success: false, message: err.message || "File upload error." });
  }
  next();
}

export { AdminMiddleware, upload, handleUploadError };
