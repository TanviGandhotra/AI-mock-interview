import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  History,
  Settings,
  BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="hidden md:block w-[260px] bg-[#0D1320] border-r border-gray-800 p-5">

      <h1 className="text-2xl font-bold text-purple-500 mb-10">
        AI Interview
      </h1>

      <div className="space-y-4">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-purple-600"
                : "hover:bg-[#151B2D]"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/interview"
          className={({ isActive }) =>
            `flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-purple-600"
                : "hover:bg-[#151B2D]"
            }`
          }
        >
          <MessageSquare size={20} />
          <span>Interview</span>
        </NavLink>

        <NavLink
          to="/resume"
          className={({ isActive }) =>
            `flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-purple-600"
                : "hover:bg-[#151B2D]"
            }`
          }
        >
          <FileText size={20} />
          <span>Resume</span>
        </NavLink>

    
<NavLink
  to="/analytics"
  className={({ isActive }) =>
    `flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
      isActive
        ? "bg-purple-600"
        : "hover:bg-[#151B2D]"
    }`
  }
>
  <BarChart3 size={20} />
  <span>Analytics</span>
</NavLink>
       
      </div>

    </div>
  );
};

export default Sidebar;