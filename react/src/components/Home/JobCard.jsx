import React from "react";
import { Link } from "react-router-dom";

const JobCard = (props) => {
  const {
    title,
    employer,
    location,
    salary,
    experience,
    _id,
  } = props.jobDetails;

  return (
    <div className="job-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-blue-800 mb-2">
        {title}
      </h2>
      <p className="text-sm text-gray-500 mb-4">{employer}</p> {/* Display company name */}
      <p className="text-sm text-gray-500 mb-4">{location}</p>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="text-gray-600 text-sm mb-1">
          <strong className="font-medium">Location:</strong> {location}
        </div>
        <div className="text-gray-600 text-sm mb-1">
          <strong className="font-medium">Salary:</strong> ${salary}
        </div>
        <div className="text-gray-600 text-sm mb-1">
          <strong className="font-medium">Experience:</strong> {experience} years
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Link
          to={`JobDetails/${_id}`}
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
