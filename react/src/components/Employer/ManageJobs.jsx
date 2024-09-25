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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8080/jobs/getAllJob");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const userJobs = data.filter((job) => job.employerId === user._id); // Adjust userId based on your user object
        setJobs(userJobs);
        setFilteredJobs(userJobs); // Initialize filteredJobs with all user jobs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  const handleSearch = () => {
    // Filter jobs based on search query when the button is clicked
    const results = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(results);
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button
            onClick={handleSearch}
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
