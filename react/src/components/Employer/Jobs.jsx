import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext"; // Adjust the path as needed
import JobCard from "./JobCard"; // Import the JobCard component
import { Link } from "react-router-dom"; // Import Link
import { FaSearch } from "react-icons/fa"; // Import search icon
import Layout from "./Layout";

const Jobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered jobs

  useEffect(() => {
    const fetchCompanyAndJobs = async () => {
      try {
        const companyResponse = await fetch(
          `http://localhost:8080/employer/getEmployerByUserId/${user._id}`
        );

        if (!companyResponse.ok) {
          throw new Error("Failed to fetch company information.");
        }
        const companyData = await companyResponse.json();

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

  const handleSearch = () => {
    const results = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(results);
  };

  if (loading)
    return (
      <Layout>
        <p className="text-center text-lg">Loading...</p>
      </Layout>
    );
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <Layout>
      <div className="flex bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-600">
            Manage My Jobs
          </h2>

          {/* Search Bar */}
          <div className="mb-4 flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by job title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery as the user types
                className="border border-gray-300 rounded-md p-3 pl-10 w-full focus:outline-none focus:ring focus:ring-blue-400"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button
              onClick={handleSearch} // Trigger search on click
              className="ml-2 bg-blue-600 text-white rounded-md px-4 py-2 transition duration-200 hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          {/* Job Listings */}
          {filteredJobs.length === 0 ? (
            <p className="text-center text-lg text-gray-500">No jobs found.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <li
                  key={job._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
                >
                  <Link to={`/job/${job._id}`} className="block mb-4">
                    <JobCard job={job} /> {/* Pass the job object here */}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
