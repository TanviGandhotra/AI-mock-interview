import { Mic, Send } from "lucide-react";

import { useEffect, useState } from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const ChatInput = ({
  onSendMessage,
  autoListen,
}) => {

  const [message, setMessage] =
    useState("");

  const [isListening,
    setIsListening] =
    useState(false);

  const [silenceTimer,
    setSilenceTimer] =
    useState(null);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // AUTO START MIC
  useEffect(() => {

    if (
      autoListen &&
      !isListening
    ) {

      startListening();

    }

  }, [autoListen]);

  // LIVE SPEECH → INPUT
  useEffect(() => {

    if (transcript) {

      setMessage(transcript);

      // RESET OLD TIMER
      if (silenceTimer) {

        clearTimeout(
          silenceTimer
        );

      }

      // AUTO SEND AFTER PAUSE
      const timer =
        setTimeout(() => {

          handleSend(
            transcript
          );

        }, 2000);

      setSilenceTimer(timer);

    }

  }, [transcript]);

  // SEND MESSAGE
  const handleSend = (
    finalMessage = message
  ) => {

    if (!finalMessage.trim())
      return;

    onSendMessage(
      finalMessage
    );

    setMessage("");

    resetTranscript();

    SpeechRecognition.stopListening();

    setIsListening(false);

  };

  // START LISTENING
  const startListening =
    () => {

      if (
        !browserSupportsSpeechRecognition
      ) {

        alert(
          "Browser doesn't support speech recognition"
        );

        return;

      }

      resetTranscript();

      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });

      setIsListening(true);

    };

  // MANUAL MIC
  const handleMic = () => {

    if (isListening) {

      SpeechRecognition.stopListening();

      setIsListening(false);

    } else {

      startListening();

    }

  };

  return (

    <div className="p-5 border-t border-gray-800 bg-[#0D1320]">

      <div className="flex items-center gap-4">

        {/* MIC */}
        <button
          onClick={handleMic}
          className={`relative p-4 rounded-2xl transition-all duration-300 ${
            isListening
              ? "bg-red-500 animate-pulse"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >

          {isListening && (
            <span className="absolute inset-0 rounded-2xl bg-red-400 animate-ping opacity-30"></span>
          )}

          <Mic className="relative z-10" />

        </button>

        {/* WAVES */}
        {isListening && (

          <div className="flex items-center justify-center gap-2">

            <div className="w-1 h-6 bg-purple-500 rounded animate-pulse"></div>

            <div className="w-1 h-10 bg-purple-400 rounded animate-pulse"></div>

            <div className="w-1 h-4 bg-purple-300 rounded animate-pulse"></div>

            <div className="w-1 h-8 bg-purple-500 rounded animate-pulse"></div>

            <div className="w-1 h-5 bg-purple-400 rounded animate-pulse"></div>

          </div>

        )}

        {/* INPUT */}
        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              handleSend();

            }

          }}
          placeholder={
            isListening
              ? "Listening..."
              : "Type your answer..."
          }
          className="flex-1 border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 bg-transparent"
        />

        {/* SEND */}
        <button
          onClick={() =>
            handleSend()
          }
          className="bg-purple-600 hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all duration-300 p-4 rounded-2xl"
        >

          <Send />

        </button>

      </div>

    </div>

  );

};

export default ChatInput;