const express =
  require("express");

const multer =
  require("multer");

const router =
  express.Router();

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
  });

router.post(
  "/analyze",
  upload.single("resume"),
  analyzeResume
);

router.get(
  "/:userId",
  getResume
);

module.exports = router;