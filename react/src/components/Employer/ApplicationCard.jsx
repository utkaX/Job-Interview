import React from "react";

const ApplicationCard = ({ job }) => {
  // Log the job object to the console
  console.log(job);

  return (
    <div className="application-card ml-6 p-6 bg-white shadow-lg rounded-lg mb-6 transition-transform transform">
      <h3 className="text-xl font-semibold text-blue-600 mb-2">
        Job Title: {job.title}
      </h3>
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-bold">Description:</span>{" "}
          {job.description || "No description available"}
        </p>
        <p>
          <span className="font-bold">Location:</span>{" "}
          {job.location || "Not specified"}
        </p>
        <p>
          <span className="font-bold">Job Type:</span> {job.jobType}
        </p>
        <p>
          <span className="font-bold">Category:</span>{" "}
          {job.category || "Not specified"}
        </p>
        <p>
          <span className="font-bold">Salary:</span> $
          {job.salary?.toLocaleString() || "Not specified"}
        </p>
        <p>
          <span className="font-bold">Posted Date:</span>{" "}
          {new Date(job.postedDate).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
          View Application
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
