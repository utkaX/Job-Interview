import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { email, password, role } = location.state || {};

  // Redirect to signup if no state is passed
  if (!email || !password || !role) {
    navigate("/signup");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error before retrying
    setSuccess("");
    setLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role, otp }),
      });

      const data = await response.json(); // Parse the response data

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP");
      }

      setSuccess("OTP verified successfully!");

      // Redirect based on user role
      if (data.user.role === "employer") {
        navigate("/add-company"); // Redirect to add company page for employer
      } else if (data.user.role === "job-seeker") {
        navigate("/add-profile"); // Redirect to add profile page for job seeker
      } else {
        navigate("/dashboard"); // Default redirection if role is not recognized
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading after request
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Verify OTP
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="otp"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // Only allow numbers
              required
            />
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {success && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{success}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
