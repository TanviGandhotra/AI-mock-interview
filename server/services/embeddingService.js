const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const EMBEDDING_MODEL = "gemini-embedding-001";

const generateEmbeddings = async (texts) => {
  if (!process.env.GEMINI_API_KEY) {
    const error = new Error(
      "Gemini embeddings are not configured on the server."
    );
    error.statusCode = 503;
    throw error;
  }

  try {
    const embeddings = [];

    for (const text of texts) {
      const response = await ai.models.embedContent({
        model: EMBEDDING_MODEL,
        contents: text,
        config: {
          outputDimensionality: 1536,
        },
      });

      embeddings.push(response.embeddings[0].values);
    }

    return embeddings;
  } catch (error) {
    console.error("GEMINI EMBEDDING ERROR:", error);

    const newError = new Error(
      "The Gemini embedding service could not process this request."
    );
    newError.statusCode = 502;
    throw newError;
  }
};

module.exports = { generateEmbeddings };