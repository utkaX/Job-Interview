import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Shimmer from "./Shimmer"; // Assuming you have a shimmer component for loading states

const Body = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:8080/jobs/getAllJob");
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const handleSearch = () => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchText.toLowerCase()) ||
        job.location.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  if (jobs.length === 0) {
    return (
      <>
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
      </>
    );
  }

  return (
    <div className="body">
      <div className="search-container mx-40 mt-6 mx-12 flex items-center">
        <input
          type="text"
          placeholder="Search by Job Title or Location..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-2 flex-grow rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </div>
      <div className="job-list mt-6 mx-12">
        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <JobCard key={job._id} jobDetails={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
