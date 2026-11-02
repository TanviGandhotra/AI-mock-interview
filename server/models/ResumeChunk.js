const mongoose = require("mongoose");

const resumeChunkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
    },
    embedding: {
      type: [Number],
      required: true,
      select: false,
    },
    section: String,
    chunkIndex: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

resumeChunkSchema.index({ userId: 1, resumeId: 1, chunkIndex: 1 });

module.exports = mongoose.model("ResumeChunk", resumeChunkSchema);