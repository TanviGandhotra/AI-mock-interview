import DashboardLayout from "../layouts/DashboardLayout";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

const Analytics = () => {

  const userInfo = JSON.parse(
    localStorage.getItem(
      "userInfo"
    )
  );

  const [analytics,
    setAnalytics] =
    useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics =
    async () => {

      try {

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/interview/analytics/${userInfo._id}`
          );

        console.log(
          response.data
        );

        setAnalytics(
          response.data.analytics
        );

      } catch (error) {

        console.log(error);

      }

    };

  if (!analytics) {

    return (

      <DashboardLayout>

        <div className="text-white p-10">

          Loading...

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-3">

          Performance Analytics

        </h1>

        <p className="text-gray-400">

          AI-generated insights based on your interviews.

        </p>

      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-4 gap-5 mb-10">

        <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-6 border border-gray-800">

          <p className="text-gray-400 mb-3">

            Overall Score

          </p>

          <h1 className="text-4xl font-bold text-purple-400">

            {analytics?.overallScore || 0}%

          </h1>

        </div>

        <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-6 border border-gray-800">

          <p className="text-gray-400 mb-3">

            Interviews Given

          </p>

          <h1 className="text-4xl font-bold text-green-400">

            {analytics?.interviewsGiven || 0}

          </h1>

        </div>

        <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-6 border border-gray-800">

          <p className="text-gray-400 mb-3">

            Best Skill

          </p>

          <h1 className="text-2xl font-bold text-yellow-400">

            {analytics?.bestSkill || "N/A"}

          </h1>

        </div>

        <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-6 border border-gray-800">

          <p className="text-gray-400 mb-3">

            Weak Area

          </p>

          <h1 className="text-2xl font-bold text-red-400">

            {analytics?.weakArea || "N/A"}

          </h1>

        </div>

      </div>

      {/* MAIN */}
      <div className="grid grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="col-span-2 space-y-6">

          {/* SKILLS */}
          <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-8 border border-gray-800">

            <h2 className="text-2xl font-semibold mb-8">

              Skill Performance

            </h2>

            {analytics?.skills?.length > 0 ? (

              analytics.skills.map(
                (skill, index) => (

                  <div
                    key={index}
                    className="mb-6"
                  >

                    <div className="flex justify-between mb-2">

                      <span>

                        {skill.name}

                      </span>

                      <span className="text-purple-400">

                        {skill.score}%

                      </span>

                    </div>

                    <div className="w-full bg-[#1F2937] h-3 rounded-full overflow-hidden">

                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-700 h-full rounded-full"
                        style={{
                          width:
                            `${skill.score}%`,
                        }}
                      ></div>

                    </div>

                  </div>

                )
              )

            ) : (

              <p className="text-gray-400">

                No skill data available

              </p>

            )}

          </div>

          {/* AI INSIGHTS */}
          <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-8 border border-gray-800">

            <h2 className="text-2xl font-semibold mb-6">

              AI Insights

            </h2>

            <div className="space-y-5">

              <div className="bg-[#0D1320] rounded-2xl p-5 border border-gray-800">

                <p className="text-green-400 font-medium mb-2">

                  Strong Area

                </p>

                <p className="text-gray-300">

                  {analytics?.insights?.strongArea ||
                    "Keep practicing regularly."}

                </p>

              </div>

              <div className="bg-[#0D1320] rounded-2xl p-5 border border-gray-800">

                <p className="text-yellow-400 font-medium mb-2">

                  Improvement Tip

                </p>

                <p className="text-gray-300">

                  {analytics?.insights?.improvementTip ||
                    "Improve problem-solving and communication."}

                </p>

              </div>

              <div className="bg-[#0D1320] rounded-2xl p-5 border border-gray-800">

                <p className="text-purple-400 font-medium mb-2">

                  AI Suggestion

                </p>

                <p className="text-gray-300">

                  {analytics?.insights?.suggestion ||
                    "Practice mock interviews consistently."}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* CONFIDENCE */}
          <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-8 border border-gray-800 flex flex-col items-center">

            <h2 className="text-2xl font-semibold mb-8">

              Confidence Score

            </h2>

            <div className="relative w-52 h-52">

              <div className="absolute inset-0 rounded-full border-[14px] border-purple-500 border-t-transparent rotate-45"></div>

              <div className="absolute inset-7 rounded-full bg-[#0D1320] flex flex-col items-center justify-center">

                <h1 className="text-5xl font-bold">

                  {analytics?.confidence || 0}%

                </h1>

                <p className="text-gray-400 mt-2">

                  Excellent

                </p>

              </div>

            </div>

          </div>

          {/* STATS */}
          <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-8 border border-gray-800">

            <h2 className="text-2xl font-semibold mb-6">

              Weekly Stats

            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span className="text-gray-400">

                  Interviews

                </span>

                <span>

                  {analytics?.interviewsGiven || 0}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">

                  Practice Hours

                </span>

                <span>

                  {analytics?.practiceHours || 0} hrs

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">

                  Skills Tracked

                </span>

                <span>

                  {analytics?.skills?.length || 0}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">

                  AI Feedback Score

                </span>

                <span className="text-purple-400">

                  {(
                    (analytics?.overallScore || 0) / 10
                  ).toFixed(1)}/10

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

};

export default Analytics;