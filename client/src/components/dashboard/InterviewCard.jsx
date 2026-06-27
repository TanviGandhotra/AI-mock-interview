const InterviewCard = ({
  handleStartInterview,
}) => {

  return (

    <div className="mt-10 bg-gradient-to-r from-purple-700 to-purple-500 rounded-3xl p-8 flex justify-between items-center overflow-hidden relative">

      {/* LEFT */}
      <div className="w-[60%]">

        <h2 className="text-3xl font-bold mb-3">

          Start a New Interview

        </h2>

        <p className="text-purple-100 mb-8">

          Practice AI-powered mock interviews and improve your confidence.

        </p>

        {/* BUTTON */}
        <button
          onClick={
            handleStartInterview
          }
          className="bg-white text-purple-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
        >

          Start Interview →

        </button>

      </div>

      {/* RIGHT */}
      <div className="relative">

        <div className="w-52 h-52 bg-white/10 rounded-full blur-3xl absolute top-0 right-0"></div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="robot"
          className="w-48 relative z-10 drop-shadow-2xl"
        />

      </div>

    </div>

  );

};

export default InterviewCard;