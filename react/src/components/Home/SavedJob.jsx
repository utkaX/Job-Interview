import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import JobSearchCard from "./JobSearchCard";
import { RingLoader } from "react-spinners";
import AuthButtons from "./AuthButtons"; // Import your AuthButtons component
import config from "../../utils/config";

const SavedJob = () => {
  const { user, isLoggedIn } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobSeeker, setJobSeeker] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJobSeeker = async () => {
    try {
      const response = await fetch(
        `${config.baseUrl}/jobSeeker/getJobSeekerById/${user._id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setJobSeeker(data);
    } catch (error) {
      console.error("Error fetching job seeker data:", error);
    }
  };

  // Fetch saved jobs
  const fetchSavedJobs = async () => {
    try {
      const response = await fetch(
        `${config.baseUrl}/jobSeeker/saved-jobs/${jobSeeker._id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSavedJobs(data); // Set the saved jobs data
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchJobSeeker();
  }, [user]);

  useEffect(() => {
    if (jobSeeker) {
      fetchSavedJobs();
    }
  }, [jobSeeker]); // Dependency on jobSeeker

  // Function to toggle saved job
  const handleSaveToggle = async (jobId) => {
    try {
      const response = await fetch(
        `${config.baseUrl}/jobSeeker/toggle-save-job/${jobId}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Update saved jobs after toggling
      setSavedJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error toggling saved job:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#007bff" size={60} />
      </div>
    ); // Loading spinner centered
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Your Saved Jobs
      </h2>
      {!isLoggedIn ? ( // Check if user is logged in
        <div className="text-center">
          <AuthButtons /> {/* Render Auth buttons if not logged in */}
        </div>
      ) : (
        <>
          {savedJobs.length === 0 ? (
            <div className="text-center">
              <p className="text-lg text-gray-500">No saved jobs found.</p>
              <p className="mt-2 text-sm text-gray-400">
                Explore jobs and save your favorites!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobs.map((job) => (
                <JobSearchCard key={job._id} job={job}>
                  <button
                    onClick={() => handleSaveToggle(job._id)}
                    className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                  >
                    Unsave Job
                  </button>
                </JobSearchCard>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SavedJob;
