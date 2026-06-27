const express = require("express");

const router =
  express.Router();

const {
  chatWithAI,
  saveInterview,
  getInterviewStats,
    getAnalytics,
} = require(
  "../controllers/interviewController"
);

// AI CHAT
router.post(
  "/chat",
  chatWithAI
);

// SAVE INTERVIEW
router.post(
  "/save",
  saveInterview
);

// GET DASHBOARD STATS
router.get(
  "/stats/:userId",
  getInterviewStats
);
router.get(
  "/analytics/:userId",
  getAnalytics
);
module.exports = router;