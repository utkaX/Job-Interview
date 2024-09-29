import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";

const ApplyJob = () => {
  const [formData, setFormData] = useState({
    jobSeekerId: "",
    jobId: "",
    coverLetter: "",
    resume: null,
    source: "other",
    notes: "",
  });
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [message, setMessage] = useState(""); // Success or error message
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation

  // Retrieve jobId from state passed through Link
  const jobId = location.state?.jobId ? decodeURIComponent(location.state.jobId) : null;

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
      return null; // Return null if there's an error
    }
  };

  useEffect(() => {
    const loadJobSeeker = async () => {
      if (user && user._id) {
        const jobSeeker = await fetchJobSeeker(user._id);
        if (jobSeeker) {
          setFormData((prev) => ({
            ...prev,
            jobSeekerId: jobSeeker._id,
            jobId: jobId, 
          }));
        }
      }
    };
    loadJobSeeker();
  }, [user, jobId]); // Ensure to run when user changes

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }
    console.log(dataToSend);
    try {
      const response = await fetch(
        "http://localhost:8080/appliedJob/createApplyJob",
        {
          method: "POST",
          body: dataToSend,
        }
      );

      if (response.ok) {
        setMessage("Application submitted successfully!");
        setFormData({
          jobSeekerId: "",
          jobId: "",
          coverLetter: "",
          resume: null,
          source: "other",
          notes: "",
        }); // Reset formData
        navigate("/"); // Redirect to the dashboard after successful submission
      } else {
        setMessage("Error submitting application");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error submitting application");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Apply for this Job</h1>

      {message && <p className="text-center text-lg font-semibold mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Cover Letter</label>
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
          <label className="block text-gray-700 font-medium mb-2">Resume</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">How did you find this job?</label>
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
          <label className="block text-gray-700 font-medium mb-2">Additional Notes (optional)</label>
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
