const mongoose = require("mongoose");

const interviewSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },

      // ROLE
      role: {
        type: String,
        default:
          "AI Mock Interview",
      },

      // TYPE
      type: {
        type: String,
        default: "Technical",
      },

      // DIFFICULTY
      difficulty: {
        type: String,
        default: "Medium",
      },

      // CHAT
      messages: [
        {
          sender: String,
          text: String,
        },
      ],

      // SCORE
      score: {
        type: Number,
        default: 0,
      },

      // TOTAL QUESTIONS
      totalQuestions: {
        type: Number,
        default: 0,
      },

      // PRACTICE TIME
      duration: {
        type: Number,
        default: 0,
      },

      // FEEDBACK
      feedback: {
        type: String,
        default: "",
      },

    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Interview",
    interviewSchema
  );