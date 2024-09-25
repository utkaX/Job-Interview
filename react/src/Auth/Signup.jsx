import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "job_seeker",
  });

  const [errors, setErrors] = useState({});

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
          console.log("otp send successfully");
          navigate("/verify-otp", {
            state: {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              role: formData.role,
            },
          });
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

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
        <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
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

            {/* Role Selection */}
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

            {/* Submit Button */}
            {errors.apiError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
                role="alert"
              >
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{errors.apiError}</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
              disabled={loading}
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
