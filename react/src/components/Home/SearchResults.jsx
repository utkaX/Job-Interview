import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import JobSearchCard from "./JobSearchCard";
import { FaSpinner } from "react-icons/fa";

const SearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for handling errors

  const location = useLocation();

  // Helper function to get query params
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      keyword: searchParams.get("jobsearch") || "",
      location: searchParams.get("location") || "",
      experience: searchParams.get("experience") || ""
    };
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const queryParams = getQueryParams();
        let apiUrl = `http://localhost:8080/jobs/search?`;
        console.log(queryParams);
        if (queryParams.keyword) apiUrl += `keyword=${encodeURIComponent(queryParams.keyword)}&`;
        if (queryParams.location) apiUrl += `location=${encodeURIComponent(queryParams.location)}&`;
        if (queryParams.experience) apiUrl += `experience=${encodeURIComponent(queryParams.experience)}`;
        
        // Fetch the search results from the API
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data = await response.json();
        setJobs(data);
        console.log(data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError(error.message); // Set error message in state
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.search]); // Re-run effect when query params change

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center my-8 text-blue-800">
        Search Results
      </h2>
      {loading && (
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-4xl" />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <p>Please enter keywords to search relevant jobs</p>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-center my-8 text-blue-800">Search Results</h2>
        {loading ? (
            <div className="flex justify-center">
                <FaSpinner className="animate-spin text-4xl text-blue-600" />
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map(job => (
                    <JobSearchCard key={job._id} job={job} />
                ))}
            </div>
        )}
    </div>
    </div>
  );
};

export default SearchResults;
