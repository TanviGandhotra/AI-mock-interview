import DashboardLayout from "../layouts/DashboardLayout";

const Settings = () => {
  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">
          Settings
        </h1>

        <p className="text-gray-400">
          Customize your AI interview experience.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-2 gap-6">

        {/* LEFT */}
        <div className="space-y-6">

          {/* AI VOICE */}
          <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-8 border border-gray-800">

            <h2 className="text-2xl font-semibold mb-6">
              AI Voice
            </h2>

            <div className="space-y-5">

              <div>
                <label className="text-gray-400 block mb-2">
                  Voice Type
                </label>

                <select className="w-full bg-[#0D1320] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500">

                  <option>Professional Female</option>

                  <option>Professional Male</option>

                  <option>Friendly Assistant</option>

                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-2">
                  Speaking Speed
                </label>

                <input
                  type="range"
                  className="w-full accent-purple-500"
                />
              </div>

            </div>

          </div>

          {/* LANGUAGE */}
          <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-8 border border-gray-800">

            <h2 className="text-2xl font-semibold mb-6">
              Language Preferences
            </h2>

            <div className="space-y-5">

              <div>
                <label className="text-gray-400 block mb-2">
                  Interview Language
                </label>

                <select className="w-full bg-[#0D1320] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500">

                  <option>English</option>

                  <option>Hindi</option>

                  <option>Punjabi</option>

                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-2">
                  Preferred Role
                </label>

                <select className="w-full bg-[#0D1320] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500">

                  <option>Frontend Developer</option>

                  <option>Backend Developer</option>

                  <option>Full Stack Developer</option>

                </select>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* INTERVIEW SETTINGS */}
          <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-8 border border-gray-800">

            <h2 className="text-2xl font-semibold mb-6">
              Interview Settings
            </h2>

            <div className="space-y-6">

              {/* TOGGLE */}
              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-medium">
                    Voice Responses
                  </h3>

                  <p className="text-sm text-gray-400">
                    AI speaks responses aloud
                  </p>
                </div>

                <div className="w-14 h-8 bg-purple-600 rounded-full flex items-center px-1">
                  <div className="w-6 h-6 bg-white rounded-full ml-auto"></div>
                </div>

              </div>

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-medium">
                    Auto Follow-up Questions
                  </h3>

                  <p className="text-sm text-gray-400">
                    AI asks follow-up questions
                  </p>
                </div>

                <div className="w-14 h-8 bg-purple-600 rounded-full flex items-center px-1">
                  <div className="w-6 h-6 bg-white rounded-full ml-auto"></div>
                </div>

              </div>

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-medium">
                    Real-time Feedback
                  </h3>

                  <p className="text-sm text-gray-400">
                    Show feedback instantly
                  </p>
                </div>

                <div className="w-14 h-8 bg-[#1F2937] rounded-full flex items-center px-1">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>

              </div>

            </div>

          </div>

          {/* SAVE */}
          <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-8 border border-gray-800">

            <h2 className="text-2xl font-semibold mb-6">
              Save Preferences
            </h2>

            <button className="w-full bg-purple-600 hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all duration-300 py-4 rounded-2xl font-semibold">
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Settings;