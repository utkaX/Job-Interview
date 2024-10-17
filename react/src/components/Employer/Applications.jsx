import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom"; // Import Link for navigation
import ApplicationCard from "./ApplicationCard";
import Sidebar from "./Sidebar";
import Layout from "./Layout";

const Applications = () => {
  const user = useAuth();
  const [employer, setemployer] = useState();
  const [jobs, setjobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(user);

  const fetchEmployerId = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/employer/getEmployerByUserId/${user.user._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employer information");
      }
      const employerData = await response.json();
      setemployer(employerData);

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
      setjobs(data);
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

    loadApplications();
  }, [user.user._id]);

  if (loading) {
    return (
      <Layout>
        <p className="text-center mt-4">Loading applications...</p>
      </Layout>
    );
  }

  if (error) {
    return <p className="text-center mt-4 text-red-600">{error}</p>;
  }

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Your Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          // Include employerId in the URL
          <Link to={`/jobCandidates/${job._id}`} key={job._id}>
            <ApplicationCard job={job} />
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Applications;
