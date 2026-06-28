import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { signupUser } from "../services/authService";

const Signup = () => {

  const navigate = useNavigate();
useEffect(() => {

  const userInfo = localStorage.getItem(
    "userInfo"
  );

  if (userInfo) {
    navigate("/");
  }

}, []);
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
  console.log("before api");
    try {

      const data = await signupUser(
  formData
);

  console.log("api success", data);

localStorage.setItem(
  "userInfo",
  JSON.stringify(data)
);
    console.log("saved");
window.location.replace("/");

    } catch (error) {

      console.log(error);

    alert(
  error.response?.data?.message ||
  "Signup Failed"
);

console.log(error);

    }

  };

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center px-6">

      <div className="w-full max-w-md hover:scale-[1.02] transition-all duration-300 hover:border-purple-500/50 border border-gray-800 rounded-3xl p-10">

        {/* LOGO */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-purple-500 mb-3">
            AI Interview
          </h1>

          <p className="text-gray-400">
            Create your account 🚀
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NAME */}
          <div>

            <label className="text-gray-400 block mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full bg-[#0D1320] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="text-gray-400 block mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-[#0D1320] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-gray-400 block mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full bg-[#0D1320] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all duration-300 py-4 rounded-2xl font-semibold mt-4"
          >
            Create Account
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-400 mt-8">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Signup;