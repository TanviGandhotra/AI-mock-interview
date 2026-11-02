const mongoose = require("mongoose");
const ResumeChunk = require("../models/ResumeChunk");
const { generateEmbeddings } = require("./embeddingService");

const storeResumeChunks = async ({ userId, resumeId, chunks }) => {
  const embeddings = await generateEmbeddings(
    chunks.map((chunk) => chunk.text)
  );

  const documents = chunks.map((chunk, index) => ({
    userId,
    resumeId,
    text: chunk.text,
    section: chunk.section,
    chunkIndex: index,
    embedding: embeddings[index],
  }));

  await ResumeChunk.insertMany(documents);
};

const retrieveRelevantResumeContext = async ({
  userId,
  resumeId,
  query,
  limit = 6,
}) => {
  const [queryEmbedding] = await generateEmbeddings([query]);

  try {
    const maxAttempts = 5;
    const retryDelay = 1000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const matches = await ResumeChunk.aggregate([
        {
          $vectorSearch: {
            index: "resume_vector_index",
            path: "embedding",
            queryVector: queryEmbedding,
            numCandidates: 60,
            limit,
            filter: {
              userId: new mongoose.Types.ObjectId(userId),
              resumeId: new mongoose.Types.ObjectId(resumeId),
            },
          },
        },
        {
          $project: {
            text: 1,
            section: 1,
            chunkIndex: 1,
            _id: 0,
          },
        },
      ]);

      console.log(
        `RESUME VECTOR SEARCH: attempt ${attempt}/${maxAttempts}, matches: ${matches.length}`
      );
console.log("\n========== RAG RETRIEVAL DEBUG ==========");
console.log("RETRIEVAL QUERY:");
console.log(query);

console.log("\nRETRIEVED CHUNKS:");
matches.forEach((match, index) => {
  console.log(`\nChunk ${index + 1}:`);
  console.log("Section:", match.section);
  console.log("Chunk Index:", match.chunkIndex);
  console.log("Text:", match.text);
});

console.log("========================================\n");
      if (matches.length > 0) {
        return matches;
      }

      if (attempt < maxAttempts) {
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay)
        );
      }
    }

    return [];
  } catch (error) {
    console.error("RESUME VECTOR SEARCH ERROR:", error);

    const newError = new Error(
      "Resume search is not available. Check the MongoDB Atlas vector index configuration."
    );

    newError.statusCode = 503;
    throw newError;
  }
};

module.exports = {
  storeResumeChunks,
  retrieveRelevantResumeContext,
};