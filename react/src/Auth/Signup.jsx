import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Signup = () => {
  const navigate = useNavigate();
  const { updateAuth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "job_seeker",
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role: role,
    });
  };

  const validate = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/auth/sendOTP", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        });

        const data = await response.json();
        if (data.success) {
          console.log("OTP sent successfully");
          setIsOtpSent(true); // Set OTP sent state
        } else {
          setErrors({ apiError: data.message });
        }
      } catch (error) {
        console.error("Signup error:", error);
        setErrors({ apiError: "An error occurred during signup" });
      } finally {
        setLoading(false); // Stop loading after the request
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setOtpError("");
    setOtpSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
          otp,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP");
      }

      setOtpSuccess("OTP verified successfully!");
      const loginResponse = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginData = await loginResponse.json();
      if (!loginResponse.ok) {
        throw new Error(loginData.message || "Auto-login failed");
      }
      updateAuth(loginData.user, loginData.token);

      if (formData.role === "employer") {
        navigate("/employee-profile", { state: { name: formData.name } });
      } else {
        navigate("/add-profile", { state: { name: formData.name } });
      }
    } catch (error) {
      setOtpError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          {isOtpSent ? "Verify OTP" : "Create an Account"}
        </h2>
        <form
          onSubmit={isOtpSent ? handleOtpVerification : handleSubmit}
          className="space-y-6"
        >
          {/* Name Input */}
          {!isOtpSent && (
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          )}
          {/* Email Input */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          {!isOtpSent && (
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          )}

          {/* OTP Input */}
          {isOtpSent && (
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
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
              />
              {otpError && (
                <p className="text-red-500 text-sm mt-1">{otpError}</p>
              )}
              {otpSuccess && (
                <p className="text-green-500 text-sm mt-1">{otpSuccess}</p>
              )}
            </div>
          )}

          {/* Role Selection */}
          {!isOtpSent && (
            <div>
              <p className="text-sm font-medium text-gray-700">Select Role</p>
              <div className="flex space-x-4 mt-2">
                <button
                  type="button"
                  className={`w-1/2 py-2 px-4 rounded-lg text-white ${
                    formData.role === "job_seeker"
                      ? "bg-indigo-600"
                      : "bg-gray-400"
                  }`}
                  onClick={() => handleRoleChange("job_seeker")}
                >
                  Job Seeker
                </button>
                <button
                  type="button"
                  className={`w-1/2 py-2 px-4 rounded-lg text-white ${
                    formData.role === "employer"
                      ? "bg-indigo-600"
                      : "bg-gray-400"
                  }`}
                  onClick={() => handleRoleChange("employer")}
                >
                  Employer
                </button>
              </div>
            </div>
          )}

          {/* Terms Checkbox */}
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                required
              />
              <span className="ml-2 text-gray-700">I agree to the terms</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Need help?
            </a>
          </div>

          {/* Error Messages */}
          {errors.apiError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{errors.apiError}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg text-white ${
              isOtpSent ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            {loading
              ? isOtpSent
                ? "Verifying..."
                : "Creating..."
              : isOtpSent
              ? "Verify OTP"
              : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Signup;
