const express =
  require("express");

const multer =
  require("multer");

const router =
  express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
  analyzeResume,
  getResume,
} = require(
  "../controllers/resumeController"
);

const storage =
  multer.memoryStorage();

const upload =
  multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
  });

const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: error.code === "LIMIT_FILE_SIZE"
        ? "Resume PDF must be 10 MB or smaller."
        : "The uploaded resume could not be accepted.",
    });
  }

  return next(error);
};

router.use(authenticateToken);

router.post(
  "/analyze",
  upload.single("resume"),
  handleUploadError,
  analyzeResume
);

router.get(
  "/:userId",
  getResume
);

module.exports = router;