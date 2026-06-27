const PerformanceCard = ({
  performance,
}) => {

  return (

    <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-6 border border-gray-800 flex flex-col items-center justify-center">

      <h2 className="text-xl font-semibold mb-8">

        Performance

      </h2>

      {/* CIRCLE */}
      <div className="relative w-44 h-44">

        <div
          className="absolute inset-0 rounded-full border-[12px] border-purple-500 border-t-transparent"
          style={{
            transform: `rotate(${
              performance * 3.6
            }deg)`,
          }}
        ></div>

        <div className="absolute inset-6 bg-[#0D1320] rounded-full flex flex-col items-center justify-center">

          <h1 className="text-4xl font-bold">

            {performance}%

          </h1>

          <p className="text-gray-400 text-sm mt-1">

            {performance >= 80
              ? "Excellent"
              : performance >= 60
              ? "Good"
              : "Keep Practicing"}

          </p>

        </div>

      </div>

    </div>

  );

};

export default PerformanceCard;