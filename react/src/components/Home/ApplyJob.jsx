import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";

const ApplyJob = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const jobId = location.state?.jobId
    ? decodeURIComponent(location.state.jobId)
    : null;
  const [formData, setFormData] = useState({
    jobSeekerId: "",
    jobId: jobId,
    coverLetter: "",
    resumeUrl: "", // Changed from resume to resumeUrl
    source: "other",
    notes: "",
  });

  const fetchJobSeeker = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/jobSeeker/getJobSeekerById/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch job seeker");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching job seeker:", error);
      return null;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadJobSeeker = async () => {
      if (user && user._id) {
        console.log(user._id)
        const jobSeeker = await fetchJobSeeker(user._id);
        if (jobSeeker) {
          setFormData((prev) => ({
            ...prev,
            jobSeekerId: jobSeeker._id,
          }));
        }
      }
    };
    loadJobSeeker();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:8080/appliedJob/createApplyJob",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type
          },
          body: JSON.stringify(formData), // Send the form data as JSON
        }
      );

      if (response.ok) {
        setMessage("Application submitted successfully!");
        // Reset form data
        setFormData({
          jobSeekerId: "",
          jobId: "",
          coverLetter: "",
          resumeUrl: "", // Reset the resume URL
          source: "other",
          notes: "",
        });
        navigate("/");
      } else {
        const errorData = await response.json();
        setMessage(`Error submitting application: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error submitting application");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Apply for this Job
      </h1>

      {message && (
        <p className="text-center text-lg font-semibold mb-4">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Cover Letter
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            placeholder="Write your cover letter here..."
            required
            rows="5"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Resume URL
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="url" // Ensures valid URL input
            name="resumeUrl" // Updated name to resumeUrl
            value={formData.resumeUrl} // Bind value to resumeUrl
            onChange={handleChange}
            placeholder="Enter the URL of your resume..."
            required // Making it a required field
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            How did you find this job?
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="source"
            value={formData.source}
            onChange={handleChange}
          >
            <option value="job board">Job Board</option>
            <option value="company website">Company Website</option>
            <option value="referral">Referral</option>
            <option value="social media">Social Media</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Additional Notes (optional)
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional comments or information..."
            rows="4"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyJob;
