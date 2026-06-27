const mongoose =
  require("mongoose");

const resumeSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },

      fileName: String,

      skills: [String],

      analysis: {
        technical: Number,
        communication: Number,
        projects: Number,
      },

      feedback: String,
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Resume",
    resumeSchema
  );