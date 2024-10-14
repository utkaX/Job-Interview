import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import TopCompanies from "./TopCompanies";
import RecentJobs from "./RecentJobs";
import LoadingSpinner from "./LoadingSpinner";
import QuoteCarousel from "./QuoteCarousel";

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

  // Reset scroll position to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
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
      setError("Please enter keywords to search relevant jobs.");
      return;
    }

    setError(null);

    const queryParams = new URLSearchParams();
    if (searchJob) queryParams.append("jobsearch", searchJob);
    if (searchLocation) queryParams.append("location", searchLocation);
    if (experienceYears) queryParams.append("experience", experienceYears);

    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <QuoteCarousel />

      <SearchBar
        searchJob={searchJob}
        setSearchJob={setSearchJob}
        experienceYears={experienceYears}
        setExperienceYears={setExperienceYears}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        handleSearch={handleSearch}
        error={error}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <TopCompanies
            topCompanies={topCompanies}
            scroll={scroll}
            scrollContainerRef={scrollContainerRef}
          />

          <RecentJobs jobs={jobs} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
