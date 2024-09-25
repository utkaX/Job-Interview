import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = (props) => {
  // Ensure that the job prop exists and has the necessary fields
  const { job } = props; // Destructure job from props
  if (!job) {
    return <p className="text-red-500">Job data is not available</p>; // Handle null case
  }

  const { _id, title, location, salary, isLive } = job; // Destructure job properties

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-200 transform hover:scale-105">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="flex justify-between text-gray-800">
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Salary:</strong> ${salary}</p>
      </div>
      <p className={`text-sm ${isLive ? 'text-green-500' : 'text-red-500'}`}>
        <strong>Status:</strong> {isLive ? 'Live' : 'Not Live'}
      </p>
      <Link to={`/job/${_id}`} className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
        See Details
      </Link>
    </div>
  );
};

export default JobCard;
