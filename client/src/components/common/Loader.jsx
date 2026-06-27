const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#070B14] flex items-center justify-center z-50">

      <div className="flex flex-col items-center">

        <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

        <h1 className="mt-6 text-2xl font-bold text-purple-400">
          AI Interview
        </h1>

      </div>

    </div>
  );
};

export default Loader;