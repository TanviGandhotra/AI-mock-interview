const Groq = require("groq-sdk");

const Resume =
  require("../models/Resume");

// PDF PARSER
const pdfParse =
  require("pdf-parse");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ANALYZE RESUME
const analyzeResume =
  async (req, res) => {

    try {

      console.log(
        "BODY:",
        req.body
      );

      console.log(
        "FILE:",
        req.file
      );

      const { userId } =
        req.body;

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

      console.log(
        "PDF START"
      );

      // PDF TEXT
     const data =
  await pdfParse(
    file.buffer
  );

      console.log(
        "PDF DONE"
      );

      const resumeText =
        data.text;

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

      console.log(
        "GROQ START"
      );

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

      console.log(
        "GROQ DONE"
      );

      const raw =
        completion.choices[0]
          .message.content;

      console.log(raw);

      const result =
        JSON.parse(raw);

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

      res.status(200).json({
        success: true,
        resume,
      });

    } catch (error) {

      console.log(
        "RESUME ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Resume analysis failed",
      });

    }

  };

// GET USER RESUME
const getResume =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

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