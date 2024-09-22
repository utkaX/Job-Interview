import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider"; // Import ImageSlider
import Navbar from "./Navbar";
import QuoteCarousel from "./QuoteCarousel"; // Import the QuoteCarousel

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]); // For filtering by job tags
  const [availableTags, setAvailableTags] = useState([]); // List of unique job tags
  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      extractTags(data); // Extract unique job tags
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const extractTags = (jobs) => {
    const allTags = jobs.flatMap((job) => job.jobTags); // Get all job tags
    const uniqueTags = [...new Set(allTags)]; // Get unique tags
    setAvailableTags(uniqueTags); // Set available tags
  };

  const handleSearch = () => {
    const filtered = jobs.filter((job) =>
      (searchTitle ? job.title.toLowerCase().includes(searchTitle.toLowerCase()) : true) &&
      (searchLocation ? job.location.toLowerCase().includes(searchLocation.toLowerCase()) : true)

    // filtered = jobs.filter(
    //   (job) =>
    //     job.title.toLowerCase().includes(searchText.toLowerCase()) ||
    //     job.location.toLowerCase().includes(searchText.toLowerCase())
    // )
  );

    if (selectedTags.length > 0) {
       let filtered = filtered.filter((job) =>
        job.jobTags.some((tag) => selectedTags.includes(tag))
      );
    }

    setFilteredJobs(filtered);
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter((t) => t !== tag);
      } else {
        return [...prevSelectedTags, tag];
      }
    });
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

        {/* Job List */}
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
    {/* </div> */}

    </>

  );
};

export default Dashboard;
