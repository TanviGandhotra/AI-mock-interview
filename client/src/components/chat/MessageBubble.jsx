import { Bot, User } from "lucide-react";

const MessageBubble = ({ sender, text }) => {
  const isAI = sender === "ai";

  return (
    <div
      className={`flex gap-3 mb-6 ${
        isAI ? "justify-start" : "justify-end"
      }`}
    >

      {/* AI AVATAR */}
      {isAI && (
        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
          <Bot size={22} />
        </div>
      )}

      {/* MESSAGE */}
      <div
        className={`max-w-[70%] p-5 rounded-3xl ${
          isAI
            ? "bg-[#1F2937] text-white rounded-tl-sm"
            : "bg-purple-600 text-white rounded-tr-sm"
        }`}
      >
        <p className="leading-7">
          {text}
        </p>

        <p className="text-xs text-gray-300 mt-3">
          10:32 PM
        </p>
      </div>

      {/* USER AVATAR */}
      {!isAI && (
        <div className="w-12 h-12 rounded-full bg-[#1F2937] flex items-center justify-center shrink-0">
          <User size={22} />
        </div>
      )}

    </div>
  );
};

export default MessageBubble;