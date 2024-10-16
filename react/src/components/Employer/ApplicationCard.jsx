import React from "react";

const ApplicationCard = ({ application }) => {
  return (
    <div className="application-card ml-6 p-6 bg-white shadow-lg rounded-lg mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      <h3 className="text-xl font-semibold text-blue-600 mb-2 truncate">
        Job Title: {application.jobId.title || application.jobId._id}
      </h3>
      <div className="text-sm text-gray-700 space-y-1">
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          <span className="font-bold">Status:</span> {application.status}
        </p>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          <span className="font-bold">Cover Letter:</span> {application.coverLetter || "No cover letter provided"}
        </p>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          <span className="font-bold">Resume:</span> {application.resume || "No resume uploaded"}
        </p>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          <span className="font-bold">Source:</span> {application.source}
        </p>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          <span className="font-bold">Notes:</span> {application.notes || "No notes available"}
        </p>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          <span className="font-bold">Application Type:</span> {application.applicationType}
        </p>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          <span className="font-bold">Applied Date:</span> {new Date(application.appliedDate).toLocaleDateString()}
        </p>
      </div>

      {/* Button section */}
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
