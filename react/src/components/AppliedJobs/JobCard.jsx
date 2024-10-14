import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCalendarCheck,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner, // Import the spinner icon
} from "react-icons/fa";

const JobCard = ({ appliedJob }) => {
  const [jobDetails, setJobDetails] = useState(null);
  const [employerDetails, setEmployerDetails] = useState(null);
  const [jobType, setJobType] = useState(null); // State for job type
  const [loading, setLoading] = useState(true); // Loading state
  const { jobId, appliedDate, status } = appliedJob;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await fetch(
          `http://localhost:8080/jobs/getJobById/${jobId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching job details");
        }
        const data = await response.json();
        setJobDetails(data); // Set job details first

        // Fetch job type based on the jobType field from jobDetails
        const jobTypeResponse = await fetch(
          `http://localhost:8080/jobtype/getJobTypeById/${data.jobType}`
        );
        if (jobTypeResponse.ok) {
          const jobTypeData = await jobTypeResponse.json(); // Corrected from `response.json()` to `jobTypeResponse.json()`
          setJobType(jobTypeData.title); // Assume the job type title is in the "title" field
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchEmployerDetails = async () => {
    if (!jobDetails || !jobDetails.employerId) return; // Ensure jobDetails is defined
    try {
      const response = await fetch(
        `http://localhost:8080/employer/${jobDetails.employerId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEmployerDetails(data);
    } catch (error) {
      console.error("Error fetching employer data:", error);
    }
  };

  useEffect(() => {
    fetchEmployerDetails(); // Fetch employer details only when jobDetails is updated
  }, [jobDetails]);

  // Show the spinner icon while loading
  if (loading) {
    return (
      <div className="text-center text-gray-600">
        <FaSpinner className="animate-spin text-gray-500 mb-2" size={24} />
        Loading job details...
      </div>
    );
  }

  if (!jobDetails || !employerDetails || jobType === null) {
    return (
      <div className="text-center text-gray-600">
        Error loading job details.
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          {jobDetails.title || "Role"}
        </h2>
        <p className="text-md mb-1 flex items-center text-gray-700">
          <FaBuilding className="mr-2 text-gray-500" />
          <strong>Company:</strong>{" "}
          {employerDetails.companyName || "Company name"}
        </p>
        <p className="text-md mb-1 flex items-center text-gray-700">
          <FaBriefcase className="mr-2 text-gray-500" />
          <strong>Job Type:</strong> {jobType || "Loading..."}{" "}
          {/* Use jobType state */}
        </p>
        <p className="text-md mb-1 flex items-center text-gray-700">
          <FaCalendarCheck className="mr-2 text-gray-500" />
          <strong>Applied on:</strong>{" "}
          {new Date(appliedDate).toLocaleDateString()}
        </p>
        <p
          className={`text-md font-medium flex items-center ${
            status === "shortlisted"
              ? "text-green-600"
              : status === "rejected"
              ? "text-red-600"
              : "text-blue-600"
          }`}
        >
          {status === "rejected" ? (
            <FaTimesCircle className="mr-2" />
          ) : (
            <FaCheckCircle className="mr-2" />
          )}
          <strong>Status:</strong> {status === "rejected" ? "Rejected" : status}
        </p>
        {status === "shortlisted" && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">
              Congratulations! You've been shortlisted for this position.
            </p>
          </div>
        )}
      </div>
      {status === "shortlisted" && (
        <button
          className="mt-4 bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-2 rounded-md hover:bg-green-500 transition duration-200"
          onClick={() => {
            window.location.href = `/interview-details/${appliedJob._id}`; // Adjust the path as needed
          }}
        >
          View Interview Details
        </button>
      )}
    </div>
  );
};

export default JobCard;
