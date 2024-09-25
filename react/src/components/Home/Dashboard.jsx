import { useEffect, useState, useRef } from "react";
import JobCard from "./JobCard";
import { Link } from "react-router-dom";
import QuoteCarousel from "./QuoteCarousel"; // Import the QuoteCarousel
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [topCompanies, setTopCompanies] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const scrollContainerRef = useRef(null); // Ref for the scrollable container

  useEffect(() => {
    const fetchData = async () => {
      await fetchJobs();
      await fetchTopCompanies();
      setLoading(false); // Set loading to false after fetching
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

  // Scroll the container left or right
  const scroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <QuoteCarousel />

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center py-10 flex flex-col items-center">
          <FaSpinner className="animate-spin text-gray-500 mb-2" size={24} />
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <>
          {/* Top Companies Scrollable Section */}
          <h2 className="text-2xl font-semibold text-center my-8 text-blue-800">
            Top Companies
          </h2>
          <div className="relative flex items-center">
            {/* Left Scroll Button */}
            <button
              onClick={() => scroll("left")}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
            >
              <FaChevronLeft />
            </button>

            {/* Scrollable Company List */}
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

            {/* Right Scroll Button */}
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
              jobs.map((job) => (
                <Link
                  to={`JobDetails/${job._id}`}
                  key={job._id}
                  className="mb-8"
                >
                  <JobCard jobDetails={job} />
                </Link>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
