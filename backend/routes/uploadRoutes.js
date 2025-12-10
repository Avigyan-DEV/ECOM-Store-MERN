import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce_uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      { width: 1500, crop: "limit" }, // limit size for performance
      { quality: "auto" },
    ],
  },
});

// Multer with file size limit + image filter
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, or WEBP images allowed"), false);
    }
    cb(null, true);
  },
});

// POST: Upload image
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  return res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    imageUrl: req.file.path, // secure cloud URL
    publicId: req.file.filename, // used for future delete
  });
});

// Multer error handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
  next();
});

export default router;
