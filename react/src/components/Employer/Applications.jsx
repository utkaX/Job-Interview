import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext"; // Importing Auth Context
import { Link } from "react-router-dom"; // Import Link for navigation
import ApplicationCard from "./ApplicationCard"; // Importing ApplicationCard component
import Layout from "./Layout"; // Import Layout for consistent page structure
import config from "../../utils/config";
const Applications = () => {
  const { user } = useAuth(); // Destructure user from AuthContext
  const [employer, setEmployer] = useState(null); // State to hold employer data
  const [jobs, setJobs] = useState([]); // State to hold jobs data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch employer ID based on logged-in user
  const fetchEmployerId = async () => {
    try {
      const response = await fetch(
        `${config.baseUrl}/employer/getEmployerByUserId/${user._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employer information");
      }
      const employerData = await response.json();
      setEmployer(employerData); // Set the employer data in state
      return employerData._id; // Return employer ID to use for fetching jobs
    } catch (err) {
      throw new Error("Error fetching employer information");
    }
  };

  // Function to fetch jobs based on employer ID
  const fetchJobs = async (employerId) => {
    try {
      const response = await fetch(
        `${config.baseUrl}/jobs/company/${employerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const jobsData = await response.json();
      setJobs(jobsData); // Set the jobs data in state
    } catch (err) {
      throw new Error("Error fetching jobs");
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true); // Start loading
        const employerId = await fetchEmployerId(); // Fetch employer ID first
        await fetchJobs(employerId); // Fetch jobs after getting employer ID
      } catch (err) {
        setError(err.message); // Set error if any issues arise
        console.error(err);
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

    loadApplications();
  }, [user._id]); // Dependency array includes user._id to re-fetch if it changes

  if (loading) {
    return (
      <Layout>
        <p className="text-center mt-4">Loading applications...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p className="text-center text-lg text-gray-500">You Have No jobs</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-5xl font-extrabold text-blue-900 mb-16 text-center">
        Applications
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <Link to={`/jobCandidates/${job._id}`} key={job._id}>
            <ApplicationCard job={job} />{" "}
            {/* Render ApplicationCard for each job */}
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Applications;
