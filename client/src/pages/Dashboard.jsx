import DashboardLayout from "../layouts/DashboardLayout";

import InterviewCard from "../components/dashboard/InterviewCard";
import RecentInterviewCard from "../components/dashboard/RecentInterviewCard";
import PerformanceCard from "../components/dashboard/PerformanceCard";

import { useNavigate } from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

const Dashboard = () => {

  const navigate =
    useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem(
      "userInfo"
    )
  );

  const [stats, setStats] =
    useState({
      totalInterviews: 0,
      averageScore: 0,
      totalQuestions: 0,
      totalPracticeTime: 0,
    });

  const [recentInterviews,
    setRecentInterviews] =
    useState([]);

  const [performance,
    setPerformance] =
    useState(0);

  // FETCH DASHBOARD DATA
  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData =
    async () => {

      try {

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/interview/stats/${userInfo._id}`
          );

        setStats(
          response.data.stats
        );

        setRecentInterviews(
          response.data
            .recentInterviews
        );

        setPerformance(
          response.data.performance
        );

      } catch (error) {

        console.log(error);

      }

    };

  // START INTERVIEW
  const handleStartInterview =
    () => {
navigate(
  "/interview",
  {
    state: {
      interviewId:
        Date.now(),
    },
  }
);

    };

  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-2">

          Hi, {userInfo?.name} 👋

        </h1>

        <p className="text-gray-400">

          Ready for your AI mock interview?

        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-5">

        {/* INTERVIEWS */}
        <div className="hover:scale-[1.02] transition-all duration-300 hover:border-purple-500/50 p-6 rounded-2xl border border-gray-800">

          <h2 className="text-gray-400 text-sm">

            Interviews

          </h2>

          <p className="text-3xl font-bold mt-3">

            {
              stats.totalInterviews
            }

          </p>

        </div>

        {/* AVG SCORE */}
        <div className="hover:scale-[1.02] transition-all duration-300 hover:border-purple-500/50 p-6 rounded-2xl border border-gray-800">

          <h2 className="text-gray-400 text-sm">

            Average Score

          </h2>

          <p className="text-3xl font-bold mt-3">

            {
              stats.averageScore
            }%

          </p>

        </div>

        {/* QUESTIONS */}
        <div className="hover:scale-[1.02] transition-all duration-300 hover:border-purple-500/50 p-6 rounded-2xl border border-gray-800">

          <h2 className="text-gray-400 text-sm">

            Questions

          </h2>

          <p className="text-3xl font-bold mt-3">

            {
              stats.totalQuestions
            }

          </p>

        </div>

        {/* PRACTICE TIME */}
        <div className="hover:scale-[1.02] transition-all duration-300 hover:border-purple-500/50 p-6 rounded-2xl border border-gray-800">

          <h2 className="text-gray-400 text-sm">

            Practice Time

          </h2>

          <p className="text-3xl font-bold mt-3">

            {
              Math.floor(
                stats.totalPracticeTime
                / 60
              )
            }h

          </p>

        </div>

      </div>

      {/* HERO CARD */}
      <InterviewCard
        handleStartInterview={
          handleStartInterview
        }
      />

      {/* LOWER */}
      <div className="grid grid-cols-3 gap-5 mt-10">

        <div className="col-span-2">

          <RecentInterviewCard
            interviews={
              recentInterviews
            }
          />

        </div>

        <div>

          <PerformanceCard
            performance={
              performance
            }
          />

        </div>

      </div>

    </DashboardLayout>

  );

};

export default Dashboard;