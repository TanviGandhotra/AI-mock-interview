const Groq = require("groq-sdk");

const Interview =
  require("../models/Interview");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// AI CHAT
const chatWithAI = async (
  req,
  res
) => {

  try {

    const {
      message,
      messages,
      role,
      type,
      difficulty,
    } = req.body;

    const systemPrompt = `
You are an intelligent AI mock interviewer conducting a realistic ${role} interview.

Interview Type: ${type}
Difficulty: ${difficulty}

Your behavior should feel natural, human-like, conversational, and adaptive.

Rules:
- Ask ONLY ONE question at a time.
- Never dump multiple questions together.
- React to the user's previous answer before asking the next question.
- Ask follow-up questions based on projects and technologies.
- Keep interview realistic and professional.
- Increase difficulty naturally.
- Encourage the user professionally.
- Behave like a real interviewer.
- Focus on ${role} concepts and skills.
`;

    const formattedMessages = [

      {
        role: "system",
        content: systemPrompt,
      },

      ...(messages || []).map(
        (msg) => ({
          role:
            msg.sender === "ai"
              ? "assistant"
              : "user",

          content: msg.text,
        })
      ),

      {
        role: "user",
        content: message,
      },

    ];

    const completion =
      await groq.chat.completions.create({
        messages: formattedMessages,

        model:
          "openai/gpt-oss-20b",

        temperature: 0.7,
      });

    const reply =
      completion.choices[0]
        .message.content;

    res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI Error",
    });

  }

};

// SAVE INTERVIEW
const saveInterview = async (
  req,
  res
) => {

  try {

    const {
      userId,
      messages,
      duration,
    } = req.body;

    // TOTAL QUESTIONS
    const totalQuestions =
      messages.filter(
        (msg) =>
          msg.sender === "ai"
      ).length;

    // USER ANSWERS
    const userAnswers =
      messages.filter(
        (msg) =>
          msg.sender === "user"
      );

    // DETECT ROLE
    const rolePrompt = `
Analyze this interview conversation and detect the primary interview role/category.

Examples:
- React, frontend, UI -> Frontend Developer
- Node.js, APIs, MongoDB -> Backend Developer
- MERN stack -> Full Stack Developer
- DSA, coding -> Software Engineer
- ML, AI -> Machine Learning Engineer

Conversation:
${messages
  .map(
    (m) =>
      `${m.sender}: ${m.text}`
  )
  .join("\n")}

Return ONLY role name.
`;

    const roleCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content:
              rolePrompt,
          },
        ],

        model:
          "openai/gpt-oss-20b",

        temperature: 0.3,
      });

    const detectedRole =
      roleCompletion.choices[0]
        .message.content.trim();

    // EVALUATION
    const evaluationPrompt = `
You are an interview evaluator.

Analyze this interview and provide:

1. Final score out of 100
2. Short professional feedback

Candidate Answers:
${userAnswers
  .map((a) => a.text)
  .join("\n")}

Return ONLY valid JSON:

{
  "score": 85,
  "feedback": "Strong communication and React fundamentals."
}
`;

    const evaluation =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content:
              evaluationPrompt,
          },
        ],

        model:
          "openai/gpt-oss-20b",

        temperature: 0.5,
      });

    const rawResult =
      evaluation.choices[0]
        .message.content;

    const cleanedResult =
      rawResult
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const result =
      JSON.parse(
        cleanedResult
      );

    // SAVE DB
    const interview =
      await Interview.create({
        userId,

        role:
          detectedRole,

        type:
          "Technical",

        difficulty:
          "Adaptive",

        messages,

        duration,

        totalQuestions,

        score:
          result.score,

        feedback:
          result.feedback,
      });

    res.status(201).json({
      success: true,
      interview,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to save interview",
    });

  }

};

