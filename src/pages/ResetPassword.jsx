import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // New state for email
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    // Optional password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      // Send email and password to the backend
      const response = await axios.post(`https://e2e-backend.onrender.com/v1/ecommerce/api/reset-password`, { email, password });

      if (response.data.success) {
        toast.success("Password reset successfully! Please log in with your new password.");
        navigate("/user");
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error occurred, please try again later');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Reset Password
        </h2>

        {/* Email Field */}
        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {/* Password Field */}
        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
          New Password:
        </label>
        <input
          type="password"
          id="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
