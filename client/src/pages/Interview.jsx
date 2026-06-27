import DashboardLayout from "../layouts/DashboardLayout";

import ChatContainer from "../components/chat/ChatContainer";
import ChatInput from "../components/chat/ChatInput";
import ProgressBar from "../components/chat/ProgressBar";

import {
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Interview = () => {

  const navigate =
    useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem(
      "userInfo"
    )
  );

  // STATES
  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [voiceMode,
    setVoiceMode] =
    useState(false);

  const [isSpeaking,
    setIsSpeaking] =
    useState(false);

  const [isListening,
    setIsListening] =
    useState(false);

  const [silenceTimer,
    setSilenceTimer] =
    useState(null);

  const [startTime] =
    useState(Date.now());

  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition();

  // START INTERVIEW
  useEffect(() => {

    // RESET EVERYTHING
    setMessages([]);

    setVoiceMode(false);

    setIsListening(false);

    setIsSpeaking(false);

    resetTranscript();

    window.speechSynthesis.cancel();

    SpeechRecognition.stopListening();

    startInterview();

    // CLEANUP
    return () => {

      window.speechSynthesis.cancel();

      SpeechRecognition.stopListening();

    };

  }, []);

  // AUTO SEND AFTER USER PAUSE
  useEffect(() => {

    if (
      transcript &&
      isListening &&
      !isSpeaking
    ) {

      if (silenceTimer) {

        clearTimeout(
          silenceTimer
        );

      }

      const timer =
        setTimeout(async () => {

          SpeechRecognition.stopListening();

          setIsListening(false);

          const finalMessage =
            transcript;

          resetTranscript();

          await handleSendMessage(
            finalMessage
          );

        }, 2000);

      setSilenceTimer(timer);

    }

  }, [transcript]);

  // AI SPEAK
  const speakText = (text) => {

    // STOP MIC
    SpeechRecognition.stopListening();

    setIsListening(false);

    // STOP OLD SPEECH
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        text
      );

    speech.lang = "en-US";

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    setIsSpeaking(true);

    speech.onend = () => {

      setIsSpeaking(false);

      // START LISTENING
      if (voiceMode) {

        resetTranscript();

        setTimeout(() => {

          setIsListening(true);

          SpeechRecognition.startListening({
            continuous: true,
            language: "en-IN",
          });

        }, 1000);

      }

    };

    window.speechSynthesis.speak(
      speech
    );

  };

  // START INTERVIEW
  const startInterview =
    async () => {

      try {

        setLoading(true);

        const response =
          await axios.post(
            "http://localhost:5000/api/interview/chat",
            {
              message:
                "Start the interview",

              messages: [],
            }
          );

        const aiReply =
          response.data.reply;

        setMessages([
          {
            sender: "ai",
            text: aiReply,
          },
        ]);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  // SEND MESSAGE
  const handleSendMessage =
    async (message) => {

      if (!message.trim())
        return;

      const updatedMessages = [

        ...messages,

        {
          sender: "user",
          text: message,
        },

      ];

      setMessages(updatedMessages);

      try {

        setLoading(true);

        const response =
          await axios.post(
            "http://localhost:5000/api/interview/chat",
            {
              message,

              messages:
                updatedMessages,
            }
          );

        const aiReply =
          response.data.reply;

        setMessages([
          ...updatedMessages,

          {
            sender: "ai",
            text: aiReply,
          },
        ]);

        // AI VOICE
        if (voiceMode) {

          speakText(aiReply);

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  // START VOICE MODE
  const handleVoiceMode =
    () => {

      setVoiceMode(true);

      const lastAIMessage =
        messages
          .filter(
            m =>
              m.sender === "ai"
          )
          .pop();

      if (lastAIMessage) {

        speakText(
          lastAIMessage.text
        );

      }

    };

  // SAVE INTERVIEW
  const saveInterview =
    async () => {

      try {

        const duration =
          Math.floor(
            (Date.now() -
              startTime) /
              1000
          );

       await axios.post(
  "http://localhost:5000/api/interview/save",
  {
    userId:
      userInfo._id,

    role:
      "Auto Detect",

    type:
      "Technical",

    difficulty:
      "Adaptive",

    messages,

    duration,
  }
);
      } catch (error) {

        console.log(error);

      }

    };

  // END INTERVIEW
  const handleEndInterview =
    async () => {

      await saveInterview();

      window.speechSynthesis.cancel();

      SpeechRecognition.stopListening();

      setVoiceMode(false);

      setIsListening(false);

      setIsSpeaking(false);

      navigate("/");

    };

  return (

    <DashboardLayout>

      {/* TOP */}
      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            AI Mock Interview
          </h1>

          <p className="text-gray-400 mt-1">
            Practice with AI interviewer
          </p>

        </div>

        <div className="flex gap-4">

          {/* VOICE MODE */}
          <button
            onClick={
              handleVoiceMode
            }
            className={`px-5 py-3 rounded-xl border transition-all duration-300 ${
              voiceMode
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-purple-500/20 text-purple-400 border-purple-500/30"
            }`}
          >

            {isSpeaking
              ? "AI Speaking..."
              : isListening
              ? "Listening..."
              : voiceMode
              ? "Voice Mode ON"
              : "Start Voice Interview"}

          </button>

          {/* END */}
          <button
            onClick={
              handleEndInterview
            }
            className="bg-red-500/20 text-red-400 px-5 py-3 rounded-xl border border-red-500/30 hover:bg-red-500/30 transition-all duration-300"
          >

            End Interview

          </button>

        </div>

      </div>

      {/* PROGRESS */}
      {/* <ProgressBar
        current={
          messages.filter(
            m =>
              m.sender === "user"
          ).length
        }
        total={10}
      /> */}

      {/* CHAT */}
      <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl border border-gray-800 mt-6 h-[70vh] flex flex-col overflow-hidden">

        <ChatContainer
          messages={messages}
        />

        {loading && (

          <div className="px-6 pb-3 text-sm text-purple-400">

            AI is typing...

          </div>

        )}

        <ChatInput
          onSendMessage={
            handleSendMessage
          }

          autoListen={
            isListening
          }
        />

      </div>

    </DashboardLayout>

  );

};

export default Interview;