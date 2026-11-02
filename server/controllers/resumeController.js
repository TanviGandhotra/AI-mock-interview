const Groq = require("groq-sdk");

const Resume =
  require("../models/Resume");

const ResumeChunk = require("../models/ResumeChunk");

const {
  extractResumeText,
  chunkResume,
} = require("../services/resumeTextService");

const {
  storeResumeChunks,
} = require("../services/resumeVectorService");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ANALYZE RESUME
const analyzeResume =
  async (req, res) => {

    try {

      const userId = req.user.id;
      const file =
        req.file;

      // NO FILE
      if (!file) {

        return res.status(400).json({
          success: false,
          message:
            "No file uploaded",
        });

      }

      const resumeText = await extractResumeText(file.buffer);
      const chunks = chunkResume(resumeText);

      if (chunks.length === 0) {
        return res.status(422).json({
          success: false,
          message: "No usable resume content was found in this PDF.",
        });
      }

      const fileName =
        file.originalname;

      // AI PROMPT
      const prompt = `
You are an AI resume analyzer.

Analyze this resume and return:

1. Top technical skills
2. Technical score out of 100
3. Communication score out of 100
4. Project strength score out of 100
5. Short professional feedback

Resume:
${resumeText}

Return ONLY valid JSON:

{
  "skills": [
    "React",
    "Node.js",
    "MongoDB"
  ],
  "analysis": {
    "technical": 85,
    "communication": 78,
    "projects": 88
  },
  "feedback":
    "Strong MERN stack knowledge with good project experience."
}
`;

      // AI ANALYSIS
      const completion =
        await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content:
                prompt,
            },
          ],

          model:
            "openai/gpt-oss-20b",

          temperature: 0.4,
        });

      const raw =
        completion.choices[0]
          .message.content;

      const result = JSON.parse(
        raw.replace(/```json|```/g, "").trim()
      );

      // SAVE DB
      const resume =
        await Resume.create({
          userId,

          fileName,

          skills:
            result.skills,

          analysis:
            result.analysis,

          feedback:
            result.feedback,
        });

      try {
        await storeResumeChunks({
          userId,
          resumeId: resume._id,
          chunks,
        });
      } catch (error) {
        await ResumeChunk.deleteMany({ userId, resumeId: resume._id });
        await Resume.deleteOne({ _id: resume._id, userId });
        throw error;
      }

      await ResumeChunk.deleteMany({
        userId,
        resumeId: { $ne: resume._id },
      });

      res.status(200).json({
        success: true,
        resume,
      });

    } catch (error) {

      console.error("RESUME ERROR:", error.message);

      res.status(error.statusCode || 500).json({
        success: false,
        message: error.statusCode
          ? error.message
          : "Resume analysis failed. Please try again.",
      });

    }

  };

// GET USER RESUME
const getResume =
  async (req, res) => {

    try {

      const { userId } = req.params;

      if (userId !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You cannot access another user's resume.",
        });
      }

      const resume =
        await Resume.findOne({
          userId,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        resume,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
      });

    }

  };

module.exports = {
  analyzeResume,
  getResume,
};