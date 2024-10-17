import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
} from "react-icons/fa"; // Import icons
import { useAuth } from "../../context/authContext";

const JobCard = (props) => {
  const {
    title,
    company,
    location,
    salary,
    Experience,
    jobTags,
    _id,
    employeeId,
  } = props.jobDetails;

  const { user } = useAuth();
  const formattedSalary = useMemo(() => {
    return salary ? salary.toLocaleString() : "N/A";
  }, [salary]);

  const renderedJobTags = useMemo(() => {
    return jobTags && jobTags.length > 0
      ? jobTags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full border border-blue-200"
          >
            {tag}
          </span>
        ))
      : null;
  }, [jobTags]);

  return (
    <div className="job-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-150 border border-gray-200 transform hover:scale-20">
      <h2 className="text-xl font-bold text-blue-800 mb-1 hover:text-blue-600 transition-colors duration-200">
        {title}
      </h2>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <FaBriefcase className="mr-1 text-gray-400" /> {/* Company Icon */}
        <span>{company}</span>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <FaMapMarkerAlt className="mr-1 text-gray-400" /> {/* Location Icon */}
        <span>{location}</span>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between text-gray-600 text-sm mb-2">
          <div className="flex items-center text-gray-600 text-sm mb-1">
            <FaClock className="mr-1 text-gray-400" /> {/* Experience Icon */}
            <span>
              <strong className="font-medium">Experience:</strong> {Experience}{" "}
              years
            </span>
          </div>
          <div className="flex items-center">
            <FaDollarSign className="mr-1 text-gray-400" /> {/* Salary Icon */}
            <span>
              <strong className="font-medium">Salary:</strong> $
              {formattedSalary}
            </span>
          </div>
        </div>

        {/* Job Tags */}
        {renderedJobTags && (
          <div className="mt-4 flex flex-wrap gap-2">{renderedJobTags}</div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <Link
          to={`/JobDetails/${_id}?company=${company}&companyId=${employeeId}`}
          state={{ company, companyId: employeeId }}
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md shadow"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
