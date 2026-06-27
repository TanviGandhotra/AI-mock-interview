import DashboardLayout from "../layouts/DashboardLayout";
import {
  CalendarDays,
  Clock3,
  Trophy,
} from "lucide-react";

const interviews = [
  {
    role: "Frontend Developer",
    type: "Technical",
    score: "85%",
    date: "20 June 2026",
    duration: "18 mins",
  },
  {
    role: "React Developer",
    type: "HR + Technical",
    score: "78%",
    date: "18 June 2026",
    duration: "22 mins",
  },
  {
    role: "Software Engineer",
    type: "DSA",
    score: "91%",
    date: "15 June 2026",
    duration: "30 mins",
  },
];

const History = () => {
  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">
          Interview History
        </h1>

        <p className="text-gray-400">
          Track all your AI mock interviews and performance.
        </p>
      </div>

      {/* TABLE */}
      <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl border border-gray-800 overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-5 px-8 py-5 border-b border-gray-800 text-gray-400 text-sm bg-[#0D1320]">

          <p>Role</p>

          <p>Type</p>

          <p>Score</p>

          <p>Date</p>

          <p>Duration</p>

        </div>

        {/* ROWS */}
        {interviews.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 px-8 py-6 border-b border-gray-800 hover:bg-[#0D1320] transition-all duration-300"
          >

            {/* ROLE */}
            <div>
              <h2 className="font-semibold">
                {item.role}
              </h2>
            </div>

            {/* TYPE */}
            <div>
              <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                {item.type}
              </span>
            </div>

            {/* SCORE */}
            <div className="flex items-center gap-2">

              <Trophy
                size={18}
                className="text-yellow-400"
              />

              <span className="text-green-400 font-medium">
                {item.score}
              </span>

            </div>

            {/* DATE */}
            <div className="flex items-center gap-2 text-gray-300">

              <CalendarDays size={18} />

              <span>{item.date}</span>

            </div>

            {/* DURATION */}
            <div className="flex items-center gap-2 text-gray-300">

              <Clock3 size={18} />

              <span>{item.duration}</span>

            </div>

          </div>
        ))}

      </div>

    </DashboardLayout>
  );
};

export default History;