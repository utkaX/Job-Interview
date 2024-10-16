import React from "react";
import { Link } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import SaveJobButton from "./SaveJobButton"; // Adjust the import path as necessary

const JobSearchCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 transition-transform transform hover:scale-105">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-blue-800">{job.title}</h3>
        <SaveJobButton jobId={job._id} /> {/* Pass jobId to SaveJobButton */}
      </div>
      <p className="text-gray-500 mb-2">{job.description.slice(0, 100)}...</p>
      <p className="text-gray-700">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="text-gray-700">
        <strong>Salary:</strong> ${job.salary}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Company:</strong> {job.employerId?.companyName} 
      </p>
      <div className="flex justify-between mt-4">
        <Link
          to={`/JobDetails/${job._id}?company=${job.employerId?.companyName}&companId=${job.employerId?._id}`}
          state={{
            company: job.employerId?.companyName,
            companyId: job.employerId?._id,
          }}
        >
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
            View Details
          </button>
        </Link>
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition duration-200 flex items-center">
          <FaBriefcase className="mr-2" />
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobSearchCard;
