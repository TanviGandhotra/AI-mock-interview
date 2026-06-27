import { Bell, Search } from "lucide-react";
import { LogOut } from "lucide-react";
const Topbar = () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );
const handleLogout = () => {

  localStorage.removeItem(
    "userInfo"
  );

  window.location.href = "/login";

};
  return (
    <div className="h-[80px] border-b border-gray-800 bg-[#0D1320] px-6 flex items-center justify-between">

      {/* SEARCH */}
      <div className="hidden md:flex items-center gap-3 hover:scale-[1.02] transition-all duration-300 hover:border-purple-500/50 px-4 py-3 rounded-2xl w-[350px]">

        <Search
          size={18}
          className="text-gray-400"
        />

        <input
          type="text"
          placeholder="Search interviews..."
          className="bg-transparent outline-none w-full text-sm"
        />

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5 ml-auto">

        {/* NOTIFICATION */}
        <button className="relative hover:scale-[1.02] transition-all duration-300 hover:border-purple-500/50 p-3 rounded-2xl">

          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full"></span>

        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 hover:scale-[1.02] transition-all duration-300 hover:border-purple-500/50 px-4 py-2 rounded-2xl">

          {/* AVATAR */}
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold uppercase">

            {userInfo?.name?.charAt(0)}

          </div>
<button
  onClick={handleLogout}
  className="flex items-center gap-2 bg-[#111827] hover:bg-red-500 transition-all duration-300 px-4 py-2 rounded-xl"
>

  <LogOut size={18} />

  <span className="hidden md:block">
    Logout
  </span>

</button>
          {/* USER INFO */}
          <div className="hidden md:block">

            <h3 className="text-sm font-medium">

              {userInfo?.name}

            </h3>

            <p className="text-xs text-gray-400">
              Student
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Topbar;