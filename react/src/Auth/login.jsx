import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation for redirectTo
import { useAuth } from "../context/authContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object
  const { updateAuth } = useAuth();

  // Extract the redirectTo query parameter from the URL
  const redirectTo = new URLSearchParams(location.search).get("redirectTo");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); 
    setLoading(true);
    try {
      const loginResponse = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();
      console.log(loginData);
      
      if (!loginResponse.ok) {
        throw new Error(loginData.message || "Auto-login failed");
      }

      updateAuth(loginData.user, loginData.token);
      
      // Redirect to the original page if redirectTo is set, otherwise redirect to the homepage
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        navigate("/");
      }
      
    } catch (error) {
      setError(error.message); // Set the error message
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Redirect */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleSignupRedirect}
              className="text-blue-600 hover:text-blue-800"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
