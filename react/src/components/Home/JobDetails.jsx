import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaSuitcase, FaMoneyBillWave } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import SaveJobButton from "./SaveJobButton";
import config from "../../utils/config";

const JobDetails = () => {
  const { JobId } = useParams();
  const [jobDetails, setJobDetails] = useState({
    title: "",
    location: "",
    experience: "",
    salary: 0,
    postedDate: "",
    applicants: 0,
    openings: 0,
    description: "",
    requirements: [],
    responsibilities: [],
    benefits: [],
    jobTags: [],
  });

  const { user, isLoggedIn } = useAuth(); // Get user and isLoggedIn from AuthContext
  const navigate = useNavigate(); // Hook for navigating between routes
  const location = useLocation(); // Use location to get search params
  const params = new URLSearchParams(location.search);
  const company = params.get("company");
  const companyId = params.get("companyId");

  const fetchJobDetails = async () => {
    try {
      const response = await fetch(
        `${config.baseUrl}/jobs/getJobById/${JobId}`
      );
      if (!response.ok) throw new Error("Failed to fetch job details");
      const details = await response.json();
      setJobDetails(details);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    if (JobId) {
      fetchJobDetails();
    }
  }, [JobId]);

  const formattedSalary = useMemo(() => {
    return jobDetails.salary ? jobDetails.salary.toLocaleString() : "N/A";
  }, [jobDetails.salary]);

  const formattedDate = useMemo(() => {
    return jobDetails.postedDate
      ? new Date(jobDetails.postedDate).toLocaleDateString()
      : "N/A";
  }, [jobDetails.postedDate]);

  const requirements = useMemo(() => {
    return jobDetails.requirements ? jobDetails.requirements.join(", ") : "N/A";
  }, [jobDetails.requirements]);

  const responsibilities = useMemo(() => {
    return jobDetails.responsibilities
      ? jobDetails.responsibilities.join(", ")
      : "N/A";
  }, [jobDetails.responsibilities]);

  const benefits = useMemo(() => {
    return jobDetails.benefits ? jobDetails.benefits.join(", ") : "N/A";
  }, [jobDetails.benefits]);

  const jobTags = useMemo(() => {
    return jobDetails.jobTags ? jobDetails.jobTags.join(", ") : "N/A";
  }, [jobDetails.jobTags]);

  const handleLoginRedirect = () => {
    navigate(
      `/login?redirectTo=${encodeURIComponent(
        location.pathname + location.search
      )}`,
      {
        state: {
          company,
          companyId,
        },
      }
    );
  };

  const handleRegisterRedirect = () => {
    navigate(
      `/register?redirectTo=${encodeURIComponent(
        location.pathname + location.search
      )}`,
      {
        state: {
          company,
          companyId,
        },
      }
    );
  };

  if (!jobDetails.title)
    return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 my-16 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Job Title and Company */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {jobDetails.title || "Job Title Not Available"}
          </h1>
          {company && (
            <p className="text-gray-600 text-sm mb-2">
              <Link
                to={`/company/${encodeURIComponent(companyId)}`}
                state={{ companyId: encodeURIComponent(companyId) }}
                className="text-blue-500 hover:underline"
              >
                {company}
              </Link>
            </p>
          )}
          {jobDetails.location && (
            <p className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>{jobDetails.location}</span>
            </p>
          )}
        </div>
        <div>{isLoggedIn && <SaveJobButton jobId={JobId} />}</div>
      </div>

      {/* Job Details Overview */}
      <div className="bg-gray-100 p-6 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-md">
        {jobDetails.experience && (
          <div className="flex items-center space-x-3">
            <FaSuitcase className="text-blue-500 text-lg" />
            <p>
              <strong className="text-blue-700">Experience:</strong>{" "}
              {jobDetails.experience}
            </p>
          </div>
        )}
        {formattedSalary && (
          <div className="flex items-center space-x-3">
            <FaMoneyBillWave className="text-green-500 text-lg" />
            <p>
              <strong className="text-blue-700">Salary:</strong> ₹{" "}
              {formattedSalary}
            </p>
          </div>
        )}
        {jobDetails.location && (
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-red-500 text-lg" />
            <p>
              <strong className="text-blue-700">Location:</strong>{" "}
              {jobDetails.location}
            </p>
          </div>
        )}
        {formattedDate && (
          <div className="flex items-center space-x-3">
            <p>
              <strong className="text-blue-700">Posted Date:</strong>{" "}
              {formattedDate}
            </p>
          </div>
        )}
        {jobDetails.applicants && (
          <div className="flex items-center space-x-3">
            <p>
              <strong className="text-blue-700">Applicants:</strong>{" "}
              {jobDetails.applicants}
            </p>
          </div>
        )}
        {jobDetails.openings && (
          <div className="flex items-center space-x-3">
            <p>
              <strong className="text-blue-700">Openings:</strong>{" "}
              {jobDetails.openings}
            </p>
          </div>
        )}
      </div>

      {/* Job Description Section */}
      {jobDetails.description && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Job Description
          </h2>
          <p className="text-gray-800 leading-relaxed">
            {jobDetails.description}
          </p>
        </div>
      )}

      {/* Key Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {requirements && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Requirements
            </h3>
            <p>{requirements}</p>
          </div>
        )}
        {responsibilities && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Responsibilities
            </h3>
            <p>{responsibilities}</p>
          </div>
        )}
        {benefits && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Benefits
            </h3>
            <p>{benefits}</p>
          </div>
        )}
        {jobTags && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Job Tags
            </h3>
            <p>{jobTags}</p>
          </div>
        )}
      </div>

      {/* Apply Button Section */}
      <div className="text-center">
        {isLoggedIn ? (
          <Link
            to={`/JobDetails/${encodeURIComponent(JobId)}/ApplyJob`}
            state={{ jobId: encodeURIComponent(JobId) }} // Encode jobId for the state
          >
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              Apply Now
            </button>
          </Link>
        ) : (
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLoginRedirect}
              className="bg-blue-500 text-white py-3 px-6 rounded-full"
            >
              Login to Apply
            </button>
            <button
              onClick={handleRegisterRedirect}
              className="bg-green-500 text-white py-3 px-6 rounded-full"
            >
              Register to Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
