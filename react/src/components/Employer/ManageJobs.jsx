import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext"; // Adjust the path as needed
import Sidebar from "./Sidebar";
import JobCard from "./JobCard"; // Import the JobCard component
import { Link } from "react-router-dom"; // Import Link

const ManageJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered jobs
  const [companyId, setCompanyId] = useState(""); // State for company ID

  useEffect(() => {
    const fetchCompanyAndJobs = async () => {
      try {
        // Fetch company details by user ID
        const companyResponse = await fetch(
          `http://localhost:8080/employer/getEmployerByUserId/${user._id}`
        );

        if (!companyResponse.ok) {
          throw new Error("Failed to fetch company information.");
        }
        const companyData = await companyResponse.json();
        setCompanyId(companyData._id); // Set company ID from the fetched data

        // Fetch jobs for the company
        const jobsResponse = await fetch(
          `http://localhost:8080/jobs/getJobsByEmployerId/${companyData._id}`
        );

        if (!jobsResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const jobs = await jobsResponse.json();
        setJobs(jobs);
        setFilteredJobs(jobs); // Initialize filteredJobs with all company jobs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyAndJobs();
  }, [user]);

  // Search function that only runs when the button is clicked
  const handleSearch = () => {
    const results = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(results);
  };

  // Toggle job live status
  const toggleLiveStatus = async (jobId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle the live status
      const response = await fetch(`http://localhost:8080/jobs/updateJobById/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isLive: updatedStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update job status.");
      }

      // Update the local state after successful update
      const updatedJobs = jobs.map((job) =>
        job._id === jobId ? { ...job, isLive: updatedStatus } : job
      );
      setJobs(updatedJobs);
      setFilteredJobs(updatedJobs);
    } catch (error) {
      console.error(error);
      alert("Failed to update job status.");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex">
      <Sidebar />

      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">My Jobs</h2>

        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery as the user types
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button
            onClick={handleSearch} // Trigger search on click
            className="ml-2 bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Search
          </button>
        </div>

        {filteredJobs.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No jobs found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <li key={job._id}>
                <Link to={`/job/${job._id}`} className="block">
                  <JobCard job={job} /> {/* Pass the job object here */}
                </Link>
                <button
                  onClick={() => toggleLiveStatus(job._id, job.isLive)} // Toggle job status on click
                  className={`mt-2 ${
                    job.isLive ? "bg-green-500" : "bg-red-500"
                  } text-white rounded-md px-4 py-2`}
                >
                  {job.isLive ? "Set to Not Live" : "Set to Live"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
