import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom"; // Import Link for navigation
import ApplicationCard from "./ApplicationCard";
import Layout from "./Layout";

const Applications = () => {
  const { user } = useAuth(); // Use destructuring to get user directly
  const [employer, setEmployer] = useState();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // Error state

  const fetchEmployerId = async () => {
    if (!user || !user.user) {
      throw new Error("User information is not available");
    }
    
    try {
      const response = await fetch(
        `http://localhost:8080/employer/getEmployerByUserId/${user.user._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employer information");
      }
      const employerData = await response.json();
      setEmployer(employerData);

      return employerData._id;
    } catch (err) {
      throw new Error("Error fetching employer information");
    }
  };

  const fetchJobs = async (employerId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/jobs/company/${employerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      throw new Error("Error fetching applications");
    }
  };

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        const employerId = await fetchEmployerId();
        await fetchJobs(employerId);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Ensure user is defined before loading applications
    if (user && user.user) {
      loadApplications();
    } else {
      setLoading(false);
      setError("User is not logged in or information is not available.");
    }
  }, [user]); // Updated dependency to just user

  if (loading) {
    return (
      <Layout>
        <p className="text-center text-lg">Loading...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-200 border border-red-400 text-red-800 px-4 py-2 rounded-lg mb-4 text-center">
          <p>Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Applications
        </h2>
      </div>
      {jobs.length === 0 ? (
        <div className="max-w-7xl mx-auto p-6">
          <p className="text-center mt-4 text-gray-600 font-semibold">
            No applications have been created yet. Please check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <Link to={`/jobCandidates/${job._id}`} key={job._id}>
              <ApplicationCard job={job} />
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Applications;
