import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = (props) => {
  // Ensure that the job prop exists and has the necessary fields
  const { job } = props; // Destructure job from props

  if (!job) {
    return <p className="text-red-500">Job data is not available</p>; // Handle null case
  }

  // Destructure the properties needed for display
  const { _id, title, location, salary, isLive, postedDate } = job;

  return (
    <div className="flex flex-col justify-between p-6 border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-200 transform hover:scale-105">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{location}</p>
        <p className="mt-2 text-gray-800 font-medium">
          {isLive ? (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
              Active
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
              Inactive
            </span>
          )}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-gray-800 font-bold">
          Salary: ${salary.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          Posted on: {new Date(postedDate).toLocaleDateString()}
        </p>
      </div>

      <Link
        to={`/job/${_id}`}
        className="mt-4 inline-block bg-blue-500 text-white text-center rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
      >
        View Job
      </Link>
    </div>
  );
};

export default JobCard;
