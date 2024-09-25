import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Shimmer from "./Shimmer"; // Optional, if you want to show a loading state
import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider"; // Import ImageSlider if needed
import Navbar from "./Navbar"; // Uncomment if you need the Navbar
import QuoteCarousel from "./QuoteCarousel"; // Import the QuoteCarousel

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:8080/jobs/getAllJob");
      const data = await response.json();

      const jobsWithEmployer = await Promise.all(
        data.map(async (job) => {
          return {
            ...job,
          };
        })
      );

      setJobs(jobsWithEmployer);
      setFilteredJobs(jobsWithEmployer);
      extractTags(jobsWithEmployer);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const extractTags = (jobs) => {
    const allTags = jobs.flatMap((job) => job.jobTags || []); // Ensure jobTags is not undefined
    const uniqueTags = [...new Set(allTags)];
    setAvailableTags(uniqueTags);
  };

  const handleSearch = () => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.location.toLowerCase().includes(searchText.toLowerCase())
    );

    if (selectedTags.length > 0) {
      const filteredWithTags = filtered.filter((job) =>
        job.jobTags && job.jobTags.some((tag) => selectedTags.includes(tag))
      );
      setFilteredJobs(filteredWithTags);
    } else {
      setFilteredJobs(filtered);
    }
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  return (
    <>
      {/* <Navbar /> */}

      <div className="container mx-auto px-4">
        {/* Quote Carousel */}
        <QuoteCarousel />

        {/* Search Bar */}
        <div className="search-container mb-8 mx-auto max-w-2xl flex items-center bg-white shadow-lg rounded-full overflow-hidden border border-gray-200">
          <input
            type="text"
            placeholder="Search by Job Title or Location..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-6 py-3 flex-grow text-gray-700 placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full hover:bg-gradient-to-l transition-all duration-300 ease-in-out"
          >
            Search
          </button>
        </div>

        {/* Job Tags Filter */}
        <div className="mb-10 mx-auto max-w-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Filter by Job Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            {availableTags.length > 0 ? (
              availableTags.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center bg-gray-100 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-all"
                >
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-gray-700">{tag}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-500">No tags available for filtering.</p>
            )}
          </div>
        </div>
        <div className="job-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No jobs found.
            </p>
          ) : (
            filteredJobs.map((job) => (
              <Link to={`JobDetails/${job._id}`} key={job._id} className="mb-8">
                <JobCard jobDetails={job} /> {/* Pass job details to JobCard */}
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
