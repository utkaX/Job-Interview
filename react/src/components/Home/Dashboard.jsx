import { useEffect, useState, useRef } from "react";
import JobCard from "./JobCard";
import { Link, useNavigate } from "react-router-dom";
import QuoteCarousel from "./QuoteCarousel";
import {
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
  FaBriefcase,
  FaMapMarkerAlt,
  FaSearch,
  FaCaretDown,
} from "react-icons/fa";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [topCompanies, setTopCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchJob, setSearchJob] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchJobs();
      await fetchTopCompanies();
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:8080/jobs/live");
      const data = await response.json();
      const jobsWithEmployer = await Promise.all(
        data.map(async (job) => {
          const employerResponse = await fetch(
            `http://localhost:8080/employer/${job.employerId}`
          );
          const employerData = await employerResponse.json();
          return {
            ...job,
            employeeId: job.employerId,
            company: employerData.companyName,
          };
        })
      );

      setJobs(jobsWithEmployer);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const fetchTopCompanies = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/employer/getAllEmployee"
      );
      const data = await response.json();
      setTopCompanies(data);
    } catch (error) {
      console.error("Error fetching top companies:", error);
    }
  };

  const scroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleSearch = () => {
    if (!searchJob) {
      setError("Please enter keywords to search relevant jobs."); // Set error message
      return;
    }

    setError(null);

    // Create a query string from search input
    const queryParams = new URLSearchParams();
    if (searchJob) queryParams.append("jobsearch", searchJob);
    if (searchLocation) queryParams.append("location", searchLocation);
    if (experienceYears) queryParams.append("experience", experienceYears);

    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <QuoteCarousel />

      {/* Search Bar */}
      <div
        className={`rounded-full mb-0 flex items-center justify-between border shadow-md p-2 w-full sm:w-2/3 mx-auto ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {/* Job search Input */}
        <div className="relative flex-grow mx-2">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FaSearch />
          </div>
          <input
            type="text"
            value={searchJob}
            onChange={(e) => setSearchJob(e.target.value)}
            className={`pl-10 p-3 w-full text-gray-700 focus:outline-none ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Enter Skills/Designation/Companies"
          />
        </div>

        {/* Separator */}
        <span className="text-gray-400">|</span>

        {/* Experience Dropdown */}
        <div className="relative flex-grow mx-2">
          <select
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
            className="p-3 w-full text-gray-700 focus:outline-none appearance-none"
          >
            <option value="">Select Experience</option>
            {[
              "Freshers",
              "1 year",
              "2 years",
              "3 years",
              "4 years",
              "5 years",
            ].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
            <FaCaretDown />
          </div>
        </div>

        {/* Separator */}
        <span className="text-gray-400">|</span>

        {/* Location Input */}
        <div className="relative flex-grow mx-2">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FaMapMarkerAlt />
          </div>
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="p-3 pl-10 w-full text-gray-700 focus:outline-none"
            placeholder="Location"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 px-4 ml-2 flex items-center"
        >
          <FaSearch className="mr-2" />
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 text-left ml-60">{error}</p>}

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center py-10 flex flex-col items-center">
          <FaSpinner className="animate-spin text-gray-500 mb-2" size={24} />
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <>
          {/* Top Companies Scrollable Section */}
          <h2 className="text-2xl font-semibold text-center my-8 text-blue-800 mt-20">
            Top Companies
          </h2>
          <div className="relative flex items-center">
            <button
              onClick={() => scroll("left")}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
            >
              <FaChevronLeft />
            </button>

            <div
              ref={scrollContainerRef}
              className="top-companies overflow-x-auto flex space-x-4 py-4 hide-scrollbar"
              style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
            >
              {topCompanies.length > 0 ? (
                topCompanies.map((company, index) => (
                  <div
                    key={index}
                    className="flex-none bg-blue-100 px-4 py-2 rounded-lg shadow-sm text-center text-blue-700 font-semibold"
                    style={{ minWidth: "200px" }}
                  >
                    {company.companyName}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No companies found.</p>
              )}
            </div>

            <button
              onClick={() => scroll("right")}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Recent Jobs Title */}
          <h2 className="text-2xl font-semibold text-center my-8 text-blue-800">
            Recent Jobs
          </h2>

          {/* Job List */}
          <div className="job-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No jobs found.
              </p>
            ) : (
              jobs.map((job) => <JobCard jobDetails={job} />)
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
