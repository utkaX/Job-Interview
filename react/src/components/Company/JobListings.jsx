import React, { useState, useEffect } from "react";
import JobCard from "../Home/JobCard";

export default function JobListings({ companyId ,company}) {
  const [jobs, setJobs] = useState([]); // State to hold job listings
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
console.log("company :",company);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/jobs/company/${companyId}` // Adjust API endpoint as necessary
        );
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();

        const formattedJobs = data.map(job => ({
          title: job.title || "Untitled", // Default value if title is missing
          company: company || "Unknown Company", // Default company name
          location: job.location || "Location not specified", // Default location
          salary: job.salary || "Not disclosed", // Default salary
          experience: job.experience || "Not specified", // Default experience
          jobTags: job.jobTags || [], // Default to an empty array
          _id: job._id || null, // Ensure _id is present
          employeeId: companyId || null // Ensure employeeId is present
        }));

        setJobs(formattedJobs); // Set the formatted jobs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [companyId]); // Depend on companyId to re-fetch if it changes

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error handling
  }

  return (
    <div className="job-listings p-4 mt-4">
      <h2 className="text-xl font-bold">Open Positions</h2>
      <div className="job-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No jobs found.</p>
        ) : (
          jobs.map((job) => <JobCard key={job._id} jobDetails={job} />) // Ensure to pass a unique key
        )}
      </div>
    </div>
  );
}
