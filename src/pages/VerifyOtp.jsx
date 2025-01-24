/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOTP = ({ token }) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");  // New state for email
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // Send OTP and email to the API
      const response = await axios.post(
        'https://e2e-backend.onrender.com/v1/ecommerce/api/verify-otp',
        { otp, email }, // Send email along with OTP
        {
          headers: {
            'Content-Type': 'application/json',
          
          },
        
        }
      );

      if (response.data.success) {
        console.log(response.data);
        toast.success("OTP verified. Redirecting...");
        navigate(`/resetpassword`);
      } else {
        console.log(response);
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Error occurred, please try again later");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Verify OTP
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

        {/* OTP Field */}
        <label htmlFor="otp" className="block text-sm font-medium text-gray-600 mb-2">
          OTP:
        </label>
        <input
          type="text"
          id="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