// ANALYTICS
const getAnalytics =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      const interviews =
        await Interview.find({
          userId,
        });

      if (
        interviews.length === 0
      ) {

        return res.status(200).json({
          success: true,

          analytics: {
            overallScore: 0,
            interviewsGiven: 0,
            bestSkill: "N/A",
            weakArea: "N/A",
            practiceHours: 0,
            confidence: 0,

            skills: [],

            insights: {
              strongArea:
                "Keep practicing regularly.",

              improvementTip:
                "Solve more mock interviews.",

              suggestion:
                "Practice consistently.",
            },
          },
        });

      }

      // AVG SCORE
      const overallScore =
        Math.round(
          interviews.reduce(
            (acc, item) =>
              acc + item.score,
            0
          ) /
            interviews.length
        );

      // ROLE COUNTS
      const roleMap = {};

      interviews.forEach(
        (item) => {

          const role =
            item.role ||
            "General";

          roleMap[role] =
            (roleMap[role] || 0) + 1;

        }
      );

      // BEST + WEAK
      let bestSkill =
        Object.keys(roleMap)[0];

      let weakArea =
        Object.keys(roleMap)[0];

      Object.keys(roleMap)
        .forEach((key) => {

          if (
            roleMap[key] >
            roleMap[
              bestSkill
            ]
          ) {

            bestSkill =
              key;

          }

          if (
            roleMap[key] <
            roleMap[
              weakArea
            ]
          ) {

            weakArea =
              key;

          }

        });

      // PRACTICE HOURS
      const totalSeconds =
        interviews.reduce(
          (acc, item) =>
            acc +
            item.duration,
          0
        );

      const practiceHours =
        (
          totalSeconds / 3600
        ).toFixed(1);

      // SKILL PERFORMANCE
      const skills =
        Object.keys(roleMap)
          .map((role) => ({
            name: role,

            score:
              Math.min(
                95,
                Math.floor(
                  overallScore *
                    0.8 +
                    Math.random() *
                      15
                )
              ),
          }));

      // AI INSIGHTS
      const insightsPrompt = `
You are an interview analytics AI.

Analyze interview performance.

Interviews:
${interviews
  .map(
    (i) => `
Role: ${i.role}
Score: ${i.score}
Feedback: ${i.feedback}
`
  )
  .join("\n")}

Return ONLY valid JSON:

{
  "strongArea": "...",
  "improvementTip": "...",
  "suggestion": "..."
}
`;

      const completion =
        await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content:
                insightsPrompt,
            },
          ],

          model:
            "openai/gpt-oss-20b",

          temperature: 0.5,
        });

      const rawInsights =
        completion.choices[0]
          .message.content;

      const cleanedInsights =
        rawInsights
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      const insights =
        JSON.parse(
          cleanedInsights
        );

      res.status(200).json({
        success: true,

        analytics: {

          overallScore,

          interviewsGiven:
            interviews.length,

          bestSkill,

          weakArea,

          practiceHours,

          confidence:
            overallScore,

          skills,

          insights,

        },
      });

    } catch (error) {

      console.log(
        "ANALYTICS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
      });

    }

  };

// DASHBOARD STATS
const getInterviewStats =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      const interviews =
        await Interview.find({
          userId,
        }).sort({
          createdAt: -1,
        });

      const totalInterviews =
        interviews.length;

      const totalQuestions =
        interviews.reduce(
          (acc, item) =>
            acc +
            item.totalQuestions,
          0
        );

      // TOTAL SECONDS
      const totalPracticeTime =
        interviews.reduce(
          (acc, item) =>
            acc + item.duration,
          0
        );

      const averageScore =
        totalInterviews > 0
          ? Math.round(
              interviews.reduce(
                (acc, item) =>
                  acc +
                  item.score,
                0
              ) /
                totalInterviews
            )
          : 0;

      res.status(200).json({
        success: true,

        stats: {
          totalInterviews,

          totalQuestions,

          totalPracticeTime,

          averageScore,
        },

        recentInterviews:
          interviews.slice(0, 5),

        performance:
          averageScore,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch stats",
      });

    }

  };

module.exports = {
  chatWithAI,
  saveInterview,
  getAnalytics,
  getInterviewStats,
};