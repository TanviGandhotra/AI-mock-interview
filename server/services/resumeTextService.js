const pdfParse = require("pdf-parse");

const CHUNK_SIZE = 1200;
const CHUNK_OVERLAP = 180;

const extractResumeText = async (buffer) => {
  if (!buffer || buffer.length < 5 || buffer.subarray(0, 5).toString() !== "%PDF-") {
    const error = new Error("Please upload a valid PDF resume.");
    error.statusCode = 400;
    throw error;
  }

  let parsed;
  try {
    parsed = await pdfParse(buffer);
  } catch {
    const error = new Error("The PDF could not be read. Try exporting it as a text-based PDF.");
    error.statusCode = 422;
    throw error;
  }

  const text = parsed.text
    .replace(/\r/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (text.length < 80) {
    const error = new Error("No readable resume text was found in this PDF.");
    error.statusCode = 422;
    throw error;
  }

  return text;
};

const getSection = (text) => {
  const firstLine = text.split("\n")[0].trim();
  const heading = firstLine.match(/^(skills?|projects?|experience|internships?|education|achievements?|certifications?|tools|technologies)\b/i);
  return heading ? heading[1].toLowerCase() : "resume";
};

const chunkResume = (text) => {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
  const chunks = [];
  let current = "";

  const pushChunk = (value) => {
    const cleaned = value.trim();
    if (cleaned) chunks.push({ text: cleaned, section: getSection(cleaned) });
  };

  for (const paragraph of paragraphs) {
    if (paragraph.length > CHUNK_SIZE) {
      pushChunk(current);
      current = "";

      for (let offset = 0; offset < paragraph.length; offset += CHUNK_SIZE - CHUNK_OVERLAP) {
        pushChunk(paragraph.slice(offset, offset + CHUNK_SIZE));
      }
      continue;
    }

    const combined = current ? `${current}\n${paragraph}` : paragraph;
    if (combined.length > CHUNK_SIZE) {
      pushChunk(current);
      current = `${current.slice(-CHUNK_OVERLAP)}\n${paragraph}`.trim();
    } else {
      current = combined;
    }
  }

  pushChunk(current);
  return chunks;
};

module.exports = { extractResumeText, chunkResume };