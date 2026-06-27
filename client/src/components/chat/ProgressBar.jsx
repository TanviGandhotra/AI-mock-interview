const ProgressBar = () => {
  return (
    <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 border border-gray-800 rounded-2xl p-5">

      <div className="flex justify-between mb-3">
        <span className="text-sm text-gray-400">
          Question 3 of 10
        </span>

        <span className="text-sm text-purple-400">
          30%
        </span>
      </div>

      <div className="w-full bg-[#1F2937] h-3 rounded-full overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 h-full w-[30%] rounded-full"></div>
      </div>

    </div>
  );
};

export default ProgressBar;