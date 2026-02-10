import path from "path";
import fs from "fs";
import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/* =========================
   MULTER STORAGE CONFIG
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

/* =========================
   FILE FILTER (IMAGES ONLY)
========================= */
const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

/* =========================
   MULTER INSTANCE
========================= */
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadSingleImage = upload.single("image");

/* =========================
   UPLOAD ROUTE
========================= */
router.post("/", (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "uploads",
        resource_type: "image",
      });

      // Remove local file after successful upload
      fs.unlinkSync(req.file.path);

      return res.status(200).json({
        message: "Image uploaded successfully",
        image: result.secure_url, // store this in DB
        publicId: result.public_id, // optional (useful for delete)
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Image upload to Cloudinary failed" });
    }
  });
});

export default router;
