const generateInterviewQuestion = async ({ groq, messages, message, resumeContext }) => {
  const conversation = Array.isArray(messages) ? messages : [];
  const lastMessage = conversation[conversation.length - 1];
  const includesCurrentMessage =
    lastMessage?.sender === "user" && lastMessage.text === message;
  const previousMessages = includesCurrentMessage
    ? conversation.slice(0, -1)
    : conversation;
  const askedQuestions = previousMessages
    .filter((item) => item.sender === "ai")
    .map((item) => item.text.trim())
    .filter(Boolean);
  const startPrompt = message === "Start the interview" || conversation.length === 0;
  const relevantContext = resumeContext
    .map((chunk, index) => `[Resume excerpt ${index + 1}; section: ${chunk.section}]\n${chunk.text}`)
    .join("\n\n");

  const systemPrompt = `You are a professional technical interviewer. Interview the candidate based strictly on the retrieved resume excerpts below. Ask exactly ONE concise question and output no explanation or preamble. Do not invent technologies, projects, employers, skills, or experience. Prioritize resume projects and experience, then explicitly listed technologies, then relevant technical depth. Ask a focused follow-up when the latest answer gives you a concrete opportunity; otherwise move to a different relevant resume topic. Avoid repeating any question already asked. Use broader CS fundamentals only when directly relevant to the resume.\n\nRelevant resume excerpts (retrieved for this turn):\n${relevantContext}\n\nQuestions already asked in this interview (do not repeat or lightly rephrase):\n${askedQuestions.length ? askedQuestions.map((question, index) => `${index + 1}. ${question}`).join("\n") : "None"}`;

  const formattedMessages = [
    { role: "system", content: systemPrompt },
    ...previousMessages.slice(-12).map((item) => ({
      role: item.sender === "ai" ? "assistant" : "user",
      content: item.text,
    })),
    {
      role: "user",
      content: startPrompt
        ? "Begin the interview with a question grounded in the candidate's resume."
        : message,
    },
  ];

  const completion = await groq.chat.completions.create({
    messages: formattedMessages,
    model: "openai/gpt-oss-20b",
    temperature: 0.5,
  });

  return completion.choices[0].message.content.trim();
};

module.exports = { generateInterviewQuestion };