import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider"; // Import ImageSlider

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]);

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
    const filtered = jobs.filter((job) =>
      (searchTitle ? job.title.toLowerCase().includes(searchTitle.toLowerCase()) : true) &&
      (searchLocation ? job.location.toLowerCase().includes(searchLocation.toLowerCase()) : true)
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
    <div className="container mx-auto px-4">
      <div className="w-full mb-6">
        <ImageSlider images={images} />
      </div>
      <div className="search-container mb-6 mx-12 flex items-center my-10 space-x-4">
        {/* Search by Job Title */}
        <input
          type="text"
          placeholder="Search by Job Title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="px-4 py-2 flex-grow rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        {/* Search by Location */}
        <input
          type="text"
          placeholder="Search by Location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="px-4 py-2 flex-grow rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        {/* Search Button */}
        <button
          type="button"
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </div>
      <div className="job-list">
        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <Link to={`JobDetails/${job._id}`} key={job._id}>
              <JobCard jobDetails={job} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
