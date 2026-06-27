import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import { loginUser } from "../services/authService";

const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const userInfo =
      localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/");
    }

  }, []);

  const [formData, setFormData] =
    useState({
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

    try {

      const data = await loginUser(
        formData
      );

      localStorage.setItem(
  "userInfo",
  JSON.stringify(data)
);

window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center px-6">

      <div className="w-full max-w-md border border-gray-800 rounded-3xl p-10 hover:scale-[1.02] transition-all duration-300 hover:border-purple-500/50">

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-purple-500 mb-3">
            AI Interview
          </h1>

          <p className="text-gray-400">
            Welcome back 👋
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

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

          <div>

            <label className="text-gray-400 block mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-[#0D1320] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all duration-300 py-4 rounded-2xl font-semibold mt-4"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-400 mt-8">

          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-purple-400 hover:text-purple-300"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;