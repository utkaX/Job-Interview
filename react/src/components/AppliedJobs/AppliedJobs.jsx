import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { useAuth } from "../../context/authContext";
import AuthButtons from "../Home/AuthButtons"; // Import the AuthButtons component
import config from "../../utils/config";

const AppliedJobs = () => {
  const { user } = useAuth();
  const [jobSeeker, setJobSeeker] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch the JobSeeker data based on the user ID
  const fetchJobSeeker = async () => {
    if (!user) return; // If user is not logged in, exit early
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

  // Fetch the applied jobs for the current job seeker
  const fetchAppliedJobs = async (jobSeekerId) => {
    try {
      const response = await fetch(
        `${config.baseUrl}/appliedJob/apliedjobforjs/${jobSeekerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch applied jobs");
      }
      const jobsData = await response.json();
      setAppliedJobs(jobsData);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  // UseEffect to first fetch the job seeker, then the applied jobs
  useEffect(() => {
    fetchJobSeeker();
  }, [user]);

  useEffect(() => {
    if (jobSeeker && jobSeeker._id) {
      fetchAppliedJobs(jobSeeker._id); // Fetch applied jobs for the jobSeeker
    }
  }, [jobSeeker]);

  return (
    <div className="applied-jobs-container min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Applied Jobs</h1>
      <div className="jobs-list">
        {user ? ( // Check if user is logged in
          appliedJobs.length > 0 ? (
            appliedJobs.map((job) => <JobCard key={job._id} appliedJob={job} />)
          ) : (
            <p>No applied jobs found.</p>
          )
        ) : (
          <AuthButtons isLoggedIn={user !== null} /> // Use the AuthButtons component
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
